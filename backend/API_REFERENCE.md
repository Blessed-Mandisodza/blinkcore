# Backend API Reference

## Base URL

```
http://localhost:5000
```

## Endpoints

### 1. Health Check

**GET /api/health**

Returns the status of the server.

**Response:**

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 2. Chat with AI

**POST /api/chat**

Send a message to the AI assistant and receive a response.

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "message": "What is the best strategy for business growth?"
}
```

**Response (200 OK):**

```json
{
  "reply": "To achieve business growth, consider these strategies: 1. Market research... 2. Customer retention... etc."
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Message is required"
}
```

**Error Response (500 Internal Server Error):**

```json
{
  "error": "Internal server error"
}
```

## Models Used

- **GPT-3.5-turbo**: Default model for chat completions

## Authentication

- Currently no authentication required (development mode)
- Production: Add API key authentication

## Environment Variables

- `PORT`: Server port (default: 5000)
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `NODE_ENV`: Environment (development/production)

## Error Handling

- All errors return appropriate HTTP status codes
- Error messages are included in response JSON
- Check browser console for detailed error logs on frontend
