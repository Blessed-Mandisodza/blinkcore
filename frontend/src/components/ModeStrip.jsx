export function ModeStrip({ modes, workspaceMode, onSelectMode }) {
  return (
    <div className="mode-strip">
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
