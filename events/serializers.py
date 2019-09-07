from django.contrib.auth.models import User
from rest_framework import serializers

from accounts.serializers import ParticipantSerializer
from events.models import Event, EventType, EventCategory


def get_dynamic_serializer(cls):
    class CustomSerializer(serializers.HyperlinkedModelSerializer):
        id = serializers.IntegerField(read_only=True)

        class Meta:
            model = cls
            fields = '__all__'

    return CustomSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):

    participant = ParticipantSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'participant')


class EventCategorySerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = EventCategory
        fields = '__all__'


class EventTypeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    eventCategory = EventCategorySerializer(read_only=True)

    class Meta:
        model = EventType
        fields = '__all__'


class EventSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    coordinators = UserSerializer(many=True, read_only=True)
    eventType = EventTypeSerializer(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
