import { ModeStrip } from "./ModeStrip";

export function AppHeader({
  avatarLabel,
  completedFields,
  modes,
  sidebarMenuOpen,
  profileExpanded,
  workspaceMode,
  onSelectMode,
  onToggleSidebarMenu,
  onToggleProfile,
}) {
  return (
    <header className="panel-topbar">
      <div className="panel-topbar-main">
        <button
          className={`menu-button ${sidebarMenuOpen ? "is-open" : ""}`}
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

        <ModeStrip
          className="mode-strip-header"
          modes={modes}
          workspaceMode={workspaceMode}
          onSelectMode={onSelectMode}
        />

        {/* <div className="panel-badge">
          <img
            className="panel-logo"
            src="/images/IMG_9792.PNG"
            alt="BlinkCore logo"
          />
        </div> */}
      </div>

      <div className="panel-topbar-actions">
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
