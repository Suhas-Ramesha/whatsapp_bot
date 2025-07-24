# WhatsApp Chatbot with Node.js, Twilio, and Together AI (Llama 3)
--- 
## 🚀 How to Chat with the Bot

### 1. Add the Twilio Sandbox Number to WhatsApp:
Number: +1 415 523 8886

### 2. Join the Sandbox:
Send the following code as a WhatsApp message to the number above:
```Code: join machinery-duck```

### 3. Start Chatting:
- After joining, send hi, hello, or menu to receive the INTERNSHIPS LIST.
- Ask any question to chat with the AI bot!
--- 
## Step-by-Step: How This Project Was Built

### 1. Twilio Account & WhatsApp Sandbox Setup
- Created a Twilio account.
- Activated the WhatsApp Sandbox in the Twilio Console.
- Noted the sandbox phone number and unique join code (see above).
- Joined the sandbox by sending the join code from my WhatsApp to the Twilio number.
  
### 2. Together AI for Llama 3 API
- Signed up at Together AI (free tier available).
- Generated an API key for Llama 3 (Meta’s open-source large language model).
- Chose Together AI because Google Gemini API has regional restrictions and is not always available.
  
### 3. Project Setup
- Initialized a Node.js project and installed dependencies:
- express (web server)
- body-parser (parsing POST requests)
- axios (for API calls)
- twilio (for WhatsApp integration)
- dotenv (for environment variables)
- Wrote the server code to:
- Respond with an INTERNSHIPS LIST on first contact or when prompted.
- Use Together AI’s Llama 3 to answer user questions.
  
### 4. Environment Variables
- Created a .env file (not committed to GitHub) to securely store the Together AI API key:
```text :   TOGETHER_API_KEY=your_together_ai_api_key_here ```
  
### 5. Local Testing with ngrok
- Ran the server locally with node index.js.
- Used ngrok to expose the local server to the internet:
```text :   ngrok http 3000 ```
- Copied the HTTPS URL from ngrok.

### 6. Connecting Twilio to the Bot
- In the Twilio WhatsApp Sandbox settings, set the “When a message comes in” webhook to:
```text :   https://your-ngrok-or-cloud-url/whatsapp ```
- Clicked Save.

### 7. Public Deployment with Render
- Pushed the project to GitHub (excluding .env and node_modules).
- Created a free web service on Render:
- Connected the GitHub repo.
- Set the root directory to server (if applicable).
- Set the start command to node index.js.
- Added the TOGETHER_API_KEY as an environment variable in Render’s dashboard.
- Used the Render public URL as the Twilio webhook for 24/7 access.
---
## Features
- WhatsApp integration via Twilio Sandbox
- AI-powered chat using Together AI (Llama 3)
- Easy deployment (local or cloud)
- Secure API key management with environment variables
---
## Prerequisites
- Node.js & npm
- Twilio account with WhatsApp Sandbox enabled
- Together AI account and API key
- (Optional) ngrok for local testing
---
## Setup
- Clone the repository:
```sh :
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/server
```
- Install dependencies:
```sh :
   npm install
```
- Configure environment variables:
Create a .env file in the server/ directory:
```text :
   TOGETHER_API_KEY=your_together_ai_api_key_here
```
- Start the server:
```sh :
   node index.js
```
- (Optional) Expose your server with ngrok:
```sh :
   ngrok http 3000
```
- Copy the HTTPS URL provided by ngrok.
---
## Twilio WhatsApp Sandbox Setup
- Go to Twilio WhatsApp Sandbox.
- In the "When a message comes in" field, enter your public URL (from ngrok or your cloud deployment) with /whatsapp at the end, e.g.:
```text :
   https://your-ngrok-or-cloud-url/whatsapp
```
- Click Save.
- Join the sandbox by sending the join code (shown in Twilio console) from your WhatsApp to the Twilio sandbox number.
---
## Deployment (Cloud)
You can deploy this bot to any Node.js-friendly cloud platform (Render, Railway, Replit, etc.):
- Push your code to GitHub.
- Create a new web service on your chosen platform.
- Set the environment variable TOGETHER_API_KEY in the platform's dashboard.
- Set the start command to node server/index.js.
- Use the public URL provided by the platform as your Twilio webhook.
---
## Usage
- Send "hi", "hello", or "menu" to the WhatsApp sandbox number to receive the INTERNSHIPS
  LIST.
- Ask any question to chat with the AI (Llama 3 via Together AI).
- The bot will reply with concise answers.
---
## Environment Variables
- TOGETHER_API_KEY — Your Together AI API key (keep this secret!)
--- 
## Security
- Do not commit your .env file or API keys to version control.
- node_modules/ is excluded via .gitignore.
---
## License
MIT 
