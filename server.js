const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const fs = require("fs")
const http = require("https");
const ytdl = require('ytdl-core');
const { default: axios } = require('axios');

const openai = new OpenAI({
    apiKey: "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"
})


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
}); 

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
}); 

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
}); 

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
}); 

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
}); 

app.get('/transcribe.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'transcribe.html'));
});


// Define the port for your server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/register/", async (req, res) => {
  const registernow = async () => {
    console.log(req.body.email)
    first_name = req.body.first_name
    last_name = req.body.last_name
    email = req.body.email
    username = req.body.email
    password = req.body.password
    console.log(email)
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, username, email, password }),
    });
    res.send(response)
    // console.log(response)
  };
  await registernow()
});

app.post("/login/", async (req, res) => {
    const loginnow = async () => {
      email = req.body.email
      password = req.body.password
      console.log(email)
      const fetchPromise = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(
        response => {
          res.send(response)
          // console.log(response)
          // console.log(response.body)
        }
      );
      // console.log(response)
    };
    await loginnow()
  });
  
// Handle transcribing video from a youtube url
app.post('/transcribefronyoutube/:stringUrl', async (req, res) => {

    // const stringUrl = req.params.stringUrl
    const stringUrl = req.body.url
    console.log("we are working on transcriptions" + stringUrl)
    const audioUrl = stringUrl
    console.log('Received message:', audioUrl);
    
    const audioPath = "cache-audio.mp3"
    const absolutePath = path.resolve(audioPath, __dirname);
    const totalPath = path.join(absolutePath, audioPath);
  
    await new Promise((resolve) => {
      const videoURL = audioUrl;
      console.log(videoURL)
      if (!ytdl.validateURL(videoURL)) {
        throw new Error('Invalid YouTube URL');
      }
      
      const videoReadableStream = ytdl(videoURL, {
        filter: 'audioonly', // Extract audio only
        format: 'mp3' // Save as MP3
      });
        
      const writeStream = fs.createWriteStream(totalPath);
        
      videoReadableStream.pipe(writeStream);
  
      writeStream.on('finish', async () => {
        console.log(`File ${totalPath} has been downloaded successfully!`);
        console.log("Download Completed");
        console.log("Transcribing file");
        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(totalPath),
          model: "whisper-1"
        })
        console.log(transcription)
        console.log("Deleting the file");
        fs.unlink(totalPath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return;
          }
          console.log('File deleted successfully');
        });
        res.send(transcription)
        console.log(transcription)
      });
  
      writeStream.on('error', (err) => {
        console.error('Error downloading the file:', err);
      });
    });
  });
  
// Handle transcribing video from a url
app.post('/transcribe/:stringUrl', (req, res) => {
    const stringUrl = req.params.stringUrl
    console.log("we are working on transcriptions" + stringUrl)
    const audioUrl = replaceAllOneCharAtATime(stringUrl, '-', '/');
    console.log('Received message:', audioUrl);
    
    // Process the message as needed
    // For example, send a response with the message
    // res.send(`Received message: ${audioUrl}`);
    
    const audioFunc = async (audioUrl) => {
      console.log("we are working on transcriptions")
      const audioPath = "cache-audio.mp3"
      const file = fs.createWriteStream(audioPath);
      const absolutePath = path.resolve(audioPath, __dirname);
      const totalPath = path.join(absolutePath, audioPath);
      console.log(totalPath);
      const request = http.get(audioUrl, function(response) {
          response.pipe(file);
          file.on("finish", async () => {
            file.close();
            console.log("Download Completed");
            console.log("Transcribing file");
            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream(totalPath),
                model: "whisper-1"
            })
            console.log(transcription)
            console.log("Deleting the file");
            fs.unlink(totalPath, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                  return;
                }
                console.log('File deleted successfully');
            });
            res.send(transcription)
          });
      });
    }
    audioFunc(audioUrl);
  });
  
  
app.post("/summarize", (req, res) => { 
  const text = req.body.text;

  console.log('Text to Summarize :', text);

  // const text = "In a bustling city where dreams hung like the evening mist, an unlikely companionship sparked between Leo, a reserved bookstore owner with an affinity for forgotten tales, and Elara, a street artist who painted the town with vibrant hues of rebellion. Their paths converged on a serendipitous afternoon when Leo stumbled upon Elara creating a mural on the alley wall adjacent to his store. An unexpected bond blossomed as they shared their passions, weaving narratives and colors into the fabric of their daily lives. Through their shared love for storytelling and art, they uncovered the beauty in embracing the unspoken and discovered that in the quiet harmony of words and colors, they found a canvas for their hearts to speak."
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmM0ZGY5YTMtYzZlMC00YzNkLTg5MmUtZWVhODY5YTFkMTM3IiwidHlwZSI6ImFwaV90b2tlbiJ9.2A-vJ3TvGKSNkVICCcjHYvddH4iy4ObjJpeNB5u5f_U";
  const agent = new http.Agent({ keepAlive: true, keepAliveMsecs: 30000 });

  const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/summarize",
      headers: {
          authorization: `Bearer ${apiKey}`,
      },
      data: {
          show_original_response: false,
          fallback_providers: "",
          output_sentences: 3,
          providers: "microsoft,connexun,openai,emvista",
          text: text,
          language: "en",
          agent: agent,
      },
  };

  axios
  .request(options)
      .then((response) => {
        console.log(text)
        // console.log(response)
        const textSummarized = response.data.microsoft.result
        console.log(textSummarized);
        const resposeData = {
          textSummarized: textSummarized
        }
        res.send(resposeData)
  })
  .catch((error) => {
      console.error(error);
  });
})
