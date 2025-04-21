from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializers import *

class AppViewSet(viewsets.ModelViewSet):
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(is_published=True)
    

