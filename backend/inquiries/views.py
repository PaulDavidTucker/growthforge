from rest_framework import generics
from .models import Inquiry
from .serializers import InquirySerializer
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse

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


def sitemap_view(request):
    """
    A simple view to serve the sitemap.xml from the React build directory.
    """
    sitemap_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'sitemap.xml')
    try:
        with open(sitemap_path, 'r') as f:
            return HttpResponse(f.read(), content_type='application/xml')
    except FileNotFoundError:
        return HttpResponse("sitemap.xml not found", status=404)
