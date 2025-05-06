from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    BookViewSet, AuthorViewSet, ProgramViewSet, ReviewViewSet, MediaViewSet,
    AdminDashboardView, WishlistView, CategoryViewSet, DownloadViewSet, FlagViewSet,
    TopChartAppViewSet, ProductivityAppViewSet
)

router = DefaultRouter()
router.register('programs', ProgramViewSet, basename="programs")  # Explicitly name the route
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)
router.register('books', BookViewSet, basename='book')  # Ensure books route is registered
router.register('authors', AuthorViewSet, basename='author')
router.register('categories', CategoryViewSet)
router.register('downloads', DownloadViewSet)
router.register('flags', FlagViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('top-charts/', TopChartAppViewSet.as_view({'get': 'list'}), name='top-charts'),
    path('productivity-apps/', ProductivityAppViewSet.as_view({'get': 'list'}), name='productivity-apps'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    # Admin endpoints
    path('admin/dashboard/stats/', AdminDashboardView.as_view(), name='admin-dashboard-stats'),
]

# GET /api/books/ - List all books
# GET /api/books/{slug}/ - Get book details
# GET /api/books/{slug}/similar_books/ - Get similar books
# GET /api/books/{slug}/author_books/ - Get other books by the same author
# GET /api/authors/ - List all authors
# GET /api/authors/{id}/ - Get author details