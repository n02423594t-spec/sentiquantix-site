import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import './styles.css'

const services = [
  {
    number: '01',
    title: 'Custom software',
    text: 'Purpose-built web and mobile applications that make complex work feel simple.',
    tags: ['Web apps', 'Mobile', 'APIs'],
  },
  {
    number: '02',
    title: 'Data & automation',
    text: 'Turn repetitive workflows and scattered data into clear, intelligent systems.',
    tags: ['Automation', 'Analytics', 'Integration'],
  },
  {
    number: '03',
    title: 'Technical consulting',
    text: 'Practical technology strategy for businesses ready to move with confidence.',
    tags: ['Architecture', 'Infrastructure', 'Roadmaps'],
  },
]

const principles = ['Innovation', 'Integrity', 'Agility', 'Quality & reliability']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu}>
            <img className="brand-logo" src="/sentiquantix-header-logo.png" alt="Sentiquantix" />
            <span className="brand-name">sentiquantix<span className="brand-dot">.</span></span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#approach" onClick={closeMenu}>Our approach</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={16} /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Digital solutions, with direction.</p>
            <h1>Build what<br /><em>moves you</em> forward.</h1>
            <p className="hero-description">Sentiquantix helps ambitious organizations turn bold ideas into reliable digital products, intelligent systems, and measurable progress.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Let&apos;s work together <ArrowUpRight size={18} /></a>
              <a className="text-link" href="#services">Explore services <ChevronDown size={16} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Sentiquantix technology illustration">
            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />
            <div className="visual-grid" />
            <img src="/sentiquantix-logo.jpeg" alt="Sentiquantix trademark logo" />
            <div className="visual-note note-top"><span className="pulse" /> Built for what&apos;s next</div>
            <div className="visual-note note-bottom">PEDASENTICOM / 2026</div>
          </div>
        </section>

        <section className="intro-band">
          <div className="container intro-grid">
            <p className="section-kicker">01 / The idea</p>
            <div>
              <h2>Technology should create <span>momentum.</span></h2>
              <p>Not more noise. Not more complexity. We design and engineer the digital foundations that help organizations work smarter, serve better, and grow with intention.</p>
            </div>
          </div>
        </section>

        <section className="services container" id="services">
          <div className="section-heading">
            <div><p className="section-kicker">02 / What we do</p><h2>From first thought<br /><span>to real-world impact.</span></h2></div>
            <p className="heading-aside">One capable partner for the full digital journey.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <ArrowUpRight className="service-arrow" size={22} />
              </article>
            ))}
          </div>
        </section>

        <section className="approach" id="approach">
          <div className="container approach-grid">
            <div><p className="section-kicker light">03 / How we work</p><h2>Clear thinking.<br /><span>Careful building.</span></h2></div>
            <div className="approach-content">
              <p className="large-copy">The best technology feels inevitable: thoughtfully considered, beautifully made, and exactly right for the people using it.</p>
              <div className="principles">{principles.map((principle) => <div key={principle}><Check size={17} /> {principle}</div>)}</div>
            </div>
          </div>
        </section>

        <section className="about container" id="about">
          <div className="about-image"><div className="about-image-inner"><span>TECHNOLOGY<br /><b>WITH</b><br />DIRECTION</span></div></div>
          <div className="about-copy"><p className="section-kicker">04 / Who we are</p><h2>Small enough<br /><span>to care deeply.</span></h2><p>Sentiquantix is a Zimbabwean technology and digital solutions firm. As Pedasenticom, our legal foundation is built on a simple belief: the right technology can unlock extraordinary potential.</p><a className="text-link" href="#contact">Get to know us <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="contact container" id="contact">
          <p className="section-kicker">05 / Begin a conversation</p>
          <h2>Have something<br /><em>in mind?</em></h2>
          <a className="contact-email" href="mailto:Tawanakelvinchawanda@gmail.com">Tawanakelvinchawanda@gmail.com <ArrowUpRight size={24} /></a>
          <div className="contact-meta">
            <span>Harare, Zimbabwe</span>
            <div className="phone-actions">
              <button className="phone-trigger" type="button" onClick={() => setContactOpen(!contactOpen)} aria-expanded={contactOpen}>
                +263 790 543 013
              </button>
              {contactOpen && (
                <div className="phone-options">
                  <a href="tel:+263790543013">Call now</a>
                  <a href="https://wa.me/263790543013" target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              )}
            </div>
            <span>© 2026 Sentiquantix</span>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="container"><a className="brand" href="#top"><span className="brand-mark">S</span><span>sentiquantix<span className="brand-dot">.</span></span></a><span>Pedasenticom trading as Sentiquantix</span></div></footer>
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
