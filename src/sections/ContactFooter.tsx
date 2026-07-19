import { useState } from 'react'
import Reveal from '../components/Reveal'

const COMMISSIONS_OPEN = true

interface FormState {
  name: string
  email: string
  subject: string
  size: string
  budget: string
  message: string
}

const INITIAL: FormState = { name: '', email: '', subject: '', size: '', budget: '', message: '' }

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  border: '2px solid #EAE3D4',
  borderRadius: '12px',
  padding: '13px 16px',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  fontSize: '0.9rem',
  color: '#141414',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: '0.7rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#86807A',
  display: 'block',
  marginBottom: '6px',
}

export default function ContactFooter() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [sent, setSent] = useState(false)

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" style={{ padding: '60px 28px 0', maxWidth: '720px', margin: '0 auto' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: COMMISSIONS_OPEN ? '#2E8B57' : '#E2725B',
              display: 'inline-block',
            }}
          />
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: COMMISSIONS_OPEN ? '#2E8B57' : '#E2725B' }}>
            {COMMISSIONS_OPEN ? 'Commissions open' : 'Commissions closed'}
          </span>
        </div>
        <p className="hand-label">Let's make something</p>
        <h2 className="section-heading" style={{ marginBottom: '36px' }}>Commission a piece</h2>
      </Reveal>

      <Reveal delay={80}>
        {sent ? (
          <p className="body-copy" style={{ fontSize: '1rem' }}>
            Request received — I'll be in touch within a few days to talk through your piece.
            Thank you for reaching out!
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="responsive-2col-tight">
              <div>
                <label style={labelStyle}>Name</label>
                <input required style={inputStyle} value={form.name} onChange={set('name')} placeholder="Your name" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input required type="email" style={inputStyle} value={form.email} onChange={set('email')} placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>What do you have in mind?</label>
              <input required style={inputStyle} value={form.subject} onChange={set('subject')} placeholder="e.g. acrylic on canvas, custom size" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="responsive-2col-tight">
              <div>
                <label style={labelStyle}>Approximate size</label>
                <input style={inputStyle} value={form.size} onChange={set('size')} placeholder="e.g. 40 x 60 cm" />
              </div>
              <div>
                <label style={labelStyle}>Budget</label>
                <input style={inputStyle} value={form.budget} onChange={set('budget')} placeholder="e.g. flexible" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Anything else?</label>
              <textarea
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                value={form.message}
                onChange={set('message')}
                placeholder="Reference images, colour preferences, anything helpful…"
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Send request
            </button>
          </form>
        )}
      </Reveal>

      {/* footer */}
      <footer
        style={{
          marginTop: '90px',
          padding: '32px 0 48px',
          borderTop: '1px solid #EAE3D4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: '1.3rem', color: '#2E8B57' }}>
          Majda's Art Portfolio
        </span>

        <div style={{ display: 'flex', gap: '10px' }}>
          <a className="social-link" href="#" aria-label="Instagram (add your real link)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="#141414" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="#141414" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="#141414" />
            </svg>
          </a>
          <a className="social-link" href="mailto:hello@example.com" aria-label="Email (add your real address)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15C3.67 19 3 18.33 3 17.5v-11Z" stroke="#141414" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M4 6.5 12 13l8-6.5" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#B7AF9F' }}>
          © {new Date().getFullYear()}
        </span>
      </footer>
    </section>
  )
}
