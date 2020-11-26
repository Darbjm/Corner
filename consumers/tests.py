from django.test import TestCase
# from consumers.models import Consumer
# Create your tests here.


class ConsumerTestCase(TestCase):
    # def setUp(self):
    #     Consumer.create(
    #         username="jimbo", email="jim@email", areacode='se1', password='pass')
    #     Consumer.create(
    #         username="em", email="em@email", areacode='se1', password='pass')

    def test_add(self):
        result = 10 + 5
        self.assertEqual(result, 15)
