import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function requestChatReply({
  message,
  messages,
  businessProfile,
  workspaceMode,
}) {
  const response = await axios.post(`${API_BASE_URL}/api/chat`, {
    message,
    messages,
    businessProfile,
    workspaceMode,
  });

  return response.data.reply;
}
