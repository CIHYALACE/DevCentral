from django.shortcuts import render
from rest_framework import viewsets
# from .models import Game, Review, Media
# from .serializers import GameSerializer, ReviewSerializer, MediaSerializer
from .models import Program, Review, Media
from .serializers import *


class TopChartAppViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def get_queryset(self):
        return Program.objects.filter(is_published=True).order_by('-created_at')[:10]
    

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Program.objects.filter(is_published=True)

class ProductivityAppViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

    def get_queryset(self):
        return Program.objects.filter(category__name='Productivity')

class GameViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.filter(type='game')
    serializer_class = ProgramSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
# Create your views here.
