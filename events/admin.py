from django.contrib import admin
from events.models import event, club, registration, sponsor

admin.site.register(event)
admin.site.register(club)
admin.site.register(sponsor)
admin.site.register(registration)
