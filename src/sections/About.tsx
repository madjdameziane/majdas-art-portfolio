import Reveal from '../components/Reveal'

export default function About() {
  return (
    <section id="about" className="relative bg-black px-6 sm:px-8 md:px-16 lg:px-20 py-24 max-w-[1200px] mx-auto">
      <div className="responsive-2col grid grid-cols-[220px_1fr] gap-14 items-center">
        <Reveal>
          <div className="liquid-glass w-[200px] h-[200px] rounded-full flex items-center justify-center mx-auto">
            <span
              className="text-white text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              MM
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="kicker mb-3">// About</p>
          <h2 className="section-heading mb-5">Hi, I'm Majda.</h2>
          <p className="body-copy max-w-xl text-base">
            [Placeholder — replace with your real artist statement: how you started painting,
            what draws you to your subjects, and how you like to work. Send me the text whenever
            you're ready and I'll drop it in here.]
          </p>
        </Reveal>
      </div>
    </section>
  )
}
