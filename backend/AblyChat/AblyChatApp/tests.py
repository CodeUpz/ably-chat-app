from django.contrib.auth.models import User
from django.urls import reverse
import json

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token


class RegisterTestCase(APITestCase):

    def test_register(self):
        data = {"first_name": "fn_testcase", "last_name": "ln_testcase", "username": "testcase", "email": "testcase@example.com", "password": "NewPassword@123", "password2": "NewPassword@123"}

        response = self.client.post(reverse('register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginLogoutTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(first_name="test", last_name="case", email="testcase@example.com", username="example", password="NewPassword@123")

    def test_login(self):
        data = {"username": "example", "password": "NewPassword@123"}
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getuserinfo(self):
        data = {"username": "example", "password": "NewPassword@123"}
        response = self.client.post(reverse('login'), data)
        tokenkey = json.loads(str(response.content, encoding="utf-8"))
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokenkey["token"])
        response = self.client.post(reverse('get-user-info'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_updateprofile(self):
        data = {"username": "example", "password": "NewPassword@123"}
        response = self.client.post(reverse('login'), data)
        tokenkey = json.loads(str(response.content, encoding="utf-8"))
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokenkey["token"])
        updatedata = {"first_name": "fn_testcase1", "last_name": "ln_testcase1", "username": "example2", "email": "testcase2@example.com", "password": "NewPassword@1234"}
        response = self.client.post(reverse('profile-update'), updatedata)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout(self):
        data = {"username": "example", "password": "NewPassword@123"}
        response = self.client.post(reverse('login'), data)
        tokenkey = json.loads(str(response.content, encoding="utf-8"))
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokenkey["token"])
        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)