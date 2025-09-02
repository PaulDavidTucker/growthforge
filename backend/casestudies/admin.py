from django.contrib import admin
from .models import CaseStudy

@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'client_name', 'published_date', 'results')
    list_filter = ('published_date', 'client_name')
    search_fields = ('title', 'client_name', 'problem', 'solution', 'results')
    date_hierarchy = 'published_date'
    ordering = ('-published_date',)
    readonly_fields = ('published_date',)
    fieldsets = (
        (None, {
            'fields': ('title', 'client_name', 'image')
        }),
        ('Case Study Details', {
            'fields': ('problem', 'solution', 'results')
        }),
        ('Metadata', {
            'fields': ('published_date',),
            'classes': ('collapse',)
        }),
    )
