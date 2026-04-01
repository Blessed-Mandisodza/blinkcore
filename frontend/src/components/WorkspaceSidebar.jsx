import React from "react";

function SidebarIcon({ type }) {
  switch (type) {
    case "new-chat":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 5v14M5 12h14"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 5h6v6H5zM13 5h6v9h-6zM5 13h6v6H5zM13 16h6v3h-6z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "projects":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7.5h16M8 7.5V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5M6 7.5h12a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M10.2 4.7a1 1 0 0 1 1-.7h1.6a1 1 0 0 1 1 .7l.4 1.3a6.9 6.9 0 0 1 1.5.9l1.3-.4a1 1 0 0 1 1.1.4l.8 1.4a1 1 0 0 1-.2 1.2l-1 1a7.2 7.2 0 0 1 0 1.8l1 1a1 1 0 0 1 .2 1.2l-.8 1.4a1 1 0 0 1-1.1.4l-1.3-.4a6.9 6.9 0 0 1-1.5.9l-.4 1.3a1 1 0 0 1-1 .7h-1.6a1 1 0 0 1-1-.7l-.4-1.3a6.9 6.9 0 0 1-1.5-.9l-1.3.4a1 1 0 0 1-1.1-.4l-.8-1.4a1 1 0 0 1 .2-1.2l1-1a7.2 7.2 0 0 1 0-1.8l-1-1a1 1 0 0 1-.2-1.2l.8-1.4a1 1 0 0 1 1.1-.4l1.3.4a6.9 6.9 0 0 1 1.5-.9l.4-1.3Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle
            cx="12"
            cy="12"
            r="2.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5.5 19.2a6.8 6.8 0 0 1 13 0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SidebarNavButton({
  active = false,
  badge,
  description,
  disabled = false,
  icon,
  label,
  onClick,
}) {
  const buttonClassName = [
    "sidebar-nav-button",
    active ? "active" : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sidebar-nav-content">
        <span className="sidebar-nav-icon">
          <SidebarIcon type={icon} />
        </span>
        <span className="sidebar-nav-labels">
          <strong>{label}</strong>
          <span>{description}</span>
        </span>
      </span>
      {badge ? <span className="sidebar-nav-badge">{badge}</span> : null}
    </button>
  );
}

export function WorkspaceSidebar({
  avatarLabel,
  businessName,
  menuOpen,
  profileExpanded,
  recentChats,
  onCloseMenu,
  onNewChat,
  onOpenDashboard,
  onOpenProfile,
  onSelectRecentChat,
}) {
  const profileName = businessName.trim() || "BlinkCore Founder";
  const sidebarClassName = ["workspace-sidebar", menuOpen ? "menu-open" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <aside id="workspace-sidebar" className={sidebarClassName}>
      <div className="sidebar-mobile-header">
        <p className="sidebar-mobile-label">Menu</p>
        <button
          className="sidebar-close-button"
          type="button"
          aria-label="Close menu"
          onClick={onCloseMenu}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="panel-badge">
        <img
          className="panel-logo"
          src="/images/IMG_9792.PNG"
          alt="BlinkCore logo"
        />
      </div>

      {/* <div className="sidebar-brand">
        <span className="sidebar-brand-mark">BC</span>
        <div className="sidebar-brand-copy">
          <p>Workspace</p>
          <strong>BlinkCore AI</strong>
        </div>
      </div> */}

      <button
        className="sidebar-primary-action"
        type="button"
        onClick={onNewChat}
      >
        <span className="sidebar-primary-icon">
          <SidebarIcon type="new-chat" />
        </span>
        <span>New Chat</span>
      </button>

      <nav className="sidebar-nav" aria-label="Workspace navigation">
        <SidebarNavButton
          active={!profileExpanded}
          description="Main workspace"
          icon="dashboard"
          label="Dashboard"
          onClick={onOpenDashboard}
        />
        <SidebarNavButton
          badge="Soon"
          description="Saved workspaces"
          disabled
          icon="projects"
          label="Projects"
        />
        <SidebarNavButton
          badge="Soon"
          description="App preferences"
          disabled
          icon="settings"
          label="Settings"
        />
        <SidebarNavButton
          active={profileExpanded}
          description="Business brief"
          icon="profile"
          label="Profile"
          onClick={onOpenProfile}
        />
      </nav>

      <section
        className="sidebar-section"
        aria-labelledby="recent-chats-heading"
      >
        <div className="sidebar-section-header">
          <p id="recent-chats-heading" className="sidebar-section-title">
            Recent chats
          </p>
          <span className="sidebar-section-count">{recentChats.length}</span>
        </div>

        {recentChats.length > 0 ? (
          <div className="sidebar-recent-list">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                className="sidebar-recent-item"
                type="button"
                onClick={() => onSelectRecentChat(chat.content)}
              >
                <span className="sidebar-recent-title">{chat.label}</span>
                <span className="sidebar-recent-detail">
                  Load this prompt back into the composer.
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="sidebar-empty-state">
            {/* Your recent user prompts will appear here once you start chatting. */}
          </div>
        )}
      </section>

      {/* <div className="sidebar-profile-card">
        <span className="sidebar-profile-avatar">{avatarLabel}</span>
        <div className="sidebar-profile-copy">
          <strong>{profileName}</strong>
          <span>{profileExpanded ? "Profile open" : "Profile ready"}</span>
        </div>
        <button
          className="sidebar-profile-link"
          type="button"
          onClick={onOpenProfile}
        >
          Profile
        </button>
      </div> */}
    </aside>
  );
}
