from django.db import models

# Create your models here.


class AppCategory(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class AppImage(models.Model):
    app = models.ForeignKey('core.App', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='app_images/')

    def __str__(self):
        return f"Image for {self.app.name}"

class App(models.Model):
    active = 'active'
    unactive = 'unactive'

    STATUS_CHOICES = [
        (active, 'Active'),
        (unactive, 'Unactive'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.ImageField(upload_to='app_icons/', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    images = models.ManyToManyField('core.AppImage', blank=True, null=True, related_name='apps')
    reviews = models.ManyToManyField('reviews.Review', blank=True, null=True, related_name='apps')
    developer = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='apps')
    catogory = models.ForeignKey(AppCategory, on_delete=models.SET_NULL, null=True, related_name="apps")
    Approximate_size = models.CharField(max_length=50, null=True, blank=True)
    install_link = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name
    