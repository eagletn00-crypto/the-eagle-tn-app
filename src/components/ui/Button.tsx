import { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'gold' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
  fullWidth?: boolean
}

const base: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
  borderRadius: 'var(--r-sm)', border: '1px solid transparent',
  transition: 'all 0.2s ease', cursor: 'pointer', whiteSpace: 'nowrap',
}

const variants: Record<Variant, CSSProperties> = {
  gold:    { background: 'linear-gradient(135deg, var(--gold-500) 0%, var(--gold-400) 100%)', color: 'var(--ink-1)', borderColor: 'var(--gold-400)', boxShadow: 'var(--gold-glow-sm)' },
  outline: { background: 'transparent', color: 'var(--gold-400)', borderColor: 'var(--border-gold-h)' },
  ghost:   { background: 'transparent', color: 'var(--text-2)', borderColor: 'transparent' },
  danger:  { background: 'rgba(239,68,68,0.12)', color: 'var(--red)', borderColor: 'rgba(239,68,68,0.3)' },
}

const sizes: Record<Size, CSSProperties> = {
  sm: { fontSize: 11, padding: '6px 14px', height: 32 },
  md: { fontSize: 12, padding: '10px 22px', height: 40 },
  lg: { fontSize: 13, padding: '14px 32px', height: 48 },
}

export default function Button({ variant = 'gold', size = 'md', loading = false, fullWidth = false, children, style, disabled, ...rest }: Props) {
  return (
    <button {...rest} disabled={disabled || loading} style={{ ...base, ...variants[variant], ...sizes[size], ...(fullWidth ? { width: '100%' } : {}), ...(disabled || loading ? { opacity: 0.5, cursor: 'not-allowed' } : {}), ...style }}>
      {loading && <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />}
      {children}
    </button>
  )
}
