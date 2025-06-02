from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import CustomUserViewSet, DeveloperRequestViewSet, UserProfileViewSet, activate_redirect, DeleteAccountView
from core.authentication import CustomTokenObtainPairSerializer
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
    path('auth/jwt/create/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    # path('developer-requests/', DeveloperRequestViewSet.as_view({'get': 'list', 'post': 'create'}), name='developer-requests'),
]
