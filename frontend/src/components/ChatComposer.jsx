export function ChatComposer({
  input,
  loading,
  placeholder,
  onInputChange,
  onSend,
}) {
  return (
    <div className="composer-shell">
      <span className="composer-mark">A</span>
      <div className="composer">
        <input
          type="text"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && void onSend()}
          placeholder={placeholder}
          disabled={loading}
        />
        <button type="button" onClick={() => void onSend()} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
