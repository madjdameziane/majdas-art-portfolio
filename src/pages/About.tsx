import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

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
          <p className="body-muted" style={{ fontSize: '0.95rem', maxWidth: '600px' }}>
            [Placeholder — replace with your real artist statement: how you started painting,
            what draws you to your subjects, and how you work. Send me the text whenever you're
            ready and I'll drop it in here.]
          </p>
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
          Interested in a piece?
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate({ name: 'gallery' })}>
            View the gallery →
          </button>
          <button className="btn-outline" onClick={() => navigate({ name: 'commission' })}>
            Commission a piece
          </button>
        </div>
      </div>
    </div>
  )
}
