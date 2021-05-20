from django.http import Http404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Activity
from .serializers import (
    ActivitySerializer, 
    ActivityModelSerializer, 
    ActivityDeleteSerializer,
    CustomTokenObtainPairSerializer
)


# Create your views here.
class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def activityList(request):
    user = request.user
    filters = {'seller': user.id}
    type = request.GET.get('type', None)
    start = request.GET.get('start', None)
    end = request.GET.get('end', None)
    if type != None:
        filters['type'] = type
    if start != None:
        filters['schedule_at__gte'] = start
    if end != None:
        filters['schedule_at__lte'] = end
    activities = Activity.objects.filter(**filters).order_by('-id')
    serializer = ActivitySerializer(activities, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def activityCreate(request):
    user = request.user
    data = request.data
    data['seller'] = user.id
    serializer = ActivityModelSerializer(data=data, context={'user': user})
    serializer.is_valid(raise_exception=True)
    activity = serializer.save()
    serializer = ActivitySerializer(activity)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def activityDetail(request, pk):
    user = request.user
    try:
        activity = Activity.objects.filter(seller=user.id).get(pk=pk)
    except Activity.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)

    if request.method != 'GET' and activity.status == 'deactivated':
        return Response({'detail': 'The current activity is deactivated'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'PUT':
        data = request.data
        data['seller'] = user.id
        serializer = ActivityModelSerializer(instance=activity, data=data, context={'user': user})
        serializer.is_valid(raise_exception=True)
        serializer.save()

    if request.method == 'DELETE':
        serializer = ActivityDeleteSerializer(instance=activity, data={'deleted_at': timezone.now()})
        serializer.is_valid(raise_exception=True)
        serializer.save()
    
    serializer = ActivitySerializer(activity)

    return Response(serializer.data)
