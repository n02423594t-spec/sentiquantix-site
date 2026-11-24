import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import EclipseCanvas from './components/EclipseCanvas.jsx'
import ZimbabweMap from './components/ZimbabweMap.jsx'

const navSections = [
  { id: 'about', label: 'About', step: '01', short: 'About' },
  { id: 'platform', label: 'Platform', step: '02', short: 'Platform' },
  { id: 'map', label: 'Coverage', step: '03', short: 'Coverage' },
  { id: 'specifications', label: 'Specifications', step: '04', short: 'Profile' },
  { id: 'faq', label: 'FAQ', step: '05', short: 'FAQ' },
]

const journeySteps = [
  { id: 'hero', step: '00', label: 'Beginning' },
  { id: 'about', step: '01', label: 'About' },
  { id: 'platform', step: '02', label: 'Platform' },
  { id: 'map', step: '03', label: 'Coverage' },
  { id: 'specifications', step: '04', label: 'Profile' },
  { id: 'contact', step: '05', label: 'Contact' },
]

const aboutSlides = [
  {
    id: 'brand',
    eyebrow: 'OFFICIAL CORPORATE IDENTITY · HARARE, ZIMBABWE',
    title: 'Pedasenticom — Connecting Home & School',
    type: 'image',
    src: '/pedasenticom-logo.jpg',
    alt: 'Pedasenticom — Inspired to Advance Your Global Reach',
    caption: 'CIPZ-registered Education & Technology company delivering Edu-Connect (Pedacom).',
  },
  {
    id: 'portal-slide',
    eyebrow: 'ADMINISTRATIVE WEB PORTAL',
    title: 'Multi-School Cloud Command Center',
    type: 'console',
    metrics: [
      { k: 'TENANCY', v: 'Multi-School Isolated' },
      { k: 'FINANCE', v: 'USD & ZiG Ledgers' },
      { k: 'ACCESS', v: '5-Role Server RBAC' },
    ],
    lines: [
      ['Academic Year & Class Setup', 'ACTIVE'],
      ['Tuition Accounting & EcoCash Sync', 'VERIFIED'],
      ['School Uniform Store Inventory', 'LIVE'],
      ['School-Wide Notice Dispatch', 'READY'],
    ],
    caption: 'School leadership configures terms, staff rosters, fee balances, and uniform inventory in one portal.',
  },
  {
    id: 'mobile-slide',
    eyebrow: 'EDU-CONNECT ANDROID APPLICATION',
    title: 'Real-Time Classroom & Guardian Experience',
    type: 'console',
    metrics: [
      { k: 'TEACHERS', v: 'Roll Call & Journals' },
      { k: 'PARENTS', v: 'Multi-Child View' },
      { k: 'PAYMENTS', v: 'EcoCash In-App' },
    ],
    lines: [
      ['Digital Attendance Register', 'SYNCED'],
      ['Multimedia Learning Journals (Photos & Voice)', 'PUBLISHED'],
      ['Verified Guardian-Student Linking', 'ENFORCED'],
      ['USD & ZiG Uniform & Fee Checkout', 'CONFIRMED'],
    ],
    caption: 'Teachers record daily classroom activity while parents track progress and pay fees from Android.',
  },
]

const partnerMarqueeItems = [
  { name: 'Pedasenticom', sub: 'CIPZ Registered · Harare, ZW', href: '#about' },
  { name: 'Edu-Connect (Pedacom)', sub: 'Flagship School Ecosystem', href: '#platform' },
  { name: 'Split Technologies', sub: 'Engineering & Cloud Partner', href: 'https://splittechnologies.co.zw', external: true },
  { name: 'EcoCash Gateway', sub: 'USD & ZiG Mobile Payments', href: '#platform' },
  { name: 'Multi-Tenant Laravel Cloud', sub: '5-Role RBAC Isolation', href: '#specifications' },
  { name: 'Android & Web Portal', sub: 'Primary & Secondary Ready', href: '#map' },
]

