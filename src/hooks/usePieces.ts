import { useEffect, useState } from 'react'
import { listPieces, type Piece } from '../lib/pieces'
import { supabaseConfigured } from '../lib/supabase'

export function usePieces() {
  const [pieces, setPieces] = useState<Piece[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabaseConfigured) {
      setPieces([])
      return
    }
    listPieces()
      .then(setPieces)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load pieces.'))
  }, [])

  return { pieces, error }
}
