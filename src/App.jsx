import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

const heroModes = [
  {
    id: 'showcase',
    code: 'VIEW 01',
    label: 'Brand Showcase',
    caption: 'PEDASENTICOM // OFFICIAL PLATFORM STAGE — HARARE, ZIMBABWE',
  },
  {
    id: 'topology',
    code: 'VIEW 02',
    label: 'Cloud Topology',
    caption: 'EDU-CONNECT (PEDACOM) // END-TO-END SYSTEM TOPOLOGY',
  },
  {
    id: 'ledger',
    code: 'VIEW 03',
    label: 'EcoCash USD & ZiG',
    caption: 'AUTOMATED PAYMENT WORKER // DUAL-CURRENCY SCHOOL LEDGER',
  },
]

const marqueeItems = [
  'PEDASENTICOM · HARARE, ZIMBABWE',
  'REGISTERED UNDER CIPZ',
  'FLAGSHIP PLATFORM: EDU-CONNECT (PEDACOM)',
  'ADMINISTRATIVE WEB PORTAL',
  'ANDROID TEACHER & PARENT APPLICATION',
  'USD & ZiG ECOCASH PAYMENT GATEWAY',
  '5-ROLE MULTI-TENANT CLOUD RBAC',
  'ENGINEERED WITH SPLIT TECHNOLOGIES',
]

