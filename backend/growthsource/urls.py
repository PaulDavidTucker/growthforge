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
from inquiries.views import InquiryCreateView, sitemap_view
from subscribers.views import SubscriberCreateView
from testimonials.views import TestimonialViewSet

# --- API Router Setup ---
router = DefaultRouter()
router.register(r"casestudies", CaseStudyViewSet, basename="casestudy")
router.register(r"blog", PostViewSet, basename="post")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")

# --- Main URL Patterns (WITHOUT the catch-all) ---
# Define all your specific application routes first.
urlpatterns = [
    # 1. Admin, API, and specific file routes
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
    path("api/subscribe/", SubscriberCreateView.as_view(), name="subscriber-create"),
    path(
        "favicon.ico",
        static_serve,
        {"path": "favicon.ico", "document_root": os.path.join(settings.BASE_DIR, "frontend", "public")},
    ),
    path("sitemap.xml", sitemap_view, name="sitemap"),
]

# 2. Add Media and Static file serving patterns for DEVELOPMENT ONLY
# These are now added BEFORE the catch-all.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# 3. The React App Catch-all (MUST BE THE VERY LAST THING)
# This appends the final "match anything" pattern after all specific patterns
# (including media) have been defined.
urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
