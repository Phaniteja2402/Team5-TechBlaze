# Customized Notes

## Pain Addressed

- Manually transcribing audio or video footage can take a lot of time, especially when there is a extensive recordings, which is time consuming process.
- Difficulty in extracting important details from long audio or video transcripts might be difficult to sift through the most crucial information, which can result in information overload.
- Language barriers, can be challenging to understand the critical information stated by the non-native speaker, especially if the speaker has spoken fast or with different accent.
- Moreover, when we want revise some key concepts from video or audio lectures it very hard to go back and forth to the whole lengthy video, which is time consuming process.

## Solution

- To encounter the problems discussed, we propose a web application which generates a summarized version of notes in their desired language by taking Audio/YouTube videos as an input using speech to text API.
- By generating the summary from transcript users get a accurate and quick understanding about the content of the topic in a shorter time and reduce accent problems. 
- Language barrier can be defeated by using Google Translator API and we can understand the whole concept in a easy way with the help of simple summary which is in their desired language.
- With this application, students will be able to gain the insights from the lectures  in easy manner  and understandable format.

## Work Flow

- As a input we are giving audio files & youtube video URL to get the transcript. Here we are using OpenAI Whispher API to generate the transcript.
- To summarize the transcript obtained, we have used the Eden API. Once the summary generated from it we can convert the language with the help of google translate API.

![Flow](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/369ca557-b36f-4930-b0a5-d52a41e1ac75)


###Input 
- .mp3,.wav,.mp4 files and Youtube Video URL
![Image1](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/abf8ef33-935a-45c0-9537-7410a0304ef6)
![Image2](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/9cc6af4b-3056-41b6-bf98-39db23114bc5)

###Output
- Once we given the audio files and youtube URL to the web application it will going to transcribe the audio and youtube video conversation to transcript text & to generate the summary click on the summarize button. Baased your deside language you can change the summary to different languge, as shown the below output samples.

Transcript
![Image3](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/74640875-d3a1-4bb5-aba4-d680beab86ff)
Summary 
![Image4](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/964f8107-e8ef-47d7-bb43-dc7bbabeda1f)
desired langaue select
![Image5](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/2359930f-c280-4edc-8410-d73dfcda05ad)
Language conevrsion text  
![Image6](https://github.com/Phaniteja2402/Team5-TechBlaze/assets/80826063/af1c077e-42d6-4e7c-a209-2a9ac30dee35)

