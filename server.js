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

