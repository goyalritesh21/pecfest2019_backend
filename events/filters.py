import django_filters

from events.models import Event, EventCategory

EVENT_CATEGORY_CHOICES = [(ec.id, ec.name) for ec in EventCategory.objects.all()]


class EventFilter(django_filters.FilterSet):
    eventCategory = django_filters.ChoiceFilter(label='Event Category',
                                                method='filter_event_category',
                                                choices=EVENT_CATEGORY_CHOICES)

    class Meta:
        model = Event
        fields = ['eventType', 'eventCategory']

    def filter_event_category(self, queryset, name, value):
        return queryset.filter(eventType__category_id=value)
