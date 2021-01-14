# pylint: disable=no-member
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Food(models.Model):
    name = models.CharField(max_length=50, unique=True)
    image = models.CharField(max_length=500, unique=True)
    price = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    likes = models.CharField(max_length=50, blank=True, null=True)
    creator = models.ForeignKey(
        User, related_name='creator', blank=True, null=True, on_delete=models.SET_NULL)
