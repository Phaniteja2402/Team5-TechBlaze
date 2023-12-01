# CustomNotes/views.py

from rest_framework import generics
from .models import UserProfile, UploadedFile, Transcription, Analysis
from .serializer import UserProfileSerializer, UploadedFileSerializer, TranscriptionSerializer, AnalysisSerializer

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
