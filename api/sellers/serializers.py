from rest_framework import serializers
from .models import Activity, Client


class ClientField(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'lastname']


class ActivityChoiceField(serializers.ChoiceField):
    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]


class ActivityModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
    
    def validate_client(self, value):
        seller = self.context['user']
        is_client = Client.objects.filter(seller_id=seller.id, pk=value.id).exists()
        if not is_client:
            raise serializers.ValidationError('This client don\'t belong to %s' % seller)
        return value
    
    def validate_schedule_at(self, value):
        seller = self.context['user']
        q = Activity.objects.filter(
            seller_id=seller.id, 
            deleted_at=None, 
            schedule_at__lte=value, 
            finished_at__gt=value
        )
        if self.instance != None:
            q = q.exclude(id=self.instance.id)
        is_full = q.exists()
        if is_full:
            raise serializers.ValidationError('This date is full')
        return value


class ActivitySerializer(serializers.ModelSerializer):
    client = ClientField()
    type = ActivityChoiceField(choices=Activity.ACTIVITY_CHOICES)

    class Meta:
        model = Activity
        fields = ['id', 'created_at', 'schedule_at', 'status', 'type', 'client']


class ActivityDeleteSerializer(serializers.Serializer):
    deleted_at = serializers.DateTimeField()

    def update(self, instance, data):
        instance.deleted_at = data['deleted_at']
        instance.save()
        return instance
