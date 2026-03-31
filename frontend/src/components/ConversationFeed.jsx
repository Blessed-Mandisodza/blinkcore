export function ConversationFeed({ loading, messages, messagesEndRef }) {
  return (
    <div className="conversation-feed">
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={`message-row message-row-${message.role}`}
        >
          {message.role !== "user" && (
            <div className="message-avatar">
              {message.role === "assistant" ? "AI" : "!"}
            </div>
          )}
          <div className={`message-card message-${message.role}`}>
            <p className="message-role">
              {message.role === "user"
                ? "You"
                : message.role === "assistant"
                  ? "AssistCore"
                  : "System"}
            </p>
            <p>{message.content}</p>
          </div>
        </div>
      ))}

      {loading && (
        <div className="message-row message-row-assistant">
          <div className="message-avatar">AI</div>
          <div className="message-card message-loading">
            <p className="message-role">BlinkCore</p>
            <p>Thinking through the best response...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
