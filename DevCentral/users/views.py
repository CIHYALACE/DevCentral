from django.shortcuts import redirect
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from djoser.views import UserViewSet

from .models import CustomUser, NewDeveloperRequest, UserProfile
from .serializers import CustomUserSerializer, DeveloperRequestSerializer, UserProfileSerializer


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

class DeveloperRequestViewSet(viewsets.ModelViewSet):
    queryset = NewDeveloperRequest.objects.all()
    serializer_class = DeveloperRequestSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        """Set custom permissions for different actions"""
        if self.action in ['list', 'change_state', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        """Create a new developer request for the authenticated user"""
        user = request.user
        
        # Check if the user already has a pending request
        if NewDeveloperRequest.objects.filter(user=user).exists():
            return Response(
                {"error": "You have already requested to be a developer."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create a new serializer with the request data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def change_state(self, request):
        """Change the state of a developer request (admin only)"""
        user_id = request.data.get('user_id')
        new_state = request.data.get('state')
        
        if not user_id or not new_state:
            return Response(
                {"error": "Both user_id and state are required."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            developer_request = NewDeveloperRequest.objects.get(user_id=user_id)
            developer_request.state = new_state
            developer_request.save()
            # change the user role if the request is approved
            if new_state == 'approved':
                user = CustomUser.objects.get(id=user_id)
                user.role = 'developer'
                user.save()
            # revert if the request is rejected
            elif new_state == 'rejected':
                user = CustomUser.objects.get(id=user_id)
                user.role = 'user'
                user.save()
            # Return the updated developer request
            serializer = self.get_serializer(developer_request)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except NewDeveloperRequest.DoesNotExist:
            return Response(
                {"error": "Developer request not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )