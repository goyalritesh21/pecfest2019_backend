from background_task import background
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template import Context
from django.template.loader import render_to_string
from events.models import Event


@background(schedule=2)
def notify_user(event_id, username):
    user = User.objects.get(username__exact=username)
    event = Event.objects.get(id=event_id)
    email = user.email

    try:
        send_mail(
            'Registration for ' + event.name + ' at PECFEST 2019',
            'Thank you, ' + user.first_name.lower() + ' for registering for ' + event.name + '\nSee you there!\n'
            'PS: Your PECFest ID is ' + username,
            'webmasterpecfest19@gmail.com',
            [email],
            fail_silently=False,
        )
        print("mail successfully send to " + email)
    except Exception as e:
        print("Some error occurred while sending mail to " + email)


@background(schedule=3)
def registration_user_notify(event_id, username):

    user = User.objects.get(username__exact=username)
    event = Event.objects.get(id=event_id)
    email = user.email
    name = user.first_name + " " + user.last_name
    time = event.dateTime
    location = event.locations

    merge_data = {
        'name': name,
        'username': username,
        'event_name' : event.name,
        'event_time' : time,
        'event_location' : location,
    }

    # plaintext_context = Context(autoescape=False)  # HTML escaping not appropriate in plaintext
    subject = render_to_string("event_registration/message_subject.txt", merge_data)
    text_body = render_to_string("event_registration/message_body.txt", merge_data)
    html_body = render_to_string("event_registration/message_body.html", merge_data)

    msg = EmailMultiAlternatives(subject=subject, from_email='webmasterpecfest19@gmail.com',
                                 to=[email], body=html_body)
    msg.attach_alternative(html_body, "text/html")
    msg.send()