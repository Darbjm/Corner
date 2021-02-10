import base64
import jwt
from django.conf import settings
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import AnonymousUser

user_data = {
    'username': 'test',
    'area_code': 'SE1',
    'password': 'MyDiffPass96',
    'password_confirmation': 'MyDiffPass96',
}

food_data = {
    "name": "Sathers Candy Corn 125g",
    "image": "cdn.shopify.com/s/files/1/0342/2388/2379/products/sathers-candy-corn-3-25oz-92g-800x800_750x.png?v=1588789406",
    "price": "1.89",
    "description": "sweet",
    "likes": [1],
    "dislikes": [],
    "creator": 1
}

food_data_two = {
    "name": "test2",
    "image": "test2",
    "price": "1.89",
    "description": "sweet",
    "likes": [],
    "dislikes": [1],
    "creator": 1
}


REQUIRED_FIELD = 'This field is required.'

BEARER = 'Bearer '


class RegisterTest(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.simple_password = {
            'username': 'test',
            'area_code': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }
        self.password_does_not_match = {
            'username': 'test',
            'area_code': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Pass',
        }
        self.no_username = {
            'username': '',
            'area_code': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }
        self.no_area_code = {
            'username': 'test',
            'area_code': '',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }

    def test_can_view_page_correctly(self):
        response = self.client.get(self.register_url)
        self.assertEqual(response.status_code, 200)

    def test_can_register_user(self):
        response = self.client.post(self.register_url, user_data)
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

    def test_will_check_for_area_code(self):
        response = self.client.post(
            self.register_url, self.no_area_code)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            str(response.data['area_code'][0]), 'This field may not be blank.')

# Unsure whether these are intergration tests - need research


