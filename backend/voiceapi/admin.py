from django.contrib import admin
from .models import UserProfile, UploadedFile, Transcription, Analysis

admin.site.register(UserProfile)
admin.site.register(UploadedFile)
admin.site.register(Transcription)
admin.site.register(Analysis)

