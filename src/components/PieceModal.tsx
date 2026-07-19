import { useEffect } from 'react'
import { type Piece, pieceImageUrl } from '../lib/pieces'

interface Props {
  piece: Piece
  onClose: () => void
  onCommission: () => void
}

export default function PieceModal({ piece, onClose, onCommission }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const imageUrl = pieceImageUrl(piece.image_path)

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={piece.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2 L14 14 M14 2 L2 14" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{ background: '#F5F1E7', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imageUrl ? (
            <img src={imageUrl} alt={piece.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <p className="body-copy" style={{ fontSize: '0.85rem' }}>No image yet</p>
          )}
        </div>

        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
          <h2
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              fontSize: '2.2rem',
              color: '#141414',
              margin: '0 0 4px',
              lineHeight: 1.1,
            }}
          >
            {piece.title}
          </h2>
          {piece.year && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2E8B57', margin: '0 0 24px' }}>
              {piece.year}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', borderTop: '1px solid #EAE3D4', paddingTop: '18px' }}>
            {[
              { label: 'Medium', value: piece.medium },
              { label: 'Dimensions', value: piece.dimensions ?? '—' },
              { label: 'Price', value: piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#86807A' }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#141414', textAlign: 'right' }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {piece.description && (
            <p className="body-copy" style={{ fontSize: '0.9rem', marginBottom: '28px' }}>
              {piece.description}
            </p>
          )}

          <div style={{ marginTop: 'auto' }}>
            {piece.sold ? (
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px 24px',
                  border: '2px solid #EAE3D4',
                  borderRadius: '999px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  color: '#86807A',
                }}
              >
                This piece has sold
              </span>
            ) : (
              <button className="btn-primary" style={{ width: '100%' }} onClick={onCommission}>
                {piece.price ? `Inquire — $${piece.price.toLocaleString()}` : 'Ask about this piece'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
