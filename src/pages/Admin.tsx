import { useEffect, useState } from 'react'
import { signIn, signOut, getIsLoggedIn, onAuthChange } from '../lib/auth'
import {
  listPieces,
  createPiece,
  updatePiece,
  deletePiece,
  uploadPieceImage,
  pieceImageUrl,
  type Piece,
  type PieceInput,
} from '../lib/pieces'
import { supabaseConfigured } from '../lib/supabase'
import PieceForm, { type PieceFormValues } from '../components/PieceForm'
import { type Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

function toPieceInput(values: PieceFormValues, imagePath: string | null, sortOrder: number): PieceInput {
  return {
    title: values.title.trim(),
    medium: values.medium.trim(),
    dimensions: values.dimensions.trim() || null,
    year: values.year.trim() ? Number(values.year) : null,
    price: values.price.trim() ? Number(values.price) : null,
    sold: values.sold,
    description: values.description.trim() || null,
    image_path: imagePath,
    sort_order: sortOrder,
  }
}

function pieceToFormValues(piece: Piece): PieceFormValues {
  return {
    title: piece.title,
    medium: piece.medium,
    dimensions: piece.dimensions ?? '',
    year: piece.year ? String(piece.year) : '',
    price: piece.price ? String(piece.price) : '',
    sold: piece.sold,
    description: piece.description ?? '',
  }
}

export default function Admin({ navigate }: Props) {
  const [authChecked, setAuthChecked] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginBusy, setLoginBusy] = useState(false)

  const [pieces, setPieces] = useState<Piece[]>([])
  const [listError, setListError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Piece | null>(null)
  const [formBusy, setFormBusy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (!supabaseConfigured) {
      setAuthChecked(true)
      return
    }
    getIsLoggedIn().then((isLoggedIn) => {
      setLoggedIn(isLoggedIn)
      setAuthChecked(true)
    })
    return onAuthChange((isLoggedIn) => setLoggedIn(isLoggedIn))
  }, [])

  const refreshPieces = () => {
    listPieces()
      .then(setPieces)
      .catch((err) => setListError(err instanceof Error ? err.message : 'Failed to load pieces.'))
  }

  useEffect(() => {
    if (loggedIn) refreshPieces()
  }, [loggedIn])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginBusy(true)
    setLoginError(null)
    try {
      await signIn(email, password)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoginBusy(false)
    }
  }

  const handleCreate = async (values: PieceFormValues, imageFile: File | null) => {
    setFormBusy(true)
    setFormError(null)
    try {
      const imagePath = imageFile ? await uploadPieceImage(imageFile) : null
      await createPiece(toPieceInput(values, imagePath, pieces.length))
      refreshPieces()
      setFormKey((k) => k + 1)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save piece.')
    } finally {
      setFormBusy(false)
    }
  }

  const handleUpdate = async (values: PieceFormValues, imageFile: File | null) => {
    if (!editing) return
    setFormBusy(true)
    setFormError(null)
    try {
      const imagePath = imageFile ? await uploadPieceImage(imageFile) : editing.image_path
      await updatePiece(editing.id, toPieceInput(values, imagePath, editing.sort_order))
      setEditing(null)
      refreshPieces()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update piece.')
    } finally {
      setFormBusy(false)
    }
  }

  const handleDelete = async (piece: Piece) => {
    if (!window.confirm(`Delete "${piece.title}"? This can't be undone.`)) return
    try {
      await deletePiece(piece.id)
      refreshPieces()
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to delete piece.')
    }
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Epilogue', sans-serif",
    fontWeight: 300,
    fontSize: '0.66rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#6a5e54',
    display: 'block',
    marginBottom: '6px',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#1d1a17',
    border: '1px solid #2e2920',
    padding: '12px 14px',
    fontFamily: "'Epilogue', sans-serif",
    fontWeight: 300,
    fontSize: '0.84rem',
    color: '#e4dbd0',
    outline: 'none',
  }

  if (!supabaseConfigured) {
    return (
      <div style={{ padding: '80px 28px', maxWidth: '480px' }}>
        <p className="eyebrow">Admin</p>
        <p className="body-muted">
          Supabase isn't connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as
          environment variables, then reload.
        </p>
      </div>
    )
  }

  if (!authChecked) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center' }}>
        <p className="body-muted">Loading…</p>
      </div>
    )
  }

  if (!loggedIn) {
    return (
      <div style={{ padding: '80px 28px', maxWidth: '380px' }}>
        <p className="eyebrow">Admin</p>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '1.8rem',
            color: '#e4dbd0',
            margin: '0 0 28px',
          }}
        >
          Log in
        </h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          {loginError && <p style={{ color: '#a8838e', fontSize: '0.78rem', margin: 0 }}>{loginError}</p>}
          <button type="submit" className="btn-primary" disabled={loginBusy}>
            {loginBusy ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <button
          onClick={() => navigate({ name: 'home' })}
          style={{
            marginTop: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: "'Epilogue', sans-serif",
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6a5e54',
          }}
        >
          ← Back to site
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px 28px 80px', maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Admin</p>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.8rem', color: '#e4dbd0', margin: 0 }}>
            Manage pieces
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-outline" onClick={() => navigate({ name: 'home' })}>View site</button>
          <button className="btn-outline" onClick={() => signOut()}>Log out</button>
        </div>
      </div>

      {/* add / edit form */}
      <div className="surface-card" style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#e4dbd0', margin: '0 0 20px' }}>
          {editing ? `Editing "${editing.title}"` : 'Add a new piece'}
        </p>
        <PieceForm
          key={editing ? editing.id : formKey}
          initialValues={editing ? pieceToFormValues(editing) : undefined}
          initialImageUrl={editing ? pieceImageUrl(editing.image_path) : null}
          submitLabel={editing ? 'Save changes' : 'Add piece'}
          busy={formBusy}
          error={formError}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={editing ? () => setEditing(null) : undefined}
        />
      </div>

      {/* existing pieces */}
      <p className="eyebrow">Existing pieces ({pieces.length})</p>
      {listError && <p style={{ color: '#a8838e', fontSize: '0.8rem' }}>{listError}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#2e2920', border: '1px solid #2e2920' }}>
        {pieces.map((piece) => {
          const imageUrl = pieceImageUrl(piece.image_path)
          return (
            <div
              key={piece.id}
              style={{
                background: '#141210',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt={piece.title} style={{ width: '48px', height: '48px', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '48px', height: '48px', background: '#1d1a17', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '0.85rem', color: '#e4dbd0', margin: 0 }}>{piece.title}</p>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '0.72rem', color: '#6a5e54', margin: '2px 0 0' }}>
                  {piece.medium} · {piece.sold ? 'Sold' : piece.price ? `$${piece.price.toLocaleString()}` : 'NFS'}
                </p>
              </div>
              <button className="btn-outline" style={{ padding: '8px 14px' }} onClick={() => setEditing(piece)}>
                Edit
              </button>
              <button className="btn-outline" style={{ padding: '8px 14px', color: '#a8838e', borderColor: '#3d3630' }} onClick={() => handleDelete(piece)}>
                Delete
              </button>
            </div>
          )
        })}
        {pieces.length === 0 && (
          <div style={{ background: '#141210', padding: '24px 18px' }}>
            <p className="body-muted" style={{ fontSize: '0.82rem' }}>No pieces yet — add your first one above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
