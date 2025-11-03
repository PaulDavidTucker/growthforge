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

router = DefaultRouter()
router.register(r"casestudies", CaseStudyViewSet, basename="casestudy")
router.register(r"blog", PostViewSet, basename="post")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")

urlpatterns = [
    # 1. Admin, API, and specific file routes
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
    path("api/subscribe/", SubscriberCreateView.as_view(), name="subscriber-create"),
    path(
        "favicon.ico",
        static_serve,
        {
            "path": "favicon.ico",
            "document_root": os.path.join(settings.BASE_DIR, "frontend", "public"),
        },
    ),
    path("sitemap.xml", sitemap_view, name="sitemap"),
]

if settings.DEBUG:
    # Local dev auto-serving (for DEBUG=True)
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # Production: Explicitly route static/media with serve (WhiteNoise handles MIME)
    urlpatterns += [
        re_path(
            r"^static/(?P<path>.*)$",
            static_serve,
            {"document_root": settings.STATIC_ROOT},
        ),
        re_path(
            r"^media/(?P<path>.*)$",
            static_serve,
            {"document_root": settings.MEDIA_ROOT},
        ),
    ]

urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
