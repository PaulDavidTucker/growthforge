from rest_framework import viewsets
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing visible testimonials.
    """
    queryset = Testimonial.objects.filter(is_visible=True) # type: ignore
    serializer_class = TestimonialSerializer
