from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register('games', GameViewSet)
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)
router.register('top-chart-apps', TopChartAppViewSet)
router.register('productivity', ProductivityAppViewSet, basename='productivity')

urlpatterns = [
    path('', include(router.urls)),
    path('', AppViewSet.as_view({'get': 'list'}), name='Apps'),
]

