import { motion } from 'framer-motion'
import { type Piece, pieceImageUrl } from '../lib/pieces'
import CinematicBackground from '../components/CinematicBackground'
import BlurText from '../components/BlurText'
import { ArrowUpRightIcon, PaletteIcon, ClockIcon } from '../components/icons'

const COMMISSIONS_OPEN = true

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

  return (
    <section id="hero" className="relative h-screen min-h-[720px] bg-black overflow-hidden">
      <CinematicBackground images={images} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24">
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            className="liquid-glass rounded-full flex items-center mb-6"
          >
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold m-1.5" style={{ fontFamily: "'Barlow', sans-serif" }}>
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
            <button
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              View the Gallery
              <ArrowUpRightIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
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
              <PaletteIcon className="text-white w-7 h-7" />
              <p
                className="text-3xl sm:text-4xl text-white leading-none mt-4"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', letterSpacing: '-1px' }}
              >
                {pieceCount === null ? '—' : `${pieceCount}+`}
              </p>
              <p className="text-xs text-white/70 font-light mt-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Original Paintings
              </p>
            </div>
            <div className="liquid-glass p-5 w-[190px] sm:w-[220px] rounded-[1.25rem]">
              <ClockIcon className="text-white w-7 h-7" />
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
            {['Acrylic', 'Oil', 'Gouache', 'Ink', 'Mixed Media'].map((medium) => (
              <span
                key={medium}
                className="text-xl md:text-2xl text-white tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                {medium}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
