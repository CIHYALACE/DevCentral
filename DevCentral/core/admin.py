from django.contrib import admin
from .models import Program, Category, Media, Review, Book, Author

# Register your models here.
admin.site.register(Program)
admin.site.register(Category)
admin.site.register(Media)
admin.site.register(Review)
admin.site.register(Book)
admin.site.register(Author)
