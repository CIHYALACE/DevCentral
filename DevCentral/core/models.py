from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg
from django.contrib.auth.models import User

User = get_user_model()

# Create your models here.


TYPE_CHOICES = [
    ('app', 'App'),
    ('game', 'Game'),
    ('book', 'Book')
]

class Category(models.Model):
    name = models.CharField(max_length=100)
    related_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    
    def __str__(self):
        return self.name

class Program(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='apps')
    developer = models.CharField(max_length=200)
    release_date = models.DateField()
    last_update_date = models.DateField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    download_count = models.PositiveIntegerField(default=0)
    icon = models.ImageField(upload_to='icons/')
    download_url = models.URLField()
    # Backend data
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title

MEDIA_TYPE_CHOICES = [
    ('screenshot', 'Screenshot'),
    ('video', 'Video'),
    ('banner', 'Banner'),
]

class Media(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.program.title} - {self.media_type}"



class Review(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        avg = self.program.reviews.aggregate(Avg('score'))['score__avg'] or 0
        self.program.rating = avg
        self.program.save(update_fields=['rating'])

    def delete(self, *args, **kwargs):
        program = self.program
        super().delete(*args, **kwargs)
        avg = program.reviews.aggregate(Avg('score'))['score__avg'] or 0
        program.rating = avg
        program.save(update_fields=['rating'])


MEDIA_TYPE_CHOICES = [
    ('screenshot', 'Screenshot'),
    ('trailer', 'Trailer'),
    ('banner', 'Banner'),
]
class Media(models.Model):
    game = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='games/media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.game.title} - {self.media_type}"
class AppCategory(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class AppImage(models.Model):
    app = models.ForeignKey('core.App', on_delete=models.CASCADE, related_name='app_images')
    image = models.ImageField(upload_to='app_images/')

    def __str__(self):
        return f"Image for {self.app.name}"

class AppReview(models.Model):
    app = models.ForeignKey('core.App', on_delete=models.CASCADE, related_name='app_reviews')
    rate = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return f"Review for {self.app.name}"

class App(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.ImageField(upload_to='app_icons/', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    images = models.ManyToManyField(AppImage, blank=True, null=True, related_name='apps')
    reviews = models.ManyToManyField(AppReview, blank=True, null=True, related_name='apps')
    developer = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='apps')
    catogory = models.ForeignKey(AppCategory, on_delete=models.SET_NULL, null=True, related_name="apps")
    Approximate_size = models.CharField(max_length=50, null=True, blank=True)
    install_link = models.URLField(null=True, blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class DeveloperProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


