from django.contrib import admin
from events.models import Event, Club, Registration, Sponsor, EventType, EventCategory

admin.site.register(EventType)
admin.site.register(EventCategory)
admin.site.register(Event)
admin.site.register(Club)
admin.site.register(Sponsor)
admin.site.register(Registration)
