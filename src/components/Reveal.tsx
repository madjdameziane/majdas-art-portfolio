import { useScrollReveal } from '../hooks/useScrollReveal'

interface Props {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
  className?: string
}

export default function Reveal({ children, delay = 0, style, className = '' }: Props) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
