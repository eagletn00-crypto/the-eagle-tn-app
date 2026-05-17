interface Props {
  fullPage?: boolean
}

export default function LoadingSpinner({ fullPage = true }: Props) {
  const spinner = (
    <div style={{ width: 36, height: 36, border: '3px solid var(--border-gold)', borderTopColor: 'var(--gold-400)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  )
  if (!fullPage) return spinner
  return (
    <div style={{ paddingTop: 88, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {spinner}
    </div>
  )
}
