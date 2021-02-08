# pylint: disable=no-member
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Consumer(AbstractUser):

    area_code = models.CharField(max_length=15)
    likes = models.ManyToManyField(
        'foods.Food', related_name='Userlikes', blank=True)
    dislikes = models.ManyToManyField(
        'foods.Food', related_name='UserDislikes', blank=True)

    def __str__(self):
        return f'{self.username} - {self.area_code}'
