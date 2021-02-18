# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
import jwt
from .serializers import FoodSerializer, PopulatedFoodSerializer
from .models import Food
from django.contrib.auth import get_user_model
from bs4 import BeautifulSoup
import requests
User = get_user_model()


class AllView(APIView):

    def get(self, request):
        foods = Food.objects.all()
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)


class MapView(APIView):

    def get(self, request):
        foods = Food.objects.all()
        serializer = PopulatedFoodSerializer(foods, many=True)
        return Response(serializer.data)


class ScrapeSnacksView(APIView):

    def get(self, request):
        foods = []
        pk = 308
        for i in range(1, 4):
            print(i)
            url = f'https://thesnackchest.co.uk/collections/american-chocolate?page={i}'
            result = requests.get(
                url)
            src = result.content
            soup = BeautifulSoup(src, 'html.parser')
            for link in soup.find_all(
                    "a", attrs={'class': 'grid-link'}):
                image = link.img['data-src']
                name = link.p.text
                price = link.find('p', attrs={'grid-link__meta'}).text
                remove_newline = price.replace('\n', '')
                remove_price = remove_newline.replace('Regular price', '')
                remove_space = remove_price.replace(' ', '')
                clean_image = image[2:]
                final_image = clean_image.format(width='750')
                foods.append({
                    'model': 'foods.food',
                    'pk': pk,
                    'fields': {
                        'name': name,
                        'image': final_image,
                        'price': remove_space
                    }})
                pk += 1
        return Response(foods)

        # page 1-5 https://thesnackchest.co.uk/collections/american-sweets?page=5
        # page 1-4 https://thesnackchest.co.uk/collections/american-drinks?page=4
        # page 1-4 https://thesnackchest.co.uk/collections/american-snacks?page=4
        # https://thesnackchest.co.uk/collections/american-crisps
        # https://thesnackchest.co.uk/collections/american-cereal
        # https://thesnackchest.co.uk/collections/home-baking?page=2


class AddView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        return Response(status=HTTP_200_OK)

    def post(self, request):
        food = FoodSerializer(data=request.data)
        if food.is_valid():
            food.save()
            return Response(food.data, status=HTTP_201_CREATED)
        return Response(food.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class RemoveView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        return Response(status=HTTP_200_OK)

    def delete(self, request, pk):
        try:
            food = Food.objects.get(pk=pk)
            if food.creator.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            food.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Food.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class EditView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        try:
            food = Food.objects.get(pk=pk)
            serialized_food = FoodSerializer(food)
            return Response(serialized_food.data)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        food = Food.objects.get(pk=pk)
        try:
            if food.creator.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            updated_food = FoodSerializer(food, data=request.data)
            if updated_food.is_valid():
                updated_food.save()
                return Response(updated_food.data, status=HTTP_202_ACCEPTED)
            return Response(updated_food.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class LikeDislikeView(APIView):

    permission_classes = (IsAuthenticated, )

    def put(self, request, pk):
        food = Food.objects.get(pk=pk)
        try:
            updated_food = FoodSerializer(food, data=request.data)
            if updated_food.is_valid():
                updated_food.save()
                return Response(updated_food.data, status=HTTP_202_ACCEPTED)
            return Response(updated_food.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
