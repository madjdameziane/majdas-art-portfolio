import { getProject, CATEGORY_META } from '../data/projects'
import { type Page } from '../App'
import BrowserMockup from '../components/BrowserMockup'

interface Props {
  id: string
  navigate: (p: Page) => void
}

export default function Project({ id, navigate }: Props) {
  const project = getProject(id)

  if (!project) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center' }}>
        <p style={{ color: '#6a5e54', fontFamily: "'Epilogue', sans-serif" }}>Project not found.</p>
        <button
          onClick={() => navigate({ name: 'work' })}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9c7a50',
            fontFamily: "'Epilogue', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          ← Back to work
        </button>
      </div>
    )
  }

  const meta = CATEGORY_META[project.category]

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* breadcrumb */}
      <div
        style={{
          padding: '14px 28px',
          borderBottom: '1px solid #2e2920',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => navigate({ name: 'work' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6a5e54',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a09080')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6a5e54')}
        >
          ← Work
        </button>
        <span style={{ color: '#2e2920', fontFamily: 'monospace' }}>/</span>
        <button
          onClick={() => navigate({ name: 'work', filter: project.category })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6a5e54',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a09080')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6a5e54')}
        >
          {meta.label}
        </button>
      </div>

      {/* main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 380px',
          minHeight: 'calc(100vh - 58px)',
        }}
        className="project-layout"
      >
        {/* mockup */}
        <div style={{ borderRight: '1px solid #2e2920', backgroundColor: '#0e0d0b', padding: '48px' }}>
          <BrowserMockup accent={meta.accent} domain={project.domain} layout={project.mockupLayout} height="min(60vh, 520px)" />
          <p
            style={{
              padding: '18px 4px 0',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#3d3630',
              margin: 0,
            }}
          >
            Stylized preview — concept project, not a live deployed site
          </p>
        </div>

        {/* sidebar */}
        <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              color: '#e4dbd0',
              margin: '0 0 6px',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: meta.accent,
              margin: '0 0 36px',
            }}
          >
            {project.tagline}
          </p>

          {/* metadata table */}
          <div
            style={{
              borderTop: '1px solid #2e2920',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '32px',
            }}
          >
            {[
              { label: 'Category', value: meta.label },
              { label: 'Timeline', value: project.timeline },
              { label: 'Year', value: String(project.year) },
              { label: 'Status', value: 'Concept project' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6a5e54', flexShrink: 0 }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.82rem', color: '#a09080', textAlign: 'right' }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '36px' }}>
            {project.techStack.map((tech) => (
              <span key={tech} className="tag-chip" style={{ borderColor: `${meta.accent}55`, color: meta.accent }}>
                {tech}
              </span>
            ))}
          </div>

          {/* goal */}
          <div style={{ borderTop: '1px solid #2e2920', paddingTop: '24px', marginBottom: '28px' }}>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a5e54', margin: '0 0 12px' }}>
              The goal
            </p>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.85rem', color: '#a09080', margin: 0, lineHeight: 1.7 }}>
              {project.goal}
            </p>
          </div>

          {/* solution */}
          <div style={{ borderTop: '1px solid #2e2920', paddingTop: '24px', marginBottom: '28px' }}>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a5e54', margin: '0 0 12px' }}>
              The approach
            </p>
            <p
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: '0.88rem',
                color: '#8a7d70',
                margin: 0,
                lineHeight: 1.75,
                fontStyle: 'italic',
              }}
            >
              {project.solution}
            </p>
          </div>

          {/* features */}
          <div style={{ borderTop: '1px solid #2e2920', paddingTop: '24px', marginBottom: '40px' }}>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a5e54', margin: '0 0 14px' }}>
              What's included
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.features.map((f) => (
                <li key={f} style={{ display: 'flex', gap: '10px', fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.82rem', color: '#a09080', lineHeight: 1.5 }}>
                  <span style={{ color: meta.accent, flexShrink: 0 }}>—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
            <button className="btn-primary" onClick={() => navigate({ name: 'contact' })}>
              Start a similar project →
            </button>
            <button className="btn-outline" onClick={() => navigate({ name: 'pricing' })}>
              See pricing
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .project-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
