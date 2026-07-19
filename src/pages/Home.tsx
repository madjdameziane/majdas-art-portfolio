import { usePieces } from '../hooks/usePieces'
import Hero from '../sections/Hero'
import Practice from '../sections/Practice'
import FeaturedWorks from '../sections/FeaturedWorks'
import About from '../sections/About'
import ContactFooter from '../sections/ContactFooter'

export default function Home() {
  const { pieces, error } = usePieces()

  return (
    <div>
      <Hero pieces={pieces} />
      <Practice pieces={pieces} />
      <FeaturedWorks pieces={pieces} error={error} />
      <About />
      <ContactFooter />
    </div>
  )
}
