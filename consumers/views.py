from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_201_CREATED
from django.conf import settings
import jwt
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterView(APIView):
    def get(self, request):
        return Response(status=HTTP_200_OK)

    def post(self, request):
        serialized_user = UserSerializer(data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration Succesful'}, status=HTTP_201_CREATED)
        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


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
            return Response({'token': token, 'message': f'Welcome back {user.username}'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})
