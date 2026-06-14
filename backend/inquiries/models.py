from django.db import models

class Inquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): # type: ignore
        return self.email


class OnboardingSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    business_name = models.CharField(max_length=200, blank=True)
    current_website = models.URLField(blank=True)
    branding_notes = models.TextField(blank=True)
    colour_preferences = models.TextField(blank=True)
    layout_pages = models.TextField(blank=True)
    font_preferences = models.TextField(blank=True)
    image_notes = models.TextField(blank=True)
    additional_features = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): # type: ignore
        return f"{self.business_name or self.name} - {self.email}"
