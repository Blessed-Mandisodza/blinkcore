# AI Business Assistant

A full-stack AI-powered business assistant application built with React and Express.js, powered by OpenAI API.

## Project Structure

- **backend/**: Node.js Express server with OpenAI integration
- **frontend/**: React application for the user interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup Instructions

### 1. Backend Setup

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file with your configuration:

```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

Or use development mode with auto-reload:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

In a new terminal, navigate to the frontend folder:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## How to Use

1. Make sure both backend and frontend servers are running
2. Open the frontend in your browser at `http://localhost:3000`
3. Type a message in the chat input field
4. Click "Send" or press Enter
5. The AI assistant will respond with an answer powered by OpenAI's GPT model

## API Endpoints

### POST /api/chat

Send a message to the AI assistant.

**Request Body:**

```json
{
  "message": "Your message here"
}
```

**Response:**

```json
{
  "reply": "AI response here"
}
```

## Technologies Used

**Backend:**

- Express.js
- OpenAI API
- CORS
- dotenv

**Frontend:**

- React
- Axios
- CSS3 for styling

## Troubleshooting

- If the frontend can't connect to the backend, make sure the backend server is running on port 5000
- Update your OpenAI API key in the `.env` file before running the backend
- Clear your browser cache if you encounter any issues

## License

MIT
