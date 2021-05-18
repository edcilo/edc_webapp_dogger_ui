from django.urls import path
from django.urls import path
from . import views


urlpatterns = [
    path('api/v1/activities/', views.activityList, name='activities'),
    path('api/v1/activity/', views.activityCreate, name='activity_create'),
    path('api/v1/activity/<int:pk>/', views.activityDetail, name='activity_create'),
]
