from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author_name', 'content', 'created_on', 'published')
        lookup_field = 'slug'
