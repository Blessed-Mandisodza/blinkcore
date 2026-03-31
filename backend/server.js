const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

const WORKSPACE_MODE_GUIDANCE = {
  general:
    "Use a natural conversational tone for general questions, brainstorming, explanations, and everyday AI assistance.",
  idea: "Focus on validating the opportunity, narrowing the audience, shaping the offer, and defining a lightweight MVP.",
  strategy:
    "Focus on positioning, business priorities, decision quality, sequencing, and a clear founder roadmap.",
  marketing:
    "Focus on go-to-market strategy, messaging, offers, channels, audience resonance, and launch execution.",
  growth:
    "Focus on experiments, pricing, activation, retention, conversion, and the next measurable growth moves.",
};

const DEFAULT_PROFILE_VALUES = {
  businessName: "Not provided",
  businessType: "Not provided",
  industry: "Not provided",
  targetAudience: "Not provided",
  stage: "Not provided",
  primaryGoal: "Not provided",
  keyChallenges: "Not provided",
  offerOrIdea: "Not provided",
};
const MAX_CONVERSATION_MESSAGES = 16;

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

app.use(cors());
app.use(express.json());

function sanitizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBusinessProfile(profile) {
  const safeProfile = profile && typeof profile === "object" ? profile : {};

  return {
    businessName: sanitizeString(safeProfile.businessName),
    businessType: sanitizeString(safeProfile.businessType),
    industry: sanitizeString(safeProfile.industry),
    targetAudience: sanitizeString(safeProfile.targetAudience),
    stage: sanitizeString(safeProfile.stage),
    primaryGoal: sanitizeString(safeProfile.primaryGoal),
    keyChallenges: sanitizeString(safeProfile.keyChallenges),
    offerOrIdea: sanitizeString(safeProfile.offerOrIdea),
  };
}

function buildBusinessContext(profile) {
  return Object.entries(DEFAULT_PROFILE_VALUES)
    .map(([key, fallbackValue]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (character) => character.toUpperCase());
      const value = profile[key] || fallbackValue;

      return `- ${formattedKey}: ${value}`;
    })
    .join("\n");
}

function extractReplyContent(content) {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        if (part && typeof part.text === "string") {
          return part.text;
        }

        return "";
      })
      .join("\n")
      .trim();
  }

  return "";
}

function normalizeConversation(messages, latestMessage) {
  const normalizedMessages = Array.isArray(messages)
    ? messages
        .map((message) => ({
          role: sanitizeString(message?.role),
          content: sanitizeString(message?.content),
        }))
        .filter(
          (message) =>
            (message.role === "user" || message.role === "assistant") &&
            message.content,
        )
    : [];

  const finalMessages =
    normalizedMessages.length > 0 &&
    normalizedMessages[normalizedMessages.length - 1].role === "user" &&
    normalizedMessages[normalizedMessages.length - 1].content === latestMessage
      ? normalizedMessages
      : [...normalizedMessages, { role: "user", content: latestMessage }];

  return finalMessages.slice(-MAX_CONVERSATION_MESSAGES);
}

app.get("/", (req, res) => {
  res.json({ message: "AI Business Assistant Backend is running" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = sanitizeString(req.body?.message);
    const conversation = normalizeConversation(req.body?.messages, message);
    const businessProfile = normalizeBusinessProfile(req.body?.businessProfile);
    const requestedMode = sanitizeString(req.body?.workspaceMode);
    const workspaceMode = WORKSPACE_MODE_GUIDANCE[requestedMode]
      ? requestedMode
      : "general";
    const isGeneralMode = workspaceMode === "general";

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `
${isGeneralMode
            ? `
You are AssistCore, a helpful AI assistant.

Your job is to have a natural, clear, useful conversation with the user.

Rules:
- Reply like a normal assistant in a friendly, direct tone.
- Be concise unless the user asks for depth.
- Ask a clarifying question only when it is genuinely needed.
- Use the business profile if it is relevant, but do not force the conversation into a business format.
- Do not use rigid section headings unless the user asks for a structured answer.
            `.trim()
            : `
You are AssistCore, a practical business strategist for founders and startup teams.

Your job is to help with business ideas, validation, positioning, planning, offers, launches, pricing, and growth decisions.

Rules:
- Use the business context provided to tailor your thinking.
- Be concrete, strategic, and action-oriented.
- Avoid generic motivational filler.
- If the business context is incomplete, make the smallest useful assumption and say so briefly.
- Prefer prioritization, tradeoffs, and next steps over abstract theory.
- Keep the answer readable and founder-friendly.

Always respond with these exact section headings:
Diagnosis
Recommendation
Risks / Assumptions
Next Actions
            `.trim()}

Current workspace mode: ${workspaceMode}
Mode guidance: ${WORKSPACE_MODE_GUIDANCE[workspaceMode]}

Business profile:
${buildBusinessContext(businessProfile)}
          `.trim(),
        },
        ...conversation,
      ],
    });

    const reply =
      extractReplyContent(completion.choices?.[0]?.message?.content) ||
      (isGeneralMode
        ? "I could not generate a reply just now. Please try sending your message again with a little more detail."
        : "Diagnosis\nI could not generate a business response.\n\nRecommendation\nTry rephrasing the request with a bit more detail.\n\nRisks / Assumptions\nThe model returned an empty response.\n\nNext Actions\nShare the business idea, goal, and challenge again.");

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
