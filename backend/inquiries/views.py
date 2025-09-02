from rest_framework import generics
from .models import Inquiry
from .serializers import InquirySerializer
from django.core.mail import send_mail
from django.conf import settings

class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all() # type: ignore
    serializer_class = InquirySerializer

    def perform_create(self, serializer):
        inquiry = serializer.save()
        # Send an email notification
        subject = 'New Inquiry from Your Website'
        message = f'Name: {inquiry.name}\nEmail: {inquiry.email}\nMessage: {inquiry.message}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = ['youragencyemail@example.com']
        send_mail(subject, message, from_email, recipient_list)
