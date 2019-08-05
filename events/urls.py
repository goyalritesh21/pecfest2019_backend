from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from events import views

urlpatterns = [

    path('api/events/register', views.RegisterAPI.as_view()),
    path('api/events/', views.EventList.as_view()),
    path('api/events/categoryEvents/<slug:categoryID>/', views.CategoryEvents.as_view()),
    path('api/events/categories/<slug:categoryID>', views.MainCatSpecific.as_view()),
    path('api/events/<slug:eventID>', views.EventDetails.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)