const platformCaseStudies = [
  {
    id: 'web-portal',
    theme: 'light',
    kicker: 'PLATFORM MODULE 01 · SCHOOL ADMINISTRATION',
    partnerLabel: 'PEDASENTICOM WEB PORTAL',
    title: 'Administrative Web Portal & Multi-School Console',
    category: 'School Leadership & Finance',
    description:
      'Designed for platform owners and school administrators to manage institutional operations without fragmented spreadsheets. Onboard primary and secondary schools, manage child-level subscriptions, configure academic years, classes, and teacher rosters, track USD and ZiG tuition ledgers, operate an online uniform store, and publish school-wide notices under strict per-school data isolation.',
    specs: [
      'Multi-school onboarding & child-level subscription control',
      'Academic year, term, class, and teacher assignment workflows',
      'Dual-currency USD & ZiG fee accounting and uniform inventory',
    ],
    visualType: 'logo',
    visualTitle: 'WEB ADMIN CONSOLE // SCHOOL OPERATIONS',
    visualStats: [
      { label: 'TENANT SCOPE', val: 'Strict School Isolation' },
      { label: 'FEE CURRENCIES', val: 'USD & ZiG Native' },
      { label: 'ROLE SECURITY', val: '5-Role Server RBAC' },
    ],
  },
  {
    id: 'teacher-app',
    theme: 'dark',
    kicker: 'PLATFORM MODULE 02 · EDUCATORS',
    partnerLabel: 'EDU-CONNECT ANDROID · TEACHERS',
    title: 'Paperless Classroom Workflows & Learning Journals',
    category: 'Teachers & Faculty',
    description:
      'Built for classroom educators on Android to replace manual attendance books and delayed end-of-term communication. Teachers record daily roll call in seconds, assign homework deadlines, manage activity rosters, log merits or conduct notes using school-standardized categories, and share interactive multimedia learning journals—photos, drawings, voice notes, academic reports, and wellbeing logs—directly with linked parents.',
    specs: [
      'Instant digital roll call synced to school administration',
      'Multimedia learning journals: photos, drawings, voice notes & reports',
      'Standardized merit, conduct, homework, and activity roster logging',
    ],
    visualType: 'console',
    visualTitle: 'ANDROID EDUCATOR WORKSPACE // CLASSROOM FEED',
    visualStats: [
      { label: 'DAILY ROLL CALL', val: 'Instant Cloud Sync' },
      { label: 'PORTFOLIO MEDIA', val: 'Photo · Voice · Report' },
      { label: 'HOMEWORK', val: 'Live Guardian Alerts' },
    ],
  },
  {
    id: 'parent-app',
    theme: 'light',
    kicker: 'PLATFORM MODULE 03 · PARENTS & GUARDIANS',
    partnerLabel: 'EDU-CONNECT ANDROID · FAMILIES',
    title: 'Comprehensive Multi-Child Visibility & Uniform Commerce',
    category: 'Parents & Verified Guardians',
    description:
      'Parents and guardians stay connected to every enrolled child from one verified mobile account. Switch seamlessly between siblings to inspect attendance percentages, academic reports, homework deadlines, conduct logs, and tuition fee balances. Browse and order school uniforms directly inside the Android app, safeguarded by administrative verification of every guardian-student link.',
    specs: [
      'Seamless multi-child switching for families with multiple students',
      'Real-time visibility of attendance, reports, notices, and fee balances',
      'Admin-verified guardian linking protecting every student record',
    ],
    visualType: 'console',
    visualTitle: 'ANDROID GUARDIAN PORTAL // FAMILY DASHBOARD',
    visualStats: [
      { label: 'CHILD SWITCHER', val: 'Multi-Student Profile' },
      { label: 'UNIFORM SHOP', val: 'In-App Order & Pay' },
      { label: 'PRIVACY', val: 'Admin-Verified Link' },
    ],
  },
  {
    id: 'ecocash-api',
    theme: 'dark',
    kicker: 'PLATFORM MODULE 04 · PAYMENTS & CLOUD API',
    partnerLabel: 'ECOCASH & LARAVEL CLOUD BACKBONE',
    title: 'Automated USD & ZiG EcoCash Settlement Engine',
    category: 'Multi-Currency School Finance',
    description:
      'Powered by a resilient Laravel cloud API engineered in partnership with Split Technologies, every request passes through encrypted HTTPS with strict 5-role access enforcement. Integrated directly with EcoCash, the platform processes online school tuition and uniform payments in both USD and ZiG, backed by a dedicated background payment worker that automatically verifies and reconciles every transaction.',
    specs: [
      'Native USD & ZiG EcoCash mobile money checkout inside Android',
      'Dedicated background worker for automated payment verification',
      'Encrypted HTTPS API, automated invitation emails, and 5-role RBAC',
    ],
    visualType: 'console',
    visualTitle: 'PAYMENT WORKER // ECOCASH RECONCILIATION',
    visualStats: [
      { label: 'GATEWAY', val: 'EcoCash Zimbabwe' },
      { label: 'SETTLEMENT', val: 'Auto-Reconciled Worker' },
      { label: 'ENGINEERING', val: 'Split Technologies' },
    ],
  },
]

