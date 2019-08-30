from django.contrib.auth.models import User
from rest_framework import serializers


def get_dynamic_serializer(cls):
    class CustomSerializer(serializers.HyperlinkedModelSerializer):
        id = serializers.IntegerField(read_only=True)

        class Meta:
            model = cls
            fields = '__all__'

    return CustomSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email']
