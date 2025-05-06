from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser  # Replace with your user model if named differently

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Customize the admin display if needed
    list_display = ('username', 'email', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('email',)
