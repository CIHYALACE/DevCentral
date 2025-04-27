from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, UserProfileViewSet, activate_redirect, DeleteAccountView
from users import views


router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')  # Register first
router.register(r'', CustomUserViewSet, basename='user')  # Register after

urlpatterns = [
    path('', include(router.urls)),
    path('users/activate/<str:uid>/<str:token>/', views.activate_user, name='activate_user'),
]
