export function ModeStrip({
  className = "",
  modes,
  workspaceMode,
  onSelectMode,
}) {
  const modeStripClassName = ["mode-strip", className].filter(Boolean).join(" ");

  return (
    <div className={modeStripClassName}>
      {modes.map((mode) => (
        <button
          key={mode.id}
          className={`mode-pill ${workspaceMode === mode.id ? "active" : ""}`}
          type="button"
          onClick={() => onSelectMode(mode.id)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
