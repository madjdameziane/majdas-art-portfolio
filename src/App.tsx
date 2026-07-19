import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Admin from './pages/Admin'

export type Page = { name: 'home' } | { name: 'admin' }

function initialPage(): Page {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return { name: 'admin' }
  }
  return { name: 'home' }
}

export default function App() {
  const [page, setPage] = useState<Page>(initialPage)

  const goHome = () => {
    setPage({ name: 'home' })
    window.history.replaceState(null, '', '/')
  }

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      {page.name !== 'admin' && <Nav />}
      <main>
        {page.name === 'home' && <Home />}
        {page.name === 'admin' && <Admin onExit={goHome} />}
      </main>
    </div>
  )
}
