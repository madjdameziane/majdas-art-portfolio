import { type Piece, pieceImageUrl } from '../lib/pieces'

const TAPE_COLORS = ['rgba(244, 201, 93, 0.85)', 'rgba(226, 114, 91, 0.75)', 'rgba(46, 139, 87, 0.55)']

interface Props {
  piece: Piece
  index: number
  onSelect: (piece: Piece) => void
  style?: React.CSSProperties
}

export default function WorkCard({ piece, index, onSelect, style }: Props) {
  const imageUrl = pieceImageUrl(piece.image_path)
  const rotation = [-2, 1.5, -1, 2, -1.5, 1][index % 6]
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length]

  return (
    <button
      className="work-card"
      onClick={() => onSelect(piece)}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      aria-label={`View ${piece.title}`}
    >
      <div className="work-card-image-wrap">
        <span className="work-card-tape" style={{ background: tapeColor }} />
        {imageUrl ? (
          <img src={imageUrl} alt={piece.title} loading="lazy" />
        ) : (
          <div className="work-card-placeholder">No image yet</div>
        )}
      </div>
      <div className="work-card-meta">
        <p className="work-card-title">{piece.title}</p>
        <p className="work-card-sub">
          {piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale'}
        </p>
      </div>
    </button>
  )
}
