# backend/subscribers/serializers.py
import re
from rest_framework import serializers
from .models import Subscriber


class SubscriberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Subscriber
        fields = ('id', 'email', 'joined_date')
        read_only_fields = ('joined_date',)

    def validate_email(self, value):
        """Validate email format and block disposable domains."""
        email = value.lower().strip()
        
        # Basic email validation regex
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            raise serializers.ValidationError("Please enter a valid email address.")
        
        # Block common disposable email domains
        disposable_domains = [
            'tempmail.com', '10minutemail.com', 'guerrillamail.com',
            'mailinator.com', 'yopmail.com', 'temp-mail.org'
        ]
        domain = email.split('@')[-1]
        if domain in disposable_domains:
            raise serializers.ValidationError("Please use a permanent email address.")
        
        return email