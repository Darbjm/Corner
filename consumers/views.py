from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK
from .serializers import UserSerializer
# Create your views here.


class RegisterView(APIView):
    def get(self, request):
        return Response(status=HTTP_200_OK)

    def post(self, request):
        serialized_user = UserSerializer(data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration Succesful'})
        print(serialized_user.errors)
        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
