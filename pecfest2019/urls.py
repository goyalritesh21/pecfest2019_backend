from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path

# Routers provide an easy way of automatically determining the URL conf.
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [

    path('admin/', admin.site.urls),
    url(r'^route/', include('rest_framework.urls')),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include('events.urls')),

]

