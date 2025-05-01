from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *
from .views import BookViewSet, AuthorViewSet

router = DefaultRouter()
router.register('', ProgramViewSet, basename="programs")
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)
router.register(r'books', BookViewSet, basename='book')
router.register(r'authors', AuthorViewSet, basename='author')

urlpatterns = [
    path('', include(router.urls)),
]

# GET /api/books/ - List all books
# GET /api/books/{slug}/ - Get book details
# GET /api/books/{slug}/similar_books/ - Get similar books
# GET /api/books/{slug}/author_books/ - Get other books by same author
# GET /api/authors/ - List all authors
# GET /api/authors/{id}/ - Get author details