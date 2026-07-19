import { type Piece, pieceImageUrl } from '../lib/pieces'
import CinematicBackground from '../components/CinematicBackground'
import { PaletteIcon, EditIcon, LayersIcon } from '../components/icons'

interface Card {
  icon: (props: { className?: string }) => React.ReactElement
  tags: string[]
  title: string
  body: string
}

const CARDS: Card[] = [
  {
    icon: PaletteIcon,
    tags: ['Acrylic & Oil', 'Still Life', 'Landscape', 'One of a Kind'],
    title: 'Original Works',
    body: 'Each piece is painted individually — no reproductions, no editions. What you see is the only one that exists.',
  },
  {
    icon: EditIcon,
    tags: ['Sketch First', 'Progress Photos', 'Your Space', 'Deposit to Start'],
    title: 'Custom Commissions',
    body: "Bring a subject, a size, or just a feeling. I'll sketch a direction before a single layer of paint goes down.",
  },
  {
    icon: LayersIcon,
    tags: ['Layered Build', 'Hand Finished', 'Slow Practice', 'Studio Sessions'],
    title: 'Considered Process',
    body: 'Paintings are built up over several sessions — underdrawing, blocking in, then the layers that bring it to life.',
  },
]

interface Props {
  pieces: Piece[] | null
}

export default function Practice({ pieces }: Props) {
  const images = (pieces ?? [])
    .map((p) => pieceImageUrl(p.image_path))
    .filter((url): url is string => Boolean(url))
    .reverse()

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <CinematicBackground images={images} intervalMs={7500} />

      <div className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
        <div className="mb-auto">
          <p className="kicker mb-6">// Practice</p>
          <h2
            className="text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9]"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', letterSpacing: '-3px' }}
          >
            Practice,
            <br />
            considered.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {CARDS.map(({ icon: Icon, tags, title, body }) => (
            <div key={title} className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="liquid-glass w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {tags.map((tag) => (
                    <span key={tag} className="liquid-glass tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1" />

              <div className="mt-6">
                <h3
                  className="text-white text-3xl md:text-4xl leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', letterSpacing: '-1px' }}
                >
                  {title}
                </h3>
                <p
                  className="mt-3 text-sm text-white/85 font-light leading-snug max-w-[32ch]"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
