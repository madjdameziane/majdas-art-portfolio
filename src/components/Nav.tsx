import { ArrowUpRightIcon } from './icons'

const LINKS: { label: string; id: string; color: string }[] = [
  { label: 'Home', id: 'hero', color: '#4ecdc4' },
  { label: 'Works', id: 'works', color: '#ff6b6b' },
  { label: 'About', id: 'about', color: '#a78bfa' },
  { label: 'Contact', id: 'contact', color: '#ffb84d' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16">
      <button
        onClick={() => scrollToId('hero')}
        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-shadow duration-300"
        aria-label="Back to top"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px -6px rgba(167,139,250,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = ''
        }}
      >
        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }} className="text-2xl text-white lowercase">
          m
        </span>
      </button>

      <nav className="liquid-glass hidden md:flex items-center rounded-full px-1.5 py-1.5 gap-1">
        {LINKS.map(({ label, id, color }) => (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            style={{ fontFamily: "'Barlow', sans-serif" }}
            className="group relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors rounded-full"
          >
            {label}
            <span
              className="absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
              style={{ background: color }}
            />
          </button>
        ))}
        <button
          onClick={() => scrollToId('contact')}
          style={{ fontFamily: "'Barlow', sans-serif" }}
          className="flex items-center gap-1.5 bg-white text-black rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ml-1 transition-shadow duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(255,184,77,0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = ''
          }}
        >
          Commission a Piece
          <ArrowUpRightIcon className="h-4 w-4" />
        </button>
      </nav>

      <div className="w-12 h-12 flex-shrink-0" aria-hidden="true" />
    </header>
  )
}
