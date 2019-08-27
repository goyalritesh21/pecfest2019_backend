from django.contrib.auth.models import User
from rest_framework import serializers

from events.models import Event


def get_dynamic_serializer(cls):
    class CustomSerializer(serializers.HyperlinkedModelSerializer):
        class Meta:
            model = cls
            fields = '__all__'

    return CustomSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email']


class EventSerializer(serializers.HyperlinkedModelSerializer):
    # coordinators = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ['url', 'id', 'name']
