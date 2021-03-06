from django.contrib.auth.models import User
from knox.models import AuthToken
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from accounts.models import Participant
from events.serializers import UserSerializer
from .serializers import RegisterSerializer, LoginSerializer, ParticipantSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        participant = Participant.objects.create()
        participant.user = user
        participant.save()

        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        if not Participant.objects.filter(user=user).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# More User Info
class UserRegisterAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ParticipantSerializer

    def post(self, request, *args, **kwargs):

        data = request.data
        user = User.objects.get(pk=data['id'])
        participant = Participant.objects.get(user=user)
        for key in data.keys():
            if key != "id":
                val = data[key]
                if key == "accommodation" or key == "firstTimer":
                    if data[key] == "false":
                        val = False
                    elif data[key] == "true":
                        val = True
                setattr(participant, str(key), val)
                participant.save()
        user.first_name = data['firstName']
        user.last_name = data['lastName']
        user.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })
