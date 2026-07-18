import { type Page } from '../App'
import { PROJECTS, ALL_CATEGORIES, CATEGORY_META } from '../data/projects'
import { TIERS } from '../data/pricing'
import ProjectCard from '../components/ProjectCard'

const AVAILABLE = true

interface Props {
  navigate: (p: Page) => void
}

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', body: "A short call to talk through what the site needs to do, who it's for, and what success looks like." },
  { step: '02', title: 'Design', body: 'A layout and visual direction built around your content — reviewed with you before any code is written.' },
  { step: '03', title: 'Build', body: 'The site gets built, tested on real devices, and checked against the original brief.' },
  { step: '04', title: 'Launch', body: "Site goes live on your domain, with a walkthrough so you're comfortable making basic updates." },
]

export default function Home({ navigate }: Props) {
  const featured = PROJECTS.slice(0, 3)

  return (
    <div>
      {/* hero */}
      <section
        style={{
          padding: '96px 28px 72px',
          borderBottom: '1px solid #2e2920',
          maxWidth: '900px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: AVAILABLE ? '#6d7d63' : '#a8838e',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span className="eyebrow" style={{ margin: 0, color: AVAILABLE ? '#6d7d63' : '#a8838e' }}>
            {AVAILABLE ? 'Currently taking on new projects' : 'Booked — join the waitlist'}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            color: '#e4dbd0',
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          Websites that make small businesses look like they've already made it.
        </h1>

        <p
          className="body-muted"
          style={{ fontSize: '1rem', maxWidth: '560px', margin: '24px 0 36px' }}
        >
          I design and build clean, fast, good-looking websites for small businesses,
          independent brands, and founders — from a single landing page to a full online store.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate({ name: 'work' })}>
            View the work →
          </button>
          <button className="btn-outline" onClick={() => navigate({ name: 'contact' })}>
            Get a quote
          </button>
        </div>
      </section>

      {/* services strip */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">What I build</p>
        <div
          className="responsive-2col"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: '#2e2920',
            border: '1px solid #2e2920',
          }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat]
            return (
              <button
                key={cat}
                onClick={() => navigate({ name: 'work', filter: cat })}
                style={{
                  background: '#141210',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '28px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ width: '20px', height: '3px', background: meta.accent, display: 'block' }} />
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: '#e4dbd0',
                  }}
                >
                  {meta.short}
                </span>
                <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.78rem', color: '#6a5e54', lineHeight: 1.6 }}>
                  {meta.description}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* featured work */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid #2e2920' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p className="eyebrow">Selected work</p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: '#e4dbd0',
                margin: 0,
              }}
            >
              A few recent builds
            </h2>
          </div>
          <button
            onClick={() => navigate({ name: 'work' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9c7a50',
            }}
          >
            View all work →
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} navigate={navigate} style={{ animationDelay: `${i * 60}ms`, opacity: 0 }} />
          ))}
        </div>
      </section>

      {/* process */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">How it works</p>
        <div
          className="responsive-2col"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '28px',
          }}
        >
          {PROCESS_STEPS.map(({ step, title, body }) => (
            <div key={step}>
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: '1.6rem',
                  color: '#3d3630',
                }}
              >
                {step}
              </span>
              <h3
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  color: '#e4dbd0',
                  margin: '8px 0 8px',
                }}
              >
                {title}
              </h3>
              <p className="body-muted" style={{ fontSize: '0.82rem' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pricing teaser */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid #2e2920' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p className="eyebrow">Pricing</p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: '#e4dbd0',
                margin: 0,
              }}
            >
              Simple starting points
            </h2>
          </div>
          <button
            onClick={() => navigate({ name: 'pricing' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9c7a50',
            }}
          >
            See full pricing →
          </button>
        </div>

        <div
          className="responsive-2col"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {TIERS.map((tier) => (
            <div key={tier.id} className={`tier-card${tier.highlighted ? ' highlighted' : ''}`}>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: tier.highlighted ? '#9c7a50' : '#a09080', margin: '0 0 10px' }}>
                {tier.name}
              </p>
              <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.8rem', color: '#e4dbd0', margin: '0 0 12px' }}>
                from ${tier.priceFrom.toLocaleString()}
              </p>
              <p className="body-muted" style={{ fontSize: '0.8rem' }}>{tier.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* final CTA */}
      <section style={{ padding: '80px 28px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: '#e4dbd0',
            margin: '0 0 20px',
          }}
        >
          Have a project in mind?
        </h2>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate({ name: 'contact' })}>
            Get a quote
          </button>
          <button className="btn-outline" onClick={() => navigate({ name: 'about' })}>
            More about me
          </button>
        </div>
      </section>
    </div>
  )
}
