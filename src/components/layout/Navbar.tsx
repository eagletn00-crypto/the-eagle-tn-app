import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard, ClipboardList, ChevronDown } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const { user, profile, signOut } = useAuthStore()
  const count = useCartStore(s => s.count())
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setDropOpen(false) }, [location.pathname])

  async function handleSignOut() {
    await supabase.auth.signOut()
    signOut()
    toast.success('Signed out')
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64,
      display: 'flex', alignItems: 'center',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-gold)' : '1px solid transparent',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'var(--ink-1)', boxShadow: 'var(--gold-glow-sm)' }}>E</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
            The Eagle <span style={{ color: 'var(--gold-500)', fontSize: 12, fontFamily: 'var(--font-sans)', fontWeight: 400, letterSpacing: '0.1em' }}>TN</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <NavLink to="/restaurants">Restaurants</NavLink>
          {user && <NavLink to="/orders">My Orders</NavLink>}
          {profile?.role === 'partner' && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/cart" style={{ position: 'relative', padding: 8, borderRadius: 'var(--r-sm)', color: 'var(--text-2)', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-400)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
            <ShoppingCart size={20} />
            {count > 0 && (
              <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--gold-500)', color: 'var(--ink-1)', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>
            )}
          </Link>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-gold)', background: 'transparent', color: 'var(--text-1)', fontSize: 13 }}>
                <User size={15} color="var(--gold-400)" />
                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile?.full_name || user.email?.split('@')[0]}</span>
                <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none', color: 'var(--text-3)' }} />
              </button>
              {dropOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'var(--surf-2)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-md)', padding: 6, minWidth: 180, boxShadow: 'var(--shadow-card)', zIndex: 200 }}>
                  {profile?.role === 'partner' && <DropItem icon={<LayoutDashboard size={14} />} label="Dashboard" onClick={() => { navigate('/dashboard'); setDropOpen(false) }} />}
                  <DropItem icon={<ClipboardList size={14} />} label="My Orders" onClick={() => { navigate('/orders'); setDropOpen(false) }} />
                  <div style={{ height: 1, background: 'var(--border-white)', margin: '4px 0' }} />
                  <DropItem icon={<LogOut size={14} />} label="Sign Out" onClick={handleSignOut} danger />
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" style={{ padding: '8px 18px', borderRadius: 'var(--r-sm)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', color: 'var(--ink-1)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: 'var(--gold-glow-sm)' }}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const active = location.pathname.startsWith(to)
  return (
    <Link to={to} style={{ padding: '6px 14px', borderRadius: 'var(--r-sm)', fontSize: 13, fontWeight: 500, color: active ? 'var(--gold-400)' : 'var(--text-2)', background: active ? 'rgba(212,160,23,0.08)' : 'transparent', transition: 'all 0.2s' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-1)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-2)' }}>
      {children}
    </Link>
  )
}

function DropItem({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--r-sm)', color: danger ? 'var(--red)' : 'var(--text-2)', fontSize: 13, background: 'transparent', textAlign: 'left', transition: 'background 0.15s, color 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surf-3)'; e.currentTarget.style.color = danger ? 'var(--red)' : 'var(--text-1)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = danger ? 'var(--red)' : 'var(--text-2)' }}>
      {icon}{label}
    </button>
  )
}
