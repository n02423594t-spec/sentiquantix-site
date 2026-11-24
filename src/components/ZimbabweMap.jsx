import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const zimbabweHubs = [
  {
    id: 'harare',
    city: 'Harare',
    province: 'Harare Metropolitan Province',
    role: 'National Headquarters · CIPZ Registered',
    isPrimary: true,
    x: 64,
    y: 35,
    summary:
      'Pedasenticom corporate headquarters and onboarding hub supporting primary and secondary schools across Harare, Chitungwiza, and Mashonaland with direct institutional deployment.',
    readiness: 'Direct Onboarding & Cloud Support',
  },
  {
    id: 'bulawayo',
    city: 'Bulawayo',
    province: 'Bulawayo Metropolitan Province',
    role: 'Southern Region Cloud Coverage',
    isPrimary: false,
    x: 34,
    y: 67,
    summary:
      'Zero-hardware multi-tenant onboarding for schools across Bulawayo and Matabeleland, uniting school portals, teacher Android workflows, and USD/ZiG EcoCash tuition settlement.',
    readiness: 'Cloud Tenant Ready · EcoCash USD & ZiG',
  },
  {
    id: 'mutare',
    city: 'Mutare',
    province: 'Manicaland Province',
    role: 'Eastern Highlands Coverage',
    isPrimary: false,
    x: 84,
    y: 47,
    summary:
      'Real-time cloud attendance, multimedia learning journals, and digital uniform ordering engineered to operate smoothly across mobile networks in Manicaland.',
    readiness: 'Android & Web Cloud Ready',
  },
  {
    id: 'gweru',
    city: 'Gweru',
    province: 'Midlands Province',
    role: 'Central Corridor Coverage',
    isPrimary: false,
    x: 49,
    y: 55,
    summary:
      'Centralized academic year management, automated EcoCash fee reconciliation, and verified parent-student linking for boarding and day schools in the Midlands.',
    readiness: 'Multi-School Tenant Isolation',
  },
  {
    id: 'masvingo',
    city: 'Masvingo',
    province: 'Masvingo Province',
    role: 'South-Eastern Coverage',
    isPrimary: false,
    x: 63,
    y: 69,
    summary:
      'Paperless teacher workflows and transparent guardian fee statements designed to keep parents connected regardless of distance from campus.',
    readiness: 'Remote Guardian Visibility',
  },
  {
    id: 'chinhoyi',
    city: 'Chinhoyi',
    province: 'Mashonaland West Province',
    role: 'Northern Corridor Coverage',
    isPrimary: false,
    x: 52,
    y: 28,
    summary:
      'Fast institutional deployment without on-premise server maintenance—all permissions enforced via 5-role cloud RBAC over encrypted HTTPS.',
    readiness: 'Instant Cloud Activation',
  },
]

// Clean stylized architectural polygon representing Zimbabwe's border silhouette
const ZIMBABWE_PATH =
  'M 18 46 L 26 42 L 34 33 L 45 20 L 56 15 L 67 16 L 78 21 L 87 30 L 89 44 L 85 57 L 78 69 L 73 84 L 58 88 L 46 84 L 35 79 L 25 69 L 17 58 Z'

