import django_filters

from events.models import Event, EventCategory


def get_choices():
    EVENT_CATEGORY_CHOICES = [(ec.id, ec.name) for ec in EventCategory.objects.all()]
    return EVENT_CATEGORY_CHOICES


class EventFilter(django_filters.FilterSet):
    eventCategory = django_filters.ChoiceFilter(label='Event Category',
                                                method='filter_event_category',
                                                choices=get_choices)

    class Meta:
        model = Event
        fields = ['eventType', 'eventCategory']

    def filter_event_category(self, queryset, name, value):
        return queryset.filter(eventType__category_id=value)
