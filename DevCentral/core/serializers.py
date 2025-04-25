from rest_framework import serializers
from .models import Review, Media, Program, Category

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'program', 'user', 'score', 'comment', 'created_at', 'updated_at']

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'program', 'media_type', 'file', 'uploaded_at']

class ProgramSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = [
            'id', 'title', 'slug', 'description', 'developer', 
            'release_date', 'last_update_date', 'price', 'category', 'rating', 'download_count',
            'icon', 'download_url', 'is_published', 'created_at', 'updated_at',
            'reviews', 'media', 'type'
        ]




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'related_type']


