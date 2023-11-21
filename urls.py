# speech_analysis/urls.py

from django.urls import path
from .views import UserProfileListCreateView, UserProfileDetailView, UploadedFileListCreateView, UploadedFileDetailView, TranscriptionListCreateView, TranscriptionDetailView, AnalysisListCreateView, AnalysisDetailView

urlpatterns = [
    path('user-profiles/', UserProfileListCreateView.as_view(), name='user-profile-list'),
    path('user-profiles/<int:pk>/', UserProfileDetailView.as_view(), name='user-profile-detail'),
    
    path('uploaded-files/', UploadedFileListCreateView.as_view(), name='uploaded-file-list'),
    path('uploaded-files/<int:pk>/', UploadedFileDetailView.as_view(), name='uploaded-file-detail'),

    path('transcriptions/', TranscriptionListCreateView.as_view(), name='transcription-list'),
    path('transcriptions/<int:pk>/', TranscriptionDetailView.as_view(), name='transcription-detail'),

    path('analyses/', AnalysisListCreateView.as_view(), name='analysis-list'),
    path('analyses/<int:pk>/', AnalysisDetailView.as_view(), name='analysis-detail'),
]
