import { useState } from 'react'
import { type Piece } from '../lib/pieces'
import WorkCard from '../components/WorkCard'
import PieceModal from '../components/PieceModal'
import Reveal from '../components/Reveal'

interface Props {
  pieces: Piece[] | null
  error: string | null
}

export default function FeaturedWorks({ pieces, error }: Props) {
  const [selected, setSelected] = useState<Piece | null>(null)

  const handleCommission = () => {
    setSelected(null)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="works" className="relative bg-black px-6 sm:px-8 md:px-16 lg:px-20 py-24 max-w-[1400px] mx-auto">
      <Reveal>
        <p className="kicker mb-3">// Gallery</p>
        <h2 className="section-heading mb-12">Featured Works</h2>
      </Reveal>

      {error && <p className="body-copy" style={{ color: '#ff8a7a' }}>{error}</p>}

      {!error && pieces === null && <p className="body-copy">Loading…</p>}

      {!error && pieces !== null && pieces.length === 0 && (
        <p className="body-copy italic">New work is on the way — check back soon.</p>
      )}

      {pieces && pieces.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((piece, i) => (
            <Reveal key={piece.id} delay={(i % 6) * 70}>
              <WorkCard piece={piece} index={i} onSelect={setSelected} />
            </Reveal>
          ))}
        </div>
      )}

      {selected && (
        <PieceModal piece={selected} onClose={() => setSelected(null)} onCommission={handleCommission} />
      )}
    </section>
  )
}
