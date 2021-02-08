from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, HTTP_204_NO_CONTENT
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
import jwt
from .serializers import UserSerializer, NestedUserSerializer, PopulatedUserSerializer, FoodSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

NOT_FOUND = {'message': 'Not Found'}


class RegisterView(APIView):
    def get(self, request):
        return Response(status=HTTP_200_OK)

    def post(self, request):
        serialized_user = UserSerializer(data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration Succesful'}, status=HTTP_201_CREATED)
        return Response(data=serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
    def get(self, request):
        return Response(status=HTTP_200_OK)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=username)
            if not user.check_password(password):
                raise PermissionDenied({'message': 'Invalid Credentials'})
            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({'sub': user.id, 'exp': int(
                dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
            # took of .decode('utf-8')
            return Response({'token': token, 'message': f'Welcome back {user.username}'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})


class UserDetailView(APIView):

    # permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        try:
            user = User.objects.get(pk=pk)
            serialized_user = PopulatedUserSerializer(user)
            return Response(serialized_user.data)
        except User.DoesNotExist:
            return Response(NOT_FOUND, status=HTTP_404_NOT_FOUND)


class UserEditView(APIView):

    permission_classes = (IsAuthenticated, )

    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        try:
            if user.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            updated_user = NestedUserSerializer(user, data=request.data)
            if updated_user.is_valid():
                updated_user.save()
                return Response(updated_user.data, status=HTTP_202_ACCEPTED)
            return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist:
            return Response(NOT_FOUND, status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        try:
            if user.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            user.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class LikeView(APIView):

    def get(self, request):
        return Response(status=HTTP_200_OK)

    permission_classes = (IsAuthenticated, )

    def put(self, request, pk):
        if request.user.id != pk:
            return Response(status=HTTP_401_UNAUTHORIZED)
        if request.user.id != request.data['id']:
            return Response(status=HTTP_401_UNAUTHORIZED)
        user = User.objects.get(pk=pk)
        serialized_user = NestedUserSerializer(user, data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response(serialized_user.data, status=HTTP_201_CREATED)
        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class DislikeView(APIView):

    def get(self, request):
        return Response(status=HTTP_200_OK)

    permission_classes = (IsAuthenticated, )

    def put(self, request, pk):
        if request.user.id != pk:
            return Response(status=HTTP_401_UNAUTHORIZED)
        if request.user.id != request.data['id']:
            return Response(status=HTTP_401_UNAUTHORIZED)
        user = User.objects.get(pk=pk)
        serialized_user = NestedUserSerializer(user, data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response(serialized_user.data, status=HTTP_201_CREATED)
        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
