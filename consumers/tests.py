from django.test import TestCase, RequestFactory
from django.urls import reverse
from .views import RegisterView
# Create your tests here.


class BaseTest(TestCase):
    def setUp(self):
        self.register_url = reverse('register')
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


class RegisterTest(BaseTest):
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
