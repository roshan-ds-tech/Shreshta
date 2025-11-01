from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import UserProfile
from  rest_framework import status
from django.contrib.auth import authenticate

@api_view(['GET', 'POST'])
def signup_view(request):
    if request.method == 'GET':
        return Response({'info': 'Signup endpoint ready'})

    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')

    if not username or not email or not password or not phone:
        return Response({'error': 'All fields are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered'}, status=400)

    # Create new user
    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )

    # Create or update profile safely
    profile, created = UserProfile.objects.get_or_create(user=user)
    profile.phone = phone
    profile.save()

    return Response({'message': 'User registered successfully!'})


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({'message': 'Login successful',
            'username': user.username,
            'email': user.email, 'phone': user.userprofile.phone}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
