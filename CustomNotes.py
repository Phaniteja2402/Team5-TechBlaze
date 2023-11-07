import os
from pydub import AudioSegment
from google.cloud import speech

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'dctrial1.json'
speech_client = speech.SpeechClient()

#Step 1. Load the media files
media_file_name_wav = '10 Minutes for the next 10 Years.wav'

# Load the WAV file and convert it to mono
audio = AudioSegment.from_wav(media_file_name_wav)
audio = audio.set_channels(1)  # Convert to mono
audio.export('mono_audio.wav', format='wav')

with open(media_file_name_wav, 'rb') as f:
    byte_data_wav = f.read()
audio_wav = speech.RecognitionAudio(content=byte_data_wav)

## Step 2. Configure Media Files Output

config_wav = speech.RecognitionConfig(
    sample_rate_hertz=48000,
    enable_automatic_punctuation=True,
    language_code='en-US',
    audio_channel_count=1
)

# GCS location where the audio file is stored
media_uri = 'gs://dctesttrial/mono_audio.wav'

# asynchronous speech recognition
operation = speech_client.long_running_recognize(
    config=config_wav,
    audio={"uri": media_uri}
)

print('Waiting for operation to complete...')
response = operation.result()

# Print the transcriptions
transcript = ' '.join(result.alternatives[0].transcript for result in response.results)
print('Transcript: {}'.format(transcript))


