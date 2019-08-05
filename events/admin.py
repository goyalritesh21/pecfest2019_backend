from django.contrib import admin
from events.models import event, club, registration

admin.site.register(event)
admin.site.register(club)
admin.site.register(registration)
