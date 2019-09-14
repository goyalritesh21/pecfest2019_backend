from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from events.models import Event, Club, Registration, Sponsor, EventType, EventCategory, Brochure

admin.site.register(EventType)
admin.site.register(EventCategory)
admin.site.register(Event, SimpleHistoryAdmin)
admin.site.register(Club)
admin.site.register(Sponsor)
admin.site.register(Brochure)
admin.site.register(Registration)
