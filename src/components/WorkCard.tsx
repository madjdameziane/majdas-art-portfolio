import { motion, useMotionValue, useSpring } from 'framer-motion'
import { type Piece, pieceImageUrl } from '../lib/pieces'

const ACCENTS = ['#4ecdc4', '#ff6b6b', '#a78bfa', '#ffb84d', '#8ce99a']

interface Props {
  piece: Piece
  index: number
  onSelect: (piece: Piece) => void
  style?: React.CSSProperties
}

export default function WorkCard({ piece, index, onSelect, style }: Props) {
  const imageUrl = pieceImageUrl(piece.image_path)
  const accent = ACCENTS[index % ACCENTS.length]

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 })
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 12)
    rotateX.set(-py * 12)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.button
      onClick={() => onSelect(piece)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="liquid-glass tilt-card rounded-[1.25rem] p-2.5 text-left w-full transition-shadow duration-300"
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        ...style,
      }}
      whileHover={{ boxShadow: `0 20px 40px -16px ${accent}55` }}
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
        <p className="flex items-center gap-1.5 text-white/60 text-xs mt-1" style={{ fontFamily: "'Barlow', sans-serif" }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: accent }} />
          {piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'Not for sale'}
        </p>
      </div>
    </motion.button>
  )
}
