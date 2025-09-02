from django.db import models

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    quote = models.TextField()
    rating = models.PositiveIntegerField(default=5, help_text="Rating from 1 to 5") # type: ignore
    is_visible = models.BooleanField(default=True) # type: ignore

    def __str__(self):
        return f"{self.client_name} - {self.company}"
