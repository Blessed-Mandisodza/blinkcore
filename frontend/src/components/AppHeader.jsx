export function AppHeader({
  avatarLabel,
  completedFields,
  profileExpanded,
  onNewSession,
  onToggleProfile,
}) {
  return (
    <header className="panel-topbar">
      <div className="panel-badge">
        <span className="panel-badge-mark">B</span>
        <span>BlinkCore</span>
      </div>

      <div className="panel-topbar-actions">
        <button className="ghost-button" type="button" onClick={onNewSession}>
          New chat
        </button>
        <button
          className="brief-button"
          type="button"
          onClick={onToggleProfile}
        >
          <span className="brief-button-avatar">{avatarLabel}</span>
          <span>
            {profileExpanded ? "Close brief" : `Brief ${completedFields}/8`}
          </span>
        </button>
      </div>
    </header>
  );
}
