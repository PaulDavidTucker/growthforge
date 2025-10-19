# backend/chatbot/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from langchain_openai import ChatOpenAI
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from django.conf import settings

import os
import environ
# from .tools import SendEmailTool


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session = self.scope["session"]
        self.chat_history = self.session.get("chat_history", [])

        env = environ.Env()
        environ.Env.read_env(os.path.join(settings.BASE_DIR, ".env"))

        key = env("OPENAI_API_KEY", default=os.environ.get("OPENAI_API_KEY"))

        self.model = init_chat_model(
            model="openai:gpt-5-mini",
            temperature=0.1,
            max_tokens=1000,
            reasoning_effort="low",
            timeout=30,
            max_retries=2,
            api_key=key,
        )

        try:
            knowledge_file_path = os.path.join(
                settings.BASE_DIR, "knowledge.txt"
            )  # Adjust path if needed
            with open(knowledge_file_path, "r") as f:
                self.knowledge_content = f.read().strip()  # Load full text
        except Exception as e:
            print(f"Error loading knowledge file: {e}")
            self.knowledge_content = ""

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

        if user_message_count >= 10:
            response_text = "You've reached the message limit (10 per session). For more help, please contact support or start a new session."
            await self.send(
                text_data=json.dumps({"message": response_text, "sender": "bot"})
            )
            return

        messages = [
            SystemMessage(
                content="You are the Reps and Revenue AI Assistant, a helpful virtual agent specialized in sales, revenue optimization, and customer support. Key business details: - Services: Sales rep training, revenue analytics, AI chatbots for lead gen, custom CRM integrations. - Core values: Efficiency, data-driven decisions, client success stories (e.g., increased revenue by 30% for e-commerce clients).- Pricing: Starts at $99/month for basic plans; enterprise custom. Always be polite, concise, and action-oriented. If the user asks for information from the knowledge base, use the 'search_knowledge_base' tool. If an action like sending an email is needed, use the appropriate tool. Respond based on the conversation history and any retrieved context. "
            ),
            SystemMessage(content=f"Additional knowledge: {self.knowledge_content}"),
            HumanMessage(content=user_message_text),
        ]

        for msg in self.chat_history:
            if msg["sender"] == "user":
                messages.append(HumanMessage(content=msg["text"]))
            else:
                messages.append(AIMessage(content=msg["text"]))
        messages.append(HumanMessage(content=user_message_text))

        self.chat_history.append({"sender": "user", "text": user_message_text})

        try:
            response = self.model.invoke(messages)
            response_text = response.content
        except Exception as e:
            response_text = (
                f"There was an issue with our bot! Please try reloading the page"
            )
            print(f"Error! {e}")

        self.chat_history.append({"sender": "bot", "text": response_text})

        await self.send(
            text_data=json.dumps({"message": response_text, "sender": "bot"})
        )
