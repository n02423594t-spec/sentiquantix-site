import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
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
import './styles.css'

const architectureComponents = [
  {
    number: '01',
    name: 'Web Portal',
    subtitle: 'admin.chewetechnologies.co.zw',
    href: 'https://admin.chewetechnologies.co.zw',
    targetUsers: 'Platform Owners & School Admins',
    icon: Globe,
    description:
      'Multi-school onboarding, child-level subscription management, academic year and class configuration, teacher assignments, fee accounting, uniform store inventory, and school-wide notices.',
    tags: ['Multi-school onboarding', 'Fee accounting', 'Uniform inventory', 'School notices'],
  },
  {
    number: '02',
    name: 'Android Mobile App',
    subtitle: 'Pedacom Mobile (formerly Edu-Connect)',
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
    name: 'Teramark Technologies',
    role: 'Engineering Partner',
    description:
      'Led by Senior Software Engineer Jefter Tokomere, delivering enterprise software architecture, mobile engineering, and system security.',
  },
  {
    name: 'Chewe Technologies',
    role: 'Hosting & Ecosystem Partner',
    description:
      'Providing cloud portal infrastructure at admin.chewetechnologies.co.zw and digital platform support.',
    href: 'https://admin.chewetechnologies.co.zw',
    linkLabel: 'admin.chewetechnologies.co.zw',
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
  { label: 'Flagship Product', value: 'Formerly known as Edu-Connect, to be named Pedacom' },
  { label: 'Industry Sector', value: 'Educational Technology (EdTech) & School Payments' },
  { label: 'Primary Platforms', value: 'Administrative Web Portal & Android Mobile Application' },
  {
    label: 'Web Portal Address',
    value: 'admin.chewetechnologies.co.zw',
    href: 'https://admin.chewetechnologies.co.zw',
  },
  {
    label: 'Development Team',
    value: 'Jefter Tokomere (Senior Software Engineer, Teramark Technologies)',
  },
]

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
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand-emblem">
              <img className="brand-logo" src="/pedasenticom-mark.png" alt="Pedasenticom emblem" />
            </span>
            <span className="brand-text">
              <span className="brand-name">
                Pedasenticom<span className="brand-dot">.</span>
              </span>
              <span className="brand-sub">Pedacom EdTech Ecosystem</span>
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
              <span className="eyebrow-line" /> Corporate &amp; Product Profile · EdTech &amp; School Payments
            </p>
            <h1>
              Connecting home<br />
              &amp; school <em>digitally.</em>
            </h1>
            <p className="hero-description">
              Through our flagship app—formerly known as <em>Edu-Connect</em>, to be named{' '}
              <strong>Pedacom</strong>—Pedasenticom delivers integrated digital infrastructure that
              streamlines school administration, classroom engagement, and multi-currency USD &amp; ZiG
              EcoCash payments across Zimbabwe and Southern Africa.
            </p>
            <div className="hero-actions">
              <a
                className="button button-dark"
                href="https://admin.chewetechnologies.co.zw"
                target="_blank"
                rel="noreferrer"
              >
                Open Web Portal <ArrowUpRight size={18} />
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
              <span className="pulse" /> Edu-Connect · To Be Named Pedacom
            </div>
            <div className="logo-stage">
              <img
                src="/pedasenticom-logo.jpg"
                alt="Pedasenticom — Inspired to Advance Your Global Reach"
              />
            </div>
            <div className="visual-footer">
              <span>Web Portal &amp; Android App</span>
              <span>Zimbabwe &amp; Southern Africa</span>
            </div>
          </div>
        </section>

        {/* 01 / EXECUTIVE SUMMARY & MISSION */}
        <section className="intro-band" id="overview">
          <div className="container intro-grid">
            <div className="intro-sidebar">
              <p className="section-kicker">01 / Executive Summary</p>
              <div className="pedacom-badge">
                <span className="pedacom-badge-eyebrow">Flagship App</span>
                <strong className="pedacom-badge-title">PEDACOM</strong>
                <span className="pedacom-badge-sub">Connecting Home &amp; School</span>
                <span className="pedacom-badge-note">Formerly known as Edu-Connect, to be named Pedacom</span>
              </div>
            </div>
            <div className="intro-body">
              <h2>
                A unified school-to-home <span>digital ecosystem.</span>
              </h2>
              <p>
                <strong>Pedasenticom</strong> is an educational technology company dedicated to bridging the
                operational and communication gap between schools, educators, and families. Through our flagship
                app—formerly known as <em>Edu-Connect</em>, to be named <strong>Pedacom</strong>—we deliver a
                unified school-to-home digital ecosystem engineered to streamline school administration,
                classroom engagement, and parent-teacher collaboration.
              </p>
              <p>
                Developed by Senior Software Engineer <strong>Jefter Tokomere</strong> at{' '}
                <strong>Teramark Technologies</strong> in collaboration with <strong>Chewe Technologies</strong>,
                Pedasenticom combines an administrative web portal with a dedicated Android mobile application.
                Schools manage attendance, academic records, multi-currency fee balances, and online uniform
                stores from a central dashboard, while parents monitor their children&apos;s daily progress and
                complete payments from their mobile devices.
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
                <img src="/pedasenticom-mark.png" alt="Pedasenticom crest" />
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
                      <a href={row.href} target="_blank" rel="noreferrer" className="summary-link">
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

        {/* 06 / CONTACT */}
        <section className="contact container" id="contact">
          <p className="section-kicker">06 / Onboard Your School</p>
          <h2>
            Bring Pedacom to<br />
            <em>your community.</em>
          </h2>
          <p className="contact-lead">
            Partner with Pedasenticom to deploy unified school administration, parent engagement, and
            USD/ZiG EcoCash fee collection for your primary or secondary institution.
          </p>

          <div className="contact-links">
            <a className="contact-email" href="mailto:Tawanakelvinchawanda@gmail.com">
              Tawanakelvinchawanda@gmail.com <ArrowUpRight size={24} />
            </a>
            <a
              className="button button-dark"
              href="https://admin.chewetechnologies.co.zw"
              target="_blank"
              rel="noreferrer"
            >
              Launch Admin Portal <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="contact-meta">
            <span>Harare, Zimbabwe · Serving Southern Africa</span>
            <div className="phone-actions">
              <button
                className="phone-trigger"
                type="button"
                onClick={() => setContactOpen(!contactOpen)}
                aria-expanded={contactOpen}
              >
                +263 790 543 013
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
              <img className="brand-logo" src="/pedasenticom-mark.png" alt="Pedasenticom emblem" />
            </span>
            <span className="brand-name small">
              Pedasenticom<span className="brand-dot">.</span>
            </span>
          </a>
          <span className="footer-tagline">
            Connecting Home &amp; School Through Integrated Digital Infrastructure
          </span>
          <a
            className="footer-portal"
            href="https://admin.chewetechnologies.co.zw"
            target="_blank"
            rel="noreferrer"
          >
            admin.chewetechnologies.co.zw <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
