from django.db import models
from django.contrib.auth.models import AbstractUser
from foods.models import Food
# Create your models here.


class Consumer(AbstractUser):

    Areacode = models.CharField(max_length=15)
    Likes = models.ManyToManyField(Food, related_name='Consumer_Likes')
    Dislikes = models.ManyToManyField(Food, related_name='Consumers_Dislikes')

    def __str__(self):
        return f'{self.username} - {self.Areacode}'
