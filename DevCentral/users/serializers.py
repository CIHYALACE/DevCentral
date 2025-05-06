from rest_framework import serializers
from .models import CustomUser, NewDeveloperRequest, UserProfile
from django.db import models

class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(required=True)  # Make email explicitly required

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'role', 'phone_number', 'picture', 'is_active', 'password']
        read_only_fields = ['id', 'is_active']  # Removed email from read_only_fields for registration

    def create(self, validated_data):
        # Print received data for debugging
        print(f"Creating user with data: {validated_data}")
        
        # Check if email is present
        if 'email' not in validated_data:
            raise serializers.ValidationError({"email": "Email field is required"})
        
        # Create user with validated data
        user = CustomUser(
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            role=validated_data.get('role', 'user'),
            phone_number=validated_data.get('phone_number', '')
        )
        
        # Set password if provided
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
        else:
            raise serializers.ValidationError({"password": "Password field is required"})
            
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = CustomUserSerializer(required=False)
    phone_number = serializers.CharField(source='user.phone_number', required=False)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "user",
            "phone_number",
            "bio",
            "location",
            "date_of_birth",
            "picture",
            "country",
            "apps_library"
        ]
        read_only_fields = ['id']
        extra_kwargs = {'location': {'required': False, 'allow_null': True}}
        
    def update(self, instance, validated_data):
        # Print received data for debugging
        print(f"Validated data: {validated_data}")
        
        # Handle phone_number field
        phone_number = validated_data.pop('phone_number', None)
        if phone_number is None and 'user' in validated_data and 'phone_number' in validated_data['user']:
            phone_number = validated_data['user'].pop('phone_number')
        
        # Remove any fields that don't exist in the model
        for field in list(validated_data.keys()):
            if field not in [f.name for f in UserProfile._meta.get_fields()] and field != 'user':
                print(f"Removing unknown field: {field}")
                validated_data.pop(field)
        
        # Update user data if present
        user_data = validated_data.pop('user', {})
        if user_data or phone_number:
            if not user_data:
                user_data = {}
            if phone_number:
                user_data['phone_number'] = phone_number
            
            if user_data:
                print(f"Updating user with data: {user_data}")
                user_serializer = CustomUserSerializer(instance.user, data=user_data, partial=True)
                user_serializer.is_valid(raise_exception=True)
                user_serializer.save()
        
        # Update profile fields
        print(f"Updating profile with data: {validated_data}")
        return super().update(instance, validated_data)
        
    def to_representation(self, instance):
        # Add phone_number to the output
        representation = super().to_representation(instance)
        if instance.user and hasattr(instance.user, 'phone_number'):
            representation['phone_number'] = instance.user.phone_number
        return representation

class DeveloperRequestSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = NewDeveloperRequest
        fields = ['id', 'user', 'comment', 'state', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        
        # Make state read-only for non-admin users
        if request and not request.user.is_staff:
            self.fields['state'].read_only = True
    
    def create(self, validated_data):
        # Get the user from the context provided by the view
        user = self.context.get('request').user
        
        # Remove state from validated_data if present (will be set to 'pending' by model)
        if 'state' in validated_data:
            validated_data.pop('state')
        
        # Create the developer request with the authenticated user
        developer_request = NewDeveloperRequest.objects.create(
            user=user,
            comment=validated_data.get('comment', '')
        )
        
        return developer_request