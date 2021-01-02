# pylint: disable=no-member
from django.db import models


class Ingredients(models.Model):
    Description = models.CharField(max_length=1000)
    Name = models.CharField(max_length=1000)
    Safety_Level = models.CharField(max_length=1000)


class Nutrients(models.Model):
    Title = models.CharField(max_length=1000)
    Amount = models.CharField(max_length=1000)
    Unit = models.CharField(max_length=1000)
    Percent_Of_Daily_Needs = models.CharField(max_length=1000)


class CaloricBreakdown(models.Model):
    Percent_Protein = models.CharField(max_length=1000)
    Percent_Fat = models.CharField(max_length=1000)
    Percent_Carbs = models.CharField(max_length=1000)


class Servings(models.Model):
    Number = models.CharField(max_length=1000)
    Size = models.CharField(max_length=1000)
    Unit = models.CharField(max_length=1000)


class Food(models.Model):
    Api_Id = models.CharField(max_length=50)
    Title = models.CharField(max_length=500)
    Breadcrumbs = models.CharField(max_length=500)
    Badges = models.CharField(max_length=500)
    Important_Badges = models.CharField(max_length=500)
    Ingredient_Count = models.CharField(max_length=10)
    Generated_Text = models.CharField(max_length=500)
    Ingredient_List = models.CharField(max_length=500)
    Likes = models.CharField(max_length=50)
    Aisle = models.CharField(max_length=500)
    Price = models.CharField(max_length=500)
    Ingredients = models.ForeignKey(
        Ingredients, related_name='Ingredients', null=True, on_delete=models.CASCADE)
    Nutrients = models.ForeignKey(
        Nutrients, related_name='Nutrients', null=True, on_delete=models.CASCADE)
    CaloricBreakdown = models.ForeignKey(
        CaloricBreakdown, related_name='CaloricBreakdown', null=True, on_delete=models.CASCADE)
    Servings = models.ForeignKey(
        Servings, related_name='Servings', null=True, on_delete=models.CASCADE)
