from rest_framework import generics

from growthsource.settings import STATIC_ROOT, DEFAULT_FROM_EMAIL
from .models import Inquiry
from .serializers import InquirySerializer
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
import os


class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()  # type: ignore
    serializer_class = InquirySerializer

    def perform_create(self, serializer):
        inquiry = serializer.save()
        subject = "New Inquiry from Your Website"
        message = (
            f"Name: {inquiry.name}\nEmail: {inquiry.email}\nMessage: {inquiry.message}"
        )
        body = f"A user has submitted an interest in the business, with the below message: \n {message}"
        from_email = settings.DEFAULT_FROM_EMAIL
        try:
            print("Sending an email....")
            # send_mail(
            #     subject,
            #     body,
            #     from_email,
            #     [from_email],
            #     fail_silently=False,
            # )
            print(f"Email sent to: {from_email}")
        except Exception as e:
            print(f"Email sending failed: {str(e)}")


def sitemap_view(request):
    """
    A simple view to serve the sitemap.xml from the React build directory.
    """
    sitemap_path = os.path.join(STATIC_ROOT, "sitemap.xml")
    print(f"Attempting to fetch Sitemap from {sitemap_path}")
    try:
        with open(sitemap_path, "r") as f:
            readAsBytes = f.read().encode()
            return HttpResponse(readAsBytes, content_type="application/xml")
    except FileNotFoundError:
        return HttpResponse(b"sitemap.xml not found", status=404)
