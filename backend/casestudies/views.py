from rest_framework import viewsets
from .models import CaseStudy
from .serializers import CaseStudySerializer

class CaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CaseStudy.objects.all() # type: ignore
    serializer_class = CaseStudySerializer
