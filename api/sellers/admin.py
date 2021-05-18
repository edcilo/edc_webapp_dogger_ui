from django.contrib import admin
from .models import Seller, Client, Activity


# Register your models here.
@admin.register(Seller)
class Seller(admin.ModelAdmin):
    list_display = ('pk', 'user', 'phone', 'created',)
    list_display_links = ('pk', 'user',)
    search_fields = ('user', 'phone',)


@admin.register(Client)
class Client(admin.ModelAdmin):
    list_display = ('pk', 'name', 'lastname', 'phone', 'email',)
    list_display_links = ('pk', 'name', 'lastname',)
    search_fields = ('name', 'lastname',)


@admin.register(Activity)
class Activity(admin.ModelAdmin):
    list_display = ('pk', 'type', 'seller', 'client', 'status', 'schedule_at', 'created_at',)
    list_display_links = ('pk', 'type',)
    search_fields = ('seller', 'client', 'type',)
