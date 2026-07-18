import { useState } from 'react'
import { PROJECTS, ALL_CATEGORIES, CATEGORY_META, type Category } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
  initialFilter?: Category
}

export default function Work({ navigate, initialFilter }: Props) {
  const [filter, setFilter] = useState<Category | 'all'>(initialFilter ?? 'all')

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  const pillStyle = (active: boolean, accent?: string): React.CSSProperties => ({
    background: 'none',
    border: `1px solid ${active ? (accent ?? '#9c7a50') : '#2e2920'}`,
    cursor: 'pointer',
    padding: '8px 16px',
    fontFamily: "'Epilogue', sans-serif",
    fontWeight: 300,
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: active ? (accent ?? '#9c7a50') : '#7a6f65',
    transition: 'border-color 0.2s, color 0.2s',
    borderRadius: '999px',
  })

  return (
    <div style={{ padding: '0 0 80px' }}>
      <div style={{ padding: '48px 28px 32px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">Work</p>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#e4dbd0',
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          Selected work
        </h1>
        <p className="body-muted" style={{ margin: '16px 0 0', maxWidth: '560px' }}>
          The projects below are concept builds created to demonstrate range across different
          site types. Real client case studies will be added here as they launch.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '28px' }}>
          <button style={pillStyle(filter === 'all')} onClick={() => setFilter('all')}>
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={pillStyle(filter === cat, CATEGORY_META[cat].accent)}
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_META[cat].short}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '40px 28px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px',
        }}
      >
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} navigate={navigate} style={{ animationDelay: `${i * 40}ms`, opacity: 0 }} />
        ))}
      </div>

      <div
        style={{
          margin: '64px 28px 0',
          padding: '32px',
          borderTop: '1px solid #2e2920',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <p className="body-muted" style={{ fontStyle: 'italic', fontFamily: "'Fraunces', serif", fontSize: '0.95rem' }}>
          Don't see quite what you need?
        </p>
        <button className="btn-outline" onClick={() => navigate({ name: 'contact' })}>
          Get a quote →
        </button>
      </div>
    </div>
  )
}
