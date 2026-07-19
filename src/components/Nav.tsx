const LINKS: { label: string; id: string }[] = [
  { label: 'Works', id: 'works' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  return (
    <header className="site-nav">
      <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="nav-logo-line1">Majda's</span>
        <span className="nav-logo-line2">Art Portfolio</span>
      </button>

      <nav className="nav-links">
        {LINKS.map(({ label, id }) => (
          <button key={id} className="nav-link" onClick={() => scrollToId(id)}>
            {label}
          </button>
        ))}
        <button
          className="nav-icon-btn"
          aria-label="Go to contact"
          onClick={() => scrollToId('contact')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15C3.67 19 3 18.33 3 17.5v-11Z"
              stroke="#141414"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M4 6.5 12 13l8-6.5" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
