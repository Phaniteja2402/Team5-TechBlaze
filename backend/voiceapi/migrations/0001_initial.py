# Generated by Django 4.2.7 on 2023-11-12 14:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UploadedFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=255)),
                ('file_url', models.CharField(max_length=255)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voiceapi.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Transcription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transcribed_text', models.TextField()),
                ('transcription_date', models.DateTimeField(auto_now_add=True)),
                ('uploaded_file', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='voiceapi.uploadedfile')),
            ],
        ),
        migrations.CreateModel(
            name='Analysis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key_insights', models.TextField()),
                ('entities_found', models.TextField()),
                ('sentiments', models.TextField()),
                ('summary', models.TextField()),
                ('transcription', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='voiceapi.transcription')),
            ],
        ),
    ]
