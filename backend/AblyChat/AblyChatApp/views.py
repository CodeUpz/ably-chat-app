from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from AblyChatApp.serializers import RegistraionSerializer, ProfileUpdateSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token


# Create your views here.
@api_view(
    ['POST'],)
@permission_classes(
    [AllowAny],)
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistraionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)


@api_view(
    ['POST'],)
@permission_classes(
    [IsAuthenticated],)
def logout_view(request):

    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response('User Logged out successfully', status=status.HTTP_200_OK)


@api_view(
    ['POST'],)
@permission_classes(
    [IsAuthenticated],)
def getuserinfo_view(request):

    if request.method == 'POST':
        user = Token.objects.get(key=request.user.auth_token).user
        if user:
            context = {"first_name": user.first_name, "last_name": user.last_name, "username": user.username, "email": user.email, "password": user.password, "token": request.user.auth_token.key}
        else:
            context = {"error": "token invalid or user not found."}
        return Response(context, status=status.HTTP_200_OK)


@api_view(
    ['POST'],)
@permission_classes(
    [IsAuthenticated],)
def profileupdate_view(request):

    if request.method == 'POST':
        serializer = ProfileUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.update(request=request)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors)