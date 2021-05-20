from django.urls import path
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from . import views


urlpatterns = [
    #path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/', views.CustomObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/clients/', views.clientList, name='clients'),
    path('api/v1/client/<int:pk>/activities/', views.clientActivities, name='client_activities'),
    path('api/v1/activities/', views.activityList, name='activities'),
    path('api/v1/activity/', views.activityCreate, name='activity_create'),
    path('api/v1/activity/<int:pk>/', views.activityDetail, name='activity_create'),
]
