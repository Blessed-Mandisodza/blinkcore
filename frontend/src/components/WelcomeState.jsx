export function WelcomeState({
  activeMode,
  displayName,
  quickPrompts,
  onQuickPrompt,
}) {
  return (
    <>
      <section className="hero-panel">
        <p className="hero-kicker">{activeMode.eyebrow}</p>
        {/* <p className="hero-greeting">Hi {displayName}</p>
        <p className="hero-subcopy">
          Start a real back-and-forth conversation.
        </p> */}
      </section>

      <section className="prompt-grid">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt.title}
            className="prompt-card"
            type="button"
            onClick={() => void onQuickPrompt(prompt.prompt)}
          >
            <span className="prompt-card-label">{activeMode.label}</span>
            <strong>{prompt.title}</strong>
            <p>{prompt.detail}</p>
          </button>
        ))}
      </section>
    </>
  );
}
