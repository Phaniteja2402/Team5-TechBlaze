# speech_analysis/urls.py

from django.urls import path
from .views import UserProfileListCreateView, UserProfileDetailView, UploadedFileListCreateView, UploadedFileDetailView, TranscriptionListCreateView, TranscriptionDetailView, AnalysisListCreateView, AnalysisDetailView, register_user, obtain_token, TokenRefreshViewCustom
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path('register/', register_user),
    
    path('token/', obtain_token),
    path('token/refresh/', TokenRefreshViewCustom.as_view(), name='token_refresh'),

    path('user-profiles/', UserProfileListCreateView.as_view(), name='user-profile-list'),
    path('user-profiles/<int:pk>/', UserProfileDetailView.as_view(), name='user-profile-detail'),
    
    path('uploaded-files/', UploadedFileListCreateView.as_view(), name='uploaded-file-list'),
    path('uploaded-files/<int:pk>/', UploadedFileDetailView.as_view(), name='uploaded-file-detail'),

    path('transcriptions/', TranscriptionListCreateView.as_view(), name='transcription-list'),
    path('transcriptions/<int:pk>/', TranscriptionDetailView.as_view(), name='transcription-detail'),

    path('analyses/', AnalysisListCreateView.as_view(), name='analysis-list'),
    path('analyses/<int:pk>/', AnalysisDetailView.as_view(), name='analysis-detail'),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
