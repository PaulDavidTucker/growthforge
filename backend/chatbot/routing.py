# core/routing.py (Create this new file)
from django.urls import re_path
from . import consumers

print("✅ core/routing.py has been loaded by the ASGI server.")

websocket_urlpatterns = [
    re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi()),
]