const platformModules = [
  {
    id: 'portal',
    tabLabel: 'Web Admin Console',
    code: 'MODULE // WEB-ADMIN',
    title: 'Administrative Web Portal',
    audience: 'For Platform Owners & School Administrators',
    summary:
      'Central command console for multi-school onboarding, academic year and class configuration, teacher assignments, USD and ZiG fee accounting, uniform store inventory, and institution-wide notices.',
    highlights: [
      { label: 'Multi-School Control', detail: 'Onboard primary and secondary institutions with child-level subscription management.' },
      { label: 'Academic Structuring', detail: 'Configure terms, classes, teacher rosters, and student enrollments from one console.' },
      { label: 'Finance & Uniform Store', detail: 'Manage dual-currency tuition ledgers and live uniform stock levels.' },
    ],
    consolePreview: {
      windowTitle: 'EDU-CONNECT // ADMINISTRATIVE CONSOLE — HARARE, ZW',
      status: 'CLOUD SYNC ACTIVE · 5-ROLE RBAC',
      metrics: [
        { label: 'ACTIVE TERM', value: 'Term 3 · 2026' },
        { label: 'CURRENCY LEDGERS', value: 'USD & ZiG Live' },
        { label: 'DATA ISOLATION', value: 'Tenant-Locked' },
      ],
      rows: [
        { col1: 'Tuition & Levy Ledger', col2: 'EcoCash Auto-Reconciled', badge: 'VERIFIED' },
        { col1: 'School Uniform Inventory', col2: 'In-App Store Catalog Synced', badge: 'ONLINE' },
        { col1: 'Staff & Class Rosters', col2: 'Role Permissions Enforced', badge: 'ACTIVE' },
        { col1: 'Institution Broadcasts', col2: 'Instant Parent Push & Portal', badge: 'READY' },
      ],
    },
  },
  {
    id: 'mobile-teacher',
    tabLabel: 'Teacher Android App',
    code: 'MODULE // TEACHER-MOBILE',
    title: 'Classroom Workflow Application',
    audience: 'For Educators & Class Teachers',
    summary:
      'Purpose-built Android workspace eliminating paper registers. Teachers record daily roll call, publish homework deadlines, log standardized merits and conduct notes, and share multimedia learning journals.',
    highlights: [
      { label: 'Digital Roll Call', detail: 'One-tap daily attendance that updates school records and parent dashboards immediately.' },
      { label: 'Learning Journals', detail: 'Publish student work samples—photos, drawings, voice notes, and wellbeing updates.' },
      { label: 'Homework & Conduct', detail: 'Assign coursework and log merits using school-standardized categories.' },
    ],
    consolePreview: {
      windowTitle: 'EDU-CONNECT ANDROID // EDUCATOR WORKSPACE',
      status: 'REAL-TIME CLASSROOM SYNC',
      metrics: [
        { label: 'ATTENDANCE', value: 'Instant Roll Call' },
        { label: 'JOURNALS', value: 'Photo · Voice · Notes' },
        { label: 'ASSESSMENTS', value: 'Merits & Homework' },
      ],
      rows: [
        { col1: 'Morning Attendance Register', col2: 'Synced to Admin & Parent Profiles', badge: 'COMPLETED' },
        { col1: 'Multimedia Learning Journal', col2: 'Student Portfolio & Voice Notes', badge: 'PUBLISHED' },
        { col1: 'Homework & Syllabus Tasks', col2: 'Due Dates Sent to Guardians', badge: 'ASSIGNED' },
        { col1: 'Merit & Conduct Logging', col2: 'Standardized School Categories', badge: 'LOGGED' },
      ],
    },
  },
  {
    id: 'mobile-parent',
    tabLabel: 'Parent & Guardian App',
    code: 'MODULE // GUARDIAN-MOBILE',
    title: 'Parent & Family Experience',
    audience: 'For Parents & Verified Guardians',
    summary:
      'Complete visibility across every enrolled child from a single smartphone. Switch between children to review attendance, academic reports, homework, and fee balances, or order school uniforms and pay via EcoCash.',
    highlights: [
      { label: 'Multi-Child Switcher', detail: 'Monitor attendance percentages, academic reports, and conduct across siblings.' },
      { label: 'In-App Uniform Shop', detail: 'Browse sizes, place uniform orders, and pay directly inside the Android application.' },
      { label: 'Verified Guardian Linking', detail: 'Administrative verification protects student records from unauthorized access.' },
    ],
    consolePreview: {
      windowTitle: 'EDU-CONNECT ANDROID // PARENT & GUARDIAN PORTAL',
      status: 'GUARDIAN LINK VERIFIED',
      metrics: [
        { label: 'STUDENT PROFILES', value: 'Multi-Child View' },
        { label: 'FEE SETTLEMENT', value: 'USD / ZiG EcoCash' },
        { label: 'UNIFORM STORE', value: 'Direct In-App Order' },
      ],
      rows: [
        { col1: 'Live Attendance & Conduct', col2: 'Real-Time Classroom Feed', badge: 'UPDATED' },
        { col1: 'Term Academic Reports', col2: 'Official School Assessments', badge: 'AVAILABLE' },
        { col1: 'Tuition Balance & Statement', col2: 'Pay Now in USD or ZiG via EcoCash', badge: 'INSTANT' },
        { col1: 'School Uniform Order', col2: 'Confirmed by Background Worker', badge: 'PAID' },
      ],
    },
  },
  {
    id: 'cloud-ecocash',
    tabLabel: 'Cloud API & EcoCash',
    code: 'MODULE // CORE-INFRASTRUCTURE',
    title: 'Laravel Cloud API & EcoCash Payment Engine',
    audience: 'System Infrastructure & School Finance',
    summary:
      'Enterprise Laravel cloud backbone enforcing 5-role access control and strict school data isolation, paired with an automated EcoCash payment worker that processes and reconciles USD and ZiG transactions.',
    highlights: [
      { label: 'Dual-Currency EcoCash', detail: 'Native USD and ZiG mobile money checkout for school fees and uniform purchases.' },
      { label: 'Automated Reconciliation', detail: 'Dedicated background payment worker verifies and updates payment statuses automatically.' },
      { label: '5-Role Cloud RBAC', detail: 'Encrypted HTTPS API guarantees staff and parents only access authorized records.' },
    ],
    consolePreview: {
      windowTitle: 'PEDASENTICOM CLOUD // API & ECOCASH WORKER',
      status: 'HTTPS TLS · 5-ROLE RBAC ENFORCED',
      metrics: [
        { label: 'GATEWAY', value: 'EcoCash Zimbabwe' },
        { label: 'CURRENCIES', value: 'USD & ZiG Native' },
        { label: 'RECONCILIATION', value: 'Automated Worker' },
      ],
      rows: [
        { col1: 'Role-Based Access Control', col2: '5 Distinct Institutional Roles', badge: 'ENFORCED' },
        { col1: 'Multi-Tenant Isolation', col2: 'Strict Per-School Database Scope', badge: 'LOCKED' },
        { col1: 'EcoCash Payment Dispatch', col2: 'USD & ZiG Mobile Prompt', badge: 'ACTIVE' },
        { col1: 'Background Settlement Worker', col2: 'Auto-Updates School Ledger', badge: 'VERIFIED' },
      ],
    },
  },
]

const roleMatrix = [
  {
    role: 'Schools & Administrators',
    tag: 'INSTITUTIONAL CONTROL',
    headline: 'Centralized Multi-School Administration',
    points: [
      'Configure academic years, terms, classes, staff rosters, and student enrollments from a single web portal.',
      'Track tuition balances in both USD and ZiG and operate a digital uniform store with automated EcoCash confirmation.',
      'Enforce strict data governance so administrators and staff only access records belonging to their school.',
    ],
  },
  {
    role: 'Educators & Teachers',
    tag: 'CLASSROOM EXECUTION',
    headline: 'Paperless Teaching & Student Journals',
    points: [
      'Complete daily class attendance, assign homework, manage activity rosters, and log merits or conduct notes on Android.',
      'Publish multimedia learning journals—including photos, drawings, voice notes, reports, and wellbeing logs—directly to parents.',
      'Eliminate manual paper registers and end-of-term reporting bottlenecks with real-time cloud synchronization.',
    ],
  },
  {
    role: 'Parents & Guardians',
    tag: 'HOME-TO-SCHOOL LINK',
    headline: 'Real-Time Visibility & Mobile Payments',
    points: [
      'Switch effortlessly between multiple enrolled children to view attendance percentages, homework deadlines, and reports.',
      'Pay tuition fees and purchase school uniforms in USD or ZiG using EcoCash directly inside the mobile app.',
      'Administrative verification of every guardian-student link safeguards student privacy and institutional security.',
    ],
  },
]

