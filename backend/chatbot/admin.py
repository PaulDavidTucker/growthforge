from django.contrib import admin

# Register your models here.
from .models import ChatSession, Client

admin.site.register(Client)
admin.site.register(ChatSession)
