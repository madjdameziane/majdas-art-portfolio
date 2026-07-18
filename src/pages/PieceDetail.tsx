import { useEffect, useState } from 'react'
import { getPiece, pieceImageUrl, type Piece } from '../lib/pieces'
import { type Page } from '../App'

interface Props {
  id: string
  navigate: (p: Page) => void
}

export default function PieceDetail({ id, navigate }: Props) {
  const [piece, setPiece] = useState<Piece | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setPiece(undefined)
    getPiece(id)
      .then((data) => {
        if (!cancelled) setPiece(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load piece.')
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center' }}>
        <p className="body-muted" style={{ color: '#a8838e' }}>{error}</p>
      </div>
    )
  }

  if (piece === undefined) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center' }}>
        <p className="body-muted">Loading…</p>
      </div>
    )
  }

  if (piece === null) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center' }}>
        <p style={{ color: '#6a5e54', fontFamily: "'Epilogue', sans-serif" }}>Piece not found.</p>
        <button
          onClick={() => navigate({ name: 'gallery' })}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9c7a50',
            fontFamily: "'Epilogue', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          ← Back to gallery
        </button>
      </div>
    )
  }

  const imageUrl = pieceImageUrl(piece.image_path)

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* breadcrumb */}
      <div
        style={{
          padding: '14px 28px',
          borderBottom: '1px solid #2e2920',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => navigate({ name: 'gallery' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6a5e54',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#a09080')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6a5e54')}
        >
          ← Gallery
        </button>
      </div>

      {/* main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 360px',
          minHeight: 'calc(100vh - 58px)',
        }}
        className="piece-layout"
      >
        {/* image */}
        <div style={{ borderRight: '1px solid #2e2920', backgroundColor: '#0e0d0b' }}>
          {imageUrl ? (
            <div
              className={`zoom-wrap${zoomed ? ' zoomed' : ''}`}
              onClick={() => setZoomed((z) => !z)}
              style={{ height: '100%', minHeight: '60vh' }}
            >
              <img
                src={imageUrl}
                alt={piece.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  maxHeight: '90vh',
                }}
              />
            </div>
          ) : (
            <div style={{ height: '100%', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p className="body-muted">No image yet</p>
            </div>
          )}
          {imageUrl && (
            <p
              style={{
                padding: '10px 18px',
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#3d3630',
                margin: 0,
                textAlign: 'center',
              }}
            >
              {zoomed ? 'Click to fit' : 'Click to zoom'}
            </p>
          )}
        </div>

        {/* sidebar */}
        <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              color: '#e4dbd0',
              margin: '0 0 6px',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            {piece.title}
          </h1>
          <p
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9c7a50',
              margin: '0 0 36px',
            }}
          >
            {piece.year ?? ''}
          </p>

          {/* metadata table */}
          <div
            style={{
              borderTop: '1px solid #2e2920',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '36px',
            }}
          >
            {[
              { label: 'Medium', value: piece.medium },
              { label: 'Dimensions', value: piece.dimensions ?? '—' },
              {
                label: 'Price',
                value: piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale',
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}
              >
                <span
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#6a5e54',
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.82rem',
                    color: '#a09080',
                    textAlign: 'right',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* description */}
          {piece.description && (
            <div
              style={{
                borderTop: '1px solid #2e2920',
                paddingTop: '24px',
                marginBottom: '40px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6a5e54',
                  margin: '0 0 12px',
                }}
              >
                About this piece
              </p>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 300,
                  fontSize: '0.88rem',
                  color: '#8a7d70',
                  margin: 0,
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                }}
              >
                {piece.description}
              </p>
            </div>
          )}

          {/* actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
            {piece.sold ? (
              <span
                style={{
                  textAlign: 'center',
                  padding: '14px 24px',
                  border: '1px solid #2e2920',
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6a5e54',
                }}
              >
                This piece has sold
              </span>
            ) : (
              <button className="btn-primary" onClick={() => navigate({ name: 'commission' })}>
                {piece.price ? `Inquire — $${piece.price.toLocaleString()}` : 'Ask about this piece'}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .piece-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
