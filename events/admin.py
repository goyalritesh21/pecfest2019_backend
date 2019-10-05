from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
from simple_history.admin import SimpleHistoryAdmin

from events.models import Event, Club, Registration, Sponsor, EventType, EventCategory, Brochure, DetailWinner, \
    TeamWinner, Winners


class RegistrationResource(resources.ModelResource):

    eventName = Field(attribute='registered_event__name', column_name='Event Name')
    username = Field(attribute='participant__username', column_name='Username')
    firstName = Field(attribute='participant__first_name', column_name='First Name')
    lastName = Field(attribute='participant__last_name', column_name='Last Name')
    email = Field(attribute='participant__email', column_name="Email ID")
    contactNumber = Field(attribute='participant__participant__contactNumber', column_name='Contact Number')
    college = Field(attribute='participant__participant__college', column_name='College')

    class Meta:
        model = Registration
        fields = (
            'eventName',
            'username',
            'firstName',
            'lastName',
            'email',
            'contactNumber',
            'college',

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