const partners = [
  {
    name: 'Split Technologies',
    role: 'Engineering & Digital Infrastructure Partner',
    description:
      'Turning ambitious ideas into resilient digital systems, cloud-native backends, and high-performance web and mobile applications engineered for clarity, speed, and scale.',
    href: 'https://splittechnologies.co.zw',
    linkLabel: 'splittechnologies.co.zw',
  },
  {
    name: 'EcoCash',
    role: 'Payment Infrastructure',
    description:
      "Zimbabwe's leading mobile money payment gateway enabling secure local USD and ZiG transactions directly within the mobile application.",
  },
]

const corporateSpecs = [
  { label: 'Company Name', value: 'Pedasenticom' },
  { label: 'Official Domain', value: 'pedasenticom.co.zw', href: 'https://pedasenticom.co.zw' },
  {
    label: 'Legal Registration',
    value: 'Registered in Zimbabwe under CIPZ (Companies and Intellectual Property Zimbabwe)',
  },
  { label: 'Headquarters', value: 'Harare, Zimbabwe' },
  { label: 'Industry Sector', value: 'Education & Technology (EdTech) · School Management & Payments' },
  { label: 'Flagship Platform', value: 'Edu-Connect (transitioning to Pedacom)' },
  { label: 'Client Platforms', value: 'Administrative Web Portal & Android Mobile Application' },
  { label: 'Payment Gateway', value: 'EcoCash Multi-Currency Integration (USD & ZiG)' },
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
    label: 'Official Telephone & WhatsApp',
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

const hexNodes = [
  { cx: 100, cy: 12 },
  { cx: 176.2, cy: 56 },
  { cx: 176.2, cy: 144 },
  { cx: 100, cy: 188 },
  { cx: 23.8, cy: 144 },
  { cx: 23.8, cy: 56 },
]

function useAwwwardsSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    let currentY = window.scrollY
    let targetY = window.scrollY
    let rafId = null
    let isAnimating = false

    const updateProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll))
      document.documentElement.style.setProperty('--scroll-progress', ratio.toFixed(4))
    }

    const step = () => {
      const diff = targetY - currentY
      if (Math.abs(diff) > 0.45) {
        currentY += diff * 0.1
        window.scrollTo(0, Math.round(currentY))
        updateProgress()
        rafId = window.requestAnimationFrame(step)
      } else {
        currentY = targetY
        window.scrollTo(0, Math.round(targetY))
        updateProgress()
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
      if (document.body.style.overflow === 'hidden') return
      if (event.ctrlKey || event.metaKey) return

      event.preventDefault()
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const delta =
        event.deltaMode === 1
          ? event.deltaY * 36
          : event.deltaMode === 2
            ? event.deltaY * window.innerHeight
            : event.deltaY

      targetY = Math.min(maxScroll, Math.max(0, targetY + delta * 0.95))
      startLoop()
    }

    const onNativeScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY
        targetY = window.scrollY
      }
      updateProgress()
    }

    const onAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash.length < 2) return
      const targetEl = document.querySelector(hash)
      if (!targetEl) return

      event.preventDefault()
      const headerOffset = 78
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const destY =
        hash === '#top'
          ? 0
          : Math.min(
              maxScroll,
              Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - headerOffset)
            )

      if (reducedMotion || !finePointer) {
        window.scrollTo({ top: destY, behavior: reducedMotion ? 'auto' : 'smooth' })
      } else {
        currentY = window.scrollY
        targetY = destY
        startLoop()
      }
      window.history.pushState(null, '', hash)
    }

    updateProgress()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    document.addEventListener('click', onAnchorClick)

    // Scroll-triggered staggered section & card reveals
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
        { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
      )
      revealNodes.forEach((node) => {
        node.classList.add('reveal-ready')
        observer.observe(node)
      })
    } else {
      revealNodes.forEach((node) => node.classList.add('is-revealed'))
    }

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onNativeScroll)
      window.removeEventListener('resize', updateProgress)
      document.removeEventListener('click', onAnchorClick)
      if (rafId) window.cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
    }
  }, [])
}

function IntroLoader() {
  const [phase, setPhase] = useState('active')
  const exitTimerRef = useRef(null)
  const doneTimerRef = useRef(null)
  const safetyTimerRef = useRef(null)

  const beginExit = (exitDuration = 760) => {
    setPhase((current) => {
      if (current !== 'active') return current
      doneTimerRef.current = window.setTimeout(() => {
        setPhase('done')
      }, exitDuration)
      return 'exiting'
    })
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minDuration = reducedMotion ? 450 : 2100
    const exitDuration = reducedMotion ? 320 : 760

    let minElapsed = false
    let pageLoaded = document.readyState === 'complete'

    const tryFinish = () => {
      if (minElapsed && pageLoaded) {
        beginExit(exitDuration)
      }
    }

    const onWindowLoad = () => {
      pageLoaded = true
      tryFinish()
    }

    if (!pageLoaded) {
      window.addEventListener('load', onWindowLoad)
    }

    exitTimerRef.current = window.setTimeout(() => {
      minElapsed = true
      tryFinish()
    }, minDuration)

    safetyTimerRef.current = window.setTimeout(() => {
      beginExit(exitDuration)
    }, reducedMotion ? 900 : 3800)

    return () => {
      window.removeEventListener('load', onWindowLoad)
      window.clearTimeout(exitTimerRef.current)
      window.clearTimeout(doneTimerRef.current)
      window.clearTimeout(safetyTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (phase === 'active') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      className={`intro-loader ${phase === 'exiting' ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Pedasenticom"
    >
      <div className="intro-curtain intro-curtain-top" aria-hidden="true" />
      <div className="intro-curtain intro-curtain-bottom" aria-hidden="true" />
      <div className="intro-seam" aria-hidden="true" />

      <div className="intro-stage">
        <div className="intro-emblem-wrap">
          <span className="intro-ripple ripple-one" aria-hidden="true" />
          <span className="intro-ripple ripple-two" aria-hidden="true" />
          <span className="intro-orbit" aria-hidden="true" />

          <svg
            className="intro-hex-svg"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pedasenticomHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="55%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#e0b45c" />
              </linearGradient>
            </defs>
            <polygon
              className="intro-hex-outer"
              points="100,12 176.2,56 176.2,144 100,188 23.8,144 23.8,56"
              pathLength="100"
              stroke="url(#pedasenticomHexGrad)"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <polygon
              className="intro-hex-inner"
              points="100,24 165.8,62 165.8,138 100,176 34.2,138 34.2,62"
              pathLength="100"
              stroke="rgba(56, 189, 248, 0.36)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {hexNodes.map((node, index) => (
              <circle
                key={index}
                className="intro-hex-node"
                cx={node.cx}
                cy={node.cy}
                r="3.2"
                style={{ animationDelay: `${0.16 + index * 0.1}s` }}
              />
            ))}
          </svg>

          <div className="intro-crest-frame">
            <img src="/pedasenticom-mark.png" alt="Pedasenticom crest" width="146" height="146" />
            <span className="intro-crest-sheen" aria-hidden="true" />
          </div>
        </div>

        <div className="intro-wordmark">
          <div className="intro-title-mask">
            <span className="intro-title">
              PEDA<span className="intro-title-accent">SENTICOM</span>
            </span>
          </div>
          <p className="intro-slogan">Inspired to Advance Your Global Reach</p>
        </div>

        <div className="intro-progress" aria-hidden="true">
          <div className="intro-progress-bar" />
        </div>
      </div>

      <button
        type="button"
        className="intro-skip"
        onClick={() => {
          window.clearTimeout(exitTimerRef.current)
          window.clearTimeout(safetyTimerRef.current)
          beginExit(620)
        }}
      >
        Skip intro
      </button>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroMode, setHeroMode] = useState('showcase')
  const [activeModuleId, setActiveModuleId] = useState('portal')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const heroRef = useRef(null)

  useAwwwardsSmoothScroll()

  const closeMenu = () => setMenuOpen(false)
  const activeModule =
    platformModules.find((m) => m.id === activeModuleId) || platformModules[0]
  const currentHeroMode =
    heroModes.find((m) => m.id === heroMode) || heroModes[0]

  const handleHeroPointerMove = (event) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const tiltY = ((x - 0.5) * 7).toFixed(2)
    const tiltX = ((0.5 - y) * 6).toFixed(2)
    el.style.setProperty('--hero-mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--hero-my', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--rig-tilt-x', `${tiltX}deg`)
    el.style.setProperty('--rig-tilt-y', `${tiltY}deg`)
  }

  const handleHeroPointerLeave = () => {
    const el = heroRef.current
    if (!el) return
    el.style.setProperty('--rig-tilt-x', '0deg')
    el.style.setProperty('--rig-tilt-y', '0deg')
  }

  return (
    <div className="site-shell" id="top">
      <div className="scroll-progress-track" aria-hidden="true">
        <div className="scroll-progress-fill" />
      </div>

      <IntroLoader />

      {/* TOP GLOBAL NAVIGATION BAR */}
      <header className="global-header">
        <div className="container global-nav">
          <a className="brand-lockup" href="#top" onClick={closeMenu}>
            <span className="brand-crest">
              <img
                src="/pedasenticom-mark.png"
                alt="Pedasenticom emblem"
                width="42"
                height="42"
                decoding="async"
              />
            </span>
            <span className="brand-copy">
              <span className="brand-title">PEDASENTICOM</span>
              <span className="brand-meta">Education &amp; Technology · Zimbabwe</span>
            </span>
          </a>

          <button
            className="mobile-menu-btn"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#spotlight" onClick={closeMenu}>Edu-Connect Platform</a>
            <a href="#roles" onClick={closeMenu}>School Roles</a>
            <a href="#infrastructure" onClick={closeMenu}>Cloud &amp; Partners</a>
            <a href="#specifications" onClick={closeMenu}>Specifications</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <a className="header-cta" href="#contact" onClick={closeMenu}>
              Onboard a School <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* STANDOUT AWWWARDS + GEFORCE NOW ARCHITECTURAL HERO STAGE */}
        <section
          className="hero-stage"
          ref={heroRef}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <div className="hero-spotlight-beam" aria-hidden="true" />
          <div className="hero-backdrop-grid" aria-hidden="true" />
          <div className="hero-horizon-glow" aria-hidden="true" />

          <div className="container hero-layout">
            <div className="hero-lead">
              <div className="hero-status-architecture">
                <div className="product-series-bar">
                  <span className="series-led" aria-hidden="true" />
                  <span className="series-tag">FLAGSHIP PLATFORM</span>
                  <span className="series-divider" />
                  <span className="series-name">EDU-CONNECT (PEDACOM)</span>
                </div>
                <span className="jurisdiction-pill">CIPZ REGISTERED · HARARE, ZW</span>
              </div>

              <h1 className="hero-monumental-title">
                <span className="title-line">Integrated Digital</span>
                <span className="title-line">Infrastructure for</span>
                <span className="title-line accent-line">Schools in Zimbabwe.</span>
              </h1>

              <p className="hero-subcopy">
                <strong>Pedasenticom</strong> is an education and technology company headquartered in{' '}
                <strong>Harare, Zimbabwe</strong> and registered under <strong>CIPZ</strong>. Through{' '}
                <strong>Edu-Connect</strong> (transitioning to <strong>Pedacom</strong>), we unite school
                administration, Android classroom workflows, parent engagement, and dual-currency{' '}
                <strong>USD &amp; ZiG EcoCash</strong> payments on one cloud platform.
              </p>

              <div className="hero-cta-row">
                <a className="btn-primary-gold" href="#contact">
                  Deploy at Your School <ArrowUpRight size={17} />
                </a>
                <a className="btn-outline-cyan" href="#spotlight">
                  Inspect Platform Modules <ChevronDown size={16} />
                </a>
              </div>

              <div className="hero-spec-strip" aria-label="Core platform capabilities">
                <div className="spec-cell">
                  <span className="spec-index">01 // PAYMENTS</span>
                  <span className="spec-number">USD &amp; ZiG</span>
                  <span className="spec-caption">EcoCash Fee &amp; Store Gateway</span>
                </div>
                <div className="spec-cell">
                  <span className="spec-index">02 // CLIENTS</span>
                  <span className="spec-number">Web + Android</span>
                  <span className="spec-caption">Admin Portal &amp; Mobile App</span>
                </div>
                <div className="spec-cell">
                  <span className="spec-index">03 // GOVERNANCE</span>
                  <span className="spec-number">5-Role RBAC</span>
                  <span className="spec-caption">Multi-Tenant Cloud Security</span>
                </div>
              </div>
            </div>

            {/* 3D INTERACTIVE COMMAND RIG */}
            <div className="hero-rig-perspective">
              <div className="floating-hud hud-top-left" aria-hidden="true">
                <span className="hud-kicker">CLOUD TENANCY</span>
                <strong>5-Role RBAC · HTTPS</strong>
              </div>

              <div className="floating-hud hud-bottom-right" aria-hidden="true">
                <span className="hud-kicker">SETTLEMENT ENGINE</span>
                <strong>EcoCash USD &amp; ZiG Live</strong>
              </div>

              <div className="display-frame">
                <div className="display-glare" aria-hidden="true" />

                <div className="display-topbar">
                  <span className="display-title">{currentHeroMode.caption}</span>
                  <span className="display-region">HARARE · ZIMBABWE</span>
                </div>

                {/* INTERACTIVE HERO VIEW SWITCHER */}
                <div className="hero-mode-tabs" role="tablist" aria-label="Hero showcase view">
                  {heroModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={heroMode === mode.id}
                      className={`hero-mode-btn ${heroMode === mode.id ? 'is-active' : ''}`}
                      onClick={() => setHeroMode(mode.id)}
                    >
                      <span className="mode-code">{mode.code}</span>
                      <span className="mode-label">{mode.label}</span>
                    </button>
                  ))}
                </div>

                <div className="display-screen">
                  {heroMode === 'showcase' && (
                    <div className="hero-view-showcase">
                      <img
                        src="/pedasenticom-logo.jpg"
                        alt="Pedasenticom — Inspired to Advance Your Global Reach"
                        width="1024"
                        height="559"
                        decoding="async"
                      />
                      <div className="showcase-overlay-bar">
                        <span>OFFICIAL BRAND IDENTITY // PEDASENTICOM</span>
                        <span>INSPIRED TO ADVANCE YOUR GLOBAL REACH</span>
                      </div>
                    </div>
                  )}

                  {heroMode === 'topology' && (
                    <div className="hero-view-panel">
                      <div className="topology-header">
                        <span>MULTI-TENANT CLOUD ARCHITECTURE</span>
                        <span className="status-chip">ALL NODES OPERATIONAL</span>
                      </div>
                      <div className="topology-grid">
                        <div className="topology-node">
                          <span className="node-step">NODE 01 // WEB PORTAL</span>
                          <strong>School Admin Console</strong>
                          <p>Term setup, fee structures, staff rosters, and uniform inventory.</p>
                        </div>
                        <div className="topology-node">
                          <span className="node-step">NODE 02 // CLOUD API</span>
                          <strong>Laravel 5-Role RBAC</strong>
                          <p>Strict per-school tenant isolation and encrypted HTTPS enforcement.</p>
                        </div>
                        <div className="topology-node">
                          <span className="node-step">NODE 03 // ANDROID APP</span>
                          <strong>Teacher &amp; Parent App</strong>
                          <p>Digital roll call, multimedia learning journals, and child reports.</p>
                        </div>
                        <div className="topology-node">
                          <span className="node-step">NODE 04 // PAYMENT WORKER</span>
                          <strong>EcoCash USD &amp; ZiG</strong>
                          <p>Automated background payment verification and ledger reconciliation.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroMode === 'ledger' && (
                    <div className="hero-view-panel">
                      <div className="topology-header">
                        <span>ECOCASH DUAL-CURRENCY SETTLEMENT ENGINE</span>
                        <span className="status-chip gold">AUTO-RECONCILED</span>
                      </div>
                      <div className="ledger-list">
                        <div className="ledger-item">
                          <div>
                            <strong>Term Tuition &amp; Levy Settlement</strong>
                            <span>EcoCash Mobile Prompt · Instant Parent Receipt</span>
                          </div>
                          <span className="ledger-currency">USD / ZiG</span>
                        </div>
                        <div className="ledger-item">
                          <div>
                            <strong>Digital School Uniform Store Order</strong>
                            <span>Inventory Reserved · Background Worker Verified</span>
                          </div>
                          <span className="ledger-currency">VERIFIED</span>
                        </div>
                        <div className="ledger-item">
                          <div>
                            <strong>School Finance Ledger Sync</strong>
                            <span>Real-Time Balance Update on Admin Web Portal</span>
                          </div>
                          <span className="ledger-currency">LIVE SYNC</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="display-telemetry">
                  <div>
                    <span className="telemetry-key">REGISTRATION</span>
                    <strong className="telemetry-val">CIPZ Zimbabwe</strong>
                  </div>
                  <div>
                    <span className="telemetry-key">FLAGSHIP</span>
                    <strong className="telemetry-val">Edu-Connect (Pedacom)</strong>
                  </div>
                  <div>
                    <span className="telemetry-key">PAYMENTS</span>
                    <strong className="telemetry-val">EcoCash USD / ZiG</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KINETIC ARCHITECTURAL TICKER RIBBON */}
          <div className="hero-marquee" aria-label="Platform highlights">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span className="marquee-item" key={idx}>
                  <span className="marquee-diamond" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* SUB-NAVIGATION ANCHOR BAR */}
          <div className="subnav-bar">
            <div className="container subnav-inner">
              <span className="subnav-brand">EDU-CONNECT ARCHITECTURE</span>
              <div className="subnav-links">
                <a href="#spotlight">Interactive Modules</a>
                <a href="#roles">Role Matrix</a>
                <a href="#infrastructure">EcoCash &amp; Cloud</a>
                <a href="#specifications">Corporate Specs</a>
                <a href="#faq">Verified FAQ</a>
                <a href="#contact">Direct Contact</a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PLATFORM SPOTLIGHT (TABBED MODULE SWITCHER + LIVE CONSOLE VIEW) */}
        <section className="spotlight-section" id="spotlight" data-reveal>
          <div className="container">
            <div className="section-banner">
              <div>
                <p className="kicker-line">PLATFORM ARCHITECTURE // EDU-CONNECT (PEDACOM)</p>
                <h2>One Cloud Ecosystem. Four Integrated Modules.</h2>
              </div>
              <p className="banner-summary">
                Select any module below to inspect how Pedasenticom connects school leadership, classroom
                educators, parents, and automated EcoCash finance.
              </p>
            </div>

            <div className="module-switcher-bar" role="tablist" aria-label="Platform modules">
              {platformModules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={activeModule.id === mod.id}
                  className={`module-tab ${activeModule.id === mod.id ? 'is-selected' : ''}`}
                  onClick={() => setActiveModuleId(mod.id)}
                >
                  <span className="module-tab-code">{mod.code}</span>
                  <span className="module-tab-name">{mod.tabLabel}</span>
                </button>
              ))}
            </div>

            <div className="spotlight-stage">
              <div className="spotlight-copy">
                <span className="module-audience">{activeModule.audience}</span>
                <h3>{activeModule.title}</h3>
                <p className="module-description">{activeModule.summary}</p>

                <div className="module-highlights">
                  {activeModule.highlights.map((item) => (
                    <div className="highlight-row" key={item.label}>
                      <h4>{item.label}</h4>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="spotlight-console" aria-label={`${activeModule.title} system preview`}>
                <div className="console-header">
                  <span className="console-title">{activeModule.consolePreview.windowTitle}</span>
                  <span className="console-status">{activeModule.consolePreview.status}</span>
                </div>

                <div className="console-metrics">
                  {activeModule.consolePreview.metrics.map((m) => (
                    <div className="console-metric-box" key={m.label}>
                      <span>{m.label}</span>
                      <strong>{m.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="console-table">
                  {activeModule.consolePreview.rows.map((row) => (
                    <div className="console-row" key={row.col1}>
                      <div className="console-row-main">
                        <strong>{row.col1}</strong>
                        <span>{row.col2}</span>
                      </div>
                      <span className="console-badge">{row.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STAKEHOLDER ROLE MATRIX */}
        <section className="roles-section" id="roles" data-reveal>
          <div className="container">
            <div className="section-banner">
              <div>
                <p className="kicker-line">STAKEHOLDER CAPABILITIES // SCHOOL-TO-HOME</p>
                <h2>Engineered for Every Role in the School Community.</h2>
              </div>
              <p className="banner-summary">
                Pedasenticom replaces fragmented paper registers, manual fee receipts, and disconnected chat
                groups with role-specific digital tools.
              </p>
            </div>

            <div className="roles-grid">
              {roleMatrix.map((group) => (
                <article className="role-panel" key={group.role} data-reveal>
                  <div className="role-panel-top">
                    <span className="role-tag">{group.tag}</span>
                    <h3>{group.role}</h3>
                    <p className="role-subheadline">{group.headline}</p>
                  </div>
                  <ul className="role-spec-list">
                    {group.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DARK INFRASTRUCTURE & PARTNERS BAND */}
        <section className="infra-section" id="infrastructure" data-reveal>
          <div className="container">
            <div className="section-banner light">
              <div>
                <p className="kicker-line gold">CLOUD SCALE &amp; ECOSYSTEM PARTNERS</p>
                <h2>Built for Primary &amp; Secondary Schools Across Zimbabwe.</h2>
              </div>
              <p className="banner-summary light">
                Multi-tenant cloud architecture allows institutions in Harare and across Southern Africa to
                launch without dedicated on-premise servers.
              </p>
            </div>

            <div className="infra-bento">
              <article className="infra-card primary-span" data-reveal>
                <span className="infra-eyebrow">MULTI-TENANT CLOUD BACKBONE</span>
                <h3>Zero-Friction School Onboarding &amp; Strict Data Isolation</h3>
                <p>
                  Every institution onboarded onto Edu-Connect (Pedacom) operates within an isolated tenant
                  boundary enforced by 5-role server-side access control. School administrators control academic
                  years, fee structures, uniform inventory, and verified guardian links from day one.
                </p>
                <div className="infra-stat-bar">
                  <div>
                    <strong>Primary &amp; Secondary</strong>
                    <span>Institution Ready</span>
                  </div>
                  <div>
                    <strong>USD &amp; ZiG</strong>
                    <span>Dual-Currency Ledgers</span>
                  </div>
                  <div>
                    <strong>Harare, Zimbabwe</strong>
                    <span>CIPZ Registered</span>
                  </div>
                </div>
              </article>

              {partners.map((partner) => (
                <article className="infra-card" key={partner.name} data-reveal>
                  <span className="infra-eyebrow">{partner.role}</span>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                  {partner.href && (
                    <a
                      className="infra-link"
                      href={partner.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {partner.linkLabel} <ArrowUpRight size={15} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE SPECIFICATION SHEET & CORPORATE PROFILE */}
        <section className="specs-section" id="specifications" data-reveal>
          <div className="container">
            <div className="specs-layout">
              <div className="specs-intro">
                <p className="kicker-line">CORPORATE &amp; TECHNICAL SPECIFICATIONS</p>
                <h2>Verified Organization &amp; Platform Profile.</h2>
                <p>
                  Pedasenticom&apos;s mission is to strengthen the partnership between schools, educators, and
                  families through accessible, secure, and real-time digital infrastructure across Zimbabwe and
                  Southern Africa.
                </p>

                <div className="spec-brand-plate">
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

              <div className="specs-table-wrap">
                <table className="specs-table" aria-label="Pedasenticom corporate and technical specifications">
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
                              className="spec-table-link"
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
          </div>
        </section>

        {/* INTERACTIVE ACCORDION FAQ (GEFORCE NOW STYLE + FULL DOM FOR GOOGLE SEO) */}
        <section className="faq-section" id="faq" data-reveal>
          <div className="container">
            <div className="section-banner">
              <div>
                <p className="kicker-line">FREQUENTLY ASKED QUESTIONS // VERIFIED ENTITY FACTS</p>
                <h2>Questions About Pedasenticom &amp; Edu-Connect.</h2>
              </div>
              <p className="banner-summary">
                Direct answers regarding Pedasenticom&apos;s CIPZ registration, Harare headquarters, platform
                modules, and EcoCash school fee integration.
              </p>
            </div>

            <div className="faq-accordion">
              {faqs.map((item, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown className="faq-chevron" size={20} />
                    </button>
                    <div className="faq-content">
                      <p>{item.answer}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* DIRECT SCHOOL ONBOARDING & CONTACT STAGE */}
        <section className="contact-stage" id="contact" data-reveal>
          <div className="container contact-box">
            <div className="contact-copy">
              <p className="kicker-line gold">SCHOOL ONBOARDING &amp; PARTNERSHIPS</p>
              <h2>Deploy Edu-Connect at Your Institution.</h2>
              <p>
                Partner with Pedasenticom—Zimbabwe&apos;s CIPZ-registered education and technology company in
                Harare—to roll out unified school administration, Android teacher and parent workflows, and
                automated USD &amp; ZiG EcoCash fee collection.
              </p>
            </div>

            <div className="contact-actions-panel">
              <div className="contact-channel">
                <span className="channel-label">OFFICIAL EMAIL</span>
                <a className="channel-value" href="mailto:Pedasenticom@gmail.com">
                  Pedasenticom@gmail.com <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="contact-channel">
                <span className="channel-label">DIRECT PHONE &amp; WHATSAPP (HARARE, ZIMBABWE)</span>
                <div className="channel-buttons">
                  <a className="btn-primary-gold" href="tel:+263790543013">
                    Call 0790543013
                  </a>
                  <a
                    className="btn-outline-cyan"
                    href="https://wa.me/263790543013"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp Chat <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ENTERPRISE FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col-brand">
            <a className="brand-lockup" href="#top">
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
              <span className="brand-title">PEDASENTICOM</span>
            </a>
            <p>
              Education &amp; Technology company registered in Zimbabwe under CIPZ. Headquartered in Harare,
              Zimbabwe.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#spotlight">Administrative Web Portal</a>
            <a href="#spotlight">Android Mobile Application</a>
            <a href="#spotlight">EcoCash USD &amp; ZiG Gateway</a>
            <a href="#roles">Stakeholder Roles</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#specifications">Corporate Specifications</a>
            <a href="#infrastructure">Technology Partners</a>
            <a href="#faq">Frequently Asked Questions</a>
            <a href="https://splittechnologies.co.zw" target="_blank" rel="noreferrer">
              Split Technologies
            </a>
          </div>

          <div className="footer-col">
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
          <span>© 2026 Pedasenticom (pedasenticom.co.zw). All rights reserved.</span>
          <span>Flagship Product: Edu-Connect (Pedacom) · CIPZ Registered</span>
        </div>
      </footer>
    </div>
  )
}

export default App
