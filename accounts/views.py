from rest_framework import viewsets

from accounts.models import Participant
from accounts.serializers import get_dynamic_serializer


class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = get_dynamic_serializer(Participant)
