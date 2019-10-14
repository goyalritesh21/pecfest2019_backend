from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field

from accounts.models import Participant, Team


class ParticipateResource(resources.ModelResource):

    username = Field(attribute='user__username', column_name='PECFest ID')
    firstName = Field(attribute='user__first_name', column_name='First Name')
    lastName = Field(attribute='user__last_name', column_name='Last Name')
    email = Field(attribute='user__email', column_name="Email ID")
    contactNumber = Field(attribute='contactNumber', column_name='Contact Number')
    accommodation = Field(attribute='accommodation', column_name='Accommodation Required Status')
    college = Field(attribute='college', column_name='College')
    address = Field(attribute='address', column_name='Residential Address')
    yearOfStudy = Field(attribute='yearOfStudy', column_name='Year of Study')

    class Meta:
        model = Participant
        fields = (
            'username',
            'firstName',
            'lastName',
            'email',
            'contactNumber',
            'accommodation',
            'college',
            'address',
            'yearOfStudy',
        )


class ParticipateAdmin(ImportExportModelAdmin):
    resource_class = ParticipateResource
    search_fields = ('user__first_name', 'user__last_name', 'user__username')


admin.site.register(Participant, ParticipateAdmin)
admin.site.register(Team)
