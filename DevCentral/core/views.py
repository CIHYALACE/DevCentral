from rest_framework import viewsets, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import FileResponse
from django.utils.text import slugify
from .models import Category, Program, Media, Review, Download, Flag, Book, Author
from .serializers import *
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

class StandardPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset.filter(related_type=self.request.query_params.get('related_type', 'app'))

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all().order_by('-created_at')
    serializer_class = ProgramSerializer
    pagination_class = StandardPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def published(self, request):
        """Get programs published by the current user"""
        # Get programs where the current user is the developer
        queryset = Program.objects.filter(developer=request.user).order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
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
            queryset = queryset.filter(title__icontains=search)
            
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

    def create(self, request, *args, **kwargs):
        # Make request.data mutable if it's immutable
        if hasattr(request.data, '_mutable'):
            request.data._mutable = True
        
        # Set release_date to current date if not provided
        if 'release_date' not in request.data or not request.data['release_date']:
            request.data['release_date'] = datetime.now().date()
        
        # Handle empty slug
        if 'slug' in request.data and request.data['slug'] == "":
            slug = slugify(request.data['title'])
            if Program.objects.filter(slug=slug).exists():
                slug = slugify(request.data['title'] + str(request.user.id))
            request.data['slug'] = slug
        
        return super().create(request, *args, **kwargs)
        
    def perform_create(self, serializer):
        # This is the recommended way to set the developer in DRF
        serializer.save(developer=self.request.user)
        

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Media.objects.all()
        
        # Filter by program
        program_id = self.request.query_params.get('program', None)
        if program_id:
            queryset = queryset.filter(program__id=program_id)
            
        # Filter by media type
        media_type = self.request.query_params.get('media_type', None)
        if media_type:
            queryset = queryset.filter(media_type=media_type)
            
        return queryset
    
    def perform_create(self, serializer):
        # Save the media and associate it with the program
        serializer.save()

class ReviewPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    pagination_class = ReviewPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
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
    permission_classes = [permissions.IsAuthenticated]
    
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
    permission_classes = [permissions.IsAuthenticated]
    
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
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def new_releases(self, request):
        """Get books published in the last 90 days."""
        recent_date = datetime.now().date() - timedelta(days=90)
        books = Book.objects.filter(publish_date__gte=recent_date)
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def self_help(self, request):
        """Get books in the 'Self-help' category."""
        books = Book.objects.filter(category__name__iexact='Self-help')
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def business(self, request):
        """Get books in the 'Business' category."""
        books = Book.objects.filter(category__name__iexact='Business')
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        book = self.get_object()
        pdf_path = f'media/pdfs/{book.slug}.pdf'  # Adjust the path as needed
        try:
            return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')
        except FileNotFoundError:
            return Response({'error': 'PDF not found'}, status=404)

    @action(detail=False, methods=['get'])
    def similar(self, request):
        """Get books similar to the given category name."""
        category_name = request.query_params.get('categoryName')
        if not category_name:
            return Response(
                {"error": "categoryName query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Fetch books in the same category by name, excluding the current book if provided
            exclude_book_id = request.query_params.get('excludeBookId')
            similar_books = Book.objects.filter(category__name=category_name)
            if exclude_book_id:
                similar_books = similar_books.exclude(id=exclude_book_id)
            
            # Serialize the results
            serializer = self.get_serializer(similar_books[:10], many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        book_id = request.data.get('book_id')
        if not book_id:
            return Response({'error': 'Book ID is required'}, status=400)
        book = Book.objects.get(id=book_id)
        request.user.wishlist.books.add(book)
        return Response({'message': 'Book added to wishlist'})

class AdminDashboardView(APIView):
    """
    API endpoint for admin dashboard statistics.
    Only accessible to admin users.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request):
        # Get counts for dashboard statistics
        User = get_user_model()
        
        # Count total programs
        total_programs = Program.objects.count()
        
        # Count active users (users who have logged in within the last 30 days)
        thirty_days_ago = datetime.now() - timedelta(days=30)
        active_users = User.objects.filter(last_login__gte=thirty_days_ago).count()
        
        # Count total reviews
        total_reviews = Review.objects.count()
        
        # Count categories
        categories_count = Category.objects.count()
        
        # Return the statistics
        return Response({
            'totalPrograms': total_programs,
            'activeUsers': active_users,
            'totalReviews': total_reviews,
            'categories': categories_count
        })
