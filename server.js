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
