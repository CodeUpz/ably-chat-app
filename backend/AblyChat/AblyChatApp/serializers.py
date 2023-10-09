from django.contrib.auth.models import User
from rest_framework import serializers


class RegistraionSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError("Passwords do not match!")

        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError('Email already exists!')

        account = User(first_name=self.validated_data['first_name'], last_name=self.validated_data['last_name'], email=self.validated_data['email'], username=self.validated_data['username'])
        account.set_password(password)
        account.save()
        return account


class ProfileUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password']
        extra_kwargs = {'first_name': {'required': False}, 'last_name': {'required': False}, 'username': {'required': False}, 'email': {'required': False}, 'password': {'write_only': True}}

    def update(self, request):
        user_first_name = self.validated_data['first_name']
        user_last_name = self.validated_data['last_name']
        user_username = self.validated_data['username']
        user_email = self.validated_data['email']
        user_password = self.validated_data['password']

        if User.objects.filter(email=user_email).exists():
            raise serializers.ValidationError({"email": ["A user with that email already exists."]})

        account = User.objects.get(username=request.user.username)
        if user_first_name:
            account.fist_name = user_first_name
        if user_last_name:
            account.last_name = user_last_name
        if user_username:
            account.username = user_username
        if user_email:
            account.email = user_email
        if user_password:
            account.set_password(user_password)

        account.save()
        return account