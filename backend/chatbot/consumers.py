# backend/chatbot/consumers.py
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, AIMessage
from django.conf import settings

import os
import environ
from .tools import send_email, book_appointment
from .middleware import tool_call_limiter, session_manager, current_session_id

logger = logging.getLogger(__name__)


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session = self.scope["session"]
        self.chat_history = self.session.get("chat_history", [])
        self.tool_calls = self.session.get("tool_calls", 0)

        self.rate_limit_session_id = self.scope.get("rate_limit_session_id", "")
        self.client_ip = self.scope.get("client_ip", "unknown")

        env = environ.Env()
        environ.Env.read_env(os.path.join(settings.BASE_DIR, ".env"))

        key = env("OPENAI_API_KEY", default=os.environ.get("OPENAI_API_KEY"))

        try:
            knowledge_file_path = os.path.join(
                settings.BASE_DIR, "knowledge.txt"
            )
            with open(knowledge_file_path, "r") as f:
                self.knowledge_content = f.read().strip()
        except Exception as e:
            logger.error("Error loading knowledge file: %s", e)
            self.knowledge_content = ""

        model = init_chat_model(
            model="openai:gpt-5-mini",
            temperature=0.1,
            max_tokens=1000,
            reasoning_effort="low",
            timeout=30,
            max_retries=2,
            api_key=key,
        )

        tools = [send_email, book_appointment]

        self.agent = create_agent(
            model,
            tools,
            system_prompt=f"You are the Reps and Revenue AI Assistant, a helpful virtual agent for a small-business website design agency. Key business details: - Services: Professional website design and development for small businesses, with a £50 deposit and a £250 completion fee that includes one year of hosting, updates, and support. - Bespoke add-ons: CRM integration, chatbots, advanced automations, booking/e-commerce features, and fully custom solutions. - Core values: Transparent pricing, fast delivery, simplicity, collaboration, and long-term support. - Pricing: £50 non-refundable deposit to start; £250 if the client loves the site and wants to keep it. Always be polite, concise, and action-oriented. If the user asks for information from the knowledge base, use the 'search_knowledge_base' tool. If an action like sending an email is needed, use the appropriate tool. Respond based on the conversation history and any retrieved context. Your responses should be short and to the point, as if you're texting. Your responses should be brutally short, two or three sentences at most. {self.knowledge_content}",
        )

        await self.accept()

        await self.send(
            text_data=json.dumps(
                {
                    "message": "Hello! I'm the Reps And Revenue AI assistant. How can I help you?",
                    "sender": "bot",
                }
            )
        )

    async def disconnect(self, close_code):
        self.session["chat_history"] = self.chat_history
        await self.channel_layer.group_discard("chat", self.channel_name)

    async def receive(self, text_data):
        token = current_session_id.set(self.rate_limit_session_id)
        try:
            await self._handle_message(text_data)
        finally:
            current_session_id.reset(token)

    async def _handle_message(self, text_data):
        text_data_json = json.loads(text_data)
        user_message_text = text_data_json.get("message", "")

        user_message_count = len(
            [msg for msg in self.chat_history if msg["sender"] == "user"]
        )

        if user_message_count >= 15:
            response_text = "You've reached the message limit (15 per session). For more help, please contact support or start a new session."
            await self.send(
                text_data=json.dumps({"message": response_text, "sender": "bot"})
            )
            return

        if self.tool_calls >= 3:
            response_text = "You've reached the tool usage limit (3 per session). Please contact support for more actions."
            await self.send(
                text_data=json.dumps({"message": response_text, "sender": "bot"})
            )
            return

        if not tool_call_limiter.is_allowed(self.client_ip):
            response_text = "Tool usage rate limit exceeded. Please try again later or contact support."
            await self.send(
                text_data=json.dumps({"message": response_text, "sender": "bot"})
            )
            return

        history_messages = []
        for msg in self.chat_history:
            if msg["sender"] == "user":
                history_messages.append(HumanMessage(content=msg["text"]))
            else:
                history_messages.append(AIMessage(content=msg["text"]))

        self.chat_history.append({"sender": "user", "text": user_message_text})

        try:
            await self.send(text_data=json.dumps({"type": "start"}))

            response_text = ""

            async for chunk in self.agent.astream(
                {
                    "messages": history_messages
                    + [HumanMessage(content=user_message_text)]
                }
            ):
                logger.debug("Chunk type: %s, content: %s", type(chunk), chunk)

                if isinstance(chunk, dict):
                    if "actions" in chunk:
                        for action in chunk["actions"]:
                            logger.info(
                                "Tool called: %s by session %s",
                                action.tool,
                                self.rate_limit_session_id[:8]
                            )
                            self.tool_calls += 1
                            session_manager.increment_tool_calls(self.rate_limit_session_id)

                    if "model" in chunk and "messages" in chunk["model"]:
                        for message in chunk["model"]["messages"]:
                            if hasattr(message, "content") and message.content:
                                chunk_content = message.content
                                response_text += chunk_content
                                await self.send(
                                    text_data=json.dumps(
                                        {"type": "chunk", "content": chunk_content}
                                    )
                                )

                    elif "messages" in chunk:
                        for message in chunk["messages"]:
                            if hasattr(message, "content") and message.content:
                                chunk_content = message.content
                                response_text += chunk_content
                                await self.send(
                                    text_data=json.dumps(
                                        {"type": "chunk", "content": chunk_content}
                                    )
                                )

            await self.send(text_data=json.dumps({"type": "end"}))

        except Exception as e:
            response_text = (
                f"There was an issue with our bot! Please try reloading the page"
            )
            logger.error("Chatbot error: %s", e)
            await self.send(
                text_data=json.dumps({"message": response_text, "sender": "bot"})
            )

        self.chat_history.append({"sender": "bot", "text": response_text})
