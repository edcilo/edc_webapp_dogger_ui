from django.http import Http404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivitySerializer, ActivityModelSerializer, ActivityDeleteSerializer


# Create your views here.
# TODO filtrar por tipo y fecha
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
    activities = Activity.objects.filter(**filters).all()
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
    serializer.save()
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
        return Response({'message': 'The current activity is deactivated'}, status=status.HTTP_400_BAD_REQUEST)

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
