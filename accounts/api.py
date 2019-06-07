from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from accounts.models import Participant
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ParticipantSerializer


#Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        participant = Participant.objects.create()
        participant.User = user
        participant.save()

        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


#Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        participant = Participant.objects.get(User=user)
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


#Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


#More User Info
class UserRegisterAPI(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ParticipantSerializer

    def post(self, request, *args, **kwargs):

        data = request.data
        user = User.objects.get(pk=data['id'])
        participant = Participant.objects.get(User=user)
        for key in data.keys():
            if key != "id":
                val = data[key]
                print(val)
                if key == "accommodation" or key == "firstTimer":
                    val = False if data[key] == "false" else True
                setattr(participant, str(key), val)
                participant.save()
        user.first_name = data['firstName']
        user.last_name = data['lastName']
        user.save()
        return Response({
            "user" : UserSerializer(user, context=self.get_serializer_context()).data,
        })

