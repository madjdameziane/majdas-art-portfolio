interface Blob {
  color: string
  top: string
  left: string
  size: number
  animation: string
  duration: string
}

const DEFAULT_BLOBS: Blob[] = [
  { color: '#4ecdc4', top: '-22%', left: '-22%', size: 340, animation: 'auroraDriftA', duration: '24s' },
  { color: '#a78bfa', top: '-20%', left: '84%', size: 320, animation: 'auroraDriftB', duration: '28s' },
  { color: '#ff6b6b', top: '86%', left: '-15%', size: 300, animation: 'auroraDriftC', duration: '22s' },
  { color: '#ffb84d', top: '88%', left: '90%', size: 300, animation: 'auroraDriftA', duration: '32s' },
]

export default function AuroraBackground({ blobs = DEFAULT_BLOBS }: { blobs?: Blob[] }) {
  return (
    <div className="aurora">
      {blobs.map((blob, i) => (
        <span
          key={i}
          className="aurora-blob"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            animation: `${blob.animation} ${blob.duration} ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}
    </div>
  )
}
