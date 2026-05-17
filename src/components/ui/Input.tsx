import { InputHTMLAttributes, ReactNode, CSSProperties } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  wrapStyle?: CSSProperties
}

export default function Input({ label, error, icon, wrapStyle, style, ...rest }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...wrapStyle }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-2)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', display: 'flex', pointerEvents: 'none' }}>{icon}</span>}
        <input {...rest} style={{ width: '100%', height: 44, background: 'var(--surf-2)', border: `1px solid ${error ? 'var(--red)' : 'var(--border-white)'}`, borderRadius: 'var(--r-sm)', color: 'var(--text-1)', fontSize: 14, padding: icon ? '0 14px 0 40px' : '0 14px', outline: 'none', transition: 'border-color 0.2s', ...style }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--border-gold-h)' }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--border-white)' }} />
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--red)' }}>{error}</span>}
    </div>
  )
}
