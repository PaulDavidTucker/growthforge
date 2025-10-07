import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack  # We'll need this for user auth later

# You will need to create the chat.routing module mentioned below
import chatbot.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "growthsource.settings")

# This is the standard Django HTTP application
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        # (HTTP requests will be handled by the normal Django views)
        "http": django_asgi_app,
        # (WebSocket requests will be handled by...)
        "websocket": AuthMiddlewareStack(
            URLRouter(
                # chat.routing.websocket_urlpatterns # 👈 This is where you'll define your WebSocket URLs
                chatbot.routing.websocket_urlpatterns
            )
        ),
    }
)
