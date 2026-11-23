import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  Globe,
  Menu,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  X,
} from 'lucide-react'

const architectureComponents = [
  {
    number: '01',
    name: 'Web Portal',
    subtitle: 'Administrative Dashboard',
    targetUsers: 'Platform Owners & School Admins',
    icon: Globe,
    description:
      'Multi-school onboarding, child-level subscription management, academic year and class configuration, teacher assignments, fee accounting, uniform store inventory, and school-wide notices.',
    tags: ['Multi-school onboarding', 'Fee accounting', 'Uniform inventory', 'School notices'],
  },
  {
    number: '02',
    name: 'Android Mobile App',
    subtitle: 'Edu-Connect Mobile (to be named Pedacom)',
    targetUsers: 'Teachers & Parents / Guardians',
    icon: Smartphone,
    description:
      'Teachers handle digital roll call, merit and conduct logging, homework assignments, activity rosters, and multimedia learning journals. Parents access real-time child records, fee balances, notices, and uniform ordering.',
    tags: ['Digital roll call', 'Learning journals', 'Real-time records', 'Uniform ordering'],
  },
  {
    number: '03',
    name: 'Central API Server',
    subtitle: 'Laravel Cloud Backbone',
    targetUsers: 'System Infrastructure',
    icon: Server,
    description:
      'Enforces strict server-side role-based access control (RBAC) across five distinct user roles, handles encrypted HTTPS traffic, and dispatches automated invitation and password emails.',
    tags: ['5-Role RBAC', 'Encrypted HTTPS', 'School data isolation', 'Automated emails'],
  },
  {
    number: '04',
    name: 'Payment Gateway',
    subtitle: 'EcoCash Integration',
    targetUsers: 'Parents & School Finance',
    icon: CreditCard,
    description:
      'Processes secure online payments in both USD and ZiG through EcoCash, supported by a dedicated background payment worker that verifies and reconciles order statuses automatically.',
    tags: ['USD & ZiG', 'EcoCash', 'Auto-reconciliation', 'Payment worker'],
  },
]

