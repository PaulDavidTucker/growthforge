from django.urls import path

from . import views

urlpatterns = [
    path("api/chatbot/dashboard/", views.dashboard_api, name="chatbot_dashboard_api"),
    path(
        "api/chatbot/client/<int:client_id>/",
        views.client_detail_api,
        name="chatbot_client_api",
    ),
]
