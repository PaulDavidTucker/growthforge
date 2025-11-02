# backend/chatbot/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from django.conf import settings

import os
import environ
from .tools import send_email, book_appointment


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session = self.scope["session"]
        self.chat_history = self.session.get("chat_history", [])
        self.tool_calls = self.session.get("tool_calls", 0)

        env = environ.Env()
        environ.Env.read_env(os.path.join(settings.BASE_DIR, ".env"))

        key = env("OPENAI_API_KEY", default=os.environ.get("OPENAI_API_KEY"))

        try:
            knowledge_file_path = os.path.join(
                settings.BASE_DIR, "knowledge.txt"
            )  # Adjust path if needed
            with open(knowledge_file_path, "r") as f:
                self.knowledge_content = f.read().strip()  # Load full text
        except Exception as e:
            print(f"Error loading knowledge file: {e}")
            self.knowledge_content = ""

        # system_messages = [
        #     SystemMessage(
        #         content=f"You are the Reps and Revenue AI Assistant, a helpful virtual agent specialized in sales, revenue optimization, and customer support. Key business details: - Services: Sales rep training, revenue analytics, AI chatbots for lead gen, custom CRM integrations. - Core values: Efficiency, data-driven decisions, client success stories (e.g., increased revenue by 30% for e-commerce clients).- Pricing: Starts at $100/month for basic plans; enterprise custom. Always be polite, concise, and action-oriented. If the user asks for information from the knowledge base, use the 'search_knowledge_base' tool. If an action like sending an email is needed, use the appropriate tool. Respond based on the conversation history and any retrieved context. Your responses should be short and to the point, as if you're a texting. Your responses should be brutally short, two or three sentences as most. {self.knowledge_content}"
        #     )
        # ]

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
            system_prompt=f"You are the Reps and Revenue AI Assistant, a helpful virtual agent specialized in sales, revenue optimization, and customer support. Key business details: - Services: Sales rep training, revenue analytics, AI chatbots for lead gen, custom CRM integrations. - Core values: Efficiency, data-driven decisions, client success stories (e.g., increased revenue by 30% for e-commerce clients).- Pricing: Starts at $100/month for basic plans; enterprise custom. Always be polite, concise, and action-oriented. If the user asks for information from the knowledge base, use the 'search_knowledge_base' tool. If an action like sending an email is needed, use the appropriate tool. Respond based on the conversation history and any retrieved context. Your responses should be short and to the point, as if you're a texting. Your responses should be brutally short, two or three sentences as most. {self.knowledge_content}",
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
        text_data_json = json.loads(text_data)
        user_message_text = text_data_json.get("message", "")

        user_message_count = len(
            [msg for msg in self.chat_history if msg["sender"] == "user"]
        )

        if user_message_count >= 15:
            response_text = "You've reached the message limit (10 per session). For more help, please contact support or start a new session."
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

        # Prepare history as messages
        history_messages = []
        for msg in self.chat_history:
            if msg["sender"] == "user":
                history_messages.append(HumanMessage(content=msg["text"]))
            else:
                history_messages.append(AIMessage(content=msg["text"]))

        # Update history with user message
        self.chat_history.append({"sender": "user", "text": user_message_text})

        try:
            await self.send(text_data=json.dumps({"type": "start"}))

            response_text = ""  # Accumulate full response

            async for chunk in self.agent.astream(
                {
                    "messages": history_messages
                    + [HumanMessage(content=user_message_text)]
                }
            ):
                print(f"Chunk type: {type(chunk)}, content: {chunk}")

                if isinstance(chunk, dict):
                    # Handle tool calls if present
                    if "actions" in chunk:
                        for action in chunk["actions"]:
                            print(
                                f"Tool called: {action.tool} with input {action.tool_input}"
                            )
                            self.tool_calls += 1

                    # Handle the nested structure: chunk['model']['messages']
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

                    # Fallback: check for direct messages key
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
            print(f"Error! {e}")
            await self.send(
                text_data=json.dumps({"message": response_text, "sender": "bot"})
            )

        # Update history with full bot response
        self.chat_history.append({"sender": "bot", "text": response_text})
