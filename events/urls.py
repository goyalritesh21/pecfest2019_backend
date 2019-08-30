from django.conf.urls import url

from events.views import EventByCategory, EventByType, RegisterEvent

urlpatterns = [
    url(r'^events_by_category/(?P<category_id>[-\w]+)/$', view=EventByCategory.as_view(), name='events_by_category'),
    url(r'^events_by_type/(?P<type_id>[-\w]+)/', view=EventByType.as_view(), name='events_by_type'),
    url(r'^register/(?P<event_id>[-\w]+)/', view=RegisterEvent.as_view(), name='register_event'),
]
