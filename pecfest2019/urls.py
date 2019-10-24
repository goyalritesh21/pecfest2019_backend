from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from accounts.views import ParticipantViewSet
from events.views import UserViewSet, EventViewSet, EventCategoryViewSet, EventTypeViewSet, ClubViewSet, \
    RegistrationViewSet, PastSponsorViewSet, NewSponsorViewSet, BrochureViewSet, TeamViewSet
from pecfest2019 import settings

# Routers provide an easy way of automatically determining the URL conf.
#
router = routers.DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'event', EventViewSet, basename='event')
router.register(r'event_category', EventCategoryViewSet, basename='eventcategory')
router.register(r'event_type', EventTypeViewSet, basename='eventtype')
router.register(r'club', ClubViewSet, basename='club')
router.register(r'registration', RegistrationViewSet, basename='registration')
router.register(r'past_sponsor', PastSponsorViewSet, basename='pastsponsor')
router.register(r'new_sponsor', PastSponsorViewSet, basename='newsponsor')
router.register(r'brochure', BrochureViewSet, basename='brochure')
router.register(r'participant', ParticipantViewSet, basename='participant')
router.register(r'teams', TeamViewSet, base_name='team')

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/auth/', include('accounts.urls')),
                  url(r'^api/', include(router.urls)),
                  url(r'^events/', include('events.urls')),
                  path('admin/portal/', include('django.contrib.auth.urls')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
