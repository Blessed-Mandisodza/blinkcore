const express = require("express");
const cors = require("cors");

const { formatApiError, generateChatReply } = require("./chat-service");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AI Business Assistant Backend is running" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const reply = await generateChatReply(req.body);
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    const { statusCode, message } = formatApiError(error);
    res.status(statusCode).json({ error: message });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
