from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


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
    