import { supabase } from './supabase'

export interface Piece {
  id: string
  title: string
  medium: string
  dimensions: string | null
  year: number | null
  price: number | null
  sold: boolean
  description: string | null
  image_path: string | null
  sort_order: number
  created_at: string
}

export type PieceInput = Omit<Piece, 'id' | 'created_at'>

export async function listPieces(): Promise<Piece[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('pieces')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Piece[]
}

export async function getPiece(id: string): Promise<Piece | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from('pieces').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data as Piece | null
}

export async function createPiece(piece: PieceInput): Promise<Piece> {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { data, error } = await supabase.from('pieces').insert(piece).select().single()
  if (error) throw error
  return data as Piece
}

export async function updatePiece(id: string, updates: Partial<PieceInput>): Promise<Piece> {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { data, error } = await supabase.from('pieces').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Piece
}

export async function deletePiece(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { error } = await supabase.from('pieces').delete().eq('id', id)
  if (error) throw error
}

export async function uploadPieceImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('artwork').upload(path, file)
  if (error) throw error
  return path
}

export function pieceImageUrl(path: string | null): string | null {
  if (!supabase || !path) return null
  const { data } = supabase.storage.from('artwork').getPublicUrl(path)
  return data.publicUrl
}
