import { type Page } from '../App'

interface Props {
  page: Page
  navigate: (p: Page) => void
}

const LINKS: { label: string; page: Page }[] = [
  { label: 'Work', page: { name: 'work' } },
  { label: 'Pricing', page: { name: 'pricing' } },
  { label: 'About', page: { name: 'about' } },
  { label: 'Contact', page: { name: 'contact' } },
]

export default function Nav({ page, navigate }: Props) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 28px',
        borderBottom: '1px solid #2e2920',
        backgroundColor: 'rgba(20,18,16,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        gap: '24px',
        flexWrap: 'wrap',
      }}
    >
      <button
        onClick={() => navigate({ name: 'home' })}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#e4dbd0',
        }}
      >
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: '1.15rem',
            letterSpacing: '0.01em',
            fontStyle: 'italic',
          }}
        >
          Majda's Art Portfolio
        </span>
      </button>

      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        {LINKS.map(({ label, page: target }) => {
          const active = page.name === target.name
          return (
            <button
              key={label}
              onClick={() => navigate(target)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: active ? '#9c7a50' : '#a09080',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!active) (e.target as HTMLElement).style.color = '#e4dbd0'
              }}
              onMouseLeave={(e) => {
                if (!active) (e.target as HTMLElement).style.color = '#a09080'
              }}
            >
              {label}
            </button>
          )
        })}
        <button
          onClick={() => navigate({ name: 'contact' })}
          style={{
            background: 'none',
            border: '1px solid #3d3630',
            cursor: 'pointer',
            padding: '9px 18px',
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 300,
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#e4dbd0',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderColor = '#9c7a50'
            el.style.background = 'rgba(156,122,80,0.1)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderColor = '#3d3630'
            el.style.background = 'none'
          }}
        >
          Get a quote
        </button>
      </nav>
    </header>
  )
}
