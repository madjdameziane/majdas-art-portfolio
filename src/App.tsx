import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Work from './pages/Work'
import Project from './pages/Project'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import { type Category } from './data/projects'

export type Page =
  | { name: 'home' }
  | { name: 'work'; filter?: Category }
  | { name: 'project'; id: string }
  | { name: 'pricing' }
  | { name: 'about' }
  | { name: 'contact' }

export default function App() {
  const [page, setPage] = useState<Page>({ name: 'home' })

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ backgroundColor: '#141210', minHeight: '100vh', color: '#e4dbd0' }}>
      <Nav page={page} navigate={navigate} />
      <main>
        {page.name === 'home' && <Home navigate={navigate} />}
        {page.name === 'work' && <Work navigate={navigate} initialFilter={page.filter} />}
        {page.name === 'project' && <Project id={page.id} navigate={navigate} />}
        {page.name === 'pricing' && <Pricing navigate={navigate} />}
        {page.name === 'about' && <About navigate={navigate} />}
        {page.name === 'contact' && <Contact />}
      </main>
    </div>
  )
}
