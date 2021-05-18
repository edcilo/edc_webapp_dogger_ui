import datetime
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Seller(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    phone = models.CharField(null=False, max_length=20)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return "%s %s" % (self.user.first_name, self.user.last_name)


class Client(models.Model):
    name = models.CharField(null=False, max_length=50)
    lastname = models.CharField(null=False, max_length=50)
    phone = models.CharField(null=False, max_length=20)
    email = models.CharField(null=False, max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey('Seller', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return "%s %s" % (self.name, self.lastname,)


class Activity(models.Model):
    ACTIVITY_CHOICES = {
        ("call", "Llamada al cliente"),
        ("meeting", "Visita a propiedad presencial"),
        ("virtual", "Visita virtual a propiedad"),
    }
    ACTIVITY_TIME = {
        "call": 30,
        "meeting": 180,
        "virtual": 90,
    }

    type = models.CharField(max_length=50, choices=ACTIVITY_CHOICES)
    note = models.TextField()
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    seller = models.ForeignKey('Seller', on_delete=models.CASCADE)
    schedule_at = models.DateTimeField()
    finished_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    @property
    def status(self):
        return 'deactivated' if self.deleted_at != None else 'active'
    
    def save(self, *args, **kwargs):
        self.finished_at = self.schedule_at + datetime.timedelta(minutes=self.ACTIVITY_TIME[self.type])
        super().save(*args, **kwargs)
