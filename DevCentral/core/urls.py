from django.urls import path
from .views import *

urlpatterns = [
    path('', AppViewSet.as_view({'get': 'list'}), name='Apps'),
]