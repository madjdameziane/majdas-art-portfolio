import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMove = (e: MouseEvent) => {
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const x = ((e.clientX - cx) / rect.width) * 14
      const y = ((e.clientY - cy) / rect.height) * 14
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      id="hero"
      ref={wrapRef}
      style={{
        padding: '72px 28px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        minHeight: '92vh',
        justifyContent: 'center',
      }}
    >
      <div className="hero-circle" style={{ marginBottom: '40px' }}>
        <svg
          width="70%"
          height="70%"
          viewBox="0 0 200 200"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: 'transform 0.15s ease-out' }}
        >
          <path
            d="M60 70 C40 40, 90 20, 120 35 C150 50, 155 90, 130 110 C160 120, 155 160, 120 165 C85 170, 55 145, 55 115 C40 110, 35 85, 60 70 Z"
            fill="#F4C95D"
            opacity="0.9"
          />
          <circle cx="130" cy="75" r="26" fill="#E2725B" opacity="0.85" />
          <path
            d="M40 130 Q70 100 110 130 T170 125"
            stroke="#2E8B57"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="60" cy="150" r="8" fill="#2E8B57" />
        </svg>
      </div>

      <p className="hand-label" style={{ marginBottom: '10px' }}>Original paintings</p>

      <h1
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(2.6rem, 9vw, 6rem)',
          color: '#141414',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        Majda Meziane
      </h1>

      <p className="body-copy" style={{ maxWidth: '460px', margin: '26px 0 36px', fontSize: '1.05rem' }}>
        A little scrapbook of paintings — some finished, some still drying. Have a look around.
      </p>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}>
          View the works
        </button>
        <button className="btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Commission a piece
        </button>
      </div>

      <div className="scroll-doodle">
        <svg width="20" height="34" viewBox="0 0 20 34" fill="none">
          <path d="M10 1 C10 12, 8 20, 10 32" stroke="#57534A" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 25 L10 32 L17 24" stroke="#57534A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span>scroll</span>
      </div>
    </section>
  )
}
