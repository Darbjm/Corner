from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
import jwt
from .serializers import FoodSerializer
from .models import Food
from django.contrib.auth import get_user_model
User = get_user_model()


class AllView(APIView):

    # permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            foods = Food.objects.get()
            serializer = FoodSerializer(foods)
            return Response(serializer.data)
        except Food.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class AddView(APIView):

    # permission_classes = (IsAuthenticated, )

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

    def delete(self, _request, pk):
        try:
            food = Food.objects.get(pk=pk)
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

    def put(self, _request, pk):
        try:
            food = Food.objects.get(pk=pk)
            serialized_food = FoodSerializer(food)
            return Response(serialized_food.data)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
