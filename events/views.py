from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models import Event, Registration, Club, Sponsor, EventCategory, EventType
from events.serializers import get_dynamic_serializer, UserSerializer
from events.tasks import notify_user

AUTH_USER_MODEL = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = AUTH_USER_MODEL.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventCategoryViewSet(viewsets.ModelViewSet):
    queryset = EventCategory.objects.all()
    serializer_class = get_dynamic_serializer(EventCategory)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = get_dynamic_serializer(EventType)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = get_dynamic_serializer(Event)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


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


class EventByCategory(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, category_id):
        if not EventCategory.objects.filter(id=category_id).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        category = EventCategory.objects.get(id=category_id)
        events = {
            category.name: {

            }
        }

        for event_type in category.event_types.all():
            if event_type.name not in events[category.name]:
                events[category.name][event_type.name] = []

            for event in event_type.events.all():
                events[category.name][event_type.name].append({
                    "id": event.id,
                    "name": event.name,
                })

        return Response(events)


class EventByType(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, type_id):
        if not EventType.objects.filter(id=type_id).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        event_type = EventType.objects.get(id=type_id)
        events = {
            event_type.category.name: {
                event_type.name: []
            }
        }

        for event in event_type.events.all():
            events[event_type.category.name][event_type.name].append({
                "id": event.id,
                "name": event.name,
            })

        return Response(events)


class RegisterEvent(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, event_id):
        if 'username' not in request.data.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(username=request.data['username'])
        event = Event.objects.get(id=event_id)

        if not user or not event:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        context = {
            "response": False,
        }

        if not Registration.objects.filter(registered_event=event, participant=user).exists():
            context = {
                "response": True,
            }

        return Response(context, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data

        if 'username' not in request.data.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(username=request.data['username'])
        event = Event.objects.get(id=data['event_id'])

        if not user or not event:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        context = {
            "response": False,
        }

        if not Registration.objects.filter(registered_event=event, participant=user).exists():
            Registration.objects.create(registered_event=event, participant=user).save()

            context = {
                "response": True,
            }

            event_data = get_dynamic_serializer(Event)(Event)
            notify_user(event_data.data, data['username'])
            return Response(context, status=status.HTTP_201_CREATED)
        else:
            return Response(context, status=status.HTTP_302_FOUND)
