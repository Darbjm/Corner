# pylint: disable=no-member
from django.db import models

class Food(models.Models):
    api_id = models.CharField(max_length=50)
    title = models.CharField(max_length=500)
    breadcrumbs = models.CharField(max_length=500)
    badges = models.CharField(max_length=500)
    importantBadges = models.CharField(max_length=500)
    ingredientCount = models.CharField(max_length=10)
    generatedText = models.CharField(max_length=500)
    ingredientList = models.CharField(max_length=500)
    likes = models.CharField(max_length=50)
    aisle = models.CharField(max_length=500)
    price = models.CharField(max_length=500)

class ingredients(models.Models):
    Food = models.ForeignKey(Food, related_name='Food', on_delete=models.CASCADE)
    description = models.CharField(max_length=1000)
    name = models.CharField(max_length=1000)
    safety_level = models.CharField(max_length=1000)

class nutrients(models.Models):
    Food = models.ForeignKey(Food, related_name='Food', on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    amount = models.CharField(max_length=1000)
    unit = models.CharField(max_length=1000)
    percentOfDailyNeeds = models.CharField(max_length=1000)

class caloricBreakdown(models.Models):
    Food = models.ForeignKey(Food, related_name='Food', on_delete=models.CASCADE)
    percentProtein = models.CharField(max_length=1000)
    percentFat = models.CharField(max_length=1000)
    percentCarbs = models.CharField(max_length=1000)

class servings(models.Models):
    Food = models.ForeignKey(Food, related_name='Food', on_delete=models.CASCADE)
    number = models.CharField(max_length=1000)
    size = models.CharField(max_length=1000)
    unit = models.CharField(max_length=1000)
