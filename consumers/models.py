from django.db import models

# Create your models here.


class Consumer(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    areacode = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.username} - {self.areacode}'
