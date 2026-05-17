import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, ChefHat } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'

type Mode = 'signin' | 'signup'
type Role = 'customer' | 'partner'

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin')
  const [role, setRole] = useState<Role>('customer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setProfile } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.user) {
          await (supabase as any).from('profiles').insert({ id: data.user.id, email, full_name: fullName, role })
          const { data: prof } = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle()
          setUser(data.user)
          setProfile(prof as any)
          toast.success('Welcome to The Eagle TN!')
          navigate(role === 'partner' ? '/dashboard' : '/restaurants')
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (data.user) {
          const { data: prof } = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle()
          setUser(data.user)
          setProfile(prof as any)
          const profRole = (prof as { role?: string } | null)?.role
          toast.success('Welcome back!')
          navigate(profRole === 'partner' ? '/dashboard' : '/restaurants')
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80, background: 'var(--ink-1)' }}>
      <div style={{ position: 'fixed', top: '20%', left: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, padding: '0 16px' }}>
        <div style={{ background: 'var(--surf-1)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-2xl)', padding: '40px 36px', boxShadow: 'var(--shadow-deep)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: 'var(--ink-1)', margin: '0 auto 16px', boxShadow: 'var(--gold-glow)' }}>E</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>{mode === 'signin' ? 'Welcome Back' : 'Join The Eagle'}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-3)' }}>{mode === 'signin' ? 'Sign in to your account' : 'Create your account today'}</p>
          </div>

          <div style={{ display: 'flex', background: 'var(--surf-2)', borderRadius: 'var(--r-sm)', padding: 3, marginBottom: 28 }}>
            {(['signin', 'signup'] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '9px 0', borderRadius: 'var(--r-xs)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: mode === m ? 'var(--surf-4)' : 'transparent', color: mode === m ? 'var(--text-1)' : 'var(--text-3)', border: mode === m ? '1px solid var(--border-gold)' : '1px solid transparent', transition: 'all 0.2s' }}>{m === 'signin' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <>
                <Input label="Full Name" placeholder="Your name" value={fullName} onChange={e => setFullName(e.target.value)} icon={<User size={15} />} required />
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-2)', display: 'block', marginBottom: 8 }}>I am a...</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {([['customer', 'Customer', <User size={20} />], ['partner', 'Restaurant Partner', <ChefHat size={20} />]] as [Role, string, React.ReactNode][]).map(([r, label, icon]) => (
                      <button type="button" key={r} onClick={() => setRole(r)} style={{ padding: '12px 8px', borderRadius: 'var(--r-md)', textAlign: 'center', border: `1px solid ${role === r ? 'var(--border-gold-h)' : 'var(--border-white)'}`, background: role === r ? 'rgba(212,160,23,0.1)' : 'var(--surf-2)', color: role === r ? 'var(--gold-400)' : 'var(--text-3)', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        {icon}
                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em' }}>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail size={15} />} required />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} icon={<Lock size={15} />} required />
            <Button type="submit" loading={loading} fullWidth size="lg" style={{ marginTop: 8 }}>{mode === 'signin' ? 'Sign In' : 'Create Account'}</Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-3)' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} style={{ color: 'var(--gold-400)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>{mode === 'signin' ? 'Sign up' : 'Sign in'}</button>
          </p>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-3)' }}>
          <Link to="/" style={{ color: 'var(--text-3)' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
