import { type Piece, pieceImageUrl } from '../lib/pieces'

interface Props {
  piece: Piece
  onSelect: (piece: Piece) => void
  style?: React.CSSProperties
}

export default function WorkCard({ piece, onSelect, style }: Props) {
  const imageUrl = pieceImageUrl(piece.image_path)

  return (
    <button
      onClick={() => onSelect(piece)}
      className="liquid-glass rounded-[1.25rem] p-2.5 text-left w-full transition-transform duration-300 hover:-translate-y-1"
      style={style}
      aria-label={`View ${piece.title}`}
    >
      <div className="rounded-[0.9rem] overflow-hidden bg-white/5" style={{ aspectRatio: '4 / 5' }}>
        {imageUrl ? (
          <img src={imageUrl} alt={piece.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white/40 text-xs tracking-wide uppercase"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            No image yet
          </div>
        )}
      </div>
      <div className="pt-3 pb-1 px-1">
        <p
          className="text-white text-xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
        >
          {piece.title}
        </p>
        <p
          className="text-white/60 text-xs mt-1"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale'}
        </p>
      </div>
    </button>
  )
}
