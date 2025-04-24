from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, UserProfileViewSet, activate_redirect, DeleteAccountView

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')  # Register first
router.register(r'', CustomUserViewSet, basename='user')  # Register after

urlpatterns = [
    path('', include(router.urls)),
    path('activate/<str:uid>/<str:token>', activate_redirect),
]
