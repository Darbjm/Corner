import base64
import jwt
from django.conf import settings
from django.urls import reverse
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate, APIClient
from django.contrib.auth.models import AnonymousUser

from .views import UserDetailView

factory = APIRequestFactory()
client = APIClient()


class RegisterTest(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.user_data = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'MyDiffPass96',
            'password_confirmation': 'MyDiffPass96',
        }
        self.simple_password = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }
        self.password_does_not_match = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Pass',
        }
        self.no_username = {
            'username': '',
            'areacode': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }
        self.no_areacode = {
            'username': 'test',
            'areacode': '',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }

    def test_can_view_page_correctly(self):
        response = self.client.get(self.register_url)
        self.assertEqual(response.status_code, 200)

    def test_can_register_user(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, {'message': 'Registration Succesful'})

    def test_will_check_password(self):
        response = self.client.post(self.register_url, self.simple_password)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            str(response.data['password'][0]), 'Password must be 8 characters long, Difficult to guess, and contain a letter')

    def test_will_check_password_matches(self):
        response = self.client.post(
            self.register_url, self.password_does_not_match)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            str(response.data['password_confirmation'][0]), 'Does Not Match')

    def test_will_check_for_username(self):
        response = self.client.post(
            self.register_url, self.no_username)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            str(response.data['username'][0]), 'This field may not be blank.')

    def test_will_check_for_areacode(self):
        response = self.client.post(
            self.register_url, self.no_areacode)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            str(response.data['areacode'][0]), 'This field may not be blank.')


class LoginTest(APITestCase):

    def setUp(self):
        self.user_data = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'MyDiffPass96',
            'password_confirmation': 'MyDiffPass96',
        }
        self.client.post(reverse('register'), self.user_data)
        self.login_url = reverse('login')
        self.simple_password = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }
        self.unregistered_user = {
            'username': 'unreg',
            'areacode': 'SE1',
            'password': 'MyDiffUnreg184',
            'password_confirmation': 'MyDiffUnreg184',
        }

    def test_can_view_page_correctly(self):
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 200)

    def test_can_login(self):
        response = self.client.post(self.login_url, self.user_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(type(response.data['token']), bytes)
        username = self.user_data['username']
        self.assertEqual(response.data['message'], f'Welcome back {username}')

    def test_cannot_login_before_registration(self):
        response = self.client.post(self.login_url, self.unregistered_user)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['message'], 'Invalid Credentials')

    def test_cannot_login_with_wrong_password(self):
        response = self.client.post(self.login_url, self.simple_password)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['message'], 'Invalid Credentials')


class UserViewTest(APITestCase):
    def setUp(self):
        self.user_data = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'MyDiffPass96',
            'password_confirmation': 'MyDiffPass96',
        }
        self.client.post(reverse('register'), self.user_data)
        response = self.client.post(reverse('login'), self.user_data)
        self.token = response.data['token']
        user_token = jwt.decode(
            self.token, settings.SECRET_KEY, algorithms=['HS256'])
        self.user_id = user_token['sub']

    def test_logged_in_user_can_view_profile(self):
        request = self.client.get(
            reverse('profile', kwargs={'pk': self.user_id}), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.token})
        self.assertEqual(request.status_code, 200)
        self.assertEqual(request.data['username'], self.user_data['username'])
        self.assertEqual(request.data['areacode'], self.user_data['areacode'])
        self.assertEqual(request.data['id'], self.user_id)

    def test_user_without_tokek_cannot_access_profile(self):
        request = self.client.get(
            reverse('profile', kwargs={'pk': self.user_id}))
        self.assertEqual(request.status_code, 401)
        self.assertEqual(
            request.data['detail'], 'Authentication credentials were not provided.')

    def test_token_needs_bearer(self):
        request = self.client.get(
            reverse('profile', kwargs={'pk': self.user_id}), **{'HTTP_AUTHORIZATION': self.token})
        self.assertEqual(request.status_code, 403)
        self.assertEqual(
            request.data['message'], 'Invalid Authorization Header')

    def test_token_needs_to_be_authentic(self):
        request = self.client.get(
            reverse('profile', kwargs={'pk': self.user_id}), **{'HTTP_AUTHORIZATION': 'evnjksdnfknaiuerhfa'})
        self.assertEqual(request.status_code, 403)
        self.assertEqual(
            request.data['message'], 'Invalid Authorization Header')
