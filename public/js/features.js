document.addEventListener("DOMContentLoaded", function() {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const fileInfo = document.getElementById("fileInfo");
    const trascribedText = document.getElementById("trascribedText");
    const analyzedContent = document.getElementById("analyzedContent");
    const summarizeBtn = document.getElementById("summarize_btn");
    const keywordsBtn = document.getElementById("keywords_btn");
    const translateBtn = document.getElementById("translate_btn");
    const LanguageContainer = document.getElementById("language_container");
    const langSelected = document.getElementById("lang_selected");
    const youtuveOrVideo = document.getElementById("youtube_or_video");
    const useYoutube = document.getElementById("use_youtube");
    const uploadVideo = document.getElementById("upload_video");
    const youtubeUrlInput = document.getElementById("youtube_url");
    const ytVideos = document.getElementById("transcribe_yt_video");
    const loadingIcon = document.getElementById("spinner");
    let text = "Please put a text to be analysed"
    url = "http://18.223.182.143:3000/"
    let translatedText = ""
    let languageSelected = "en"
    let fromYoutube = false

    const languages = [
        { name: 'English', symbol: 'en' },
        { name: 'Spanish', symbol: 'es' },
        { name: 'French', symbol: 'fr' },
        { name: 'Swahili', symbol: 'sw' },
        { name: 'German', symbol: 'de' },
        { name: 'Chinese (Simplified)', symbol: 'zh-CN' },
        { name: 'Chinese (Traditional)', symbol: 'zh-TW' },
        { name: 'Japanese', symbol: 'ja' },
        { name: 'Korean', symbol: 'ko' },
        { name: 'Russian', symbol: 'ru' },
        { name: 'Arabic', symbol: 'ar' },
        { name: 'Portuguese', symbol: 'pt' },
        { name: 'Italian', symbol: 'it' },
        { name: 'Dutch', symbol: 'nl' },
        { name: 'Greek', symbol: 'el' },
        { name: 'Hindi', symbol: 'hi' },
        { name: 'Swedish', symbol: 'sv' },
        { name: 'Polish', symbol: 'pl' },
        { name: 'Turkish', symbol: 'tr' },
        { name: 'Thai', symbol: 'th' },
        { name: 'Vietnamese', symbol: 'vi' }
    ];
    
    const displayLanguages = () => {
        LanguageContainer.innerHTML = ""
        languages.forEach(lang => {
            let langName = lang.name.replace(' ', '').replace('(', '').replace(')', '')
            LanguageContainer.innerHTML += `<a id="${langName}${lang.symbol}" class="dropdown-item">${lang.name}</a>`
        });
    }
    
    displayLanguages()
    
    languages.forEach(lang => {
        let langName = lang.name.replace(' ', '').replace('(', '').replace(')', '')
        document.getElementById(`${langName}${lang.symbol}`)
                .addEventListener("click", function () {
                    langSelected.innerHTML = `${lang.name}`
                    languageSelected = lang.symbol
                }
            );
    })

    trascribedText.addEventListener('input', function handleChange(event) {
        text = trascribedText.innerText
      });

    dropZone.addEventListener("click", function() {
        fileInput.click();
    });

    let isUseYoutube = true
    youtuveOrVideo.addEventListener("click", function () {
        if (isUseYoutube) {
            youtuveOrVideo.innerText = "Upload a video"
            useYoutube.classList.remove('d-none')
            useYoutube.classList.add('d-block')
            uploadVideo.classList.remove('d-block')
            uploadVideo.classList.add('d-none')
            isUseYoutube = false
        } else {
            youtuveOrVideo.innerText = "Use Youtube Link"
            useYoutube.classList.remove('d-block')
            useYoutube.classList.add('d-none')
            uploadVideo.classList.remove('d-none')
            uploadVideo.classList.add('d-block')
            isUseYoutube = true
        }
        
    });

    dropZone.addEventListener("dragover", function(event) {
        event.preventDefault();
        dropZone.classList.add("border-primary");
    });

    dropZone.addEventListener("dragleave", function() {
        dropZone.classList.remove("border-primary");
    });

    dropZone.addEventListener("drop", function(event) {
        event.preventDefault();
        dropZone.classList.remove("border-primary");
        const droppedFiles = event.dataTransfer.files;

        // if (droppedFiles.length > 0) {
        //     handleFileTranscription(droppedFiles[0]);
        // }
    });

    fileInput.addEventListener("change", function() {
        const selectedFile = fileInput.files[0];
        handleFileUpload(selectedFile);
        loadingIcon.classList.remove("hide")
        loadingIcon.classList.add("show")
    });

    function handleFileUpload(file) {
        loadingIcon.classList.remove("hide")
        loadingIcon.classList.add("show")
        const cloudName = 'dpsuoqwje';
        const uploadPreset = 'ml_default';
        const apiKey = '341478294148344';
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('api_key', apiKey);

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded to Cloudinary:', data);
            // Extract URL from the response
            const uploadedUrl = data.secure_url;
            
            console.log('Uploaded URL:', uploadedUrl);
            handleFileTranscription(uploadedUrl)
        })
        .catch(error => {
            console.error('Error uploading file to Cloudinary:', error);
        });
        loadingIcon.classList.remove("show")
        loadingIcon.classList.add("hide")
    }
    
    const handleFileTranscription = async (fileUrl) => {
        loadingIcon.classList.remove("hide")
        loadingIcon.classList.add("show")
        console.log("ready to transcribe the file" + fileUrl)
        const newUrlString = replaceAllOneCharAtATime(fileUrl, '/', '-');
        const postData = {
            message: fileUrl
        };

        fetch(`${url}/transcribe/${newUrlString}`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                text = data.text
                trascribedText.innerText = data.text;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // fileInfo.innerHTML = `<p>Trascription being processed for: ${file.name}</p>`;

        // const fileType = 'audio';
        // const model = 'whisper-1';
        // const orgID = 'org-7tltzghSvHlgOlGuDYkR0FQB';
        // const apiKey = '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';
        // const auth = `Bearer ${apiKey}`

        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('model', model);
        // // formData.append('model', model);

        // axios.post('https://api.openai.com/v1/audio/transcriptions', {
        //     model: 'whisper-1',
        //     file: file,
        // }, {
        //     headers: {
        //         'Authorization': auth,
        //         'Content-Type': 'application/json', // Make sure to set the Content-Type
        //     }
        // })
        // .then(response => {
        //     console.log('Response', response.data); // Access response data with response.data
        // })
        // .catch(error => {
        //     console.error('Error transcribing:', error);
        // });


        // fetch('https://api.openai.com/v1/audio/transcriptions', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': auth
        //     },
        //     body: {
        //         model: 'whisper-1',
        //         file: file,
        //     }
        // })
        // .then(response => {
        //     response.json();
        //     console.log('Response', response);
        // })
        // .then(data => {
        //     console.log('Transcription result', data);
        //     // // Extract URL from the response
        //     // const uploadedUrl = data.secure_url;
            
        //     // console.log('Uploaded URL:', uploadedUrl);
        //     // // Now you can use the uploaded URL as needed
        //     // fileInfo.innerHTML = `<p>File being uploaded: ${file.name}</p>`;
        //     // handleFileUpload(file);
        // })
        // .catch(error => {
        //     console.error('Error transcribing:', error);
        // });
        
        loadingIcon.classList.remove("show")
        loadingIcon.classList.add("hide")
    }
    const handleFileTranscriptionYoutube = async () => {
        loadingIcon.classList.remove("hide")
        loadingIcon.classList.add("show")
        fileUrl = youtubeUrlInput.value
        const newUrlString = replaceAllOneCharAtATime(fileUrl, '/', '-');
        const postData = {
            url: fileUrl
        };

        fetch(`${url}/transcribefronyoutube/${newUrlString}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                text = data.text
                trascribedText.innerText = data.text;
            })
            .catch(error => {
                console.error('Error:', error);
            });
            loadingIcon.classList.remove("show")
            loadingIcon.classList.add("hide")
        
    }
    
    function replaceAllOneCharAtATime(inSource, inToReplace, inReplaceWith) {
        var output="";
        var firstReplaceCompareCharacter = inToReplace.charAt(0);
        var sourceLength = inSource.length;
        var replaceLengthMinusOne = inToReplace.length - 1;
        for(var i = 0; i < sourceLength; i++){
            var currentCharacter = inSource.charAt(i);
            var compareIndex = i;
            var replaceIndex = 0;
            var sourceCompareCharacter = currentCharacter;
            var replaceCompareCharacter = firstReplaceCompareCharacter;
            while(true){
                if(sourceCompareCharacter != replaceCompareCharacter){
                output += currentCharacter;
                break;
            }
            if(replaceIndex >= replaceLengthMinusOne) {
                i+=replaceLengthMinusOne;
                output += inReplaceWith;
                //was a match
                break;
            }
            compareIndex++; replaceIndex++;
            if(i >= sourceLength){
                // not a match
                break;
            }
            sourceCompareCharacter = inSource.charAt(compareIndex)
                replaceCompareCharacter = inToReplace.charAt(replaceIndex);
            }   
            replaceCompareCharacter += currentCharacter;
        }
        return output;
    }

    const handleSummarization = async () => {
        const dataToSend = {
            text: trascribedText.value
        };

        fetch('/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            return response.json();
            // Handle the response from the server
        })
        .then(data => {
            console.log(data)
            text = data.textSummarized
            translatedText = text
            analyzedContent.innerText = text
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });
    }

    const handleKeyWordExtraction = async () => {
        const dataToSend = {
            text: trascribedText.value
        };

        fetch('/key-words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            return response.json();
            // Handle the response from the server
        })
        .then(data => {
            console.log(data)
            const keywords = data.keywordsList
            const listText = keywords.map(item => `- ${item.keyword}`).join('\n');
            console.log(listText)
            analyzedContent.value = listText
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });
    }

    const handleTranslation = async () => { 
        const dataToSend = {
            text: ((translatedText == "") ? translatedText : analyzedContent.value),
            lang: languageSelected,
        };

        if (dataToSend.text == "") return;
        
        fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            return response.json();
            // Handle the response from the server
        })
        .then(data => {
            console.log(data.translation)
            analyzedContent.innerText = data.translation
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });
    }

    ytVideos.addEventListener("click", async () => {
        // analyzedContent.innerText = ""
        const transcrive = await handleFileTranscriptionYoutube()
    })

    summarizeBtn.addEventListener("click", async () => {
        // analyzedContent.innerText = ""
        const summarize = await handleSummarization()
    })

    translateBtn.addEventListener("click", async () => {
        const translate = await handleTranslation()
    })

    keywordsBtn.addEventListener("click", async () => {
        analyzedContent.innerText = ""
        const keywords = await handleKeyWordExtraction()
    })

});
