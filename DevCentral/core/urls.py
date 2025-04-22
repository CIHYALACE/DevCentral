from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register('games', GameViewSet)
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)
# router.register('productivity', ProductivityAppset)

urlpatterns = [
    path('', include(router.urls)),
    path('', AppViewSet.as_view({'get': 'list'}), name='Apps'),
    path('productivity/', ProductivityAppset.as_view({'get': 'list'}), name='ProductivityApps'),
]
