from django.contrib import admin
from .models import Inquiry, OnboardingSubmission

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'created_at')


@admin.register(OnboardingSubmission)
class OnboardingSubmissionAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'name', 'email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'business_name', 'layout_pages')
    readonly_fields = (
        'name', 'email', 'business_name', 'current_website', 'branding_notes',
        'colour_preferences', 'layout_pages', 'font_preferences', 'image_notes',
        'additional_features', 'created_at'
    )