const stakeholders = [
  {
    id: 'schools',
    label: 'Schools & Admins',
    title: 'For Schools & Administrators',
    icon: Building2,
    accent: 'navy',
    items: [
      {
        heading: 'Centralized School Management',
        text: 'Configure academic years, classes, staff rosters, and student enrollments from a single administrative portal.',
      },
      {
        heading: 'Multi-Currency Fee & Store Operations',
        text: 'Track tuition balances in USD and ZiG and operate a digital uniform shop with automated EcoCash payment confirmation.',
      },
      {
        heading: 'Strict Data Governance',
        text: 'Server-enforced permissions guarantee that school staff and administrators only access records belonging to their assigned institution.',
      },
    ],
  },
  {
    id: 'teachers',
    label: 'Teachers',
    title: 'For Teachers',
    icon: BookOpen,
    accent: 'cyan',
    items: [
      {
        heading: 'Paperless Classroom Workflows',
        text: 'Record class attendance, assign homework, manage activity rosters, and log merits or conduct notes using school-standardized categories.',
      },
      {
        heading: 'Interactive Learning Journals',
        text: 'Share student work samples—including photos, drawings, voice notes, reports, and wellbeing logs—directly with linked parents.',
      },
    ],
  },
  {
    id: 'parents',
    label: 'Parents & Guardians',
    title: 'For Parents & Guardians',
    icon: Users,
    accent: 'gold',
    items: [
      {
        heading: 'Comprehensive Child Visibility',
        text: 'Switch seamlessly between multiple enrolled children to view attendance percentages, academic reports, homework deadlines, and behavior records.',
      },
      {
        heading: 'Convenient Digital Commerce & Security',
        text: 'Browse, order, and pay for school uniforms inside the app. Guardian-student linking requires administrative verification to safeguard student privacy.',
      },
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

const corporateSummary = [
  { label: 'Company Name', value: 'Pedasenticom' },
  {
    label: 'Official Website',
    value: 'pedasenticom.co.zw',
    href: 'https://pedasenticom.co.zw',
  },
  {
    label: 'Company Registration',
    value: 'Registered in Zimbabwe under CIPZ (Companies and Intellectual Property Zimbabwe)',
  },
  { label: 'Headquarters', value: 'Harare, Zimbabwe' },
  { label: 'Core Focus & Sector', value: 'Education & Technology (EdTech) & School Payments' },
  { label: 'Flagship Product', value: 'Edu-Connect (to be named Pedacom)' },
  { label: 'Primary Platforms', value: 'Administrative Web Portal & Android Mobile Application' },
  {
    label: 'Company Email',
    value: 'Pedasenticom@gmail.com',
    href: 'mailto:Pedasenticom@gmail.com',
    external: false,
  },
  {
    label: 'Company Contact',
    value: '0790543013',
    href: 'tel:+263790543013',
    external: false,
  },
  {
    label: 'Development Team',
    value: 'Split Technologies (splittechnologies.co.zw)',
    href: 'https://splittechnologies.co.zw',
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
    const minDuration = reducedMotion ? 450 : 2300
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
    }, reducedMotion ? 900 : 4200)

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
  const [contactOpen, setContactOpen] = useState(false)
  const [activeStakeholder, setActiveStakeholder] = useState('all')

  const closeMenu = () => setMenuOpen(false)

  const visibleStakeholders =
    activeStakeholder === 'all'
      ? stakeholders
      : stakeholders.filter((group) => group.id === activeStakeholder)

  return (
    <div className="site-shell" id="top">
      <IntroLoader />
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand-emblem">
              <img
                className="brand-logo"
                src="/pedasenticom-mark.png"
                alt="Pedasenticom emblem"
                width="46"
                height="46"
                decoding="async"
              />
            </span>
            <span className="brand-text">
              <span className="brand-name">
                Pedasenticom<span className="brand-dot">.</span>
              </span>
              <span className="brand-sub">Education &amp; Technology · Zimbabwe</span>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#overview" onClick={closeMenu}>Overview</a>
            <a href="#platform" onClick={closeMenu}>Architecture</a>
            <a href="#stakeholders" onClick={closeMenu}>Stakeholders</a>
            <a href="#partners" onClick={closeMenu}>Partners</a>
            <a href="#summary" onClick={closeMenu}>Profile</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Onboard a school <ArrowUpRight size={16} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> Education &amp; Technology · Registered in Zimbabwe under CIPZ
            </p>
            <h1>
              Connecting home<br />
              &amp; school <em>digitally.</em>
            </h1>
            <p className="hero-description">
              <strong>Pedasenticom</strong> is an education and technology company headquartered in{' '}
              <strong>Harare, Zimbabwe</strong> and registered under <strong>CIPZ</strong>. Through our
              flagship product—<strong>Edu-Connect</strong> (to be named <strong>Pedacom</strong>)—we deliver
              integrated digital infrastructure that streamlines school administration, classroom engagement,
              and multi-currency USD &amp; ZiG EcoCash payments.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">
                Partner with us <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#platform">
                Explore architecture <ChevronDown size={16} />
              </a>
            </div>

            <div className="hero-metrics" aria-label="Platform highlights">
              <div className="metric-item">
                <span className="metric-value">USD &amp; ZiG</span>
                <span className="metric-label">EcoCash Gateway</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">5-Role RBAC</span>
                <span className="metric-label">Multi-Tenant Cloud</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">Web &amp; Android</span>
                <span className="metric-label">Unified Ecosystem</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Pedasenticom official brand showcase">
            <div className="visual-grid" />
            <div className="visual-glow" />
            <div className="visual-note note-top">
              <span className="pulse" /> Flagship Product: Edu-Connect (Pedacom)
            </div>
            <div className="logo-stage">
              <img
                src="/pedasenticom-logo.jpg"
                alt="Pedasenticom — Inspired to Advance Your Global Reach"
                width="1024"
                height="559"
                decoding="async"
              />
            </div>
            <div className="visual-footer">
              <span>Web Portal &amp; Android App</span>
              <span>Harare, Zimbabwe &amp; Southern Africa</span>
            </div>
          </div>
        </section>

        {/* 01 / EXECUTIVE SUMMARY & MISSION */}
        <section className="intro-band" id="overview">
          <div className="container intro-grid">
            <div className="intro-sidebar">
              <p className="section-kicker">01 / Executive Summary</p>
              <div className="pedacom-badge">
                <span className="pedacom-badge-eyebrow">Flagship Product</span>
                <strong className="pedacom-badge-title">EDU-CONNECT</strong>
                <span className="pedacom-badge-sub">To be named Pedacom</span>
                <span className="pedacom-badge-note">Connecting Home &amp; School</span>
              </div>
            </div>
            <div className="intro-body">
              <h2>
                A unified school-to-home <span>digital ecosystem.</span>
              </h2>
              <p>
                <strong>Pedasenticom</strong> is an education and technology (EdTech) company based in{' '}
                <strong>Harare, Zimbabwe</strong> and officially registered under <strong>CIPZ</strong>{' '}
                (Companies and Intellectual Property Zimbabwe), dedicated to bridging the operational and
                communication gap between schools, educators, and families. Through our flagship
                product—<strong>Edu-Connect</strong> (to be named <strong>Pedacom</strong>)—we deliver a
                unified school-to-home digital ecosystem engineered to streamline school administration,
                classroom engagement, and parent-teacher collaboration.
              </p>
              <p>
                Engineered in partnership with <strong>Split Technologies</strong>, Pedasenticom combines an
                administrative web portal with a dedicated Android mobile application. Schools manage
                attendance, academic records, multi-currency fee balances, and online uniform stores from a
                central dashboard, while parents monitor their children&apos;s daily progress and complete
                USD and ZiG EcoCash payments from their mobile devices.
              </p>

              <blockquote className="mission-callout">
                <span className="mission-label">Our Mission &amp; Vision</span>
                <p>
                  Pedasenticom&apos;s mission is to strengthen the partnership between schools, teachers, and
                  parents through accessible, secure, and real-time digital tools that support every child&apos;s
                  educational journey—setting the standard for connected, transparent school communities across
                  Zimbabwe and Southern Africa.
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* 02 / CORE PLATFORM ARCHITECTURE */}
        <section className="platform container" id="platform">
          <div className="section-heading">
            <div>
              <p className="section-kicker">02 / Core Platform Architecture</p>
              <h2>
                Centralized cloud.<br />
                <span>Multi-tenant scalability.</span>
              </h2>
            </div>
            <p className="heading-aside">
              Every request passes through a secure API layer that validates user permissions and enforces
              strict school-level data isolation.
            </p>
          </div>

          <div className="component-list">
            {architectureComponents.map((item) => {
              const Icon = item.icon
              return (
                <article className="component-card" key={item.number}>
                  <div className="component-index">
                    <span className="component-number">{item.number}</span>
                    <span className="component-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                  </div>

                  <div className="component-title">
                    <h3>{item.name}</h3>
                    {item.href ? (
                      <a
                        className="component-sub link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.subtitle} <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="component-sub">{item.subtitle}</span>
                    )}
                    <span className="component-users">{item.targetUsers}</span>
                  </div>

                  <p className="component-desc">{item.description}</p>

                  <div className="component-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* 03 / STAKEHOLDER VALUE PROPOSITION */}
        <section className="stakeholders-band" id="stakeholders">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">03 / Stakeholder Value Proposition</p>
                <h2>
                  Built for every role<br />
                  <span>in the school community.</span>
                </h2>
              </div>
              <div className="role-filters" role="tablist" aria-label="Filter stakeholders">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStakeholder === 'all'}
                  className={`role-filter ${activeStakeholder === 'all' ? 'is-active' : ''}`}
                  onClick={() => setActiveStakeholder('all')}
                >
                  All roles
                </button>
                {stakeholders.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={activeStakeholder === group.id}
                    className={`role-filter ${activeStakeholder === group.id ? 'is-active' : ''}`}
                    onClick={() => setActiveStakeholder(group.id)}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`stakeholder-grid ${activeStakeholder !== 'all' ? 'is-focused' : ''}`}>
              {visibleStakeholders.map((group) => {
                const Icon = group.icon
                return (
                  <article className={`stakeholder-card accent-${group.accent}`} key={group.id}>
                    <div className="stakeholder-header">
                      <span className="stakeholder-icon" aria-hidden="true">
                        <Icon size={20} />
                      </span>
                      <h3>{group.title}</h3>
                    </div>
                    <ul className="stakeholder-list">
                      {group.items.map((point) => (
                        <li key={point.heading}>
                          <Check size={16} className="list-check" aria-hidden="true" />
                          <div>
                            <strong>{point.heading}:</strong> {point.text}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* 04 / SCALABILITY & TECHNOLOGY PARTNERS */}
        <section className="partners-band" id="partners">
          <div className="container">
            <div className="partners-top">
              <div>
                <p className="section-kicker light">04 / Scalability &amp; Partners</p>
                <h2>
                  Built to scale.<br />
                  <span>Backed by trusted partners.</span>
                </h2>
              </div>

              <div className="deployment-card">
                <div className="deployment-badge">
                  <span className="pulse" /> Multi-Tenant Cloud
                </div>
                <h3>Primary &amp; Secondary Schools</h3>
                <p>
                  Pedasenticom&apos;s multi-tenant cloud architecture is engineered to onboard primary and
                  secondary schools across Zimbabwe and Southern Africa without requiring separate
                  infrastructure—delivering unified classroom management, real-time parent engagement, and
                  secure EcoCash payment workflows.
                </p>
                <div className="deployment-pillars">
                  <span><ShieldCheck size={15} /> Classroom management</span>
                  <span><ShieldCheck size={15} /> Parent engagement</span>
                  <span><ShieldCheck size={15} /> Multi-school ready</span>
                </div>
              </div>
            </div>

            <div className="partner-grid">
              {partners.map((partner) => (
                <article className="partner-card" key={partner.name}>
                  <span className="partner-role">{partner.role}</span>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                  {partner.href && (
                    <a
                      className="partner-link"
                      href={partner.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {partner.linkLabel} <ArrowUpRight size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 / CORPORATE SUMMARY */}
        <section className="summary container" id="summary">
          <div className="summary-grid">
            <div className="summary-lead">
              <p className="section-kicker">05 / Corporate Summary</p>
              <h2>
                Organization &amp;<br />
                <span>platform overview.</span>
              </h2>
              <div className="brand-card">
                <img
                  src="/pedasenticom-mark.png"
                  alt="Pedasenticom crest"
                  width="52"
                  height="52"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span className="brand-card-title">PEDASENTICOM</span>
                  <span className="brand-card-slogan">Inspired to Advance Your Global Reach</span>
                </div>
              </div>
            </div>

            <dl className="summary-table" aria-label="Organization and platform overview">
              {corporateSummary.map((row) => (
                <div className="summary-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.external === false ? undefined : '_blank'}
                        rel={row.external === false ? undefined : 'noreferrer'}
                        className="summary-link"
                      >
                        {row.value} <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 06 / FREQUENTLY ASKED QUESTIONS (ENTITY & AI OVERVIEW GROUNDING) */}
        <section className="faq-band" id="faq">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">06 / Frequently Asked Questions</p>
                <h2>
                  Verified facts about<br />
                  <span>Pedasenticom in Zimbabwe.</span>
                </h2>
              </div>
              <p className="heading-aside">
                Key corporate, platform, and onboarding information for schools, educators, and parents across
                Harare and Zimbabwe.
              </p>
            </div>

            <div className="faq-grid">
              {faqs.map((item) => (
                <article className="faq-card" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 07 / CONTACT */}
        <section className="contact container" id="contact">
          <p className="section-kicker">07 / Onboard Your School</p>
          <h2>
            Bring Edu-Connect to<br />
            <em>your community.</em>
          </h2>
          <p className="contact-lead">
            Partner with Pedasenticom—Zimbabwe&apos;s CIPZ-registered education and technology company in
            Harare—to deploy unified school administration, parent engagement, and USD/ZiG EcoCash fee
            collection for your primary or secondary institution.
          </p>

          <div className="contact-links">
            <a className="contact-email" href="mailto:Pedasenticom@gmail.com">
              Pedasenticom@gmail.com <ArrowUpRight size={24} />
            </a>
          </div>

          <div className="contact-meta">
            <span>Harare, Zimbabwe · Registered under CIPZ</span>
            <div className="phone-actions">
              <button
                className="phone-trigger"
                type="button"
                onClick={() => setContactOpen(!contactOpen)}
                aria-expanded={contactOpen}
              >
                0790543013
              </button>
              {contactOpen && (
                <div className="phone-options">
                  <a href="tel:+263790543013">Call now</a>
                  <a href="https://wa.me/263790543013" target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
            <span>© 2026 Pedasenticom</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#top">
            <span className="brand-emblem small">
              <img
                className="brand-logo"
                src="/pedasenticom-mark.png"
                alt="Pedasenticom emblem"
                width="34"
                height="34"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="brand-name small">
              Pedasenticom<span className="brand-dot">.</span>
            </span>
          </a>
          <span className="footer-tagline">
            Education &amp; Technology · Harare, Zimbabwe · Registered under CIPZ
          </span>
          <a className="footer-portal" href="mailto:Pedasenticom@gmail.com">
            Pedasenticom@gmail.com <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
