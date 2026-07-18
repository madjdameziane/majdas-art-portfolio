import { useState } from 'react'

const TAKING_PROJECTS = true
const QUEUE_POSITION: number = 2

interface FormState {
  name: string
  email: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
}

export default function Contact() {
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
        className="commissions-header"
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
                backgroundColor: TAKING_PROJECTS ? '#6d7d63' : '#a8838e',
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
                color: TAKING_PROJECTS ? '#6d7d63' : '#a8838e',
              }}
            >
              {TAKING_PROJECTS ? 'Taking on new projects' : 'Currently booked'}
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
            Start your project
          </h1>

          {TAKING_PROJECTS && (
            <p className="body-muted" style={{ fontSize: '0.82rem' }}>
              Currently{' '}
              <span style={{ color: '#9c7a50' }}>
                {QUEUE_POSITION} {QUEUE_POSITION === 1 ? 'project' : 'projects'}
              </span>{' '}
              ahead of yours. Typical turnaround is 1 – 7 weeks depending on scope, see{' '}
              <span style={{ color: '#a09080' }}>Pricing</span> for a rough idea.
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
              body: 'Business sites, online stores, landing pages, and small custom web apps. If it runs in a browser, it\'s worth asking.',
            },
            {
              heading: 'Pricing',
              body: 'Starter projects from $750, full stores from $3,200. A 50% deposit is required to hold your project slot.',
            },
            {
              heading: 'Process',
              body: 'I send a proposed sitemap and design direction before building, plus progress check-ins. Final payment due on handover.',
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
              I'll be in touch within a few days to talk through the project and confirm your
              place in the queue. Thank you for reaching out.
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label htmlFor="projectType" style={labelStyle}>Project type</label>
                <select
                  id="projectType"
                  value={form.projectType}
                  onChange={set('projectType')}
                  required
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                  onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
                >
                  <option value="" disabled>Select</option>
                  <option value="business">Business / brochure site</option>
                  <option value="ecommerce">E-commerce store</option>
                  <option value="landing">Landing page</option>
                  <option value="webapp">Web app / custom build</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" style={labelStyle}>Timeline</label>
                <select
                  id="timeline"
                  value={form.timeline}
                  onChange={set('timeline')}
                  required
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                  onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
                >
                  <option value="" disabled>Select</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1month">Within a month</option>
                  <option value="1-3months">1 – 3 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="budget" style={labelStyle}>Budget range</label>
              <select
                id="budget"
                value={form.budget}
                onChange={set('budget')}
                required
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={(e) => (e.target.style.borderColor = '#6a5e54')}
                onBlur={(e) => (e.target.style.borderColor = '#2e2920')}
              >
                <option value="" disabled>Select</option>
                <option value="750-1200">$750 – $1,200</option>
                <option value="1200-2500">$1,200 – $2,500</option>
                <option value="2500-4000">$2,500 – $4,000</option>
                <option value="4000+">$4,000+</option>
                <option value="flexible">Flexible / let's discuss</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" style={labelStyle}>Tell me about the project</label>
              <textarea
                id="message"
                value={form.message}
                onChange={set('message')}
                rows={5}
                placeholder="What the site needs to do, examples you like, anything helpful…"
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
          .commissions-header { grid-template-columns: 1fr !important; }
          .commissions-header > div:last-child { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #2e2920; padding-top: 32px; }
        }
      `}</style>
    </div>
  )
}
