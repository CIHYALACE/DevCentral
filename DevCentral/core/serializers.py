from rest_framework import serializers
from .models import Game, Review, Media

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'game', 'user', 'score', 'comment', 'created_at', 'updated_at']

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'game', 'media_type', 'file', 'uploaded_at']

class GameSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'slug', 'description', 'developer', 'publisher',
            'release_date', 'price', 'category', 'rating', 'downloads',
            'icon', 'file', 'is_published', 'created_at', 'updated_at',
            'reviews', 'media'
        ]
