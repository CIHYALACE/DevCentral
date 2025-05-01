from rest_framework import viewsets, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Category, Program, Media, Review, Download, Flag, Book, Author
from .serializers import *

class StandardPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all().order_by('-created_at')
    serializer_class = ProgramSerializer
    pagination_class = StandardPagination
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Program.objects.all().order_by('-created_at')
        
        # Filter by query parameters
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        program_type = self.request.query_params.get('type', None)
        is_top_chart = self.request.query_params.get('top_chart', 'false').lower() == 'true'
        limit = self.request.query_params.get('limit', None)
        
        # Apply filters based on query parameters
        if category:
            queryset = queryset.filter(category__name=category)
            
        if search:
            queryset = queryset.filter(name__icontains=search)
            
        if program_type:
            queryset = queryset.filter(type=program_type)
        
        # Filter for published programs only for public endpoints
        queryset = queryset.filter(is_published=True)
        
        # For top charts, limit to the most recent ones
        if is_top_chart:
            queryset = queryset.order_by('-created_at', '-download_count')
            
        # Apply limit if specified
        if limit and limit.isdigit():
            queryset = queryset[:int(limit)]
            
        return queryset
        
    def list(self, request, *args, **kwargs):
        # Handle count_only parameter for pagination support
        count_only = request.query_params.get('count_only', 'false').lower() == 'true'
        
        if count_only:
            queryset = self.get_queryset()
            count = queryset.count()
            return Response({'count': count})
        
        return super().list(request, *args, **kwargs)

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ReviewPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    pagination_class = ReviewPagination
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Review.objects.all().order_by('-created_at')
        program_id = self.request.query_params.get('program', None)
        
        if program_id is not None:
            queryset = queryset.filter(program__id=program_id)
            
        return queryset
    
    def list(self, request, *args, **kwargs):
        # Handle count_only parameter for pagination support
        count_only = request.query_params.get('count_only', 'false').lower() == 'true'
        
        if count_only:
            program_id = request.query_params.get('program', None)
            queryset = self.get_queryset()
            count = queryset.count()
            return Response({'count': count})
        
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DownloadViewSet(viewsets.ModelViewSet):
    queryset = Download.objects.all().order_by('-downloaded_at')
    serializer_class = DownloadSerializer
    pagination_class = StandardPagination
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Download.objects.all().order_by('-downloaded_at')
        program_id = self.request.query_params.get('program', None)
        user_id = self.request.query_params.get('user', None)
        
        if program_id:
            queryset = queryset.filter(program__id=program_id)
            
        if user_id and self.request.user.is_authenticated:
            if str(self.request.user.id) == user_id or self.request.user.is_staff:
                queryset = queryset.filter(user__id=user_id)
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        # Handle count_only parameter for pagination support
        count_only = request.query_params.get('count_only', 'false').lower() == 'true'
        
        if count_only:
            queryset = self.get_queryset()
            count = queryset.count()
            return Response({'count': count})
        
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FlagViewSet(viewsets.ModelViewSet):
    queryset = Flag.objects.all().order_by('-created_at')
    serializer_class = FlagSerializer
    pagination_class = StandardPagination
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Flag.objects.all().order_by('-created_at')
        program_id = self.request.query_params.get('program', None)
        
        if program_id:
            queryset = queryset.filter(program__id=program_id)
            
        # Only staff can see all flags
        if not self.request.user.is_staff and self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.request.user)
            
        return queryset
    
    def list(self, request, *args, **kwargs):
        # Handle count_only parameter for pagination support
        count_only = request.query_params.get('count_only', 'false').lower() == 'true'
        
        if count_only:
            queryset = self.get_queryset()
            count = queryset.count()
            return Response({'count': count})
        
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TopChartAppViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def get_queryset(self):
        return Program.objects.filter(is_published=True).order_by('-created_at')[:10]
    
class ProductivityAppViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def get_queryset(self):
        return Program.objects.filter(category__name='Productivity')

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    lookup_field = 'id'

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['GET'])
    def similar_books(self, request, slug=None):
        """Get similar books based on category"""
        book = self.get_object()
        similar_books = Book.objects.filter(
            category=book.category
        ).exclude(
            id=book.id
        )[:6]  # Limit to 6 similar books
        serializer = self.get_serializer(similar_books, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def author_books(self, request, slug=None):
        """Get other books by the same author"""
        book = self.get_object()
        author_books = Book.objects.filter(
            author=book.author
        ).exclude(
            id=book.id
        )[:6]  # Limit to 6 books
        serializer = self.get_serializer(author_books, many=True)
        return Response(serializer.data)
