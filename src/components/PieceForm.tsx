import { useState } from 'react'

export interface PieceFormValues {
  title: string
  medium: string
  dimensions: string
  year: string
  price: string
  sold: boolean
  description: string
}

const EMPTY: PieceFormValues = {
  title: '',
  medium: '',
  dimensions: '',
  year: '',
  price: '',
  sold: false,
  description: '',
}

interface Props {
  initialValues?: Partial<PieceFormValues>
  initialImageUrl?: string | null
  submitLabel: string
  busy?: boolean
  error?: string | null
  onSubmit: (values: PieceFormValues, imageFile: File | null) => void
  onCancel?: () => void
}

export default function PieceForm({ initialValues, initialImageUrl, submitLabel, busy, error, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<PieceFormValues>({ ...EMPTY, ...initialValues })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const set = <K extends keyof PieceFormValues>(key: K) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#FFFFFF',
    border: '2px solid #EAE3D4',
    borderRadius: '10px',
    padding: '10px 12px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '0.85rem',
    color: '#141414',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.65rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#86807A',
    display: 'block',
    marginBottom: '5px',
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(values, imageFile)
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input required style={inputStyle} value={values.title} onChange={set('title')} placeholder="Piece title" />
        </div>
        <div>
          <label style={labelStyle}>Medium</label>
          <input required style={inputStyle} value={values.medium} onChange={set('medium')} placeholder="e.g. Acrylic on canvas" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Dimensions</label>
          <input style={inputStyle} value={values.dimensions} onChange={set('dimensions')} placeholder="e.g. 40 x 60 cm" />
        </div>
        <div>
          <label style={labelStyle}>Year</label>
          <input style={inputStyle} value={values.year} onChange={set('year')} placeholder="2026" inputMode="numeric" />
        </div>
        <div>
          <label style={labelStyle}>Price (blank = NFS)</label>
          <input style={inputStyle} value={values.price} onChange={set('price')} placeholder="e.g. 650" inputMode="decimal" />
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={values.sold}
          onChange={set('sold')}
          style={{ width: '14px', height: '14px' }}
        />
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.82rem', color: '#57534A' }}>
          Sold
        </span>
      </label>

      <div>
        <label style={labelStyle}>Description / story (optional)</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
          value={values.description}
          onChange={set('description')}
          rows={3}
        />
      </div>

      <div>
        <label style={labelStyle}>{initialImageUrl ? 'Replace photo' : 'Photo'}</label>
        {initialImageUrl && !imageFile && (
          <img src={initialImageUrl} alt="Current" style={{ width: '80px', height: '80px', objectFit: 'cover', marginBottom: '8px', display: 'block' }} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#57534A' }}
        />
      </div>

      {error && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#E2725B', margin: 0 }}>{error}</p>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn-outline" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
