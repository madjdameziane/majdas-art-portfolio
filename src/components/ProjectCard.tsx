import { type Project, CATEGORY_META } from '../data/projects'
import { type Page } from '../App'
import BrowserMockup from './BrowserMockup'

interface Props {
  project: Project
  navigate: (p: Page) => void
  style?: React.CSSProperties
}

export default function ProjectCard({ project, navigate, style }: Props) {
  const meta = CATEGORY_META[project.category]

  return (
    <div className="fade-up" style={style}>
      <button
        className="project-card"
        onClick={() => navigate({ name: 'project', id: project.id })}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
        }}
        aria-label={`View ${project.title} case study`}
      >
        <BrowserMockup accent={meta.accent} domain={project.domain} layout={project.mockupLayout} />

        <div className="project-card-meta">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
            <p
              style={{
                margin: 0,
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#e4dbd0',
                letterSpacing: '0.01em',
              }}
            >
              {project.title}
            </p>
            <span
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6a5e54',
                flexShrink: 0,
              }}
            >
              Concept
            </span>
          </div>
          <p
            style={{
              margin: '4px 0 10px',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.78rem',
              color: '#7a6f65',
            }}
          >
            {project.tagline}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.techStack.map((tech) => (
              <span key={tech} className="tag-chip" style={{ borderColor: `${meta.accent}55`, color: meta.accent }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  )
}
