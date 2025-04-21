from django.shortcuts import render
<<<<<<< HEAD
from .models import *
from rest_framework import viewsets
from .serializers import *

class AppViewSet(viewsets.ModelViewSet):
    serializer_class = AppSerializer

    def get_queryset(self):
        return App.objects.filter(is_published=True)
    
=======
>>>>>>> parent of 1e6eff0 (Merge branch 'master' of github.com:CIHYALACE/DevCentral)

# Create your views here.
