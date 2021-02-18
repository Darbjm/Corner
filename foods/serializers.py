from rest_framework import serializers
from .models import Food
from django.contrib.auth import get_user_model
User = get_user_model()


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['area_code']


class PopulatedFoodSerializer(FoodSerializer):
    likes = UserSerializer(many=True)
    dislikes = UserSerializer(many=True)
