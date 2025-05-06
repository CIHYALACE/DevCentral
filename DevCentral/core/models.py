from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg
from django.conf import settings

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
    # developer = models.CharField(max_length=200)
    developer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='programs')

    release_date = models.DateField()
    last_update_date = models.DateField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    rating_count = models.PositiveIntegerField(default=0)
    rating_count = models.PositiveIntegerField(default=0)
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
        is_new = self.pk is None  # Check if this is a new review
        super().save(*args, **kwargs)
        
        
        # Update rating average
        avg = self.program.reviews.aggregate(Avg('score'))['score__avg'] or 0
        self.program.rating = avg
        
        
        # Update rating count if this is a new review
        if is_new:
            self.program.rating_count += 1
        
        # Save the program with updated fields
        self.program.save(update_fields=['rating', 'rating_count'])

    def delete(self, *args, **kwargs):
        program = self.program
        super().delete(*args, **kwargs)
        
        # Update rating average
        avg = program.reviews.aggregate(Avg('score'))['score__avg'] or 0
        program.rating = avg
        

        
        # Decrease rating count
        if program.rating_count > 0:
            program.rating_count -= 1
        
        # Save the program with updated fields
        program.save(update_fields=['rating', 'rating_count'])


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

class Download(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='downloads')
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='downloads')
    downloaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} downloaded {self.program.title} on {self.downloaded_at.strftime('%Y-%m-%d %H:%M:%S')}"
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None  # Check if this is a new download
        super().save(*args, **kwargs)
        
        # Increment download count if this is a new download
        if is_new:
            # Update download count
            self.program.download_count += 1
            self.program.save(update_fields=['download_count'])
            
            # Add to user's app library if not already there
            try:
                user_profile = self.user.profile
                if not user_profile.apps_library.filter(id=self.program.id).exists():
                    user_profile.apps_library.add(self.program)
            except Exception as e:
                # Log the error but don't prevent the download from being recorded
                print(f"Error adding program to user library: {e}")
    
    def delete(self, *args, **kwargs):
        program = self.program
        super().delete(*args, **kwargs)
        
        # Decrease download count
        if program.download_count > 0:
            program.download_count -= 1
            program.save(update_fields=['download_count'])

    class Meta:
        ordering = ['-downloaded_at']
        unique_together = ('user', 'program', 'downloaded_at')

class Flag(models.Model):
    REASON_CHOICES = [
        ('inappropriate', 'Inappropriate Content'),
        ('bug', 'Bug or Crash'),
        ('spam', 'Spam or Scam'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='flags')
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='flags')
    reason = models.CharField(max_length=50, choices=REASON_CHOICES)
    description = models.TextField(blank=True)  # Optional extra info
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} flagged {self.program.title} for {self.get_reason_display()}"

    class Meta:
        ordering = ['-created_at']
        unique_together = ('user', 'program')

class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    profile_picture = models.ImageField(upload_to='authors/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='books')
    description = models.TextField()
    cover_image = models.ImageField(upload_to='book_covers/' , blank=True, null=True)
    publish_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-publish_date']

class BookCover(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='covers')
    image = models.ImageField(upload_to='book_covers/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.book.title} - Cover"
