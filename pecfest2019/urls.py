from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

# Routers provide an easy way of automatically determining the URL conf.
from rest_framework import routers

from pecfest2019 import settings

router = routers.DefaultRouter()

urlpatterns = [

    path('admin/', admin.site.urls),
    url(r'^route/', include('rest_framework.urls')),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include('events.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
