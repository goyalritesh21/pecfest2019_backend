from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from events.models import event
from events.serializers import EventSerializer
import json

ListOfTechnicalCategories = {
    "1" : "Aerospace",
    "2" : "Astronomy",
}

ListOfCulturalCategories = {
    "1" : "Dance",
    "2" : "Drama",
}


class EventDetails(APIView):

    def get(self, request, eventID):

        if eventID:
            Event = event.objects.filter(eventID__contains=eventID)
            if Event:
                serializer = EventSerializer(Event)
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
            #print(category)
            # Tech Events handler
            if category == "tech":
                key = categoryID[4:]
                if key in ListOfTechnicalCategories.keys():
                    events = event.objects.filter(category__icontains=key)
                    serializer = EventSerializer(events, many=True)
                    return Response({
                        "events": serializer.data,
                    })

            # Cultural Events handler
            elif category == "cult":
                key = category[4:]

                if key in ListOfCulturalCategories.keys():
                    events = event.objects.filter(category__icontains=key)
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
