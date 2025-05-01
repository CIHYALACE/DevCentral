from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BookViewSet, AuthorViewSet, ProgramViewSet, ReviewViewSet, MediaViewSet

router = DefaultRouter()
router.register('programs', ProgramViewSet, basename="programs")  # Explicitly name the route
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)
router.register('books', BookViewSet, basename='book')  # Ensure books route is registered
router.register('authors', AuthorViewSet, basename='author')

urlpatterns = [
    path('', include(router.urls)),
]

# GET /api/books/ - List all books
# GET /api/books/{slug}/ - Get book details
# GET /api/books/{slug}/similar_books/ - Get similar books
# GET /api/books/{slug}/author_books/ - Get other books by the same author
# GET /api/authors/ - List all authors
# GET /api/authors/{id}/ - Get author details