from django.contrib import admin
from subscribers.models import Subscriber

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'joined_date')
    list_filter = ('email',)
