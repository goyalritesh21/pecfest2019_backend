from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from accounts.models import Participant


#user serializer
class UserSerializer(serializers.ModelSerializer):

    participant = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email','first_name', 'last_name', 'participant')

    def get_participant(self, obj):
        data = ParticipantSerializer(obj.user).data
        return data


#Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


#Profile Info Serializer
class ParticipantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ('contactNumber', 'accommodation', 'college', 'address', 'yearOfStudy', 'gender', 'firstTimer')


#Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active :
            return user
        raise serializers.ValidationError("Incorrect Credentials")
