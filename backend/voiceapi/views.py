# speech_analysis/views.py
from rest_framework import generics
from .models import UserProfile, UploadedFile, Transcription, Analysis
from .serializer import UserProfileSerializer, UploadedFileSerializer, TranscriptionSerializer, AnalysisSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenRefreshView

@api_view(['POST'])
def register_user(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    username = request.data.get('email')
    email = request.data.get('email')
    password = request.data.get('password')

    if not (username and email and password):
        return Response({'detail': 'Please provide all required fields'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username, email, password)
    if user:
        return Response({'detail': 'User created successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'detail': 'Unable to create user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def obtain_token(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class TokenRefreshViewCustom(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Additional logic if needed after refreshing the token
        return response

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UploadedFileListCreateView(generics.ListCreateAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer

class UploadedFileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer

class TranscriptionListCreateView(generics.ListCreateAPIView):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer

class TranscriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer

class AnalysisListCreateView(generics.ListCreateAPIView):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer

class AnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer
