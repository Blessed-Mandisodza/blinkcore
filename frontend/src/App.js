import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { requestChatReply } from "./api/chat";
import { AppHeader } from "./components/AppHeader";
import { BusinessBriefPanel } from "./components/BusinessBriefPanel";
import { ChatComposer } from "./components/ChatComposer";
import { ConversationPanel } from "./components/ConversationPanel";
import { ModeStrip } from "./components/ModeStrip";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import {
  BUSINESS_PROFILE_STORAGE_KEY,
  PROFILE_FIELDS,
  QUICK_PROMPTS,
  STAGE_OPTIONS,
  WORKSPACE_MODES,
  WORKSPACE_MODE_STORAGE_KEY,
  countCompletedFields,
  getInitials,
  loadStoredMode,
  loadStoredProfile,
} from "./constants/workspace";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [workspaceMode, setWorkspaceMode] = useState(() => loadStoredMode());
  const [businessProfile, setBusinessProfile] = useState(() =>
    loadStoredProfile(),
  );
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      BUSINESS_PROFILE_STORAGE_KEY,
      JSON.stringify(businessProfile),
    );
    window.localStorage.setItem(WORKSPACE_MODE_STORAGE_KEY, workspaceMode);
  }, [businessProfile, workspaceMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!sidebarMenuOpen || typeof window === "undefined") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const root = document.documentElement;
    const visualViewport = window.visualViewport;

    const updateViewportVariables = () => {
      const layoutHeight = window.innerHeight;
      const visualHeight = visualViewport?.height || layoutHeight;
      const offsetTop = visualViewport?.offsetTop || 0;
      const keyboardOffset = Math.max(
        0,
        Math.round(layoutHeight - visualHeight - offsetTop),
      );

      root.style.setProperty(
        "--app-mobile-height",
        `${Math.round(visualHeight + offsetTop)}px`,
      );
      root.style.setProperty("--mobile-keyboard-offset", `${keyboardOffset}px`);
      root.classList.toggle("keyboard-open", keyboardOffset > 60);
    };

    updateViewportVariables();

    window.addEventListener("resize", updateViewportVariables);
    visualViewport?.addEventListener("resize", updateViewportVariables);
    visualViewport?.addEventListener("scroll", updateViewportVariables);

    return () => {
      window.removeEventListener("resize", updateViewportVariables);
      visualViewport?.removeEventListener("resize", updateViewportVariables);
      visualViewport?.removeEventListener("scroll", updateViewportVariables);
      root.style.removeProperty("--app-mobile-height");
      root.style.removeProperty("--mobile-keyboard-offset");
      root.classList.remove("keyboard-open");
    };
  }, []);

  const activeMode =
    WORKSPACE_MODES.find((mode) => mode.id === workspaceMode) ||
    WORKSPACE_MODES[0];
  const completedFields = countCompletedFields(businessProfile);
  const quickPrompts = QUICK_PROMPTS[workspaceMode] || QUICK_PROMPTS.general;
  const displayName = businessProfile.businessName.trim() || "Founder";
  const avatarLabel = getInitials(businessProfile.businessName || "");
  const hasConversation = messages.length > 0 || loading;
  const recentChats = messages
    .filter((message) => message.role === "user" && message.content.trim())
    .slice(-4)
    .reverse()
    .map((message, index) => {
      const trimmedContent = message.content.trim();
      const label =
        trimmedContent.length > 40
          ? `${trimmedContent.slice(0, 40).trimEnd()}...`
          : trimmedContent;

      return {
        id: `recent-chat-${messages.length}-${index}`,
        content: trimmedContent,
        label,
      };
    });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setBusinessProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  const handleSendMessage = async (overrideMessage) => {
    const messageToSend = (overrideMessage ?? input).trim();

    if (!messageToSend || loading) {
      return;
    }

    const nextMessages = [
      ...messages,
      { role: "user", content: messageToSend },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await requestChatReply({
        message: messageToSend,
        messages: nextMessages,
        businessProfile,
        workspaceMode,
      });

      setMessages((previousMessages) => [
        ...previousMessages,
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      console.error("Error:", error);

      const errorStatus = error.response?.status;
      const errorMessage =
        error.response?.data?.error ||
        (errorStatus === 429
          ? "The AI provider is rate-limiting this project or the account has no remaining quota. Check your API billing/quota and the Vercel environment variables."
          : null) ||
        ((errorStatus === 401 || errorStatus === 403)
          ? "Authentication failed. Check your API key in Vercel environment variables."
          : null) ||
        error.message ||
        "Failed to get a response from the assistant.";

      setMessages((previousMessages) => [
        ...previousMessages,
        { role: "error", content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = () => {
    setMessages([]);
    setInput("");
  };

  const closeSidebarMenu = () => {
    setSidebarMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <WorkspaceSidebar
        avatarLabel={avatarLabel}
        businessName={businessProfile.businessName}
        menuOpen={sidebarMenuOpen}
        profileExpanded={profileExpanded}
        recentChats={recentChats}
        onCloseMenu={closeSidebarMenu}
        onNewChat={() => {
          handleNewSession();
          closeSidebarMenu();
        }}
        onOpenDashboard={() => {
          setProfileExpanded(false);
          closeSidebarMenu();
        }}
        onOpenProfile={() => {
          setProfileExpanded((previous) => !previous);
          closeSidebarMenu();
        }}
        onSelectRecentChat={(value) => {
          setInput(value);
          setProfileExpanded(false);
          closeSidebarMenu();
        }}
      />
      <div
        className={`sidebar-backdrop ${sidebarMenuOpen ? "visible" : ""}`}
        aria-hidden="true"
        onClick={closeSidebarMenu}
      />

      <main className="workspace-panel">
        <AppHeader
          avatarLabel={avatarLabel}
          completedFields={completedFields}
          modes={WORKSPACE_MODES}
          sidebarMenuOpen={sidebarMenuOpen}
          profileExpanded={profileExpanded}
          workspaceMode={workspaceMode}
          onSelectMode={setWorkspaceMode}
          onToggleSidebarMenu={() =>
            setSidebarMenuOpen((previous) => !previous)
          }
          onToggleProfile={() => setProfileExpanded((previous) => !previous)}
        />

        {profileExpanded && (
          <BusinessBriefPanel
            businessProfile={businessProfile}
            completedFields={completedFields}
            profileFields={PROFILE_FIELDS}
            stageOptions={STAGE_OPTIONS}
            onProfileChange={handleProfileChange}
          />
        )}

        <section className={`chat-layout ${hasConversation ? "active" : ""}`}>
          <ModeStrip
            className="mode-strip-body"
            modes={WORKSPACE_MODES}
            workspaceMode={workspaceMode}
            onSelectMode={setWorkspaceMode}
          />

          <ConversationPanel
            activeMode={activeMode}
            displayName={displayName}
            hasConversation={hasConversation}
            loading={loading}
            messages={messages}
            messagesEndRef={messagesEndRef}
            quickPrompts={quickPrompts}
            onQuickPrompt={handleSendMessage}
          />

          <ChatComposer
            input={input}
            loading={loading}
            placeholder={activeMode.placeholder}
            onInputChange={setInput}
            onSend={handleSendMessage}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
