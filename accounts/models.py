from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import User


class Participant(models.Model):

    User = models.OneToOneField(to=User, related_name="user" , on_delete=models.CASCADE, null=True)
    contactNumber = models.IntegerField(null=True, verbose_name="Contact Number", validators=[
        MaxValueValidator(limit_value=9999999999, message="Phone number Not valid"),
        MinValueValidator(limit_value=1000000000, message="Phone number Not valid")
    ])
    accommodation = models.BooleanField(default=False)
    college = models.CharField(null=True, max_length=500)
    address = models.CharField(null=True, max_length=2000)
    yearOfStudy = models.IntegerField(null=True, default=1, verbose_name="Year of Study", validators=[
        MaxValueValidator(limit_value=5, message="Year Not valid"),
        MinValueValidator(limit_value=1, message="Year Not valid")
        ]
    )
    firstTimer = models.BooleanField(default=True, null=True)
    gender = models.IntegerField(null=True, default=0, validators=[
        MaxValueValidator(limit_value=2, message="Gender Not valid"),
        MinValueValidator(limit_value=0, message="Gender Not valid")
        ]
    )

    def __str__(self):
        return str(self.pk)
