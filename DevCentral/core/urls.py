from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import GameViewSet, ReviewViewSet, MediaViewSet

router = DefaultRouter()
router.register('games', GameViewSet)
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]