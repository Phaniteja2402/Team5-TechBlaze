# speech_analysis/models.py

from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class UploadedFile(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    file_url = models.CharField(max_length=255)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"File for {self.file_name} by {self.user_profile.user.email}"

class Transcription(models.Model):
    uploaded_file = models.OneToOneField(UploadedFile, on_delete=models.CASCADE)
    transcribed_text = models.TextField()
    transcription_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transcription for {self.uploaded_file.file_name} by {self.uploaded_file.user_profile.user.email}"

class Analysis(models.Model):
    transcription = models.OneToOneField(Transcription, on_delete=models.CASCADE)
    key_insights = models.TextField()
    entities_found = models.TextField()
    sentiments = models.TextField()
    summary = models.TextField()

    def __str__(self):
        return f"Analysis for {self.transcription.uploaded_file.file_name} by {self.transcription.uploaded_file.user_profile.user.email}"
