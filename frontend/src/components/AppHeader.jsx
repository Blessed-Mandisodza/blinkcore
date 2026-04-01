export function AppHeader({
  avatarLabel,
  completedFields,
  sidebarMenuOpen,
  profileExpanded,
  onNewSession,
  onToggleSidebarMenu,
  onToggleProfile,
}) {
  return (
    <header className="panel-topbar">
      <div className="panel-topbar-main">
        <button
          className="menu-button"
          type="button"
          aria-label={sidebarMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarMenuOpen}
          aria-controls="workspace-sidebar"
          onClick={onToggleSidebarMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="panel-badge">
          <img
            className="panel-logo"
            src="/images/IMG_9792.PNG"
            alt="BlinkCore logo"
          />
        </div>
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
