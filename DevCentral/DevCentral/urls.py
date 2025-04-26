"""
URL configuration for DevCentral project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include , include , re_path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from core.views import *

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'programs', ProgramViewSet)
router.register(r'media', MediaViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'downloads', DownloadViewSet)
router.register(r'flags', FlagViewSet)

urlpatterns = [
    path('usingViewset/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('apps/', include('core.urls')),
    # path('users/', include('users.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
