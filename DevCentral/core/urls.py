from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register('games', GameViewSet)
router.register('reviews', ReviewViewSet)
router.register('media', MediaViewSet)
router.register('top-chart-apps', TopChartAppViewSet, basename="top-charts")
router.register('productivity', ProductivityAppViewSet, basename="productivity")

urlpatterns = [
    path('', include(router.urls)),
    path('', ProgramViewSet.as_view({'get': 'list'}), name='Apps'),
    path('<str:slug>/', ProgramViewSet.as_view({'get': 'retrieve'}), name='AppDetails')
]

