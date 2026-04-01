require("dotenv").config();

const { OpenAI } = require("openai");

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
const DEFAULT_GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/openai/";
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const DEFAULT_OPENAI_MODEL = "gpt-4.1-mini";

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

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

function getClientSettings() {
  const geminiApiKey = sanitizeString(
    process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  );
  const openAiApiKey = sanitizeString(process.env.OPENAI_API_KEY);

  if (geminiApiKey) {
    const configuredBaseUrl = sanitizeString(
      process.env.GEMINI_BASE_URL || process.env.OPENAI_BASE_URL,
    );
    const configuredModel = sanitizeString(process.env.GEMINI_MODEL);

    return {
      apiKey: geminiApiKey,
      baseURL: configuredBaseUrl || DEFAULT_GEMINI_BASE_URL,
      model: configuredModel || DEFAULT_GEMINI_MODEL,
    };
  }

  if (openAiApiKey) {
    const configuredBaseUrl = sanitizeString(process.env.OPENAI_BASE_URL);
    const configuredModel = sanitizeString(process.env.OPENAI_MODEL);

    return {
      apiKey: openAiApiKey,
      baseURL: configuredBaseUrl || undefined,
      model: configuredModel || DEFAULT_OPENAI_MODEL,
    };
  }

  throw new ApiError(
    500,
    "Missing AI API key. Set GEMINI_API_KEY, GOOGLE_API_KEY, or OPENAI_API_KEY in your environment.",
  );
}

function createClient() {
  const settings = getClientSettings();
  const clientOptions = { apiKey: settings.apiKey };

  if (settings.baseURL) {
    clientOptions.baseURL = settings.baseURL;
  }

  return {
    client: new OpenAI(clientOptions),
    model: settings.model,
  };
}

function buildSystemPrompt({ businessProfile, workspaceMode }) {
  const isGeneralMode = workspaceMode === "general";

  return `
${isGeneralMode
    ? `
You are BlinkCore, a helpful AI assistant.

Your job is to have a natural, clear, useful conversation with the user.

Rules:
- Reply like a normal assistant in a friendly, direct tone.
- Be concise unless the user asks for depth.
- Ask a clarifying question only when it is genuinely needed.
- Use the business profile if it is relevant, but do not force the conversation into a business format.
- Do not use rigid section headings unless the user asks for a structured answer.
      `.trim()
    : `
You are BlinkCore, a practical business strategist for founders and startup teams.

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
  `.trim();
}

async function generateChatReply(body = {}) {
  const message = sanitizeString(body.message);
  const conversation = normalizeConversation(body.messages, message);
  const businessProfile = normalizeBusinessProfile(body.businessProfile);
  const requestedMode = sanitizeString(body.workspaceMode);
  const workspaceMode = WORKSPACE_MODE_GUIDANCE[requestedMode]
    ? requestedMode
    : "general";
  const isGeneralMode = workspaceMode === "general";

  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  const { client, model } = createClient();
  const completion = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt({ businessProfile, workspaceMode }),
      },
      ...conversation,
    ],
  });

  return (
    extractReplyContent(completion.choices?.[0]?.message?.content) ||
    (isGeneralMode
      ? "I could not generate a reply just now. Please try sending your message again with a little more detail."
      : "Diagnosis\nI could not generate a business response.\n\nRecommendation\nTry rephrasing the request with a bit more detail.\n\nRisks / Assumptions\nThe model returned an empty response.\n\nNext Actions\nShare the business idea, goal, and challenge again.")
  );
}

function formatApiError(error) {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  const upstreamStatusCode =
    Number(error?.status) ||
    Number(error?.statusCode) ||
    Number(error?.response?.status);
  const upstreamMessage = sanitizeString(
    error?.response?.data?.error?.message ||
      error?.error?.message ||
      error?.message,
  );

  if (upstreamStatusCode === 401 || upstreamStatusCode === 403) {
    return {
      statusCode: upstreamStatusCode,
      message:
        upstreamMessage ||
        "Authentication failed. Check your AI API key in Vercel environment variables.",
    };
  }

  if (upstreamStatusCode === 429) {
    return {
      statusCode: upstreamStatusCode,
      message:
        upstreamMessage ||
        "The AI provider rate-limited this request. Try again in a moment.",
    };
  }

  if (upstreamStatusCode >= 400 && upstreamMessage) {
    return {
      statusCode: upstreamStatusCode,
      message: upstreamMessage,
    };
  }

  if (upstreamMessage) {
    return {
      statusCode: 500,
      message: upstreamMessage,
    };
  }

  return {
    statusCode: 500,
    message: "Internal server error",
  };
}

module.exports = {
  generateChatReply,
  formatApiError,
};