export default function ZimbabweMap() {
  const [selectedId, setSelectedId] = useState('harare')
  const activeHub = zimbabweHubs.find((h) => h.id === selectedId) || zimbabweHubs[0]
  const hq = zimbabweHubs[0]

  return (
    <section id="map" className="citadel-map-section" aria-labelledby="map-title" data-reveal>
      <div className="container">
        <div className="section-editorial-head">
          <div>
            <p className="editorial-kicker">NATIONWIDE CLOUD COVERAGE · ZIMBABWE &amp; SOUTHERN AFRICA</p>
            <h2 id="map-title">Headquartered in Harare. Built for Schools Nationwide.</h2>
          </div>
          <p className="editorial-aside">
            Explore how Pedasenticom&apos;s multi-tenant cloud infrastructure onboards primary and secondary
            institutions across every province without local server hardware.
          </p>
        </div>

        <div className="map-grid">
          <div className="map-stage" role="region" aria-label="Interactive Zimbabwe school network map">
            <svg viewBox="0 0 106 102" className="zimbabwe-svg" aria-hidden="false">
              <defs>
                <radialGradient id="zwFill" cx="62%" cy="38%" r="65%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.24)" />
                  <stop offset="55%" stopColor="rgba(22, 66, 122, 0.42)" />
                  <stop offset="100%" stopColor="rgba(6, 17, 33, 0.85)" />
                </radialGradient>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0b45c" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Architectural Coordinate Grid */}
              <g className="map-grid-lines">
                {[15, 30, 45, 60, 75, 90].map((pos) => (
                  <React.Fragment key={pos}>
                    <line x1={pos} y1="6" x2={pos} y2="96" />
                    <line x1="6" y1={pos} x2="100" y2={pos} />
                  </React.Fragment>
                ))}
              </g>

              {/* Zimbabwe Territory Silhouette */}
              <path d={ZIMBABWE_PATH} fill="url(#zwFill)" stroke="#38bdf8" strokeWidth="0.6" />

              {/* Signal Connection Arcs from Harare HQ to Regional Hubs */}
              {zimbabweHubs
                .filter((h) => !h.isPrimary)
                .map((hub) => {
                  const mx = (hq.x + hub.x) / 2
                  const my = (hq.y + hub.y) / 2 - 5
                  const isCurrent = hub.id === activeHub.id
                  return (
                    <path
                      key={hub.id}
                      d={`M ${hq.x} ${hq.y} Q ${mx} ${my} ${hub.x} ${hub.y}`}
                      fill="none"
                      stroke="url(#arcGrad)"
                      strokeWidth={isCurrent ? '0.75' : '0.35'}
                      strokeDasharray={isCurrent ? 'none' : '1.4 1.2'}
                      opacity={isCurrent ? 0.95 : 0.45}
                    />
                  )
                })}

              {/* Interactive City Pins */}
              {zimbabweHubs.map((hub) => {
                const isSelected = hub.id === activeHub.id
                return (
                  <g
                    key={hub.id}
                    className={`map-pin ${isSelected ? 'is-active' : ''} ${hub.isPrimary ? 'is-hq' : ''}`}
                    transform={`translate(${hub.x}, ${hub.y})`}
                    onClick={() => setSelectedId(hub.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${hub.city}, ${hub.province}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedId(hub.id)
                      }
                    }}
                  >
                    <circle
                      r={isSelected ? 4.4 : 2.8}
                      fill={hub.isPrimary ? 'rgba(224, 180, 92, 0.28)' : 'rgba(56, 189, 248, 0.24)'}
                      className="map-pin-ring"
                    />
                    <circle
                      r={hub.isPrimary ? 1.7 : 1.3}
                      fill={hub.isPrimary ? '#e0b45c' : isSelected ? '#ffffff' : '#38bdf8'}
                      stroke="#061121"
                      strokeWidth="0.4"
                    />
                    <text
                      x={hub.x > 75 ? -2.6 : 2.6}
                      y={hub.isPrimary ? -2.2 : 0.8}
                      textAnchor={hub.x > 75 ? 'end' : 'start'}
                      className="map-pin-label"
                    >
                      {hub.city}
                    </text>
                  </g>
                )
              })}
            </svg>
            <div className="map-caption-bar">
              <span>ZIMBABWE · MULTI-TENANT CLOUD DEPLOYMENT</span>
              <span>CLICK ANY PROVINCIAL HUB</span>
            </div>
          </div>

          <div className="map-sidebar">
            <div className="map-hub-pills" role="tablist" aria-label="Zimbabwe provincial hubs">
              {zimbabweHubs.map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  role="tab"
                  aria-selected={hub.id === activeHub.id}
                  className={`hub-pill ${hub.id === activeHub.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(hub.id)}
                >
                  {hub.city}
                  {hub.isPrimary && <span className="hub-hq-dot">HQ</span>}
                </button>
              ))}
            </div>

            <article className="map-detail-card">
              <span className="map-detail-kicker">{activeHub.role}</span>
              <h3>{activeHub.city}</h3>
              <p className="map-detail-province">{activeHub.province}</p>
              <p className="map-detail-summary">{activeHub.summary}</p>

              <div className="map-detail-footer">
                <div>
                  <span>DEPLOYMENT STATUS</span>
                  <strong>{activeHub.readiness}</strong>
                </div>
                <a className="bracket-btn bracket-btn--dark" href="#contact">
                  <span>Onboard a School</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
