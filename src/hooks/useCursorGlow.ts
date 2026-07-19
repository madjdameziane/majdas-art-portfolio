import { useEffect, useRef } from 'react'

export function useCursorGlow<T extends HTMLElement>(color: string) {
  const containerRef = useRef<T | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return
    glow.style.setProperty('--glow-color', color)

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glow.style.setProperty('--glow-x', `${x}%`)
      glow.style.setProperty('--glow-y', `${y}%`)
    }
    const handleEnter = () => glow.classList.add('is-active')
    const handleLeave = () => glow.classList.remove('is-active')

    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseenter', handleEnter)
    container.addEventListener('mouseleave', handleLeave)
    return () => {
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseenter', handleEnter)
      container.removeEventListener('mouseleave', handleLeave)
    }
  }, [color])

  return { containerRef, glowRef }
}
