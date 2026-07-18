import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import PieceDetail from './pages/PieceDetail'
import About from './pages/About'
import Commission from './pages/Commission'
import Admin from './pages/Admin'

export type Page =
  | { name: 'home' }
  | { name: 'gallery' }
  | { name: 'piece'; id: string }
  | { name: 'about' }
  | { name: 'commission' }
  | { name: 'admin' }

function initialPage(): Page {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return { name: 'admin' }
  }
  return { name: 'home' }
}

export default function App() {
  const [page, setPage] = useState<Page>(initialPage)

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', p.name === 'admin' ? '/admin' : '/')
  }

  return (
    <div style={{ backgroundColor: '#141210', minHeight: '100vh', color: '#e4dbd0' }}>
      {page.name !== 'admin' && <Nav page={page} navigate={navigate} />}
      <main>
        {page.name === 'home' && <Home navigate={navigate} />}
        {page.name === 'gallery' && <Gallery navigate={navigate} />}
        {page.name === 'piece' && <PieceDetail id={page.id} navigate={navigate} />}
        {page.name === 'about' && <About navigate={navigate} />}
        {page.name === 'commission' && <Commission />}
        {page.name === 'admin' && <Admin navigate={navigate} />}
      </main>
    </div>
  )
}
