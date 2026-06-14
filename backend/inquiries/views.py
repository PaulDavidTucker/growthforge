import logging
import os
from rest_framework import generics
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
from .models import Inquiry, OnboardingSubmission
from .serializers import InquirySerializer, OnboardingSubmissionSerializer

logger = logging.getLogger(__name__)


class InquiryRateThrottle(AnonRateThrottle):
    rate = '10/hour'


class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()  # type: ignore
    serializer_class = InquirySerializer
    throttle_classes = [InquiryRateThrottle]

    def perform_create(self, serializer):
        inquiry = serializer.save()
        subject = "New Inquiry from Your Website"
        message = (
            f"Name: {inquiry.name}\nEmail: {inquiry.email}\nMessage: {inquiry.message}"
        )
        body = f"A user has submitted an interest in the business, with the below message: \n {message}"
        from_email = settings.DEFAULT_FROM_EMAIL
        try:
            logger.info("Sending inquiry notification email")
            send_mail(
                subject,
                body,
                from_email,
                [from_email],
                fail_silently=False,
            )
            logger.info("Inquiry notification email sent successfully")
        except Exception as e:
            logger.error("Failed to send inquiry notification email: %s", str(e))


class OnboardingSubmissionCreateView(generics.CreateAPIView):
    queryset = OnboardingSubmission.objects.all()  # type: ignore
    serializer_class = OnboardingSubmissionSerializer
    throttle_classes = [InquiryRateThrottle]

    def perform_create(self, serializer):
        submission = serializer.save()
        subject = "New Website Onboarding Submission"
        message = (
            f"Name: {submission.name}\n"
            f"Email: {submission.email}\n"
            f"Business: {submission.business_name}\n"
            f"Current website: {submission.current_website or 'None provided'}"
        )
        body = f"A new onboarding form has been submitted:\n\n{message}"
        from_email = settings.DEFAULT_FROM_EMAIL
        try:
            logger.info("Sending onboarding notification email")
            send_mail(
                subject,
                body,
                from_email,
                [from_email],
                fail_silently=False,
            )
            logger.info("Onboarding notification email sent successfully")
        except Exception as e:
            logger.error("Failed to send onboarding notification email: %s", str(e))


def sitemap_view(request):
    """
    A simple view to serve the sitemap.xml from the React build directory.
    Includes path traversal protection.
    """
    sitemap_path = os.path.join(settings.STATIC_ROOT, "sitemap.xml")
    
    # Prevent path traversal attacks by verifying the resolved path
    real_sitemap_path = os.path.realpath(sitemap_path)
    real_static_root = os.path.realpath(settings.STATIC_ROOT)
    
    if not real_sitemap_path.startswith(real_static_root):
        logger.warning("Path traversal attempt detected: %s", sitemap_path)
        return HttpResponse("Invalid path", status=403)
    
    logger.debug("Serving sitemap from %s", real_sitemap_path)
    try:
        with open(real_sitemap_path, "r") as f:
            readAsBytes = f.read().encode()
            return HttpResponse(readAsBytes, content_type="application/xml")
    except FileNotFoundError:
        logger.warning("sitemap.xml not found at %s", real_sitemap_path)
        return HttpResponse(b"sitemap.xml not found", status=404)