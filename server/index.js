const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
if (!TOGETHER_API_KEY) {
  console.error('Error: TOGETHER_API_KEY environment variable is not set.');
  process.exit(1);
}

const INTERNSHIPS_LIST = `
INTERNSHIPS LIST
-------------------------------
1. MACHINE LEARNING
2. ROBOTICS
3. FULL STACKS WEB DEVELOPMENT
4. PHYTON FULL STACKS
5. C-LANGUAGE
6. PYTHON
7. JAVA
8. CLOUD COMPUTING
9. DATA SCIENCE
10. DATA ANALYTICS
11. ARTIFICIAL INTELLIGENCE
`;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Store user state in memory (simple for demo)
const userState = {};

app.post('/whatsapp', async (req, res) => {
  const from = req.body.From;
  const incomingMsg = req.body.Body ? req.body.Body.trim() : '';

  const twiml = new MessagingResponse();

  // If user is new or says "menu", send the list
  if (!userState[from] || /menu|list|hi|hello/i.test(incomingMsg)) {
    userState[from] = { sentList: true };
    twiml.message(INTERNSHIPS_LIST + '\n\nReply with any question to chat!');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }

  // Otherwise, use Together AI (Llama 3) to answer
  try {
    const llamaRes = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [
          { role: "system", content: "You are a helpful assistant. Keep your answers concise and under 100 words." },
          { role: "user", content: incomingMsg }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    let llamaReply = llamaRes.data.choices?.[0]?.message?.content;
    if (!llamaReply || !llamaReply.trim()) {
      llamaReply = "Sorry, I couldn't generate a response. Please try rephrasing your question.";
    }
    const MAX_WHATSAPP_LENGTH = 1500;
    if (llamaReply.length > MAX_WHATSAPP_LENGTH) {
      llamaReply = llamaReply.slice(0, MAX_WHATSAPP_LENGTH - 20) + "\n\n[Message truncated]";
    }
    llamaReply = llamaReply.replace(/[*_`~]/g, '');
    twiml.message(llamaReply);
  } catch (err) {
    console.error('Llama API error:', err.response?.data || err.message || err);
    twiml.message("Sorry, there was an error connecting to Llama 3.");
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Express server listening on port', PORT);
});
