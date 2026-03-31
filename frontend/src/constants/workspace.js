export const BUSINESS_PROFILE_STORAGE_KEY = "assistcore-business-profile";
export const WORKSPACE_MODE_STORAGE_KEY = "assistcore-workspace-mode";

export const EMPTY_PROFILE = {
  businessName: "",
  businessType: "",
  industry: "",
  targetAudience: "",
  stage: "",
  primaryGoal: "",
  keyChallenges: "",
  offerOrIdea: "",
};

export const WORKSPACE_MODES = [
  {
    id: "general",
    label: "General",
    eyebrow: "Open conversation",
    headline: "What would you like to talk about?",
    description:
      "Use a normal back-and-forth chat for everyday questions, ideas, or quick help.",
    placeholder: "Ask anything...",
  },
  {
    id: "idea",
    label: "Idea",
    eyebrow: "Idea shaping",
    headline: "What business idea do you want to pressure-test?",
    description:
      "Validate the problem, audience, and opportunity before you build too much.",
    placeholder: "Describe the business idea you want to validate...",
  },
  {
    id: "strategy",
    label: "Strategy",
    eyebrow: "Founder strategy",
    headline: "What strategic decision should we make next?",
    description:
      "Clarify priorities, positioning, and the next founder move with less noise.",
    placeholder: "Ask for positioning, priorities, or a roadmap...",
  },
  {
    id: "marketing",
    label: "Marketing",
    eyebrow: "Go-to-market",
    headline: "How should this business go to market?",
    description:
      "Shape stronger offers, sharper messaging, and practical launch ideas.",
    placeholder: "Ask for messaging, offers, or a go-to-market plan...",
  },
  {
    id: "growth",
    label: "Growth",
    eyebrow: "Growth system",
    headline: "Where should the business grow from here?",
    description:
      "Use simple experiments, pricing ideas, and retention moves to create momentum.",
    placeholder: "Ask for growth experiments, pricing, or retention ideas...",
  },
];

export const STAGE_OPTIONS = [
  "Idea stage",
  "MVP stage",
  "Early traction",
  "Growing business",
  "Established business",
];

export const QUICK_PROMPTS = {
  general: [
    {
      title: "Ask anything",
      detail: "Start a normal AI conversation without business framing.",
      prompt:
        "Let's have a normal conversation. I'll ask questions and you can reply naturally and clearly.",
    },
    {
      title: "Get quick help",
      detail: "Use it for simple explanations, planning, or everyday help.",
      prompt:
        "Help me think through something clearly and conversationally, like a helpful AI assistant.",
    },
    {
      title: "Brainstorm freely",
      detail: "Use this when you just want ideas and a natural back-and-forth.",
      prompt:
        "Let's brainstorm together in a simple conversational way. Ask a clarifying question if needed, then help me explore ideas.",
    },
  ],
  idea: [
    {
      title: "Validate the idea",
      detail: "Check the problem, buyer urgency, and real demand.",
      prompt:
        "Validate this business idea for me. Break down the problem, the audience, the opportunity, the main risks, and whether it is worth pursuing.",
    },
    {
      title: "Find the first customer",
      detail: "Identify the best early user segment to target first.",
      prompt:
        "Help me identify the best first target customer for this business idea. Include pain points, urgency, and how to reach them.",
    },
    {
      title: "Plan the MVP",
      detail: "Define the smallest version worth building first.",
      prompt:
        "Create a practical MVP plan for this business idea. Include the core feature set, what not to build yet, and the fastest way to test demand.",
    },
  ],
  strategy: [
    {
      title: "30-day plan",
      detail: "Turn the next month into a focused founder roadmap.",
      prompt:
        "Build a practical 30-day founder strategy plan for this business with priorities, risks, and next actions.",
    },
    {
      title: "Sharpen positioning",
      detail: "Make the business feel more specific and differentiated.",
      prompt:
        "Help me sharpen the positioning for this business so it feels more specific and differentiated.",
    },
    {
      title: "Assess the risks",
      detail: "Spot the strategic issues that could slow momentum.",
      prompt:
        "What are the biggest strategic risks in this business right now and what should I do about them?",
    },
  ],
  marketing: [
    {
      title: "Go-to-market plan",
      detail: "Outline launch channels, audience, and first campaign ideas.",
      prompt:
        "Build a go-to-market plan for this business with audience, launch message, channels, and first campaign ideas.",
    },
    {
      title: "Design the offer",
      detail: "Shape a clear offer with pricing logic and value.",
      prompt:
        "Help me design a strong offer for this business with promise, deliverables, pricing logic, and why it should convert.",
    },
    {
      title: "Launch messaging",
      detail: "Draft the headline, positioning, and call to action.",
      prompt:
        "Create launch messaging for this business with a headline, positioning statement, and call to action.",
    },
  ],
  growth: [
    {
      title: "Growth experiments",
      detail: "Find small tests for acquisition, activation, and retention.",
      prompt:
        "Design weekly growth experiments for this business across acquisition, activation, conversion, and retention.",
    },
    {
      title: "Pricing review",
      detail: "Look for packaging and pricing improvements.",
      prompt:
        "Review the pricing strategy for this business and suggest better pricing or packaging experiments.",
    },
    {
      title: "Track the right metrics",
      detail: "Choose a few numbers that matter right now.",
      prompt:
        "What are the most important metrics I should track for this business right now, and why?",
    },
  ],
};

