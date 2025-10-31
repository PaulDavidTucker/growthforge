# backend/growthsource/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.views.static import serve as static_serve
import os

# --- View Imports ---
from blog.views import PostViewSet
from casestudies.views import CaseStudyViewSet
from inquiries.views import InquiryCreateView, sitemap_view # Import sitemap_view
from subscribers.views import SubscriberCreateView
from testimonials.views import TestimonialViewSet

# --- API Router Setup ---
# The router is the cleanest way to handle your ViewSets
router = DefaultRouter()
router.register(r"casestudies", CaseStudyViewSet, basename="casestudy")
router.register(r"blog", PostViewSet, basename="post")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")

# --- Main URL Patterns ---
urlpatterns = [
    # 1. Most specific routes first: Admin, API, and specific files
    path("admin/", admin.site.urls),

    # The router handles all ViewSet-based API routes automatically
    path("api/", include(router.urls)),

    # Non-router API routes
    path("api/inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
    path("api/subscribe/", SubscriberCreateView.as_view(), name="subscriber-create"),

    # Specific file routes to prevent them from being caught by the React app
    path(
        "favicon.ico",
        static_serve,
        {"path": "favicon.ico", "document_root": os.path.join(settings.BASE_DIR, "frontend", "public")},
    ),
    path("sitemap.xml", sitemap_view, name="sitemap"),

    # 2. The React App Catch-all (MUST BE THE LAST PATTERN IN THIS LIST)
    # This captures any request that hasn't been matched yet and serves the React app
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]

# 3. Media and Static file serving for DEVELOPMENT ONLY
# This block is appended AFTER the main list and is handled correctly by Django's dev server.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Note: Serving static files this way is often redundant if WhiteNoise is configured,
    # but it doesn't hurt during development.
