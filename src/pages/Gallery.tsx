import { useEffect, useState } from 'react'
import { listPieces, type Piece } from '../lib/pieces'
import { supabaseConfigured } from '../lib/supabase'
import ArtCard from '../components/ArtCard'
import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

export default function Gallery({ navigate }: Props) {
  const [pieces, setPieces] = useState<Piece[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!supabaseConfigured) {
      setPieces([])
      return
    }
    listPieces()
      .then((data) => {
        if (!cancelled) setPieces(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load pieces.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      {/* header strip */}
      <div
        style={{
          padding: '14px 28px',
          borderBottom: '1px solid #2e2920',
          display: 'flex',
          gap: '28px',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 300,
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#6a5e54',
          }}
        >
          {pieces ? `All Work — ${pieces.length} piece${pieces.length === 1 ? '' : 's'}` : 'All Work'}
        </span>
      </div>

      {!supabaseConfigured && (
        <div style={{ padding: '64px 28px', textAlign: 'center' }}>
          <p className="body-muted">Gallery is being set up — check back soon.</p>
        </div>
      )}

      {supabaseConfigured && error && (
        <div style={{ padding: '64px 28px', textAlign: 'center' }}>
          <p className="body-muted" style={{ color: '#a8838e' }}>{error}</p>
        </div>
      )}

      {supabaseConfigured && !error && pieces === null && (
        <div style={{ padding: '64px 28px', textAlign: 'center' }}>
          <p className="body-muted">Loading…</p>
        </div>
      )}

      {supabaseConfigured && !error && pieces !== null && pieces.length === 0 && (
        <div style={{ padding: '64px 28px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#8a7d70',
              margin: 0,
            }}
          >
            New work is on the way — the gallery will fill in soon.
          </p>
        </div>
      )}

      {pieces && pieces.length > 0 && (
        <div className="masonry" style={{ padding: '2px' }}>
          {pieces.map((piece, i) => (
            <ArtCard
              key={piece.id}
              piece={piece}
              navigate={navigate}
              style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
            />
          ))}
        </div>
      )}

      {/* footer strip */}
      <div
        style={{
          padding: '40px 28px',
          borderTop: '1px solid #2e2920',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: '#6a5e54',
            margin: 0,
          }}
        >
          Interested in an original or a commission?
        </p>
        <button className="btn-outline" onClick={() => navigate({ name: 'commission' })}>
          Commission a piece →
        </button>
      </div>
    </div>
  )
}
