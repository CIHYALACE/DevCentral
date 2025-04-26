# from django.shortcuts import render
# from rest_framework import viewsets
# # from .models import Game, Review, Media
# # from .serializers import GameSerializer, ReviewSerializer, MediaSerializer
# from .models import Program, Review, Media
# from .serializers import *


# class TopChartAppViewSet(viewsets.ModelViewSet):
#     queryset = Program.objects.all()
#     serializer_class = ProgramSerializer

#     def get_queryset(self):
#         return Program.objects.filter(is_published=True).order_by('-created_at')[:10]
    

# class ProgramViewSet(viewsets.ModelViewSet):
#     queryset = Program.objects.all()
#     serializer_class = ProgramSerializer

#     def get_queryset(self):
#         return Program.objects.filter(is_published=True)

# class ProductivityAppViewSet(viewsets.ModelViewSet):
#     queryset = Program.objects.all()
#     serializer_class = ProgramSerializer

#     def get_queryset(self):
#         return Program.objects.filter(category__name='Productivity')

# class GameViewSet(viewsets.ModelViewSet):
#     queryset = Program.objects.filter(type='game')
#     serializer_class = ProgramSerializer

# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

# class MediaViewSet(viewsets.ModelViewSet):
#     queryset = Media.objects.all()
#     serializer_class = MediaSerializer


from rest_framework import viewsets, permissions
from .models import Category, Program, Media, Review, Download, Flag
from .serializers import *

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
<<<<<<< HEAD
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
=======
    lookup_field = 'slug'
>>>>>>> d4a2e7bc428bcff5318c4832cd545842d8ed6e1d


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DownloadViewSet(viewsets.ModelViewSet):
    queryset = Download.objects.all()
    serializer_class = DownloadSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FlagViewSet(viewsets.ModelViewSet):
    queryset = Flag.objects.all()
    serializer_class = FlagSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
