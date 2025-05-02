from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, UserProfileViewSet, activate_redirect, DeleteAccountView, auth_test
from users import views


router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')  # Register first
router.register(r'', CustomUserViewSet, basename='user')  # Register after

# Create a separate router for the me endpoint to avoid conflicts
profile_router = DefaultRouter()
profile_router.register(r'profiles/me', UserProfileViewSet, basename='profile-me')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(profile_router.urls)),
    path('users/activate/<str:uid>/<str:token>/', views.activate_user, name='activate_user'),
    path('auth-test/', auth_test, name='auth_test'),
]
