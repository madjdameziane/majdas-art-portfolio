import Reveal from '../components/Reveal'

export default function About() {
  return (
    <section id="about" style={{ padding: '60px 28px 100px', maxWidth: '1100px', margin: '0 auto' }}>
      <div
        className="responsive-2col"
        style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '56px', alignItems: 'center' }}
      >
        <Reveal>
          <div
            style={{
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: '#FBE8E2',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-3deg)',
            }}
          >
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '3rem', color: '#141414' }}>
              MM
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="hand-label">About</p>
          <h2 className="section-heading" style={{ marginBottom: '20px' }}>Hi, I'm Majda.</h2>
          <p className="body-copy" style={{ maxWidth: '520px', fontSize: '1.02rem' }}>
            [Placeholder — replace with your real artist statement: how you started painting,
            what draws you to your subjects, and how you like to work. Send me the text whenever
            you're ready and I'll drop it in here.]
          </p>
        </Reveal>
      </div>
    </section>
  )
}
