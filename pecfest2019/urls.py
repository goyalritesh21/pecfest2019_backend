from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
# Routers provide an easy way of automatically determining the URL conf.
from rest_framework import routers

from accounts.views import ParticipantViewSet
from events.views import EventViewSet, ClubViewSet, RegistrationViewSet, SponsorViewSet, UserViewSet, \
    EventCategoryViewSet, EventTypeViewSet
from pecfest2019 import settings

router = routers.DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'event', EventViewSet, basename='event')
router.register(r'event_category', EventCategoryViewSet, basename='eventcategory')
router.register(r'event_type', EventTypeViewSet, basename='eventtype')
router.register(r'club', ClubViewSet, basename='club')
router.register(r'registration', RegistrationViewSet, basename='registration')
router.register(r'sponsor', SponsorViewSet, basename='sponsor')
router.register(r'participant', ParticipantViewSet, basename='participant')

urlpatterns = [
                  url(r'api/auth', include('knox.urls')),
                  path('admin/', admin.site.urls),
                  url(r'^api/', include(router.urls)),
                  url(r'^events/', include('events.urls')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
