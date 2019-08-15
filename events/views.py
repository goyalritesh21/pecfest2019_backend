from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView

from events.models import event, registration
from events.serializers import EventSerializer
from .tasks import notify_user


ListOfTechnicalCategories = {
    "1" : "aerospace",
    "2" : "astronomy",
}

ListOfCulturalCategories = {
    "1" : "dance",
    "2" : "drama",
}


class EventDetails(APIView):

    def get(self, request, eventID):

        if eventID:
            Event = event.objects.get(eventID__contains=eventID)
            if Event:
                serializer = EventSerializer(Event)
                # print(serializer)
                return Response({
                    "data": serializer.data,
                })

        return Response(status=status.HTTP_400_BAD_REQUEST)


class MainCatSpecific(APIView):

    def get(self, request, categoryID):

        if categoryID:

            # Tech Events handler
            if categoryID == "technical":
                return Response({
                    "subcategories": list(ListOfTechnicalCategories.items()),
                })

            # Cultural Events handler
            elif categoryID == "cultural":
                return Response({
                    "subcategories": list(ListOfCulturalCategories.items()),
                })

            elif categoryID == "workshop":
                pass

        return Response(status=status.HTTP_400_BAD_REQUEST)


class CategoryEvents(APIView):

    def get(self, request, categoryID):

        # categoryID = self.kwargs['categoryID']
        if categoryID:
            category = categoryID[:4]
            # print(category)
            # Tech Events handler
            if category == "tech":
                key = categoryID[4:]
                if key in ListOfTechnicalCategories.keys():
                    events = event.objects.filter(eventType__contains=ListOfTechnicalCategories[key])
                    serializer = EventSerializer(events, many=True)
                    return Response({
                        "events": serializer.data,
                    })

            # Cultural Events handler
            elif category == "cult":
                key = categoryID[4:]
                if key in ListOfCulturalCategories.keys():
                    events = event.objects.filter(eventType__contains=ListOfCulturalCategories[key])
                    serializer = EventSerializer(events, many=True)
                    return Response({
                        "events": serializer.data,
                    })

            elif category == "work":
                pass

        return Response(status=status.HTTP_400_BAD_REQUEST)


class EventList(APIView):
    """
    List all events, or create a new event.
    """

    def get(self, request, format=None):

        events = event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response({
            "data" : serializer.data,
        })

    def post(self, request, format=None):

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPI(APIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):

        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def post(self, request):
        data = request.data

        if 'eventID' in data.keys() and 'username' in data.keys():

            user = User.objects.get(username__exact=data['username'])
            Event = event.objects.get(eventID__exact=data['eventID'])

            if user and Event:

                if not registration.objects.filter(RegEvent=Event).filter(Participant=user).exists():
                    reg = registration.objects.create(RegEvent = Event,Participant = user)
                    reg.save()

                    context = {
                        "response": True,
                    }
                    event_data = EventSerializer(Event)
                    notify_user(event_data.data, data['username'])
                    return Response(context, status= status.HTTP_201_CREATED)

                else:

                    context = {
                        "response": False,
                    }
                    return Response(context, status=status.HTTP_302_FOUND)

        context = {
            "response": False,
        }
        return Response(context, status=status.HTTP_404_NOT_FOUND)


class CheckRegistrationAPI(APIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):
        data = request.data

        if 'eventID' in data.keys() and 'username' in data.keys():

            user = User.objects.get(username__exact=data['username'])
            Event = event.objects.get(eventID__exact=data['eventID'])

            if user and Event:

                if registration.objects.filter(RegEvent=Event).filter(Participant=user).exists():

                    context = {
                        "response" : True,
                    }
                    return Response(context, status=status.HTTP_200_OK)

                else:

                    context = {
                        "response": False,
                    }
                    return Response(context, status=status.HTTP_200_OK)

        context = {
            "response": False,
        }
        return Response(context, status=status.HTTP_404_NOT_FOUND)
