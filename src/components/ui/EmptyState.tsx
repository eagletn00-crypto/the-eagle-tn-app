import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  description?: string
}

export default function EmptyState({ icon, title, description }: Props) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
      <div style={{ margin: '0 auto 16px', opacity: 0.4 }}>{icon}</div>
      <p style={{ fontSize: 15, marginBottom: description ? 6 : 0 }}>{title}</p>
      {description && <p style={{ fontSize: 13 }}>{description}</p>}
    </div>
  )
}
