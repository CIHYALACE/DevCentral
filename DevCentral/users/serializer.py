from rest_framework import serializers
from .models import CustomUser, UserProfile

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'role', 'phone_number', 'picture', 'is_active']
        read_only_fields = ['id', 'is_active']

class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'location', 'date_of_birth', 'picture', 'country', 'apps_library']
        read_only_fields = ['id', 'user']