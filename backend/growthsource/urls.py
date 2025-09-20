
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from django.views.generic import RedirectView

from growthsource.settings import MEDIA_ROOT
from blog.views import PostViewSet
from casestudies.views import CaseStudyViewSet
from inquiries.views import InquiryCreateView
from subscribers.views import SubscriberCreateView
from testimonials.views import TestimonialViewSet
from django.views.static import serve as static_serve
import os

router = DefaultRouter()
router.register(r'casestudies', CaseStudyViewSet, basename='casestudy')
router.register(r'blog', PostViewSet, basename='post')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/inquiries', include('inquiries.urls')),
    path('api/blog/', PostViewSet.as_view({'get': 'list'}), name='blog'),
    path('api/blog/<slug:slug>/', PostViewSet.as_view({'get': 'retrieve'}), name='blog-detail'),
    path('api/case-studies/', CaseStudyViewSet.as_view({'get': 'list'}), name='casestudy'),
    path('api/', include(router.urls)),
    path('api/inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('api/subscribe/', SubscriberCreateView.as_view(), name='subscriber-create'),
    path(
        "favicon.ico",
        static_serve,
        {"path": "favicon.ico", "document_root": os.path.join(settings.BASE_DIR, "frontend", "build")},
    ),
]

# Serve media in dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# 🔥 React catch‑all (must be bottom!)
urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
