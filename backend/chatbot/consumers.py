# core/consumers.py (Create this new file)
import json
from channels.generic.websocket import WebsocketConsumer
import time

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        # Send a welcome message when the client connects
        self.send(text_data=json.dumps({
            'message': 'Hello! How can I help you with your fitness goals today?',
            'sender': 'bot'
        }))

    def disconnect(self, close_code):
        pass

    # This function is called when a message is received from the client
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message'].lower()

        # Simple, non-LLM canned responses for demonstration
        response = ''
        if 'membership' in message or 'price' in message:
            response = 'We have three tiers: Basic ($39/mo), Premium ($59/mo), and Elite ($99/mo). You can see all the details on our Memberships page!'
        elif 'hours' in message or 'open' in message:
            response = 'We are open Mon - Fri from 5 AM to 10 PM, and on weekends from 7 AM to 8 PM.'
        elif 'class' in message:
            response = 'We offer a wide range of classes, including Yoga, HIIT, and Cycling. You can find the full schedule on our website.'
        else:
            response = "I'm sorry, I'm just a simple bot for now. I can answer questions about memberships, opening hours, or classes."

        # Simulate bot "thinking"
        time.sleep(1)

        # Send the response back to the client
        self.send(text_data=json.dumps({
            'message': response,
            'sender': 'bot'
        }))
