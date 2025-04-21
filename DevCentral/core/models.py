from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg

User = get_user_model()

# Create your models here.

CATEGORY_CHOICES = [
    ('action', 'Action'),
    ('adventure', 'Adventure'),
    ('arcade', 'Arcade'),
    ('strategy', 'Strategy'),
    ('puzzle', 'Puzzle'),
    ('rpg', 'RPG'),
    ('simulation', 'Simulation'),
    ('sports', 'Sports'),
    ('other', 'Other'),
]

class Game(models.Model):
    title = models.CharField(max_length=255)
    # used for human-readable URLs
    slug = models.SlugField(unique=True)
    description = models.TextField()
    developer = models.CharField(max_length=255)
    publisher = models.CharField(max_length=255, blank=True, null=True)
    release_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    rating = models.FloatField(default=0.0)
    downloads = models.PositiveBigIntegerField(default=0)
    icon = models.ImageField(upload_to='games/icons/', blank=True, null=True)
    file = models.FileField(upload_to='games/files/')
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Review(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        avg = self.game.reviews.aggregate(Avg('score'))['score__avg'] or 0
        self.game.rating = avg
        self.game.save(update_fields=['rating'])

    def delete(self, *args, **kwargs):
        game = self.game
        super().delete(*args, **kwargs)
        avg = game.reviews.aggregate(Avg('score'))['score__avg'] or 0
        game.rating = avg
        game.save(update_fields=['rating'])


MEDIA_TYPE_CHOICES = [
    ('screenshot', 'Screenshot'),
    ('trailer', 'Trailer'),
    ('banner', 'Banner'),
]
class Media(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='games/media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.game.title} - {self.media_type}"
