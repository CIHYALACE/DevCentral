from django.shortcuts import render
from rest_framework import viewsets
from .models import Game, Review, Media
from .serializers import GameSerializer, ReviewSerializer, MediaSerializer
from .models import *
from rest_framework import viewsets
from .serializers import *

class AppViewSet(viewsets.ModelViewSet):
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(is_published=True)

class ProductivityAppset(viewsets.ModelViewSet):
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(catogory__name='Productivity')

# Create your views here.

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
