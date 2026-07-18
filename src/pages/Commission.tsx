import { useState } from 'react'

const COMMISSIONS_OPEN = true
const QUEUE_POSITION: number = 2

interface FormState {
  name: string
  email: string
  subject: string
  size: string
  budget: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  subject: '',
  size: '',
  budget: '',
  message: '',
}

export default function Commission() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [sent, setSent] = useState(false)

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#1d1a17',
    border: '1px solid #2e2920',
    padding: '12px 14px',
    fontFamily: "'Epilogue', sans-serif",
    fontWeight: 300,
    fontSize: '0.84rem',
    color: '#e4dbd0',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Epilogue', sans-serif",
    fontWeight: 300,
    fontSize: '0.66rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#6a5e54',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <div>
      {/* header */}
      <div
        className="commission-header"
        style={{
          padding: '48px 28px 40px',
          borderBottom: '1px solid #2e2920',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: COMMISSIONS_OPEN ? '#6d7d63' : '#a8838e',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: COMMISSIONS_OPEN ? '#6d7d63' : '#a8838e',
              }}
            >
              {COMMISSIONS_OPEN ? 'Commissions open' : 'Commissions closed'}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#e4dbd0',
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Commission a piece
          </h1>

          {COMMISSIONS_OPEN && (
            <p className="body-muted" style={{ fontSize: '0.82rem' }}>
              Currently{' '}
              <span style={{ color: '#9c7a50' }}>
                {QUEUE_POSITION} {QUEUE_POSITION === 1 ? 'commission' : 'commissions'}
              </span>{' '}
              ahead of yours.
            </p>
          )}
        </div>

        {/* details */}
        <div
          style={{
            borderLeft: '1px solid #2e2920',
            paddingLeft: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {[
            {
              heading: 'What I take on',
              body: '[Placeholder — list your real media/subjects here, e.g. "Acrylic on canvas, custom sizes. Portraits, landscapes, or a subject of your choice."]',
            },
            {
              heading: 'Pricing',
              body: '[Placeholder — your real pricing structure, e.g. by size or complexity. A deposit is typically required to hold your spot.]',
            },
            {
              heading: 'Process',
              body: '[Placeholder — describe your process, e.g. a sketch or reference approval before starting, progress photos, final payment on completion.]',
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.08em', color: '#a09080', margin: '0 0 4px' }}>
                {heading}
              </p>
              <p className="body-muted" style={{ fontSize: '0.82rem' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* form */}
      <div style={{ maxWidth: '640px', padding: '56px 28px 80px' }}>
        {sent ? (
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.4rem', color: '#e4dbd0', margin: '0 0 12px' }}>
              Request received.
            </p>
            <p className="body-muted" style={{ fontSize: '0.84rem' }}>
              I'll be in touch within a few days to discuss the piece and confirm your queue
              position. Thank you for your interest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                  onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
                />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                  onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" style={labelStyle}>Subject / what you have in mind</label>
              <input
                id="subject"
                type="text"
                required
                value={form.subject}
                onChange={set('subject')}
                placeholder="e.g. acrylic on canvas, custom size"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label htmlFor="size" style={labelStyle}>Approximate size</label>
                <input
                  id="size"
                  type="text"
                  value={form.size}
                  onChange={set('size')}
                  placeholder="e.g. 40 x 60 cm"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                  onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
                />
              </div>
              <div>
                <label htmlFor="budget" style={labelStyle}>Budget range</label>
                <input
                  id="budget"
                  type="text"
                  value={form.budget}
                  onChange={set('budget')}
                  placeholder="e.g. flexible, or a range"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                  onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" style={labelStyle}>Additional notes</label>
              <textarea
                id="message"
                value={form.message}
                onChange={set('message')}
                rows={5}
                placeholder="Reference images, colour preferences, intended location, anything helpful…"
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Send request
            </button>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .commission-header { grid-template-columns: 1fr !important; }
          .commission-header > div:last-child { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #2e2920; padding-top: 32px; }
        }
      `}</style>
    </div>
  )
}
