from rest_framework import serializers
from .models import CaseStudy


class CaseStudySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudy
        fields = (
            "id",
            "title",
            "client_name",
            "problem",
            "solution",
            "results",
            "image_url",
            "published_date",
        )

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return request.build_absolute_uri(obj.image.url)  # type: ignore
        return None
