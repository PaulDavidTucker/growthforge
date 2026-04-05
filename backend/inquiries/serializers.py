import re
from django.core.validators import RegexValidator
from rest_framework import serializers
from .models import Inquiry


class InquirySerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=100,
        validators=[
            RegexValidator(
                regex=r'^[\w\s\-\'\.]+$',
                message='Name can only contain letters, numbers, spaces, hyphens, apostrophes, and periods.'
            )
        ]
    )
    email = serializers.EmailField()
    message = serializers.CharField(max_length=5000)

    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ('created_at',)

    def validate_message(self, value):
        """Sanitize message content to prevent XSS."""
        # Remove potentially dangerous HTML tags
        import re
        # Remove script tags and their contents
        value = re.sub(r'<script[^>]*>.*?</script>', '', value, flags=re.IGNORECASE | re.DOTALL)
        # Remove event handlers
        value = re.sub(r'\s*on\w+\s*=\s*["\'][^"\']*["\']', '', value, flags=re.IGNORECASE)
        # Remove javascript: protocol
        value = re.sub(r'javascript:', '', value, flags=re.IGNORECASE)
        return value.strip()

    def validate_name(self, value):
        """Additional validation for name field."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value.strip()

    def validate_email(self, value):
        """Validate email format."""
        email = value.lower().strip()
        # Block common disposable email domains
        disposable_domains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com']
        domain = email.split('@')[-1]
        if domain in disposable_domains:
            raise serializers.ValidationError("Please use a permanent email address.")
        return email