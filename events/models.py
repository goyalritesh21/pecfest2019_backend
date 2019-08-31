import datetime

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    record_created = models.DateTimeField(editable=False, auto_now_add=True)
    record_modified = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        if not self.id:
            self.record_created = timezone.now()
        self.record_modified = timezone.now()
        return super(BaseModel, self).save(*args, **kwargs)


class Club(BaseModel):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class EventCategory(BaseModel):
    name = models.CharField(max_length=256, null=False, blank=False)

    def __str__(self):
        return self.name


class EventType(BaseModel):
    name = models.CharField(max_length=256, null=False, blank=False)
    eventCategory = models.ForeignKey(EventCategory, on_delete=models.CASCADE, null=True, blank=True,
                                      related_name='event_types')

    def __str__(self):
        return self.name


class Event(BaseModel):
    # Primary Info
    name = models.CharField(max_length=256)
    coordinators = models.ManyToManyField(to=User)

    # Venue and Date
    locations = models.CharField(max_length=256)
    dateTime = models.DateTimeField(verbose_name="Date and Time of Event", default=datetime.datetime.now)

    # Prize Details
    prize = models.TextField(blank=True)

    # Team Member
    minTeam = models.IntegerField(verbose_name="Minimum Size of the Team", validators=[MinValueValidator(0)], default=0)
    maxTeam = models.IntegerField(verbose_name="Maximum Size of the Team", validators=[MinValueValidator(0)], default=0)

    # Detailed Info
    eventType = models.ForeignKey(EventType, verbose_name="Type of the event",
                                  on_delete=models.SET_NULL, null=True, related_name='events')

    association = models.ForeignKey(Club, verbose_name="Name of the club/society associated with this event",
                                    on_delete=models.SET_NULL, null=True, blank=True, related_name='events')
    details = models.TextField(blank=True)
    shortDescription = models.TextField(blank=True, verbose_name="Short Description about event")
    ruleList = models.TextField(blank=True, verbose_name="List of the rules")

    # Files attached
    poster = models.ImageField(upload_to='images/events/', null=True, blank=True)
    rulesPDF = models.FileField(upload_to='pdf/events/', null=True, blank=True)

    def __str__(self):
        return self.name


class Registration(BaseModel):
    registered_event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registered_event')
    participant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='participant')

    def __str__(self):
        return self.registered_event.name, self.participant.username


class Sponsor(BaseModel):
    name = models.CharField(max_length=256, null=False)
    tagline = models.CharField(max_length=512, blank=True, null=True)
    partnership = models.CharField(max_length=256, blank=True, null=True)
    logo = models.ImageField(upload_to='Images/sponsors/', null=True, blank=True)

    def __str__(self):
        return self.name
