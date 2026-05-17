import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'

export function Section({ icon, title, children }: { icon?: ReactNode; title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 52 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border-gold)' }}>
        {icon && (
          <div style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', background: 'rgba(212,160,23,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-500)', flexShrink: 0 }}>
            {icon}
          </div>
        )}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3 }}>
          {title}
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  )
}

export function HighlightBox({ children, variant = 'gold' }: { children: ReactNode; variant?: 'gold' | 'warning' | 'info' }) {
  const styles = {
    gold:    { bg: 'rgba(212,160,23,0.07)',  border: 'var(--gold-500)',  color: 'var(--text-2)' },
    warning: { bg: 'rgba(239,68,68,0.06)',   border: 'var(--red)',       color: 'var(--text-2)' },
    info:    { bg: 'rgba(59,130,246,0.06)',  border: 'var(--blue)',      color: 'var(--text-2)' },
  }
  const s = styles[variant]
  return (
    <div style={{
      padding: '18px 20px',
      background: s.bg,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: '0 var(--r-md) var(--r-md) 0',
      color: s.color,
      fontSize: 13.5,
      lineHeight: 1.8,
    }}>
      {children}
    </div>
  )
}

export function InfoGrid({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginTop: 4 }}>
      {children}
    </div>
  )
}

export function InfoField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{
      padding: '11px 14px',
      background: highlight ? 'rgba(212,160,23,0.06)' : 'var(--surf-2)',
      borderRadius: 'var(--r-md)',
      border: `1px solid ${highlight ? 'var(--border-gold)' : 'var(--border-white)'}`,
    }}>
      <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 3 }}>{label}</p>
      <p style={{ fontSize: 12.5, color: highlight ? 'var(--gold-300)' : 'var(--text-1)', fontWeight: highlight ? 600 : 400 }}>{value}</p>
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.75 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold-600)', marginTop: 8, flexShrink: 0 }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--r-md)', border: '1px solid var(--border-white)', marginTop: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--surf-2)' }}>
            {headers.map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-600)', borderBottom: '1px solid var(--border-gold)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border-white)' : 'none' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 14px', color: j === 0 ? 'var(--text-1)' : 'var(--text-2)', fontWeight: j === 0 ? 600 : 400, background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent', verticalAlign: 'top', lineHeight: 1.6 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CertificateSeal() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '16px 20px',
      background: 'linear-gradient(135deg, rgba(212,160,23,0.08) 0%, rgba(212,160,23,0.04) 100%)',
      border: '1px solid var(--border-gold)',
      borderRadius: 'var(--r-lg)',
      marginBottom: 40,
    }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 16px rgba(212,160,23,0.3)' }}>
        <ShieldCheck size={22} color="#000" strokeWidth={2.5} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 2 }}>
          Certificat de Droits d'Auteur Déposés
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
          Eagle Groupe · <strong style={{ color: 'var(--text-2)' }}>eagle-groupe.tn</strong> · Code source, animations 4K, identité visuelle &amp; branding strictement protégés · Loi n°94-36 &amp; Convention de Berne
        </p>
      </div>
    </div>
  )
}
