from datetime import datetime, timedelta

# Create your views here.
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Avg, Count
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods

from .models import ChatSession, Client


@staff_member_required
@require_http_methods(["GET"])
def dashboard_api(request):
    """API endpoint for dashboard data"""
    print("Getting dashboard information...")
    clients = (
        Client.objects.filter(is_active=True)
        .annotate(
            session_count=Count("sessions"),
        )
        .order_by("-created_at")
    )

    recent_sessions = ChatSession.objects.select_related("client").order_by(
        "-started_at"
    )[:20]

    data = {
        "clients": [
            {
                "id": c.id,
                "name": c.name,
                "domain": c.domain,
                "api_key": c.api_key,
                "is_active": c.is_active,
                "created_at": c.created_at.isoformat(),
                "updated_at": c.updated_at.isoformat()
                if hasattr(c, "updated_at") and c.updated_at
                else None,
                "config": c.config,
                "created_by": {
                    "id": c.created_by.id,
                    "username": c.created_by.username,
                }
                if c.created_by
                else None,
                "session_count": c.session_count,
            }
            for c in clients
        ],
        "recent_sessions": [
            {
                "session_id": s.session_id,
                "client": {"id": s.client.id, "name": s.client.name},
                "started_at": s.started_at.isoformat(),
                "ended_at": s.ended_at.isoformat() if s.ended_at else None,
                "message_count": s.message.count() if hasattr(s, "message") else 0,
            }
            for s in recent_sessions
        ],
        "total_clients": clients.count(),
        "total_sessions": ChatSession.objects.count(),
    }

    return JsonResponse(data)


@staff_member_required
@require_http_methods(["GET"])
def client_detail_api(request, client_id):
    """API endpoint for client detail data"""
    try:
        client = Client.objects.get(id=client_id)
    except Client.DoesNotExist:
        return JsonResponse({"error": "Client not found"}, status=404)

    sessions = (
        ChatSession.objects.filter(client=client)
        .annotate(message_count=Count("message"))
        .order_by("-started_at")[:50]
    )

    thirty_days_ago = datetime.now() - timedelta(days=30)

    stats = {
        "total_sessions": ChatSession.objects.filter(client=client).count(),
        "sessions_last_30_days": ChatSession.objects.filter(
            client=client, started_at__gte=thirty_days_ago
        ).count(),
        "total_messages": Message.objects.filter(session__client=client).count(),
        "avg_messages_per_session": Message.objects.filter(
            session__client=client
        ).count()
        / max(ChatSession.objects.filter(client=client).count(), 1),
    }

    data = {
        "client": {
            "id": client.id,
            "name": client.name,
            "domain": client.domain,
            "api_key": client.api_key,
            "is_active": client.is_active,
            "created_at": client.created_at.isoformat(),
            "config": client.config,
        },
        "stats": stats,
        "sessions": [
            {
                "session_id": s.session_id,
                "started_at": s.started_at.isoformat(),
                "ended_at": s.ended_at.isoformat() if s.ended_at else None,
                "message_count": s.message_count,
            }
            for s in sessions
        ],
    }

    return JsonResponse(data)
