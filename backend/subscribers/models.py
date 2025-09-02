# backend/subscribers/models.py
from django.db import models

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    joined_date = models.DateTimeField(auto_now_add=True)

    def __str__(self): # type: ignore
        return self.email
