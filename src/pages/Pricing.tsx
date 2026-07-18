import { TIERS, ADD_ONS, PRICING_FAQ } from '../data/pricing'
import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

export default function Pricing({ navigate }: Props) {
  return (
    <div style={{ padding: '0 0 80px' }}>
      <div style={{ padding: '48px 28px 40px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">Pricing</p>
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
          Straightforward pricing, tailored builds
        </h1>
        <p className="body-muted" style={{ margin: '16px 0 0', maxWidth: '560px' }}>
          These are starting points, not fixed menus — every project gets a quote based on
          exactly what it needs. A 50% deposit begins the work.
        </p>
      </div>

      {/* tiers */}
      <div
        className="responsive-2col"
        style={{ padding: '48px 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
      >
        {TIERS.map((tier) => (
          <div key={tier.id} className={`tier-card${tier.highlighted ? ' highlighted' : ''}`}>
            {tier.highlighted && (
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#141210',
                  background: '#9c7a50',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  marginBottom: '16px',
                }}
              >
                Most popular
              </span>
            )}
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: tier.highlighted ? '#9c7a50' : '#a09080', margin: '0 0 10px' }}>
              {tier.name}
            </p>
            <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: 'italic', fontSize: '2rem', color: '#e4dbd0', margin: '0 0 6px' }}>
              from ${tier.priceFrom.toLocaleString()}
            </p>
            <p className="body-muted" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6a5e54', marginBottom: '20px' }}>
              Delivery in {tier.timeline}
            </p>
            <p className="body-muted" style={{ fontSize: '0.82rem', marginBottom: '20px' }}>{tier.tagline}</p>

            <ul style={{ margin: '0 0 28px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {tier.features.map((f) => (
                <li key={f} style={{ display: 'flex', gap: '10px', fontFamily: "'Epilogue', sans-serif", fontWeight: 300, fontSize: '0.8rem', color: '#a09080', lineHeight: 1.5 }}>
                  <span style={{ color: tier.highlighted ? '#9c7a50' : '#6a5e54', flexShrink: 0 }}>—</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={tier.highlighted ? 'btn-primary' : 'btn-outline'}
              onClick={() => navigate({ name: 'contact' })}
              style={{ marginTop: 'auto' }}
            >
              Get a quote
            </button>
          </div>
        ))}
      </div>

      {/* add-ons */}
      <div style={{ padding: '32px 28px 64px', borderBottom: '1px solid #2e2920' }}>
        <p className="eyebrow">Add-ons</p>
        <div
          className="responsive-2col"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
        >
          {ADD_ONS.map((addon) => (
            <div key={addon.label} className="surface-card">
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 400, fontSize: '0.82rem', color: '#e4dbd0', margin: '0 0 6px' }}>
                {addon.label}
              </p>
              <p className="body-muted" style={{ fontSize: '0.76rem' }}>{addon.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* faq */}
      <div style={{ padding: '64px 28px 0', maxWidth: '760px' }}>
        <p className="eyebrow">Questions</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PRICING_FAQ.map(({ q, a }) => (
            <details key={q} style={{ borderTop: '1px solid #2e2920', padding: '20px 0' }}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  color: '#e4dbd0',
                  listStyle: 'none',
                }}
              >
                {q}
              </summary>
              <p className="body-muted" style={{ fontSize: '0.82rem', marginTop: '12px', maxWidth: '600px' }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 28px 0', textAlign: 'center' }}>
        <button className="btn-primary" onClick={() => navigate({ name: 'contact' })}>
          Start your project →
        </button>
      </div>
    </div>
  )
}
