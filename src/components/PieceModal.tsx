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
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-[100]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="liquid-glass-strong rounded-[1.5rem] max-w-4xl w-full max-h-[88vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 relative"
        role="dialog"
        aria-modal="true"
        aria-label={piece.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="liquid-glass absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-shadow duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 18px -4px rgba(255,107,107,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2 L14 14 M14 2 L2 14" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="bg-white/5 min-h-[260px] flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={piece.title} className="w-full h-full object-cover block" />
          ) : (
            <p className="body-copy text-sm">No image yet</p>
          )}
        </div>

        <div className="p-8 sm:p-9 flex flex-col">
          <h2
            className="text-white text-4xl leading-tight mb-1"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            {piece.title}
          </h2>
          {piece.year && (
            <p className="text-sm text-white/60 mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {piece.year}
            </p>
          )}

          <div className="flex flex-col gap-2.5 mb-6 border-t border-white/10 pt-4">
            {[
              { label: 'Medium', value: piece.medium },
              { label: 'Dimensions', value: piece.dimensions ?? '—' },
              { label: 'Price', value: piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span
                  className="text-xs uppercase text-white/50"
                  style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: '0.05em' }}
                >
                  {label}
                </span>
                <span className="text-sm text-white text-right" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {piece.description && (
            <p className="body-copy text-sm mb-7">{piece.description}</p>
          )}

          <div className="mt-auto">
            {piece.sold ? (
              <span className="block text-center py-3.5 rounded-full border border-white/15 text-sm font-medium text-white/50" style={{ fontFamily: "'Barlow', sans-serif" }}>
                This piece has sold
              </span>
            ) : (
              <button
                className="btn-primary w-full"
                onClick={onCommission}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px -8px rgba(140,233,154,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                {piece.price ? `Inquire — $${piece.price.toLocaleString()}` : 'Ask about this piece'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
