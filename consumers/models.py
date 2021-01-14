# pylint: disable=no-member
from django.db import models
from django.contrib.auth.models import AbstractUser
# from foods.models import Food
# Create your models here.


class Consumer(AbstractUser):

    area_code = models.CharField(max_length=15)
    # likes = models.ForeignKey(
    #     Food, related_name='Consumer_Likes', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.username} - {self.area_code}'
