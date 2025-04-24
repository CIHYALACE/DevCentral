from django.shortcuts import redirect
from rest_framework import viewsets
from .models import CustomUser, UserProfile
from .serializers import CustomUserSerializer, UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser


class CustomUserViewSet(viewsets.ModelViewSet):
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
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Add any custom filtering or ordering logic here if needed
        return queryset
    
    def perform_create(self, serializer):
        # Custom logic before saving the user profile instance
        serializer.save()


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

