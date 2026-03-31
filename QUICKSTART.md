# Quick Start Guide

## For Windows Users

### Step 1: Install Dependencies

Double-click `install.bat` file to automatically install all dependencies for both backend and frontend.

Or run from PowerShell:

```powershell
.\install.bat
```

### Step 2: Configure Backend

1. Open `backend\.env`
2. Replace `your_openai_api_key_here` with your actual OpenAI API key
3. Save the file

Get your API key from: https://platform.openai.com/api-keys

### Step 3: Start Backend

Open PowerShell/Command Prompt:

```
cd backend
npm start
```

You should see: `Server running on http://localhost:5000`

### Step 4: Start Frontend

Open another PowerShell/Command Prompt window:

```
cd frontend
npm start
```

The app will automatically open at `http://localhost:3000`

### Step 5: Use the Application

1. Type your business question in the chat input
2. Press Enter or click Send
3. Wait for the AI to respond
4. Continue the conversation

## For Mac/Linux Users

### Step 1: Install Dependencies

Open Terminal and run:

```bash
chmod +x install.sh
./install.sh
```

Or manually:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Configure Backend

```bash
nano backend/.env
```

Edit the API key and save (Ctrl+O, Enter, Ctrl+X)

### Step 3: Start Backend

```bash
cd backend
npm start
```

### Step 4: Start Frontend

Open a new terminal window:

```bash
cd frontend
npm start
```

### Step 5: Use the Application

Same as Windows - type questions and chat with the AI

## What's Running Where

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Both need to be running for the app to work.

## Troubleshooting

**Q: Frontend shows "Loading..." forever**
A: Backend is not running. Check if port 5000 is in use.

**Q: "Failed to get response from server"**
A: Check OpenAI API key in backend/.env

**Q: Port already in use**
A: Change PORT in backend/.env or kill the process using the port

**Q: npm command not found**
A: Install Node.js from https://nodejs.org/

## Project Files Overview

```
ai-business-assistant-reactmain/
├── backend/                 # Express.js API server
│   ├── server.js           # Main server code
│   ├── package.json        # Backend dependencies
│   ├── .env                # Configuration (add API key here)
│   ├── README.md           # Backend documentation
│   └── API_REFERENCE.md    # API endpoints documentation
├── frontend/               # React app
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
├── README.md              # Main project documentation
├── install.bat            # Auto-install (Windows)
├── install.sh             # Auto-install (Mac/Linux)
└── .code-workspace        # VS Code workspace file
```

## Need Help?

1. Check the README.md in the root folder
2. Check backend/README.md for server issues
3. Check frontend/README.md for UI issues
4. Check backend/API_REFERENCE.md for API details

Happy coding!
