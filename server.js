const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.cohere.ai/generate', {
      prompt,
      max_tokens: 50, 
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer V6YOv93eBmR9vfZFzdxwQfNknUP7Ouzx7zIgi0Xo`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Cohere API Response:', response.data);
    res.json({ text: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
