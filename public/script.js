async function generateText() {
    const prompt = document.getElementById('prompt').value;
    const theme = document.getElementById('theme').value;
    const style = document.getElementById('style').value;
  
    const poemPrompt = `Write a ${style} poem about ${theme} using the <10 words: ${prompt}`;
  
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: poemPrompt })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();

  
      if (data.text) {
        console.log('API Response:', data.text);
        printText(data.text.text);
      } else {
        document.getElementById('output').innerText = 'No text generated.';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('output').innerText = 'Error generating text.';
    }
  }
  
  function printText(text) {
    const outputElement = document.getElementById('output');
    outputElement.innerText = '';
    function updateText(index) {
        if (index < text.length) {
            setTimeout(function() {
                // Add the next character to the element's content
                outputElement.innerText += text.charAt(index);
                if (text.charAt(index) === ' ') {
                    outputElement.innerText += '\u00A0'; // Unicode for non-breaking space
                }
                // Call the function recursively for the next character
                updateText(index + 1);
            }, 50); // Adjust the delay (in milliseconds) between each character
        }
    }

    // Start updating text from the first character
    updateText(0);
  }
  
  function downloadPoem() {
    const poem = document.getElementById('output').innerText;
    const blob = new Blob([poem], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poem.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  
  function startVoiceInput() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('prompt').value = transcript;
    };
  
    recognition.onerror = function(event) {
      console.error('Error occurred in recognition: ', event.error);
    };
  
    recognition.start();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Set default theme
    document.documentElement.setAttribute('data-theme', 'light');
  });
  