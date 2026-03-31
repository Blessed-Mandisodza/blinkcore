export function BusinessBriefPanel({
  businessProfile,
  completedFields,
  profileFields,
  stageOptions,
  onProfileChange,
}) {
  return (
    <section className="business-brief-panel">
      <div className="brief-panel-header">
        <div>
          <p className="eyebrow">Business brief</p>
          <h2>{businessProfile.businessName.trim() || "Set your business context"}</h2>
        </div>
        <span className="brief-progress">{completedFields}/8 fields completed</span>
      </div>

      <div className="brief-form-grid">
        {profileFields.map((field) =>
          field.multiline ? (
            <label
              key={field.name}
              className={`field-group ${field.fullWidth ? "full-width" : ""}`}
            >
              <span>{field.label}</span>
              <textarea
                name={field.name}
                value={businessProfile[field.name]}
                onChange={onProfileChange}
                placeholder={field.placeholder}
                rows={4}
              />
            </label>
          ) : (
            <label
              key={field.name}
              className={`field-group ${field.fullWidth ? "full-width" : ""}`}
            >
              <span>{field.label}</span>
              <input
                type="text"
                name={field.name}
                value={businessProfile[field.name]}
                onChange={onProfileChange}
                placeholder={field.placeholder}
              />
            </label>
          ),
        )}

        <label className="field-group">
          <span>Stage</span>
          <select
            name="stage"
            value={businessProfile.stage}
            onChange={onProfileChange}
          >
            <option value="">Select stage</option>
            {stageOptions.map((stageOption) => (
              <option key={stageOption} value={stageOption}>
                {stageOption}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