const corporateSpecs = [
  { label: 'Company Name', value: 'Pedasenticom' },
  { label: 'Official Website', value: 'pedasenticom.co.zw', href: 'https://pedasenticom.co.zw' },
  {
    label: 'Legal Registration',
    value: 'Registered in Zimbabwe under CIPZ (Companies and Intellectual Property Zimbabwe)',
  },
  { label: 'Headquarters', value: 'Harare, Zimbabwe' },
  { label: 'Industry Sector', value: 'Education & Technology (EdTech) · School Management & Payments' },
  { label: 'Flagship Platform', value: 'Edu-Connect (transitioning to Pedacom)' },
  { label: 'Primary Platforms', value: 'Administrative Web Portal & Android Mobile Application' },
  { label: 'Payment Infrastructure', value: 'EcoCash Multi-Currency Gateway (USD & ZiG)' },
  {
    label: 'Engineering Partner',
    value: 'Split Technologies (splittechnologies.co.zw)',
    href: 'https://splittechnologies.co.zw',
  },
  {
    label: 'Official Email',
    value: 'Pedasenticom@gmail.com',
    href: 'mailto:Pedasenticom@gmail.com',
    external: false,
  },
  {
    label: 'Telephone & WhatsApp',
    value: '+263 790 543 013 (0790543013)',
    href: 'tel:+263790543013',
    external: false,
  },
]

const faqs = [
  {
    question: 'What is Pedasenticom?',
    answer:
      'Pedasenticom is an education and technology (EdTech) company headquartered in Harare, Zimbabwe and officially registered under CIPZ (Companies and Intellectual Property Zimbabwe). Pedasenticom builds integrated digital infrastructure that connects schools, teachers, and parents across Zimbabwe and Southern Africa.',
  },
  {
    question: 'What product and services does Pedasenticom offer?',
    answer:
      "Pedasenticom's flagship product is Edu-Connect (transitioning to the brand name Pedacom), a unified cloud school management web portal and Android mobile application. It provides multi-school administration, digital classroom attendance, multimedia learning journals, online school uniform ordering, and multi-currency USD and ZiG school fee payments.",
  },
  {
    question: 'How do school fee and uniform payments work on Pedasenticom?',
    answer:
      'Pedasenticom integrates directly with EcoCash, allowing parents and guardians in Zimbabwe to pay school tuition fees and purchase school uniforms in both USD and ZiG directly from the Android mobile application, supported by automated payment verification and reconciliation.',
  },
  {
    question: 'Where is Pedasenticom located and how can schools contact the company?',
    answer:
      'Pedasenticom is based in Harare, Zimbabwe. Primary and secondary schools or partners can reach Pedasenticom by email at Pedasenticom@gmail.com, by phone or WhatsApp at +263 790 543 013 (0790543013), or at https://pedasenticom.co.zw.',
  },
]

