import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

const PRINCIPLES = [
  { title: 'Clarity over clutter', body: 'Every page earns its place. If a section doesn\'t help a visitor understand or act, it doesn\'t ship.' },
  { title: 'Built to be maintained', body: "You shouldn't need a developer for every text change. Sites are set up so you can update the basics yourself." },
  { title: 'Fast by default', body: 'Slow sites lose visitors before they read a word. Performance is a design constraint from day one, not an afterthought.' },
  { title: 'Direct communication', body: "You'll always know where your project stands — no disappearing for weeks between updates." },
]

const STACK = ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Figma', 'Sanity / Contentful', 'Stripe']

export default function About({ navigate }: Props) {
  return (
    <div style={{ padding: '0 0 80px' }}>
      <div
        className="responsive-2col"
        style={{
          padding: '48px 28px 40px',
          borderBottom: '1px solid #2e2920',
          display: 'grid',
          gridTemplateColumns: '160px 1fr',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(160deg, #9c7a5044, #1d1a17 70%)',
            border: '1px solid #2e2920',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '2.2rem', color: '#e4dbd0' }}>
            MM
          </span>
        </div>

        <div>
          <p className="eyebrow">About</p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#e4dbd0',
              margin: '0 0 20px',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Hi, I'm Majda.
          </h1>
          <p className="body-muted" style={{ fontSize: '0.95rem', maxWidth: '600px', marginBottom: '14px' }}>
            I design and build websites for small businesses, independent brands, and founders
            who need a site that actually looks like them — and works properly on the first try.
          </p>
          <p className="body-muted" style={{ fontSize: '0.95rem', maxWidth: '600px' }}>
            I handle both the design and the code, which means fewer handoffs, fewer things lost
            in translation, and a site that matches the plan from the first sketch to launch day.
          </p>
        </div>
      </div>

      {/* principles */}
      <div style={{ padding: '56px 28px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">How I work</p>
        <div
          className="responsive-2col"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}
        >
          {PRINCIPLES.map(({ title, body }) => (
            <div key={title}>
              <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 400, fontSize: '0.95rem', color: '#e4dbd0', margin: '0 0 8px' }}>
                {title}
              </h3>
              <p className="body-muted" style={{ fontSize: '0.85rem' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* stack */}
      <div style={{ padding: '56px 28px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">Tools & stack</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {STACK.map((tool) => (
            <span key={tool} className="tag-chip" style={{ borderColor: '#3d3630', color: '#a09080', fontSize: '0.72rem', padding: '7px 14px' }}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '64px 28px 0', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: '#e4dbd0',
            margin: '0 0 24px',
          }}
        >
          Let's talk about your project.
        </p>
        <button className="btn-primary" onClick={() => navigate({ name: 'contact' })}>
          Get a quote →
        </button>
      </div>
    </div>
  )
}
