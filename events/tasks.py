from background_task import background
from django.contrib.auth.models import User
from django.core import serializers
from django.core.mail import send_mail, EmailMessage


@background(schedule=2)
def notify_user(event, username):

    user = User.objects.get(username__exact=username)
    email = user.email

    send_mail(
        'Registration for ' + event["name"] + ' at PECFEST 2019',
        'Thank you, ' + user.first_name.lower() + ' for registering for ' + event["name"],
        'webmasterpecfest19@gmail.com',
        [email],
        fail_silently=False,
    )

