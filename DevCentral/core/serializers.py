from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Program, Media, Review, Download, Flag, Book, Author, BookCover

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
        
    def get_user_name(self, obj):
        # Return the user's name if available, otherwise return their username or email
        if hasattr(obj.user, 'name') and obj.user.name:
            return obj.user.name
        elif obj.user.get_full_name():
            return obj.user.get_full_name()
        return getattr(obj.user, 'username', obj.user.email)


class ProgramSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    media = MediaSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    rating = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    rating_count = serializers.IntegerField(read_only=True)
    download_count = serializers.IntegerField(read_only=True)
    developer = serializers.StringRelatedField(read_only=True)
    developer_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='developer', write_only=True,
        required=False
    )
    release_date = serializers.DateField(required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Program
        fields = '__all__'


class DownloadSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    program_id = serializers.PrimaryKeyRelatedField(
        queryset=Program.objects.all(), source='program', write_only=True
    )
    program = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Download
        fields = '__all__'
        read_only_fields = ['downloaded_at']


class FlagSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    program = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Flag
        fields = '__all__'
        read_only_fields = ['created_at']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField()
    author_name = serializers.CharField(source='author.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'slug' , 'author_name', 'category_id', 'category_name', 'description',
            'rating', 'cover_image', 'publish_date'
        ]


class BookCoverSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)

    class Meta:
        model = BookCover
        fields = '__all__'
