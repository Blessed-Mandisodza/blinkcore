const { formatApiError, generateChatReply } = require("../backend/chat-service");

function getRequestBody(body) {
  if (body && typeof body === "object") {
    return body;
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch (error) {
      return {};
    }
  }

  return {};
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const reply = await generateChatReply(getRequestBody(req.body));
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error:", error);
    const { statusCode, message } = formatApiError(error);

    return res.status(statusCode).json({ error: message });
  }
};
