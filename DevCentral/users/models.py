from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

role_choices = [
    ('admin', 'Admin'),
    ('user', 'User'),
    ('developer', 'Developer'),
]

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    name = models.CharField(max_length=255, blank=False, null=False)
    role = models.CharField(max_length=50, choices=role_choices, default='user')
    phone_number = models.CharField(blank=True, null=True, unique=True, max_length=11,
                    validators=[RegexValidator(
                                        regex=r'^01\d{9}$',
                                        message="Phone number must be 11 digits and start with '01'.",
                                        code='invalid_phone_number'
                                    )
                                ])
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    apps_library = models.ManyToManyField('core.Program', blank=True, null=True, related_name='users')

# Create your models here.
