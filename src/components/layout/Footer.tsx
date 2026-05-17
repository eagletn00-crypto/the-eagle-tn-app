import { Link } from 'react-router-dom'
import { ShieldCheck, ExternalLink } from 'lucide-react'

const NAV_LINKS = {
  Explorer: [['Restaurants', '/restaurants'], ['Mes Commandes', '/orders'], ['Panier', '/cart']],
  Partenaires: [['Tableau de Bord', '/dashboard'], ['Inscription', '/auth']],
  Légal: [['Mentions Légales', '/legal/mentions-legales'], ["CGU", '/legal/cgu'], ['Confidentialité', '/legal/confidentialite']],
}

const LEGAL_LINKS = [
  ['Mentions Légales', '/legal/mentions-legales'],
  ['CGU', '/legal/cgu'],
  ['Confidentialité', '/legal/confidentialite'],
] as const

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink-1)', borderTop: '1px solid var(--border-gold)', marginTop: 'auto' }}>
      <div className="wrap" style={{ padding: '48px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 'var(--r-sm)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: 'var(--ink-1)' }}>E</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-1)' }}>The Eagle TN</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65, maxWidth: 230, marginBottom: 14 }}>
              Les meilleurs restaurants tunisiens, livrés avec élégance. Livraison premium pour les palais exigeants.
            </p>
            <a
              href="https://eagle-groupe.tn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: 'var(--gold-600)', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-600)'}
            >
              eagle-groupe.tn <ExternalLink size={9} />
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 14 }}>{section}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([label, to]) => (
                  <Link key={to} to={to}
                    style={{ fontSize: 13, color: 'var(--text-3)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 14 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'support@eagle-groupe.tn', href: 'mailto:support@eagle-groupe.tn' },
                { label: '+216 71 000 000', href: 'tel:+21671000000' },
                { label: 'Tunis, Tunisie', href: undefined },
              ].map(({ label, href }) =>
                href ? (
                  <a key={label} href={href}
                    style={{ fontSize: 13, color: 'var(--text-3)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                  >{label}</a>
                ) : (
                  <span key={label} style={{ fontSize: 13, color: 'var(--text-3)' }}>{label}</span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Certificate bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 20px',
          background: 'rgba(212,160,23,0.05)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--r-lg)',
          marginBottom: 24,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 12px rgba(212,160,23,0.25)' }}>
            <ShieldCheck size={18} color="#000" strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 2 }}>
              Certificat de Droits d'Auteur Déposés — Eagle Groupe
            </p>
            <p style={{ fontSize: 11.5, color: 'var(--text-3)', lineHeight: 1.5 }}>
              Interface 4K, animations cinématiques, code source React/Vite, identité visuelle &amp; branding strictement protégés ·{' '}
              <strong style={{ color: 'var(--text-2)' }}>eagle-groupe.tn</strong> · Loi tunisienne n°94-36 · Convention de Berne · INPDP Conforme
            </p>
          </div>
          <a
            href="https://eagle-groupe.tn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 10, color: 'var(--gold-600)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', flexShrink: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-600)'}
          >
            eagle-groupe.tn <ExternalLink size={9} />
          </a>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: '16px 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderTop: '1px solid var(--border-white)' }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} Eagle Groupe · <a href="https://eagle-groupe.tn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-700)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-700)'}>eagle-groupe.tn</a> · Droits d'auteur déposés. Tous droits réservés.
          </span>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {LEGAL_LINKS.map(([label, to]) => (
              <Link key={to} to={to}
                style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
