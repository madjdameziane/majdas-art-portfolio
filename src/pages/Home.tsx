import { useEffect, useState } from 'react'
import { listPieces, type Piece } from '../lib/pieces'
import { supabaseConfigured } from '../lib/supabase'
import ArtCard from '../components/ArtCard'
import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

export default function Home({ navigate }: Props) {
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    if (!supabaseConfigured) return
    listPieces()
      .then((data) => setPieces(data.slice(0, 3)))
      .catch(() => setPieces([]))
  }, [])

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
        <p className="eyebrow">Original paintings</p>
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
          Majda Meziane
        </h1>

        <p
          className="body-muted"
          style={{ fontSize: '1rem', maxWidth: '560px', margin: '24px 0 36px' }}
        >
          A collection of original paintings — available to view, collect, or commission.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate({ name: 'gallery' })}>
            View the gallery →
          </button>
          <button className="btn-outline" onClick={() => navigate({ name: 'commission' })}>
            Commission a piece
          </button>
        </div>
      </section>

      {/* featured work */}
      {pieces.length > 0 && (
        <section style={{ padding: '64px 28px', borderBottom: '1px solid #2e2920' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <p className="eyebrow" style={{ margin: 0 }}>Recent work</p>
            <button
              onClick={() => navigate({ name: 'gallery' })}
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
              View all →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '2px',
            }}
          >
            {pieces.map((piece, i) => (
              <ArtCard key={piece.id} piece={piece} navigate={navigate} style={{ animationDelay: `${i * 60}ms`, opacity: 0 }} />
            ))}
          </div>
        </section>
      )}

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
          Looking for something specific?
        </h2>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate({ name: 'commission' })}>
            Commission a piece
          </button>
          <button className="btn-outline" onClick={() => navigate({ name: 'about' })}>
            About the artist
          </button>
        </div>
      </section>
    </div>
  )
}
