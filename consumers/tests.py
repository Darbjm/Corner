from django.test import TestCase, RequestFactory
from django.urls import reverse
from .views import RegisterView
# Create your tests here.


class ConsumerTestCase(TestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.user_data = {
            'username': 'test',
            'areacode': 'SE1',
            'password': 'Password1',
            'password_confirmation': 'Password1',
        }

    def test_can_view_page_correctly(self):
        response = self.client.get(self.register_url)
        self.assertEqual(response.status_code, 200)

    # def test_add(self):
    #     response = RequestFactory().post('/consumers/register', self.user_data)
    #     print(response)
    #     # self.assertDictEqual(response, {'message': 'Registration Succesful'})
