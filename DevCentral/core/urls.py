<<<<<<< HEAD
from django.urls import path
from .views import *

urlpatterns = [
    path('', AppViewSet.as_view({'get': 'list'}), name='Apps'),
]
=======
>>>>>>> parent of 1e6eff0 (Merge branch 'master' of github.com:CIHYALACE/DevCentral)
