interface Props {
  accent: string
  domain: string
  layout?: 'grid' | 'list' | 'single'
  height?: string
}

export default function BrowserMockup({ accent, domain, layout = 'grid', height }: Props) {
  return (
    <div className="browser-mockup">
      <div className="browser-mockup-bar">
        <span className="bm-dot" />
        <span className="bm-dot" />
        <span className="bm-dot" />
        <span className="browser-mockup-url">{domain}</span>
      </div>
      <div
        className="browser-mockup-body"
        style={{
          background: `linear-gradient(160deg, ${accent}26 0%, #1d1a17 70%)`,
          height,
        }}
      >
        <div className="wf-nav">
          <span className="wf-logo" style={{ background: accent }} />
          <span className="wf-line" style={{ width: '14%' }} />
          <span className="wf-line" style={{ width: '10%' }} />
          <span className="wf-line" style={{ width: '16%' }} />
          <span className="wf-btn" style={{ borderColor: accent }} />
        </div>

        <div className="wf-hero">
          <span className="wf-line wf-line-lg" style={{ width: '58%' }} />
          <span className="wf-line" style={{ width: '78%' }} />
          <span className="wf-line" style={{ width: '40%' }} />
          <span className="wf-btn wf-btn-solid" style={{ background: accent }} />
        </div>

        {layout === 'grid' && (
          <div className="wf-grid">
            <span className="wf-card" style={{ borderColor: `${accent}55` }} />
            <span className="wf-card" style={{ borderColor: `${accent}55` }} />
            <span className="wf-card" style={{ borderColor: `${accent}55` }} />
          </div>
        )}

        {layout === 'list' && (
          <div className="wf-list">
            <span className="wf-row" style={{ borderColor: `${accent}55` }} />
            <span className="wf-row" style={{ borderColor: `${accent}55` }} />
            <span className="wf-row" style={{ borderColor: `${accent}55` }} />
          </div>
        )}

        {layout === 'single' && (
          <div className="wf-single">
            <span className="wf-line" style={{ width: '50%' }} />
            <span className="wf-line" style={{ width: '65%' }} />
          </div>
        )}
      </div>
    </div>
  )
}
