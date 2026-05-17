import { Link, useLocation } from 'react-router-dom'
import { Scale, FileText, Shield, ChevronRight, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'

const LEGAL_NAV = [
  { to: '/legal/mentions-legales', label: 'Mentions Légales', short: 'ML', icon: <Scale size={14} /> },
  { to: '/legal/cgu', label: "Conditions Générales d'Utilisation", short: 'CGU', icon: <FileText size={14} /> },
  { to: '/legal/confidentialite', label: 'Politique de Confidentialité', short: 'PC', icon: <Shield size={14} /> },
]

interface Props {
  title: string
  subtitle: string
  lastUpdated: string
  version?: string
  children: ReactNode
}

export default function LegalLayout({ title, subtitle, lastUpdated, version = 'v1.0', children }: Props) {
  const { pathname } = useLocation()
  const current = LEGAL_NAV.find(n => n.to === pathname)

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--ink-1)' }}>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(180deg, var(--ink-2) 0%, var(--ink-1) 100%)',
        borderBottom: '1px solid var(--border-gold)',
        padding: '40px 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: '100%', background: 'radial-gradient(ellipse at 80% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="wrap" style={{ padding: '0 24px', position: 'relative' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 12, color: 'var(--text-3)' }}>
            <Link to="/"
              style={{ color: 'var(--text-3)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            >Accueil</Link>
            <ChevronRight size={11} />
            <span style={{ color: 'var(--gold-600)' }}>Légal</span>
            {current && <><ChevronRight size={11} /><span style={{ color: 'var(--text-2)' }}>{current.short}</span></>}
          </nav>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--r-md)', flexShrink: 0,
                  background: 'rgba(212,160,23,0.1)', border: '1px solid var(--border-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-400)',
                }}>
                  {current?.icon ?? <Scale size={20} />}
                </div>
                <div>
                  <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 3 }}>
                    Eagle Groupe · eagle-groupe.tn · {version}
                  </p>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2,
                  }}>{title}</h1>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6, maxWidth: 640 }}>{subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Mise à jour : {lastUpdated}</span>
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-3)' }} />
                <a
                  href="https://eagle-groupe.tn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: 'var(--gold-600)', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-600)'}
                >
                  eagle-groupe.tn <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Domain trust badge */}
            <div style={{
              padding: '12px 16px',
              background: 'rgba(212,160,23,0.05)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--r-lg)',
              textAlign: 'center',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>Plateforme Vérifiée</span>
              </div>
              <p style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1.5 }}>
                Droits d'auteur déposés<br />INPDP Conforme · Loi n°2004-63
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="wrap" style={{ padding: '36px 24px 64px', display: 'grid', gap: 32, gridTemplateColumns: '200px 1fr', alignItems: 'start' }}>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 80 }}>
          <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 10 }}>Documents Légaux</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {LEGAL_NAV.map(({ to, label, icon }) => {
              const active = pathname === to
              return (
                <Link key={to} to={to}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '9px 12px', borderRadius: 'var(--r-md)', fontSize: 12.5,
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--gold-400)' : 'var(--text-2)',
                    background: active ? 'rgba(212,160,23,0.08)' : 'transparent',
                    border: `1px solid ${active ? 'var(--border-gold)' : 'transparent'}`,
                    transition: 'all 0.18s', textDecoration: 'none',
                  }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'var(--surf-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-1)' } }}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)' } }}
                >
                  <span style={{ color: active ? 'var(--gold-400)' : 'var(--text-3)', flexShrink: 0 }}>{icon}</span>
                  <span style={{ lineHeight: 1.3 }}>{label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Certificate block */}
          <div style={{
            marginTop: 20, padding: '14px',
            background: 'var(--surf-1)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--r-lg)',
          }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 6 }}>
              Droits d'auteur déposés
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.6, marginBottom: 10 }}>
              Code source React/Vite · Animations 4K · Identité visuelle · Branding
            </p>
            <div style={{ height: 1, background: 'var(--border-gold)', marginBottom: 10 }} />
            <a
              href="https://eagle-groupe.tn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 10, color: 'var(--gold-600)', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-600)'}
            >
              eagle-groupe.tn <ExternalLink size={9} />
            </a>
          </div>

          {/* Back to site */}
          <Link to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 6, marginTop: 12,
              padding: '8px 12px', borderRadius: 'var(--r-md)', fontSize: 12,
              color: 'var(--text-3)', border: '1px solid var(--border-white)',
              background: 'transparent', transition: 'all 0.18s', textDecoration: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-white)' }}
          >
            ← Retour à l'accueil
          </Link>
        </aside>

        {/* Main content */}
        <main style={{
          background: 'var(--surf-1)',
          border: '1px solid var(--border-white)',
          borderRadius: 'var(--r-xl)',
          padding: 'clamp(24px, 5vw, 48px)',
          minWidth: 0,
        }}>
          {children}

          {/* Bottom cross-links */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border-white)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Voir aussi :</span>
            {LEGAL_NAV.filter(n => n.to !== pathname).map(n => (
              <Link key={n.to} to={n.to}
                style={{ fontSize: 12, color: 'var(--gold-600)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-600)'}
              >{n.label}</Link>
            ))}
          </div>
        </main>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 720px) {
          .wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
