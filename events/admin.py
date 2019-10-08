from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
from simple_history.admin import SimpleHistoryAdmin

from events.models import Event, Club, Registration, Sponsor, EventType, EventCategory, Brochure, DetailWinner, \
    TeamWinner, Winners


class RegistrationResource(resources.ModelResource):

    eventName = Field(attribute='registered_event__name', column_name='Event Name')
    teamName = Field(attribute='team__name', column_name='Name of the team')
    team = Field(column_name='Team members')
    username = Field(attribute='team_leader__username', column_name='Team Leader PECFest ID')
    firstName = Field(attribute='team_leader__first_name', column_name='First Name of Leader')
    lastName = Field(attribute='team_leader__last_name', column_name='Last Name of Leader')
    email = Field(attribute='team_leader__email', column_name="Email ID of Leader")
    contactNumber = Field(attribute='team_leader__participant__contactNumber', column_name='Contact Number of Leader')

    def dehydrate_team(self, registration):

        listOfMembers = []
        members = registration.team.members.all()
        for member in members:
            listOfMembers.append(member.username)

        return ', '.join(listOfMembers)

    class Meta:
        model = Registration
        fields = (
            'eventName',
            'teamName',
            'team',
            'username',
            'firstName',
            'lastName',
            'email',
            'contactNumber',

        )


class RegistrationAdmin(ImportExportModelAdmin):
    resource_class = RegistrationResource
    list_filter = (
        'registered_event__association',
        'registered_event__eventType__eventCategory',
        'registered_event__eventType',
        'registered_event__name',
         )


class DetailWinnerAdmin( SimpleHistoryAdmin):
    search_fields = ['user__username']


admin.site.register(EventType)
admin.site.register(EventCategory)
admin.site.register(Event, SimpleHistoryAdmin)
admin.site.register(Club)
admin.site.register(Sponsor)
admin.site.register(Brochure)
admin.site.register(Registration, RegistrationAdmin)
admin.site.register(TeamWinner, SimpleHistoryAdmin)
admin.site.register(DetailWinner, DetailWinnerAdmin)
admin.site.register(Winners, SimpleHistoryAdmin)

