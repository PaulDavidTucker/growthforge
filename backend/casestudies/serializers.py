from rest_framework import serializers
from .models import CaseStudy

class CaseStudySerializer(serializers.ModelSerializer):
    # 1. Define a new field that will contain the full URL
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudy
        # 2. Add 'image_url' to the fields list and remove the old 'image' field if you want
        fields = (
            'id', 'title', 'client_name', 'problem',
            'solution', 'results', 'image_url', 'published_date'
        )

    # 3. Create a method to generate the URL
    # The method name must be get_<field_name>
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            # This builds the full URL, e.g., "http://localhost:8000/media/casestudies/posture.jpeg"
            return request.build_absolute_uri(obj.image.url) # type: ignore
        return None
