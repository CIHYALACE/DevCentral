from django.shortcuts import redirect
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from djoser.views import UserViewSet

from .models import CustomUser, UserProfile
from .serializers import CustomUserSerializer, UserProfileSerializer


class CustomUserViewSet(UserViewSet, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        # Add any custom filtering or ordering logic here if needed
        return queryset
    
    def perform_create(self, serializer):
        # Custom logic before saving the user instance
        serializer.save()

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Add any custom filtering or ordering logic here if needed
        return queryset
    
    def perform_create(self, serializer):
        # Custom logic before saving the user profile instance
        serializer.save()
        
    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        # Print debug information
        print(f"User authenticated: {request.user.is_authenticated}")
        print(f"User: {request.user}")
        print(f"Auth: {request.auth}")
        print(f"Content-Type: {request.content_type}")
        print(f"Request data: {request.data}")
        
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            # Create a new profile for the user if it doesn't exist
            profile = UserProfile(user=request.user)
            profile.save()
        
        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        else:  # PUT or PATCH
            # Handle phone_number separately if it exists in the request
            data = request.data.copy()
            phone_number = data.pop('phone_number', None)
            
            # Update user's phone number if provided
            if phone_number:
                user = request.user
                user.phone_number = phone_number
                user.save()
            
            # Remove any fields that don't exist in the UserProfile model
            valid_fields = [f.name for f in UserProfile._meta.get_fields()]
            for field in list(data.keys()):
                if field not in valid_fields and field != 'user':
                    print(f"Removing invalid field: {field}")
                    data.pop(field)
            
            serializer = self.get_serializer(profile, data=data, partial=True)
            
            try:
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data)
            except Exception as e:
                print(f"Error updating profile: {str(e)}")
                return Response({"error": str(e)}, status=400)
                
    @action(detail=False, methods=['get'])
    def apps_library(self, request):
        """Get the current user's apps library"""
        try:
            # Get the current user's profile
            try:
                profile = UserProfile.objects.get(user=request.user)
            except UserProfile.DoesNotExist:
                # Create a new profile for the user if it doesn't exist
                profile = UserProfile(user=request.user)
                profile.save()
            
            # Get the apps from the profile
            apps = profile.apps_library.all()
            
            # Import the serializer here to avoid circular imports
            from core.serializers import ProgramSerializer
            
            # Serialize the apps
            serializer = ProgramSerializer(apps, many=True)
            
            return Response(serializer.data)
        except Exception as e:
            print(f"Error fetching apps library: {str(e)}")
            # Return empty list instead of error for better UX
            return Response([], status=200)


class DeleteAccountView(APIView):
    def delete(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response({"message": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

def activate_redirect(request, uid, token):
    return redirect('http://localhost:5173/')


def activate_user(request, uid, token):
    try:
        user = get_user_model().objects.get(id=uid)
    except get_user_model().DoesNotExist:
        raise Http404("User not found")
    
    if default_token_generator.check_token(user, token):
        # Activate the user account (e.g. setting `user.is_active = True`)
        user.is_active = True
        user.save()
    else:
        raise Http404("Invalid token")


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def auth_test(request):
    """Test endpoint to verify authentication is working"""
    return Response({
        'message': 'Authentication successful',
        'user_id': request.user.id,
        'email': request.user.email,
        'auth_type': str(type(request.auth))
    })