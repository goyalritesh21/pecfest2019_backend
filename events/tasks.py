from background_task import background
from django.contrib.auth.models import User
from django.core.mail import send_mail

from events.models import Event


@background(schedule=2)
def notify_user(event_id, username):
    user = User.objects.get(username__exact=username)
    event = Event.objects.get(id=event_id)
    email = user.email

    send_mail(
        'Registration for ' + event.name + ' at PECFEST 2019',
        'Thank you, ' + user.first_name.lower() + ' for registering for ' + event.name + '\nSee you there!\n'
        'PS: Your PECFest ID is ' + username,
        'webmasterpecfest19@gmail.com',
        [email],
        fail_silently=False,
    )

