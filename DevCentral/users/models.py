from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator

role_choices = [
    ('admin', 'Admin'),
    ('user', 'User'),
    ('developer', 'Developer'),
]
class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self._create_user(email, password, **extra_fields)

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
    objects = CustomUserManager()


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    apps_library = models.ManyToManyField('core.Program', blank=True, related_name='users')
