import requests
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from knox.auth import TokenAuthentication
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Team
from events.filters import EventFilter
from events.models import Event, Registration, Club, Sponsor, EventCategory, EventType, Brochure
from events.serializers import get_dynamic_serializer, UserSerializer, EventSerializer, EventTypeSerializer, \
    EventCategorySerializer
from events.tasks import notify_user

AUTH_USER_MODEL = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = AUTH_USER_MODEL.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventCategoryViewSet(viewsets.ModelViewSet):
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.order_by('name').all()
    serializer_class = EventTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_class = EventFilter

    def get_event_category(self):
        try:
            return Event.objects.get(pk=self.kwargs['id']).eventType.category
        except Event.DoesNotExist:
            return None

    def get_filterset_kwargs(self):
        return {
            'eventCategory': self.get_event_category(),
        }


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = get_dynamic_serializer(Club)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = get_dynamic_serializer(Registration)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SponsorViewSet(viewsets.ModelViewSet):
    queryset = Sponsor.objects.all()
    serializer_class = get_dynamic_serializer(Sponsor)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class BrochureViewSet(viewsets.ModelViewSet):
    queryset = Brochure.objects.all()
    serializer_class = get_dynamic_serializer(Brochure)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = get_dynamic_serializer(Team)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RegisterEvent(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, event_id):

        user = request.user
        event = Event.objects.get(id=event_id)

        if not user or not event:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        context = {
            "response": False,
        }

        allRegistrationsWithThisEvent = Registration.objects.filter(registered_event=event)
        if not allRegistrationsWithThisEvent.filter(team__members__username__exact=user.username).exists():
            context = {
                "response": True,
            }

        return Response(context, status=status.HTTP_200_OK)

    def post(self, request, event_id):

        try:
            data = request.data

            if 'team' not in data.keys() and 'teamName' not in data.keys():
                return Response(status=status.HTTP_400_BAD_REQUEST)

            event = Event.objects.get(id=event_id)
            team = data['team']

            allRegistrationsWithThisEvent = Registration.objects.filter(registered_event=event)
            if allRegistrationsWithThisEvent.filter(team__members__username__exact=request.user.username).exists() or Team.objects.filter(name=data['teamName']).filter(registrations__registered_event=event):
                return Response(status=status.HTTP_302_FOUND)

            context = {}

            for member in team:
                if not User.objects.filter(username__exact=member).exists():
                    return Response(status=status.HTTP_404_NOT_FOUND)

            registration = Registration.objects.create(
                registered_event=event,
                team_leader=User.objects.get(username__exact=team[0])
            )
            team_reg = Team.objects.create()
            team_reg.name = data['teamName']
            team_reg.save()

            for member in team:
                team_reg.members.add(User.objects.get(username__exact=member))
                # notify_user(event_id, member)

            registration.team = team_reg
            registration.save()

            context['response'] = True
            return Response(context, status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception occurred: " + str(e))
            return Response(status=status.HTTP_404_NOT_FOUND)