export const PROFILE_FIELDS = [
  {
    name: "businessName",
    label: "Business name",
    placeholder: "Northstar Labs",
  },
  {
    name: "businessType",
    label: "Business type",
    placeholder: "SaaS, consultancy, ecommerce...",
  },
  {
    name: "industry",
    label: "Industry",
    placeholder: "Fintech, health, education...",
  },
  {
    name: "targetAudience",
    label: "Target audience",
    placeholder: "Early-stage founders, small teams...",
  },
  {
    name: "primaryGoal",
    label: "Primary goal",
    placeholder: "Validate demand and get first 10 customers",
  },
  {
    name: "offerOrIdea",
    label: "Offer or idea",
    placeholder: "AI assistant for proposal writing",
    fullWidth: true,
  },
  {
    name: "keyChallenges",
    label: "Key challenges",
    placeholder: "Differentiation, traction, pricing clarity...",
    multiline: true,
    fullWidth: true,
  },
];

export function normalizeProfile(profile) {
  const safeProfile = profile && typeof profile === "object" ? profile : {};

  return {
    businessName:
      typeof safeProfile.businessName === "string"
        ? safeProfile.businessName
        : "",
    businessType:
      typeof safeProfile.businessType === "string"
        ? safeProfile.businessType
        : "",
    industry:
      typeof safeProfile.industry === "string" ? safeProfile.industry : "",
    targetAudience:
      typeof safeProfile.targetAudience === "string"
        ? safeProfile.targetAudience
        : "",
    stage: typeof safeProfile.stage === "string" ? safeProfile.stage : "",
    primaryGoal:
      typeof safeProfile.primaryGoal === "string"
        ? safeProfile.primaryGoal
        : "",
    keyChallenges:
      typeof safeProfile.keyChallenges === "string"
        ? safeProfile.keyChallenges
        : "",
    offerOrIdea:
      typeof safeProfile.offerOrIdea === "string"
        ? safeProfile.offerOrIdea
        : "",
  };
}

export function loadStoredProfile() {
  if (typeof window === "undefined") {
    return EMPTY_PROFILE;
  }

  try {
    const storedProfile = window.localStorage.getItem(
      BUSINESS_PROFILE_STORAGE_KEY,
    );

    if (!storedProfile) {
      return EMPTY_PROFILE;
    }

    return {
      ...EMPTY_PROFILE,
      ...normalizeProfile(JSON.parse(storedProfile)),
    };
  } catch (error) {
    console.error("Failed to load stored business profile:", error);
    return EMPTY_PROFILE;
  }
}

export function loadStoredMode() {
  if (typeof window === "undefined") {
    return "general";
  }

  const storedMode = window.localStorage.getItem(WORKSPACE_MODE_STORAGE_KEY);
  const matchedMode = WORKSPACE_MODES.find((mode) => mode.id === storedMode);

  return matchedMode ? matchedMode.id : "general";
}

export function countCompletedFields(profile) {
  return Object.values(profile).filter(
    (value) => typeof value === "string" && value.trim(),
  ).length;
}

export function getInitials(value) {
  const initials = value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("");

  return initials ? initials.toUpperCase() : "AI";
}
