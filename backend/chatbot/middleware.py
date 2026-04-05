import time
import uuid
from collections import defaultdict
from contextvars import ContextVar
from channels.middleware import BaseMiddleware

current_session_id: ContextVar[str] = ContextVar("current_session_id", default="")


class IPRateLimiter:
    """In-memory IP-based rate limiter for WebSocket connections."""

    def __init__(self, max_connections=10, window_seconds=60):
        self.max_connections = max_connections
        self.window_seconds = window_seconds
        self.connection_times = defaultdict(list)

    def is_allowed(self, ip: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        self.connection_times[ip] = [
            t for t in self.connection_times[ip] if t > window_start
        ]
        if len(self.connection_times[ip]) >= self.max_connections:
            return False
        self.connection_times[ip].append(now)
        return True


class ToolCallRateLimiter:
    """Global IP-based rate limiter for tool calls to prevent OpenAI credit drain."""

    def __init__(self, max_tool_calls=20, window_seconds=3600):
        self.max_tool_calls = max_tool_calls
        self.window_seconds = window_seconds
        self.tool_call_times = defaultdict(list)

    def is_allowed(self, ip: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        self.tool_call_times[ip] = [
            t for t in self.tool_call_times[ip] if t > window_start
        ]
        if len(self.tool_call_times[ip]) >= self.max_tool_calls:
            return False
        self.tool_call_times[ip].append(now)
        return True

    def get_remaining(self, ip: str) -> int:
        now = time.time()
        window_start = now - self.window_seconds
        self.tool_call_times[ip] = [
            t for t in self.tool_call_times[ip] if t > window_start
        ]
        return max(0, self.max_tool_calls - len(self.tool_call_times[ip]))


class SessionManager:
    """Manages session-based authentication for tool calls."""

    def __init__(self):
        self.sessions = {}

    def create_session(self, ip: str) -> str:
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = {
            "ip": ip,
            "created_at": time.time(),
            "tool_calls": 0,
            "is_verified": False,
        }
        return session_id

    def get_session(self, session_id: str) -> dict | None:
        return self.sessions.get(session_id)

    def increment_tool_calls(self, session_id: str):
        if session_id in self.sessions:
            self.sessions[session_id]["tool_calls"] += 1

    def cleanup_expired(self, max_age=3600):
        now = time.time()
        expired = [
            sid for sid, data in self.sessions.items() if now - data["created_at"] > max_age
        ]
        for sid in expired:
            del self.sessions[sid]


rate_limiter = IPRateLimiter(max_connections=10, window_seconds=60)
tool_call_limiter = ToolCallRateLimiter(max_tool_calls=20, window_seconds=3600)
session_manager = SessionManager()


class WebSocketRateLimitMiddleware(BaseMiddleware):
    """ASGI middleware that rate limits WebSocket connections by IP and injects session info."""

    async def __call__(self, scope, receive, send):
        if scope["type"] != "websocket":
            return await self.inner(scope, receive, send)

        ip = self._get_client_ip(scope)

        if not rate_limiter.is_allowed(ip):
            await send(
                {
                    "type": "websocket.close",
                    "code": 4029,
                    "reason": "Rate limited",
                }
            )
            return

        session_id = session_manager.create_session(ip)
        scope["rate_limit_session_id"] = session_id
        scope["client_ip"] = ip

        return await self.inner(scope, receive, send)

    def _get_client_ip(self, scope):
        x_forwarded_for = dict(scope.get("headers", [])).get(b"x-forwarded-for")
        if x_forwarded_for:
            return x_forwarded_for.decode().split(",")[0].strip()
        return scope.get("client", ("unknown", 0))[0]
