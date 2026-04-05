import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from chatbot.middleware import WebSocketRateLimitMiddleware
import chatbot.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "growthsource.settings")

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": WebSocketRateLimitMiddleware(
            AuthMiddlewareStack(
                URLRouter(chatbot.routing.websocket_urlpatterns)
            )
        ),
    }
)
