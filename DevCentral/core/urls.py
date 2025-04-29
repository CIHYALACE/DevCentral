from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register('', ProgramViewSet, basename="programs")
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

