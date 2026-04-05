from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError


def validate_image_size(value):
    """Validate that image file size is under 5MB."""
    limit = 5 * 1024 * 1024  # 5MB
    if value.size > limit:
        raise ValidationError('File too large. Size should not exceed 5MB.')


class CaseStudy(models.Model):
    title = models.CharField(max_length=200)
    client_name = models.CharField(max_length=100)
    problem = models.TextField()
    solution = models.TextField()
    results = models.TextField(help_text="e.g., '40% increase in sales'")
    image = models.ImageField(
        upload_to='casestudies/',
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp']),
            validate_image_size
        ],
        help_text="Upload an image (JPG, PNG, or WebP, max 5MB)"
    )
    published_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Case Study"
        verbose_name_plural = "Case Studies"
        ordering = ['-published_date']

    def __str__(self): # type: ignore
        return self.title