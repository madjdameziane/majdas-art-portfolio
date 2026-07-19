import { useEffect, useState } from 'react'
import { listPieces, type Piece } from '../lib/pieces'
import { supabaseConfigured } from '../lib/supabase'
import WorkCard from '../components/WorkCard'
import PieceModal from '../components/PieceModal'
import Reveal from '../components/Reveal'

export default function FeaturedWorks() {
  const [pieces, setPieces] = useState<Piece[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Piece | null>(null)

  useEffect(() => {
    if (!supabaseConfigured) {
      setPieces([])
      return
    }
    listPieces()
      .then(setPieces)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load pieces.'))
  }, [])

  const handleCommission = () => {
    setSelected(null)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="works" style={{ padding: '80px 28px 100px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal>
        <p className="hand-label">A little of everything</p>
        <h2 className="section-heading" style={{ marginBottom: '48px' }}>Featured Works</h2>
      </Reveal>

      {error && (
        <p className="body-copy" style={{ color: '#E2725B' }}>{error}</p>
      )}

      {!error && pieces === null && (
        <p className="body-copy">Loading…</p>
      )}

      {!error && pieces !== null && pieces.length === 0 && (
        <p className="body-copy" style={{ fontStyle: 'italic' }}>
          New work is on the way — check back soon.
        </p>
      )}

      {pieces && pieces.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '40px 28px',
          }}
        >
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
