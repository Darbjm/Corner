# pylint: disable=no-member
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Food(models.Model):
    Name = models.CharField(max_length=50)
    Image = models.CharField(max_length=500)
    Price = models.CharField(max_length=50, null=True)
    Description = models.CharField(max_length=500, null=True)
    Likes = models.CharField(max_length=50, null=True)
    Creator = models.ForeignKey(
        User, related_name='creator', null=True, on_delete=models.SET_NULL)
