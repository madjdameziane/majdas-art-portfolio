import { useEffect, useRef } from 'react'

const FADE_MS = 900

interface Props {
  images: string[]
  intervalMs?: number
}

/**
 * Slow Ken-Burns crossfade between artwork images, standing in for the
 * looping background video from the original brief. Crossfade opacity is
 * driven by requestAnimationFrame (not a CSS transition) so it always
 * resumes smoothly from wherever the previous fade left off.
 */
export default function CinematicBackground({ images, intervalMs = 6500 }: Props) {
  const layerRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]
  const frontIndexRef = useRef(0)
  const imageIndexRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (images.length === 0) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const front = layerRefs[0].current
    const back = layerRefs[1].current
    if (!front || !back) return

    front.style.backgroundImage = `url(${images[0]})`
    front.style.opacity = '1'
    front.style.zIndex = '2'
    back.style.backgroundImage = `url(${images[1 % images.length]})`
    back.style.opacity = '0'
    back.style.zIndex = '1'
    frontIndexRef.current = 0
    imageIndexRef.current = 0

    if (images.length < 2 || prefersReducedMotion) return

    const fadeElementTo = (el: HTMLDivElement, target: number, duration: number, onDone?: () => void) => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      const start = parseFloat(el.style.opacity || '1')
      const startTime = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        el.style.opacity = String(start + (target - start) * t)
        if (t < 1) {
          rafIdRef.current = requestAnimationFrame(step)
        } else {
          onDone?.()
        }
      }
      rafIdRef.current = requestAnimationFrame(step)
    }

    const advance = () => {
      const frontEl = layerRefs[frontIndexRef.current].current
      const backEl = layerRefs[1 - frontIndexRef.current].current
      if (!frontEl || !backEl) return

      const nextIndex = (imageIndexRef.current + 1) % images.length
      backEl.style.backgroundImage = `url(${images[nextIndex]})`
      backEl.style.opacity = '1'
      backEl.style.zIndex = '1'
      frontEl.style.zIndex = '2'

      fadeElementTo(frontEl, 0, FADE_MS, () => {
        imageIndexRef.current = nextIndex
        frontIndexRef.current = 1 - frontIndexRef.current
        timerRef.current = window.setTimeout(advance, intervalMs)
      })
    }

    timerRef.current = window.setTimeout(advance, intervalMs)

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.join('|'), intervalMs])

  if (images.length === 0) {
    return (
      <div className="cinematic-bg">
        <div className="cinematic-bg-placeholder" />
      </div>
    )
  }

  return (
    <div className="cinematic-bg">
      <div
        ref={layerRefs[0]}
        className="cinematic-bg-layer"
        style={{ animation: 'kenBurnsIn 18s ease-in-out infinite alternate' }}
      />
      <div
        ref={layerRefs[1]}
        className="cinematic-bg-layer"
        style={{ animation: 'kenBurnsIn 18s ease-in-out infinite alternate', animationDelay: '-9s' }}
      />
    </div>
  )
}
