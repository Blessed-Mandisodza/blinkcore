# Backend Configuration

This directory contains the backend server for the AI Business Assistant application.

## Project Structure

```
backend/
├── server.js           # Main server file
├── package.json        # Project dependencies
├── .env               # Environment variables (not tracked in git)
├── .gitignore         # Git ignore rules
└── API_REFERENCE.md   # API documentation
```

## Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

## Configuration

1. Create or update `.env` file with the following variables:

```
PORT=5000
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NODE_ENV=development
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

Requires `nodemon` to be installed (already in devDependencies)

### Production Mode

```bash
npm start
```

## Available Scripts

- `npm start`: Start the server
- `npm run dev`: Start with nodemon (auto-reload on file changes)

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Enable CORS for all routes
- **dotenv**: Load environment variables from .env file
- **openai**: Official OpenAI Node.js client library

## Development Dependencies

- **nodemon**: Automatically restart the server during development

## API Endpoints

See `API_REFERENCE.md` for detailed API documentation.

## Troubleshooting

### Port already in use

- Change the PORT in .env file
- Or kill the process using the port: `netstat -ano | findstr :5000`

### OpenAI API key not working

- Verify the key is correct from https://platform.openai.com/api-keys
- Ensure your account has sufficient credits

### CORS errors

- The server has CORS enabled for all origins in development
- For production, update the cors() in server.js to restrict origins

### Dependencies installation fails

- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again
