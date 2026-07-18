import { supabase } from './supabase'

export async function signIn(email: string, password: string): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut(): Promise<void> {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getIsLoggedIn(): Promise<boolean> {
  if (!supabase) return false
  const { data } = await supabase.auth.getSession()
  return Boolean(data.session)
}

export function onAuthChange(cb: (loggedIn: boolean) => void): () => void {
  if (!supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(Boolean(session)))
  return () => data.subscription.unsubscribe()
}
