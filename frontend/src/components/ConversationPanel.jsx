import { ConversationFeed } from "./ConversationFeed";
import { WelcomeState } from "./WelcomeState";

export function ConversationPanel({
  activeMode,
  displayName,
  hasConversation,
  loading,
  messages,
  messagesEndRef,
  onQuickPrompt,
  quickPrompts,
}) {
  return (
    <section className="conversation-card">
      {hasConversation ? (
        <ConversationFeed
          loading={loading}
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
      ) : (
        <div className="conversation-empty-state">
          <WelcomeState
            activeMode={activeMode}
            displayName={displayName}
            quickPrompts={quickPrompts}
            onQuickPrompt={onQuickPrompt}
          />
        </div>
      )}
    </section>
  );
}
