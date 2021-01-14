# pylint: disable=no-member
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Food(models.Model):
    name = models.CharField(max_length=50, unique=True)
    image = models.CharField(max_length=500, unique=True)
    price = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=500, null=True)
    likes = models.CharField(max_length=50, null=True)
    creator = models.ForeignKey(
        User, related_name='creator', null=True, on_delete=models.SET_NULL)
