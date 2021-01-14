import base64
import jwt
import json
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
    "likes": "1",
    "creator": 1
}

different_name_food_data = {
    "name": "chocolate bar",
    "image": "cdn.shopify.com/s/files/1/0342/2388/2379/products/sathers-candy-corn-3-25oz-92g-800x800_750x.png?v=1588789406",
    "price": "£1.89"
}

bad_name_food_data = {
    "image": "cdn.shopify.com/s/files/1/0342/2388/2379/products/sathers-candy-corn-3-25oz-92g-800x800_750x.png?v=1588789406",
    "price": "£1.89"
}

bad_image_food_data = {
    "name": "Sathers Candy Corn 125g",
    "price": "£1.89"
}

REQUIRED_FIELD = 'This field is required.'

BEARER = 'Bearer '


class AddFoodTest(APITestCase):
    def setUp(self):
        self.client.post(reverse('register'), user_data)
        self.login_url = reverse('login')
        self.add_url = reverse('addfood')

    def test_can_view_page_correctly(self):
        response = self.client.get(self.add_url)
        self.assertEqual(response.status_code, 200)

    def test_can_add_food(self):
        response = self.client.post(self.add_url, food_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.data, {'id': 1, 'name': 'Sathers Candy Corn 125g', 'image': 'cdn.shopify.com/s/files/1/0342/2388/2379/products/sathers-candy-corn-3-25oz-92g-800x800_750x.png?v=1588789406', 'price': '1.89', 'description': 'sweet', 'likes': '1', 'creator': 1})

    def test_will_check_food_has_name(self):
        response = self.client.post(
            self.add_url, bad_name_food_data, format='json')
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            response.data['name'][0], 'This field is required.')

    def test_will_check_food_has_image(self):
        response = self.client.post(
            self.add_url, bad_name_food_data, format='json')
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            response.data['name'][0], 'This field is required.')

    def test_will_not_create_duplicate_name(self):
        self.client.post(self.add_url, food_data, format='json')
        response = self.client.post(self.add_url, food_data, format='json')
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            response.data['name'][0], 'food with this name already exists.')

    def test_will_not_create_duplicate_image(self):
        self.client.post(self.add_url, food_data, format='json')
        response = self.client.post(self.add_url, different_name_food_data)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(
            response.data['image'][0], 'food with this image already exists.')


class ViewAllFoodTest(APITestCase):
    def setUp(self):
        self.client.post(reverse('register'), user_data)
        self.login_url = reverse('login')
        self.all_url = reverse('allfood')
        self.add_url = reverse('addfood')
        self.client.post(self.add_url, food_data)

    def test_can_view_all_foods(self):
        response = self.client.get(self.all_url)
        self.assertEqual(response.status_code, 200)
        json_response = dict((response.data[0]))
        self.assertEqual(
            json_response, {
                "id": 1,
                "name": "Sathers Candy Corn 125g",
                "image": "cdn.shopify.com/s/files/1/0342/2388/2379/products/sathers-candy-corn-3-25oz-92g-800x800_750x.png?v=1588789406",
                "price": "1.89",
                "description": "sweet",
                "likes": "1",
                "creator": 1})


class ScrapeSnacks(APITestCase):
    def setUp(self):
        self.snacks_url = reverse('snacks')

    def test_can_scape_web_for_snacks(self):
        response = self.client.get(self.snacks_url)
        self.assertEqual(response.data[0]['model'], 'foods.food')
