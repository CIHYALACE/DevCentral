from rest_framework import serializers
from .models import Game, Review, Media, App, AppCategory, AppImage, AppReview

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

class AppImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppImage
        fields = ['id', 'image']


class AppCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AppCategory
        fields = ['id', 'name']

class AppReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppReview
        fields = ['id', 'user', 'app', 'text', 'created_at']
        read_only_fields = ['id', 'created_at']

class AppSerializer(serializers.ModelSerializer):
    app_id = serializers.PrimaryKeyRelatedField(queryset=App.objects.all(), source='app', write_only=True)
    name = serializers.CharField(source='app.name', read_only=True)
    description = serializers.CharField(source='app.description', read_only=True)
    icon = serializers.ImageField(source='app.icon', read_only=True)
    date_created = serializers.DateTimeField(source='app.date_created', read_only=True)
    Approximate_size = serializers.CharField(source='app.Approximate_size', read_only=True)
    install_link = serializers.URLField(source='app.install_link', read_only=True)
    developer = serializers.ReadOnlyField(source='app.developer.username', read_only=True)
    images = AppImageSerializer(many=True, read_only=True)
    category = AppCategorySerializer(read_only=True)
    is_published = serializers.BooleanField(read_only=True)


    class Meta:
        model = App
        fields = ['id', 'name', 'description', 'icon', 'date_created', 'Approximate_size', 'install_link', 'developer', 'category', 'images']
        read_only_fields = ['id', 'date_created', 'Approximate_size', 'developer']
