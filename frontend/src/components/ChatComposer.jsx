export function ChatComposer({
  input,
  loading,
  placeholder,
  onInputChange,
  onSend,
}) {
  const buttonLabel = loading ? "Generating response" : "Send message";

  return (
    <div className="composer-shell">
      <span className="composer-mark">BC</span>
      <div className="composer">
        <input
          type="text"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && void onSend()}
          placeholder={placeholder}
          disabled={loading}
        />
        <button
          className={`composer-submit-button ${loading ? "loading" : ""}`}
          type="button"
          aria-label={buttonLabel}
          title={buttonLabel}
          onClick={() => void onSend()}
          disabled={loading}
        >
          {loading ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                opacity="0.28"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 4a8 8 0 0 1 8 8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 12 19 5l-3 14-4.5-5-6.5-2Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.9"
              />
              <path
                d="M11.5 14 19 5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.9"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