const HERO_FINAL_LINES = ['Local Strength.', 'National Scale.']

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [heroProgress, setHeroProgress] = useState(0)
  const [aboutSlideIdx, setAboutSlideIdx] = useState(0)
  const [caseIdx, setCaseIdx] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0 })

  const heroSectionRef = useRef(null)
  const heroProgressRef = useRef(0)
  const navListRef = useRef(null)
  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  // Toggle gentle Web Audio API ambient space pad (Stanza27 inspiration — off until user clicks)
  const toggleAmbientSound = () => {
    try {
      if (!soundOn) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx()
          const master = ctx.createGain()
          master.gain.value = 0.0001
          const filter = ctx.createBiquadFilter()
          filter.type = 'lowpass'
          filter.frequency.value = 420
          filter.connect(master)
          master.connect(ctx.destination)

          // Soft D-major9 ambient chord (73.42Hz, 110Hz, 146.83Hz, 185Hz)
          ;[73.42, 110.0, 146.83, 185.0].forEach((freq, i) => {
            const osc = ctx.createOscillator()
            osc.type = i % 2 === 0 ? 'sine' : 'triangle'
            osc.frequency.value = freq
            const g = ctx.createGain()
            g.gain.value = i === 0 ? 0.16 : 0.06
            osc.connect(g)
            g.connect(filter)
            osc.start()
          })

          audioCtxRef.current = ctx
          masterGainRef.current = master
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume()
        }
        masterGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime)
        masterGainRef.current.gain.linearRampToValueAtTime(0.18, audioCtxRef.current.currentTime + 0.8)
        setSoundOn(true)
      } else {
        if (audioCtxRef.current && masterGainRef.current) {
          masterGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime)
          masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
        }
        setSoundOn(false)
      }
    } catch {
      setSoundOn(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Inertial Smooth Scroll + Citadel Pinned Hero Progress + Scrollspy + Reveals
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    let currentY = window.scrollY
    let targetY = window.scrollY
    let rafId = null
    let isAnimating = false

    const syncScrollState = () => {
      const scrollY = window.scrollY
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      document.documentElement.style.setProperty(
        '--scroll-progress',
        Math.min(1, Math.max(0, scrollY / maxScroll)).toFixed(4)
      )

      // Compute Citadel pinned hero runway progress (0 -> 1)
      const heroEl = heroSectionRef.current
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        const runway = Math.max(1, heroEl.offsetHeight - window.innerHeight)
        const p = Math.min(1, Math.max(0, -rect.top / runway))
        heroProgressRef.current = p
        setHeroProgress((prev) => (Math.abs(prev - p) > 0.008 ? p : prev))
        setOverHero(rect.bottom > 96)
      }

      // Determine active section for Scrollspy Header + Stanza27 Arc Journey Tracker
      const sectionIds = ['hero', 'about', 'platform', 'map', 'specifications', 'faq', 'contact']
      let current = 'hero'
      const probeY = window.innerHeight * 0.38
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= probeY) {
            current = id
          }
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current))
    }

    const step = () => {
      const diff = targetY - currentY
      if (Math.abs(diff) > 0.45) {
        currentY += diff * 0.1
        window.scrollTo(0, Math.round(currentY))
        syncScrollState()
        rafId = window.requestAnimationFrame(step)
      } else {
        currentY = targetY
        window.scrollTo(0, Math.round(targetY))
        syncScrollState()
        isAnimating = false
      }
    }

    const startLoop = () => {
      if (!isAnimating) {
        isAnimating = true
        rafId = window.requestAnimationFrame(step)
      }
    }

    const onWheel = (event) => {
      if (reducedMotion || !finePointer) return
      if (event.ctrlKey || event.metaKey) return
      event.preventDefault()
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const delta =
        event.deltaMode === 1
          ? event.deltaY * 36
          : event.deltaMode === 2
            ? event.deltaY * window.innerHeight
            : event.deltaY
      targetY = Math.min(maxScroll, Math.max(0, targetY + delta * 0.92))
      startLoop()
    }

    const onScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY
        targetY = window.scrollY
      }
      syncScrollState()
    }

    const onAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash.length < 2) return
      const targetEl = document.querySelector(hash)
      if (!targetEl) return
      event.preventDefault()

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const destY =
        hash === '#hero' || hash === '#top'
          ? 0
          : Math.min(maxScroll, Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - 76))

      if (reducedMotion || !finePointer) {
        window.scrollTo({ top: destY, behavior: reducedMotion ? 'auto' : 'smooth' })
      } else {
        currentY = window.scrollY
        targetY = destY
        startLoop()
      }
      window.history.pushState(null, '', hash)
    }

    syncScrollState()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', syncScrollState, { passive: true })
    document.addEventListener('click', onAnchorClick)

    // Scroll reveal observer
    const revealNodes = document.querySelectorAll('[data-reveal]')
    let observer = null
    if ('IntersectionObserver' in window && !reducedMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      revealNodes.forEach((n) => {
        n.classList.add('reveal-ready')
        observer.observe(n)
      })
    } else {
      revealNodes.forEach((n) => n.classList.add('is-revealed'))
    }

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', syncScrollState)
      document.removeEventListener('click', onAnchorClick)
      if (rafId) window.cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
    }
  }, [])

  // Citadel sliding scrollspy underline indicator
  useEffect(() => {
    const listEl = navListRef.current
    if (!listEl) return
    const activeLink = listEl.querySelector(`a[href="#${activeSection}"]`)
    if (!activeLink) {
      setNavIndicator({ left: 0, width: 0 })
      return
    }
    const listRect = listEl.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    setNavIndicator({
      left: linkRect.left - listRect.left,
      width: linkRect.width,
    })
  }, [activeSection])

  // Compute hero opening & final phase visibilities (Citadel pinned sequence)
  const openingOpacity = Math.max(0, 1 - heroProgress * 2.2)
  const openingShift = heroProgress * -44
  const finalProgress = Math.min(1, Math.max(0, (heroProgress - 0.34) / 0.42))

  // Map current section to Stanza27 Journey step index
  const currentJourneyIndex = Math.max(
    0,
    journeySteps.findIndex((s) => s.id === (activeSection === 'faq' ? 'specifications' : activeSection))
  )
  const currentJourney = journeySteps[currentJourneyIndex] || journeySteps[0]

  const jumpToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = id === 'hero' ? 0 : el.getBoundingClientRect().top + window.scrollY - 76
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const activeCase = platformCaseStudies[caseIdx] || platformCaseStudies[0]
  const activeAboutSlide = aboutSlides[aboutSlideIdx] || aboutSlides[0]

  return (
    <div className="site-shell" id="top">
      <div className="scroll-progress-track" aria-hidden="true">
        <div className="scroll-progress-fill" />
      </div>

      {/* CITADEL SCROLLSPY HEADER + STANZA27 SOUND TOGGLE & CORNER-BRACKET CONTACT */}
      <header className={`citadel-header ${overHero ? 'is-over-hero' : 'is-scrolled'}`}>
        <div className="container citadel-header-inner">
          <a className="brand-lockup" href="#hero" onClick={closeMenu}>
            <span className="brand-crest">
              <img
                src="/pedasenticom-mark.png"
                alt="Pedasenticom emblem"
                width="42"
                height="42"
                decoding="async"
              />
            </span>
            <span className="brand-text-wrap">
              <span className="brand-wordmark">PEDASENTICOM</span>
              <span className="brand-sub">Harare, Zimbabwe · CIPZ</span>
            </span>
          </a>

          <nav className={`citadel-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
            <ul className="citadel-nav-list" ref={navListRef}>
              {navSections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeSection === item.id ? 'is-active' : ''}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <span
              className="citadel-nav-indicator"
              aria-hidden="true"
              style={{
                transform: `translateX(${navIndicator.left}px)`,
                width: `${navIndicator.width}px`,
              }}
            />
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className={`sound-toggle ${soundOn ? 'is-on' : ''}`}
              aria-pressed={soundOn}
              aria-label={soundOn ? 'Mute ambient sound' : 'Play ambient sound'}
              title={soundOn ? 'Mute ambient sound' : 'Ambient sound'}
              onClick={toggleAmbientSound}
            >
              <span className="sound-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </button>

            <a className="bracket-btn" href="#contact" onClick={closeMenu}>
              <span>Contact</span>
            </a>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* CITADEL PINNED SCROLL SEQUENCE HERO + STANZA27 GLOWING ECLIPSE & STARFIELD */}
        <section id="hero" className="citadel-hero" ref={heroSectionRef} aria-label="Pedasenticom Hero">
          <div className="citadel-hero-pin">
            <EclipseCanvas scrollProgressRef={heroProgressRef} />
            <div className="hero-veil" aria-hidden="true" />

            {/* PHASE 1: WIDE-SPACED GLOWING MONUMENTAL OPENING */}
            <div
              className="hero-phase hero-phase--opening container"
              style={{
                opacity: openingOpacity,
                transform: `translateY(${openingShift}px)`,
                pointerEvents: openingOpacity > 0.15 ? 'auto' : 'none',
              }}
            >
              <p className="hero-odyssey-kicker">
                CIPZ REGISTERED · HARARE, ZIMBABWE · FLAGSHIP EDU-CONNECT (PEDACOM)
              </p>
              <h1 className="hero-wide-title">
                PEDASENTICOM
              </h1>
              <p className="hero-wide-subtitle">
                CONNECTING HOME &amp; SCHOOL THROUGH INTEGRATED DIGITAL INFRASTRUCTURE
              </p>
              <p className="hero-opening-lede">
                An education and technology company uniting school administration, Android classroom workflows,
                parent engagement, and dual-currency USD &amp; ZiG EcoCash payments across Zimbabwe.
              </p>

              <div className="hero-opening-actions">
                <a className="bracket-btn bracket-btn--gold" href="#contact">
                  <span>Onboard a School</span>
                  <ArrowUpRight size={15} />
                </a>
                <a className="bracket-btn" href="#about">
                  <span>Explore Platform</span>
                </a>
              </div>
            </div>

            {/* PHASE 2: CITADEL SCROLL-REVEALED STATEMENT + KEY METRICS */}
            <div
              className="hero-phase hero-phase--finale container"
              style={{
                opacity: finalProgress,
                transform: `translateY(${(1 - finalProgress) * 32}px)`,
                pointerEvents: finalProgress > 0.2 ? 'auto' : 'none',
              }}
            >
              <p className="hero-finale-kicker">EDU-CONNECT · TRANSITIONING TO PEDACOM</p>
              <div className="hero-finale-heading" aria-hidden="true">
                {HERO_FINAL_LINES.map((line, lIdx) => (
                  <span className="finale-line" key={line}>
                    {line.split('').map((ch, cIdx) => {
                      const threshold = (lIdx * 14 + cIdx) / 34
                      const visible = finalProgress > threshold * 0.72
                      return (
                        <span
                          key={cIdx}
                          className={`finale-letter ${visible ? 'is-in' : ''}`}
                        >
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      )
                    })}
                  </span>
                ))}
              </div>
              <p className="hero-finale-sub">
                From Harare headquarters to primary and secondary campuses nationwide—one secure cloud
                ecosystem for administrators, teachers, and parents.
              </p>

              <div className="citadel-hero-metrics" aria-label="Pedasenticom platform highlights">
                <div className="hero-metric">
                  <p className="hero-metric-val">USD &amp; ZiG</p>
                  <p className="hero-metric-lbl">Dual-Currency EcoCash Tuition &amp; Uniform Payments</p>
                </div>
                <div className="hero-metric">
                  <p className="hero-metric-val">5-Role</p>
                  <p className="hero-metric-lbl">Server-Enforced Cloud RBAC &amp; School Data Isolation</p>
                </div>
                <div className="hero-metric">
                  <p className="hero-metric-val">Web + Android</p>
                  <p className="hero-metric-lbl">Unified Administrative Portal &amp; Classroom Mobile App</p>
                </div>
              </div>
            </div>

            {/* STANZA27 SCROLL CUE */}
            <button
              type="button"
              className="scroll-cue"
              aria-label="Scroll to About Pedasenticom"
              onClick={() => jumpToSection('about')}
            >
              <svg
                viewBox="0 0 22 42"
                width="22"
                height="42"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path className="scroll-cue-up" d="M7 6 11 2 15 6" />
                <rect x="4" y="10" width="14" height="22" rx="7" />
                <path d="M11 14v4" />
                <path className="scroll-cue-down" d="M7 36 11 40 15 36" />
              </svg>
            </button>
          </div>
          <div className="citadel-hero-runway" aria-hidden="true" />
        </section>

        {/* CITADEL 50/50 SPLIT EDITORIAL ABOUT + INTERACTIVE SHOWCASE GALLERY */}
        <section id="about" className="citadel-about" aria-labelledby="about-title" data-reveal>
          <div className="about-split">
            <div className="about-column-copy">
              <div className="about-copy-inner">
                <p className="editorial-kicker">ABOUT PEDASENTICOM · EDUCATION &amp; TECHNOLOGY</p>
                <h2 id="about-title">SERVING SCHOOLS ACROSS ZIMBABWE</h2>

                <div className="about-paragraphs">
                  <p>
                    <strong>Pedasenticom</strong> is an education and technology (EdTech) company
                    headquartered in <strong>Harare, Zimbabwe</strong> and officially registered under{' '}
                    <strong>CIPZ</strong> (Companies and Intellectual Property Zimbabwe). Through our
                    flagship platform—<strong>Edu-Connect</strong> (transitioning to <strong>Pedacom</strong>
                    )—we bridge the operational and communication gap between schools, teachers, and families.
                  </p>
                  <p>
                    Engineered in partnership with <strong>Split Technologies</strong>, Pedasenticom unites a
                    central administrative web portal with a dedicated Android mobile application. Schools
                    manage attendance, academic records, multi-currency fee balances, and online uniform
                    stores from one dashboard while parents monitor daily student progress and complete USD or
                    ZiG EcoCash payments directly from their phones.
                  </p>
                </div>

                <div className="about-network-stat">
                  <div className="about-network-label">
                    Registered Under CIPZ &amp; Empowering Zimbabwean Schools
                  </div>
                  <div className="about-network-accent">2026</div>
                </div>
              </div>
            </div>

            <div className="about-column-media">
              <div className="about-gallery" role="region" aria-label="Pedasenticom platform gallery">
                <div className="about-slide-stage">
                  <span className="slide-eyebrow">{activeAboutSlide.eyebrow}</span>
                  <h3>{activeAboutSlide.title}</h3>

                  {activeAboutSlide.type === 'image' ? (
                    <div className="slide-image-wrap">
                      <img
                        src={activeAboutSlide.src}
                        alt={activeAboutSlide.alt}
                        width="1024"
                        height="559"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="slide-console-box">
                      <div className="slide-console-metrics">
                        {activeAboutSlide.metrics.map((m) => (
                          <div key={m.k}>
                            <span>{m.k}</span>
                            <strong>{m.v}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="slide-console-rows">
                        {activeAboutSlide.lines.map(([label, status]) => (
                          <div className="slide-console-row" key={label}>
                            <span>{label}</span>
                            <em>{status}</em>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="slide-caption">{activeAboutSlide.caption}</p>
                </div>

                <div className="gallery-controls">
                  <div className="gallery-counter">
                    0{aboutSlideIdx + 1} / 0{aboutSlides.length}
                  </div>
                  <div className="gallery-arrows">
                    <button
                      type="button"
                      className="gallery-arrow-btn"
                      aria-label="Previous slide"
                      onClick={() =>
                        setAboutSlideIdx((aboutSlideIdx - 1 + aboutSlides.length) % aboutSlides.length)
                      }
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="gallery-arrow-btn"
                      aria-label="Next slide"
                      onClick={() => setAboutSlideIdx((aboutSlideIdx + 1) % aboutSlides.length)}
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CITADEL DARK PARTNERS & ECOSYSTEM MARQUEE */}
        <section id="partners" className="citadel-partners" aria-labelledby="partners-title" data-reveal>
          <div className="container">
            <h2 id="partners-title" className="partners-heading">
              <strong>Trusted partners.</strong> One connected school infrastructure network.
            </h2>
          </div>

          <div className="partners-marquee-viewport">
            <ul className="partners-marquee-track" role="list">
              {[...partnerMarqueeItems, ...partnerMarqueeItems].map((item, idx) => (
                <li className="partner-marquee-tile" key={idx} aria-hidden={idx >= partnerMarqueeItems.length}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.sub}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CITADEL EDITORIAL PLATFORM MODULES CAROUSEL (ALTERNATING LIGHT/DARK SPLIT CARDS) */}
        <section id="platform" className="citadel-cases" aria-labelledby="platform-title" data-reveal>
          <div className="container">
            <div className="cases-header">
              <div>
                <p className="editorial-kicker gold">PLATFORM ARCHITECTURE · EDU-CONNECT (PEDACOM)</p>
                <h2 id="platform-title">Four Integrated Pillars</h2>
              </div>

              <div className="cases-nav-controls">
                <button
                  type="button"
                  className="case-arrow-btn"
                  aria-label="Previous platform module"
                  onClick={() =>
                    setCaseIdx((caseIdx - 1 + platformCaseStudies.length) % platformCaseStudies.length)
                  }
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="cases-index-readout">
                  0{caseIdx + 1} / 0{platformCaseStudies.length}
                </span>
                <button
                  type="button"
                  className="case-arrow-btn"
                  aria-label="Next platform module"
                  onClick={() => setCaseIdx((caseIdx + 1) % platformCaseStudies.length)}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <article className={`case-card case-card--${activeCase.theme}`}>
              <div className="case-card-copy">
                <span className="case-partner-tag">{activeCase.partnerLabel}</span>
                <h3>{activeCase.title}</h3>
                <p className="case-description">{activeCase.description}</p>

                <ul className="case-specs-list">
                  {activeCase.specs.map((sp) => (
                    <li key={sp}>{sp}</li>
                  ))}
                </ul>

                <div className="case-footer">
                  <span className="case-category">{activeCase.category}</span>
                  <a className="case-cta-btn" href="#contact">
                    Request School Demo <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              <div className="case-card-visual">
                <div className="case-visual-frame">
                  <div className="case-visual-top">
                    <span>{activeCase.kicker}</span>
                    <span>ZIMBABWE CLOUD</span>
                  </div>

                  {activeCase.visualType === 'logo' ? (
                    <div className="case-visual-img">
                      <img
                        src="/pedasenticom-logo.jpg"
                        alt="Pedasenticom Administrative Web Portal Showcase"
                        width="1024"
                        height="559"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="case-visual-blueprint">
                      <p className="blueprint-title">{activeCase.visualTitle}</p>
                      <div className="blueprint-bars">
                        <div className="blueprint-bar">
                          <span>INSTITUTIONAL SYNC</span>
                          <strong>REAL-TIME HTTPS</strong>
                        </div>
                        <div className="blueprint-bar">
                          <span>ACCESS GOVERNANCE</span>
                          <strong>5-ROLE RBAC ENFORCED</strong>
                        </div>
                        <div className="blueprint-bar">
                          <span>PAYMENT ENGINE</span>
                          <strong>ECOCASH USD &amp; ZiG</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="case-visual-stats">
                    {activeCase.visualStats.map((st) => (
                      <div key={st.label}>
                        <span>{st.label}</span>
                        <strong>{st.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* CITADEL SLIDE SELECTOR DOTS */}
            <div className="case-dots" role="tablist" aria-label="Select platform module">
              {platformCaseStudies.map((cs, i) => (
                <button
                  key={cs.id}
                  type="button"
                  role="tab"
                  aria-selected={i === caseIdx}
                  className={`case-dot ${i === caseIdx ? 'is-active' : ''}`}
                  onClick={() => setCaseIdx(i)}
                >
                  <span>0{i + 1} · {cs.category}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CITADEL INTERACTIVE REGIONAL MAP OF ZIMBABWE */}
        <ZimbabweMap />

        {/* CORPORATE SPECIFICATIONS & VERIFIED PROFILE */}
        <section id="specifications" className="specs-section" aria-labelledby="specs-title" data-reveal>
          <div className="container specs-grid">
            <div className="specs-lead">
              <p className="editorial-kicker">ORGANIZATION &amp; TECHNICAL SPECIFICATIONS</p>
              <h2 id="specs-title">Verified Corporate Profile</h2>
              <p>
                Pedasenticom&apos;s mission is to strengthen the partnership between schools, educators, and
                parents through accessible, secure, and real-time digital tools across Zimbabwe and Southern
                Africa.
              </p>

              <div className="specs-crest-card">
                <img
                  src="/pedasenticom-mark.png"
                  alt="Pedasenticom official emblem"
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>PEDASENTICOM</strong>
                  <span>Inspired to Advance Your Global Reach</span>
                </div>
              </div>
            </div>

            <div className="specs-table-box">
              <table className="specs-table" aria-label="Pedasenticom corporate specifications">
                <tbody>
                  {corporateSpecs.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>
                        {row.href ? (
                          <a
                            href={row.href}
                            target={row.external === false ? undefined : '_blank'}
                            rel={row.external === false ? undefined : 'noreferrer'}
                            className="spec-link"
                          >
                            {row.value} <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          row.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* VERIFIED FAQ ACCORDION (PRE-RENDERED FULL DOM FOR GOOGLE SEO & AI OVERVIEW) */}
        <section id="faq" className="faq-section" aria-labelledby="faq-title" data-reveal>
          <div className="container">
            <div className="section-editorial-head">
              <div>
                <p className="editorial-kicker">FREQUENTLY ASKED QUESTIONS · VERIFIED FACTS</p>
                <h2 id="faq-title">Questions About Pedasenticom in Zimbabwe</h2>
              </div>
              <p className="editorial-aside">
                Key facts regarding Pedasenticom&apos;s CIPZ registration, Harare headquarters, Edu-Connect
                (Pedacom) platform, and EcoCash school fee payments.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((item, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <article className={`faq-row ${isOpen ? 'is-open' : ''}`} key={item.question}>
                    <button
                      type="button"
                      className="faq-btn"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown className="faq-icon" size={20} />
                    </button>
                    <div className="faq-panel">
                      <p>{item.answer}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* SCHOOL ONBOARDING & DIRECT CONTACT STAGE */}
        <section id="contact" className="contact-band" aria-labelledby="contact-title" data-reveal>
          <div className="container contact-grid">
            <div className="contact-left">
              <p className="editorial-kicker gold">SCHOOL ONBOARDING · HARARE, ZIMBABWE</p>
              <h2 id="contact-title">Partner With Pedasenticom.</h2>
              <p>
                Bring Edu-Connect (Pedacom) to your primary or secondary institution—uniting school
                administration, Android classroom workflows, parent visibility, and automated USD &amp; ZiG
                EcoCash fee collection.
              </p>
            </div>

            <div className="contact-right">
              <div className="contact-block">
                <span>OFFICIAL EMAIL</span>
                <a className="contact-email-link" href="mailto:Pedasenticom@gmail.com">
                  Pedasenticom@gmail.com <ArrowUpRight size={20} />
                </a>
              </div>

              <div className="contact-block">
                <span>DIRECT PHONE &amp; WHATSAPP</span>
                <div className="contact-btn-row">
                  <a className="bracket-btn bracket-btn--gold" href="tel:+263790543013">
                    <span>Call 0790543013</span>
                  </a>
                  <a
                    className="bracket-btn"
                    href="https://wa.me/263790543013"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* STANZA27 CURVED ARC JOURNEY NAVIGATOR */}
      <nav className="journey-arc-nav" aria-label="Page journey progress">
        <svg className="journey-svg" viewBox="0 0 260 24" aria-hidden="true">
          <path d="M 10 19 A 320 320 0 0 1 250 19" />
        </svg>
        <ol className="journey-dots">
          {journeySteps.map((s, idx) => {
            const isCurrent = idx === currentJourneyIndex
            const isPassed = idx < currentJourneyIndex
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className={`journey-dot ${isCurrent ? 'is-current' : ''} ${isPassed ? 'is-passed' : ''}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`${s.step} ${s.label}`}
                  onClick={() => jumpToSection(s.id)}
                />
              </li>
            )
          })}
        </ol>
        <p className="journey-readout" aria-hidden="true">
          {currentJourney.step} · {currentJourney.label.toUpperCase()}
        </p>
      </nav>

      {/* ENTERPRISE FOOTER */}
      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand-col">
            <a className="brand-lockup" href="#hero">
              <span className="brand-crest small">
                <img
                  src="/pedasenticom-mark.png"
                  alt="Pedasenticom emblem"
                  width="34"
                  height="34"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="brand-wordmark">PEDASENTICOM</span>
            </a>
            <p>
              Education &amp; Technology company headquartered in Harare, Zimbabwe and registered under CIPZ.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Navigation</h4>
            <a href="#about">About Pedasenticom</a>
            <a href="#platform">Edu-Connect Platform</a>
            <a href="#map">Zimbabwe Coverage</a>
            <a href="#specifications">Specifications</a>
          </div>

          <div className="footer-links-col">
            <h4>Ecosystem</h4>
            <a href="#partners">Partners</a>
            <a href="#faq">Verified FAQ</a>
            <a href="https://splittechnologies.co.zw" target="_blank" rel="noreferrer">
              Split Technologies
            </a>
            <a href="https://pedasenticom.co.zw">pedasenticom.co.zw</a>
          </div>

          <div className="footer-links-col">
            <h4>Contact</h4>
            <a href="mailto:Pedasenticom@gmail.com">Pedasenticom@gmail.com</a>
            <a href="tel:+263790543013">+263 790 543 013</a>
            <a href="https://wa.me/263790543013" target="_blank" rel="noreferrer">
              WhatsApp Support
            </a>
            <span>Harare, Zimbabwe</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Pedasenticom (pedasenticom.co.zw) · CIPZ Registered in Zimbabwe</span>
          <span>Flagship Product: Edu-Connect (Pedacom) · Engineered with Split Technologies</span>
        </div>
      </footer>
    </div>
  )
}
