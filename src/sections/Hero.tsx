import { motion } from 'framer-motion'
import { type Piece, pieceImageUrl } from '../lib/pieces'
import CinematicBackground from '../components/CinematicBackground'
import AuroraBackground from '../components/AuroraBackground'
import BlurText from '../components/BlurText'
import Magnetic from '../components/Magnetic'
import Counter from '../components/Counter'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { ArrowUpRightIcon, PaletteIcon, ClockIcon } from '../components/icons'

const COMMISSIONS_OPEN = true
const MEDIUMS: { label: string; color: string }[] = [
  { label: 'Acrylic', color: '#4ecdc4' },
  { label: 'Oil', color: '#ff6b6b' },
  { label: 'Gouache', color: '#a78bfa' },
  { label: 'Ink', color: '#ffb84d' },
  { label: 'Mixed Media', color: '#8ce99a' },
]

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
}

interface Props {
  pieces: Piece[] | null
}

export default function Hero({ pieces }: Props) {
  const images = (pieces ?? [])
    .map((p) => pieceImageUrl(p.image_path))
    .filter((url): url is string => Boolean(url))

  const pieceCount = pieces?.length ?? null
  const { containerRef, glowRef } = useCursorGlow<HTMLElement>('rgba(78, 205, 196, 0.16)')

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen min-h-[720px] bg-black overflow-hidden"
    >
      <CinematicBackground images={images} />
      <AuroraBackground />
      <div ref={glowRef} className="cursor-glow" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            className="liquid-glass rounded-full flex items-center mb-6"
          >
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold m-1.5"
              style={{
                fontFamily: "'Barlow', sans-serif",
                background: COMMISSIONS_OPEN ? '#8ce99a' : '#ff6b6b',
                color: '#000',
              }}
            >
              {COMMISSIONS_OPEN ? 'Open' : 'Waitlist'}
            </span>
            <span className="text-sm text-white/90 pr-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {COMMISSIONS_OPEN ? 'Now taking new commissions' : 'Commissions currently closed'}
            </span>
          </motion.div>

          <BlurText
            text="Every Canvas Holds a Moment"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-3xl leading-[0.95] text-white"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', letterSpacing: '-2px' }}
          />

          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.8 }}
            className="mt-5 text-sm md:text-base text-white/80 max-w-xl text-center font-light leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Original paintings built in careful layers — quiet still lifes, landscapes, and
            considered commissions, made one brushstroke at a time.
          </motion.p>

          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 1.1 }}
            className="flex items-center gap-6 mt-7"
          >
            <Magnetic strength={0.35}>
              <button
                onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 transition-shadow duration-300"
                style={{ fontFamily: "'Barlow', sans-serif" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px -8px rgba(78,205,196,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                View the Gallery
                <ArrowUpRightIcon className="h-5 w-5" />
              </button>
            </Magnetic>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-[#a78bfa] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Meet the Artist
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 1.3 }}
            className="flex items-stretch gap-4 mt-9"
          >
            <div className="liquid-glass p-5 w-[190px] sm:w-[220px] rounded-[1.25rem]">
              <PaletteIcon style={{ color: '#4ecdc4' }} className="w-7 h-7" />
              <p
                className="text-3xl sm:text-4xl text-white leading-none mt-4"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', letterSpacing: '-1px' }}
              >
                {pieceCount === null ? '—' : <Counter target={pieceCount} suffix="+" />}
              </p>
              <p className="text-xs text-white/70 font-light mt-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Original Paintings
              </p>
            </div>
            <div className="liquid-glass p-5 w-[190px] sm:w-[220px] rounded-[1.25rem]">
              <ClockIcon style={{ color: '#ff6b6b' }} className="w-7 h-7" />
              <p
                className="text-3xl sm:text-4xl text-white leading-none mt-4"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', letterSpacing: '-1px' }}
              >
                {COMMISSIONS_OPEN ? 'Open' : 'Closed'}
              </p>
              <p className="text-xs text-white/70 font-light mt-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Commission Status
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.4 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Working across mediums
          </span>
          <div className="flex gap-8 md:gap-14 flex-wrap justify-center px-4">
            {MEDIUMS.map(({ label, color }) => (
              <span
                key={label}
                className="flex items-center gap-2 text-xl md:text-2xl tracking-tight transition-colors"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#fff' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
