import { ArrowUpRightIcon } from './icons'

const LINKS: { label: string; id: string }[] = [
  { label: 'Home', id: 'hero' },
  { label: 'Works', id: 'works' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16">
      <button
        onClick={() => scrollToId('hero')}
        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        aria-label="Back to top"
      >
        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-2xl text-white lowercase">
          m
        </span>
      </button>

      <nav className="liquid-glass hidden md:flex items-center rounded-full px-1.5 py-1.5 gap-1">
        {LINKS.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            style={{ fontFamily: "'Barlow', sans-serif" }}
            className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors rounded-full"
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => scrollToId('contact')}
          style={{ fontFamily: "'Barlow', sans-serif" }}
          className="flex items-center gap-1.5 bg-white text-black rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ml-1"
        >
          Commission a Piece
          <ArrowUpRightIcon className="h-4 w-4" />
        </button>
      </nav>

      <div className="w-12 h-12 flex-shrink-0" aria-hidden="true" />
    </header>
  )
}
