import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipboardList, Clock, CheckCircle2, Truck, ChefHat, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { Order, OrderItem, MenuItem, Restaurant } from '../lib/database.types'
import Badge from '../components/ui/Badge'

type OrderStatus = Order['status']

const STATUS_STEPS: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered']

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: 'amber' | 'blue' | 'gold' | 'green' | 'red' | 'neutral'; icon: React.ReactNode }> = {
  pending:    { label: 'Pending',    color: 'amber', icon: <Clock size={14} /> },
  confirmed:  { label: 'Confirmed',  color: 'blue',  icon: <CheckCircle2 size={14} /> },
  preparing:  { label: 'Preparing',  color: 'gold',  icon: <ChefHat size={14} /> },
  ready:      { label: 'Ready',      color: 'gold',  icon: <CheckCircle2 size={14} /> },
  delivering: { label: 'Delivering', color: 'blue',  icon: <Truck size={14} /> },
  delivered:  { label: 'Delivered',  color: 'green', icon: <CheckCircle2 size={14} /> },
  cancelled:  { label: 'Cancelled',  color: 'red',   icon: <XCircle size={14} /> },
}

interface FullOrder extends Order {
  restaurant: Restaurant | null
  items: (OrderItem & { menu_item: MenuItem | null })[]
}

export default function OrdersPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<FullOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    supabase.from('orders').select('*, restaurant:restaurants(*), items:order_items(*, menu_item:menu_items(*))').eq('customer_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => { setOrders((data as any[]) || []); setLoading(false) })
  }, [user])

  if (loading) return (
    <div style={{ paddingTop: 88, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--border-gold)', borderTopColor: 'var(--gold-400)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  if (orders.length === 0) return (
    <div style={{ paddingTop: 88, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '88px 24px 40px' }}>
      <ClipboardList size={64} color="var(--text-3)" style={{ marginBottom: 20 }} />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-1)', marginBottom: 10 }}>No orders yet</h2>
      <p style={{ fontSize: 15, color: 'var(--text-3)', marginBottom: 32 }}>Your order history will appear here.</p>
      <Link to="/restaurants"><Button>Browse Restaurants</Button></Link>
    </div>
  )

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '40px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--text-1)', marginBottom: 32 }}>My Orders</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {orders.map(order => {
            const cfg = STATUS_CONFIG[order.status]
            const progress = order.status === 'cancelled' ? 0 : ((STATUS_STEPS.indexOf(order.status) + 1) / STATUS_STEPS.length) * 100
            return (
              <div key={order.id} style={{ background: 'var(--surf-1)', border: '1px solid var(--border-white)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
                <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border-white)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Order #{order.id.slice(0, 8).toUpperCase()}</p>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{order.restaurant?.name || 'Restaurant'}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Badge color={cfg.color}>{cfg.icon}&nbsp;{cfg.label}</Badge>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-400)' }}>{order.total_amount.toFixed(2)} TND</span>
                  </div>
                </div>
                {order.status !== 'cancelled' && (
                  <div style={{ padding: '12px 22px', background: 'var(--surf-2)', borderBottom: '1px solid var(--border-white)' }}>
                    <div style={{ height: 4, background: 'var(--surf-4)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--gold-600), var(--gold-400))', borderRadius: 'var(--r-pill)', transition: 'width 0.5s ease' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      {STATUS_STEPS.map((s, i) => (
                        <span key={s} style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: i <= STATUS_STEPS.indexOf(order.status) ? 'var(--gold-500)' : 'var(--text-3)' }}>{STATUS_CONFIG[s].label}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ padding: '16px 22px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {order.items?.slice(0, 5).map(oi => (
                      <span key={oi.id} style={{ fontSize: 12, color: 'var(--text-2)', background: 'var(--surf-2)', padding: '4px 10px', borderRadius: 'var(--r-pill)', border: '1px solid var(--border-white)' }}>{oi.quantity}× {oi.menu_item?.name || 'Item'}</span>
                    ))}
                    {(order.items?.length || 0) > 5 && <span style={{ fontSize: 12, color: 'var(--text-3)' }}>+{order.items.length - 5} more</span>}
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>{new Date(order.created_at).toLocaleDateString('en-TN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: '12px 28px', borderRadius: 'var(--r-sm)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', color: 'var(--ink-1)', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>{children}</button>
  )
}
