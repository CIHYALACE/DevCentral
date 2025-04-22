from django.shortcuts import render
from rest_framework import viewsets
# from .models import Game, Review, Media
# from .serializers import GameSerializer, ReviewSerializer, MediaSerializer
from .models import *
from .serializers import *


class TopChartAppViewSet(viewsets.ModelViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(is_published=True).order_by('-date_created')[:10]
    

class AppViewSet(viewsets.ModelViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(is_published=True)

class ProductivityAppViewSet(viewsets.ModelViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(catogory__name='Productivity')

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
# Create your views here.
