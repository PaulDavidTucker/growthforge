from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_on', 'updated_on', 'published')
    list_filter = ('published', 'created_on', 'author')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_on'
    ordering = ('-created_on',)
    readonly_fields = ('created_on', 'updated_on')
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'author', 'published')
        }),
        ('Content', {
            'fields': ('content',)
        }),
        ('Metadata', {
            'fields': ('created_on', 'updated_on'),
            'classes': ('collapse',)
        }),
    )
