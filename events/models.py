import datetime

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone

from events.enums import Category, EventType


class BaseModel(models.Model):
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(BaseModel, self).save(*args, **kwargs)


class Club(BaseModel):
    name = models.CharField(max_length=64)

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
    eventType = models.CharField(max_length=256, choices=EventType.choices(), null=True, blank=True)
    category = models.CharField(max_length=256, choices=Category.choices(), null=True, blank=True)
    association = models.ForeignKey(Club, verbose_name="Name of the club/society associated with this event",
                                    on_delete=models.SET_NULL, null=True, blank=True)
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