class LoginTest(APITestCase):

    def setUp(self):
        self.client.post(reverse('register'), user_data)
        self.login_url = reverse('login')
        self.simple_password = {
            'username': 'test',
            'area_code': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }
        self.unregistered_user = {
            'username': 'unreg',
            'area_code': 'SE1',
            'password': 'MyDiffUnreg184',
            'password_confirmation': 'MyDiffUnreg184',
        }

    def test_can_view_page_correctly(self):
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 200)

    def test_can_login(self):
        response = self.client.post(self.login_url, user_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(type(response.data['token']), str)
        username = user_data['username']
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
        self.client.post(reverse('register'), user_data)
        response = self.client.post(reverse('login'), user_data)
        self.token = response.data['token']
        user_token = jwt.decode(
            self.token, settings.SECRET_KEY, algorithms=['HS256'])
        self.user_id = user_token['sub']

    def test_logged_in_user_can_view_profile(self):
        request = self.client.get(
            reverse('profile', kwargs={'pk': self.user_id}), **{'HTTP_AUTHORIZATION': BEARER + self.token})
        self.assertEqual(request.status_code, 200)
        self.assertEqual(request.data['username'], user_data['username'])
        self.assertEqual(request.data['area_code'], user_data['area_code'])
        self.assertEqual(request.data['id'], self.user_id)

    def test_user_without_token_cannot_access_profile(self):
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


class UserEditTest(APITestCase):
    def setUp(self):
        self.client.post(reverse('register'), user_data)
        response = self.client.post(reverse('login'), user_data)
        self.token = response.data['token']
        user_token = jwt.decode(
            self.token, settings.SECRET_KEY, algorithms=['HS256'])
        self.user_id = user_token['sub']


def test_logged_in_user_can_edit_profile(self):
    new_user = {
        'username': 'test2',
        'area_code': 'NN1',
        'password': 'MyDiffPass97',
        'password_confirmation': 'MyDiffPass97',
    }
    request = self.client.put(
        reverse('edit', kwargs={'pk': self.user_id}), new_user, **{'HTTP_AUTHORIZATION': BEARER + self.token})
    self.assertEqual(request.status_code, 202)
    self.assertEqual(request.data['username'], new_user['username'])
    self.assertEqual(request.data['area_code'], new_user['area_code'])
    self.assertEqual(request.data['id'], self.user_id)


def test_user_without_token_cannot_edit_profile(self):
    new_user = {
        'username': 'test2',
        'area_code': 'NN1'
    }
    request = self.client.put(
        reverse('edit', kwargs={'pk': self.user_id}), new_user)
    self.assertEqual(request.status_code, 401)
    self.assertEqual(
        request.data['detail'], 'Authentication credentials were not provided.')


def test_user_must_send_information(self):
    new_user = {
    }
    request = self.client.put(
        reverse('edit', kwargs={'pk': self.user_id}), new_user, **{'HTTP_AUTHORIZATION': BEARER + self.token})
    self.assertEqual(request.status_code, 422)
    self.assertEqual(
        request.data['username'][0], REQUIRED_FIELD)
    self.assertEqual(
        request.data['area_code'][0], REQUIRED_FIELD)


class UserLikeTest(APITestCase):
    def setUp(self):
        self.client.post(reverse('register'), user_data)
        response = self.client.post(reverse('login'), user_data)
        self.token = response.data['token']
        user_token = jwt.decode(
            self.token, settings.SECRET_KEY, algorithms=['HS256'])
        self.user_id = user_token['sub']
        self.add_url = reverse('addfood')
        self.client.post(self.add_url, food_data, **
                         {'HTTP_AUTHORIZATION': BEARER + self.token})
        self.client.post(self.add_url, food_data_two, **
                         {'HTTP_AUTHORIZATION': BEARER + self.token})

    def test_logged_in_user_can_add_likes_and_dislikes(self):
        new_user = {
            'username': 'test2',
            'area_code': 'NN1',
            'likes': [1],
            'dislikes': [2],
        }
        request = self.client.put(
            reverse('userlike', kwargs={'pk': self.user_id}), new_user, **{'HTTP_AUTHORIZATION': BEARER + self.token})
        self.assertEqual(request.status_code, 202)
        self.assertEqual(request.data['username'], new_user['username'])
        self.assertEqual(request.data['area_code'], new_user['area_code'])
        self.assertEqual(request.data['likes'], new_user['likes'])
        self.assertEqual(request.data['dislikes'], new_user['dislikes'])
        self.assertEqual(request.data['id'], self.user_id)

    def test_logged_in_user_cannot_like_uncreated_foods(self):
        new_user = {
            'username': 'test2',
            'area_code': 'NN1',
            'likes': [3],
            'dislikes': [4],
        }
        request = self.client.put(
            reverse('userlike', kwargs={'pk': self.user_id}), new_user, **{'HTTP_AUTHORIZATION': BEARER + self.token})
        self.assertEqual(request.status_code, 422)

    def test_user_without_token_cannot_add_likes_or_dislikes(self):
        new_user = {
            'username': 'test2',
            'area_code': 'NN1',
            'likes': [1],
            'dislikes': [2],
        }
        request = self.client.put(
            reverse('userlike', kwargs={'pk': self.user_id}), new_user)
        self.assertEqual(request.status_code, 401)
        self.assertEqual(
            request.data['detail'], 'Authentication credentials were not provided.')

    def test_user_must_send_information(self):
        new_user = {
        }
        request = self.client.put(
            reverse('userlike', kwargs={'pk': self.user_id}), new_user, **{'HTTP_AUTHORIZATION': BEARER + self.token})
        self.assertEqual(request.status_code, 422)
        self.assertEqual(
            request.data['username'][0], REQUIRED_FIELD)
        self.assertEqual(
            request.data['area_code'][0], REQUIRED_FIELD)


class UserDeleteTest(APITestCase):
    def setUp(self):
        self.client.post(reverse('register'), user_data)
        response = self.client.post(reverse('login'), user_data)
        self.token = response.data['token']
        user_token = jwt.decode(
            self.token, settings.SECRET_KEY, algorithms=['HS256'])
        self.user_id = user_token['sub']

    def test_logged_in_user_can_delete_profile(self):
        request = self.client.delete(
            reverse('edit', kwargs={'pk': self.user_id}), **{'HTTP_AUTHORIZATION': BEARER + self.token})
        self.assertEqual(request.status_code, 204)

    def test_user_without_token_cannot_delete_profile(self):
        request = self.client.delete(
            reverse('edit', kwargs={'pk': self.user_id}))
        self.assertEqual(request.status_code, 401)
