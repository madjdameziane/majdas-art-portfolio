import { type Piece, pieceImageUrl } from '../lib/pieces'
import { type Page } from '../App'

interface Props {
  piece: Piece
  navigate: (p: Page) => void
  style?: React.CSSProperties
}

export default function ArtCard({ piece, navigate, style }: Props) {
  const imageUrl = pieceImageUrl(piece.image_path)

  return (
    <div className="masonry-item fade-up" style={style}>
      <button
        className="piece-card"
        onClick={() => navigate({ name: 'piece', id: piece.id })}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
        }}
        aria-label={`View ${piece.title}`}
      >
        {imageUrl ? (
          <img className="main-image" src={imageUrl} alt={piece.title} loading="lazy" style={{ backgroundColor: '#1d1a17' }} />
        ) : (
          <div className="piece-card-placeholder" aria-hidden="true">
            <span>No image yet</span>
          </div>
        )}

        <div className="card-meta">
          <p
            style={{
              margin: 0,
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: '#e4dbd0',
              letterSpacing: '0.01em',
              lineHeight: 1.3,
            }}
          >
            {piece.title}
          </p>
          <p
            style={{
              margin: '4px 0 0',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9c7a50',
            }}
          >
            {piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale'}
          </p>
        </div>
      </button>
    </div>
  )
}
