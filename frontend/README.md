# Frontend Configuration

This directory contains the React frontend for the AI Business Assistant application.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.js             # Main App component
│   ├── App.css            # App styling
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Project dependencies
└── .gitignore            # Git ignore rules
```

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm start
```

This will:

- Start the React development server on http://localhost:3000
- Automatically open the app in your default browser
- Hot-reload on file changes

### Build for Production

```bash
npm build
```

This creates an optimized production build in the `build/` directory.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive mode.

## Available Scripts

- `npm start`: Start development server
- `npm build`: Create production build
- `npm test`: Run tests
- `npm eject`: Eject from Create React App (irreversible!)

## Dependencies

- **react**: JavaScript library for building user interfaces
- **react-dom**: React package for working with the DOM
- **react-scripts**: Build scripts for Create React App
- **axios**: HTTP client for making API requests

## Features

- Real-time chat interface
- Clean and modern UI with gradient design
- Message history display
- Loading indicator while waiting for response
- Error handling with user-friendly messages
- Responsive design

## Component Architecture

### App Component (App.js)

Main component that handles:

- State management for messages and input
- API calls to backend `/api/chat` endpoint
- Message rendering and styling
- User input handling

### Styling (App.css)

- Gradient background
- Chat container with shadow effects
- Message bubbles (user/assistant/error)
- Responsive input area with send button

## API Integration

The frontend communicates with the backend via:

```javascript
axios.post("http://localhost:5000/api/chat", {
  message: userMessage,
});
```

Ensure the backend is running on `http://localhost:5000`

## Troubleshooting

### Backend not connecting

- Verify backend server is running on http://localhost:5000
- Check browser console for CORS errors
- Ensure backend `.env` has correct OPENAI_API_KEY

### Blank page or errors

- Clear browser cache: Ctrl+Shift+Delete
- Check browser console (F12) for errors
- Verify Node.js and npm versions are compatible

### Port 3000 already in use

- Kill the process using port 3000
- Or set a different port: `PORT=3001 npm start`

### Dependencies installation issues

- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

## Customization

### Change API Base URL

Edit the API call in `App.js`:

```javascript
const response = await axios.post("http://your-server:port/api/chat", {
  message: userMessage,
});
```

### Modify Styling

- Edit `App.css` for component styling
- Edit `index.css` for global styles
- Colors: Adjust gradient colors in `.App` and `.chat-header`

### Add More Features

- Add message persistence with localStorage
- Implement user authentication
- Add typing indicators
- Implement message reactions
- Add file upload capability
