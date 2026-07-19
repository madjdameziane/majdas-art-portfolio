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

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#a78bfa] focus:shadow-[0_0_0_3px_rgba(167,139,250,0.15)] transition-all'
const labelClass = 'block text-xs uppercase tracking-wide text-white/50 mb-1.5'

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
    <section id="contact" className="relative bg-black px-6 sm:px-8 py-24 max-w-[820px] mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <Reveal>
        <div className="flex items-center gap-2.5 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: COMMISSIONS_OPEN ? '#8ce99a' : '#ff6b6b' }}
          />
          <span className="text-xs uppercase tracking-wide text-white/70">
            {COMMISSIONS_OPEN ? 'Commissions open' : 'Commissions closed'}
          </span>
        </div>
        <p className="kicker mb-3">// Contact</p>
        <h2 className="section-heading mb-10">Commission a piece</h2>
      </Reveal>

      <Reveal delay={80}>
        {sent ? (
          <p className="body-copy text-base">
            Request received — I'll be in touch within a few days to talk through your piece.
            Thank you for reaching out!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="responsive-2col-tight grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input required className={inputClass} value={form.name} onChange={set('name')} placeholder="Your name" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input required type="email" className={inputClass} value={form.email} onChange={set('email')} placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className={labelClass}>What do you have in mind?</label>
              <input required className={inputClass} value={form.subject} onChange={set('subject')} placeholder="e.g. acrylic on canvas, custom size" />
            </div>

            <div className="responsive-2col-tight grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Approximate size</label>
                <input className={inputClass} value={form.size} onChange={set('size')} placeholder="e.g. 40 x 60 cm" />
              </div>
              <div>
                <label className={labelClass}>Budget</label>
                <input className={inputClass} value={form.budget} onChange={set('budget')} placeholder="e.g. flexible" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Anything else?</label>
              <textarea
                rows={4}
                className={`${inputClass} resize-y min-h-[100px]`}
                value={form.message}
                onChange={set('message')}
                placeholder="Reference images, colour preferences, anything helpful…"
              />
            </div>

            <button
              type="submit"
              className="btn-primary self-start"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px -8px rgba(167,139,250,0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = ''
              }}
            >
              Send request
            </button>
          </form>
        )}
      </Reveal>

      {/* footer */}
      <footer className="mt-20 pt-8 pb-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
        <span
          className="text-xl text-white"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
        >
          Majda's Art Portfolio
        </span>

        <div className="flex gap-2.5">
          <a
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center transition-shadow duration-300"
            href="#"
            aria-label="Instagram (add your real link)"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(255,107,107,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="#ffffff" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="#ffffff" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="#ffffff" />
            </svg>
          </a>
          <a
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center transition-shadow duration-300"
            href="mailto:hello@example.com"
            aria-label="Email (add your real address)"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(78,205,196,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15C3.67 19 3 18.33 3 17.5v-11Z" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M4 6.5 12 13l8-6.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <span className="text-xs text-white/40">© {new Date().getFullYear()}</span>
      </footer>
    </section>
  )
}
