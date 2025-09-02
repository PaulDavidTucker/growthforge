# backend/subscribers/views.py
from rest_framework import generics
from .models import Subscriber
from .serializers import SubscriberSerializer

class SubscriberCreateView(generics.CreateAPIView):
    """
    API endpoint for creating a new subscriber.
    """
    queryset = Subscriber.objects.all() # type: ignore
    serializer_class = SubscriberSerializer
