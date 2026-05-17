import { CSSProperties, ReactNode } from 'react'

type Color = 'gold' | 'green' | 'amber' | 'red' | 'blue' | 'neutral'

interface Props { color?: Color; children: ReactNode; style?: CSSProperties }

const colors: Record<Color, CSSProperties> = {
  gold:    { background: 'rgba(212,160,23,0.15)', color: 'var(--gold-400)', borderColor: 'var(--border-gold)' },
  green:   { background: 'var(--green-bg)', color: 'var(--green)', borderColor: 'rgba(34,197,94,0.25)' },
  amber:   { background: 'var(--amber-bg)', color: 'var(--amber)', borderColor: 'rgba(245,158,11,0.25)' },
  red:     { background: 'var(--red-bg)', color: 'var(--red)', borderColor: 'rgba(239,68,68,0.25)' },
  blue:    { background: 'var(--blue-bg)', color: 'var(--blue)', borderColor: 'rgba(59,130,246,0.25)' },
  neutral: { background: 'var(--surf-3)', color: 'var(--text-2)', borderColor: 'var(--border-white)' },
}

export default function Badge({ color = 'neutral', children, style }: Props) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 'var(--r-pill)', border: '1px solid', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', ...colors[color], ...style }}>
      {children}
    </span>
  )
}
