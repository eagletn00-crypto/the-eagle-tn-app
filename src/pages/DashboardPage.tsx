import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, UtensilsCrossed, Settings, TrendingUp, Clock, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { Restaurant, MenuItem, Order, OrderItem } from '../lib/database.types'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import toast from 'react-hot-toast'

const TERMINAL_STATUSES = ['delivered', 'cancelled'] as const

type Tab = 'overview' | 'orders' | 'menu' | 'settings'
type OrderStatus = Order['status']

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: 'amber' | 'blue' | 'gold' | 'green' | 'red' | 'neutral'; next?: OrderStatus }> = {
  pending:    { label: 'Pending',    color: 'amber', next: 'confirmed' },
  confirmed:  { label: 'Confirmed',  color: 'blue',  next: 'preparing' },
  preparing:  { label: 'Preparing',  color: 'gold',  next: 'ready' },
  ready:      { label: 'Ready',      color: 'gold',  next: 'delivering' },
  delivering: { label: 'Delivering', color: 'blue',  next: 'delivered' },
  delivered:  { label: 'Delivered',  color: 'green' },
  cancelled:  { label: 'Cancelled',  color: 'red' },
}

interface FullOrder extends Order {
  items: (OrderItem & { menu_item: MenuItem | null })[]
}

export default function DashboardPage() {
  const { user, profile } = useAuthStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('overview')
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [orders, setOrders] = useState<FullOrder[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    if (profile && profile.role !== 'partner' && profile.role !== 'admin') { navigate('/'); return }
    loadData()
  }, [user, profile])

  async function loadData() {
    if (!user) return
    setLoading(true)
    try {
      const { data: rest } = await (supabase as any).from('restaurants').select('*').eq('owner_id', user.id).maybeSingle()
      const restData = rest as Restaurant | null
      setRestaurant(restData)
      if (restData) {
        const [{ data: ords }, { data: items }] = await Promise.all([
          (supabase as any).from('orders').select('*, items:order_items(*, menu_item:menu_items(*))').eq('restaurant_id', restData.id).order('created_at', { ascending: false }).limit(50),
          (supabase as any).from('menu_items').select('*').eq('restaurant_id', restData.id).order('display_order'),
        ])
        setOrders((ords as FullOrder[]) || [])
        setMenuItems((items as MenuItem[]) || [])
      }
    } finally {
      setLoading(false)
    }
  }

  async function refresh() {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
    toast.success('Dashboard refreshed')
  }

  async function advanceOrderStatus(orderId: string, nextStatus: OrderStatus) {
    await (supabase as any).from('orders').update({ status: nextStatus }).eq('id', orderId)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o))
    toast.success(`Order → ${STATUS_CONFIG[nextStatus].label}`)
  }

  async function toggleItemAvailability(item: MenuItem) {
    await (supabase as any).from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id)
    setMenuItems(prev => prev.map(i => i.id === item.id ? { ...i, is_available: !i.is_available } : i))
  }

  const activeOrders = orders.filter(o => !TERMINAL_STATUSES.includes(o.status as typeof TERMINAL_STATUSES[number]))
  const completedOrders = orders.filter(o => o.status === 'delivered')
  const totalRevenue = completedOrders.reduce((s, o) => s + o.total_amount, 0)

  if (loading) return <LoadingSpinner />

  const TABS: [Tab, string, React.ReactNode][] = [
    ['overview', 'Overview', <LayoutDashboard size={14} />],
    ['orders', `Orders${activeOrders.length > 0 ? ` (${activeOrders.length})` : ''}`, <ClipboardList size={14} />],
    ['menu', 'Menu', <UtensilsCrossed size={14} />],
    ['settings', 'Settings', <Settings size={14} />],
  ]

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--surf-1)', borderBottom: '1px solid var(--border-white)', padding: '28px 0 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 4 }}>Partner Dashboard</p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text-1)' }}>{restaurant?.name || 'Your Restaurant'}</h1>
              {restaurant?.city && <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 3 }}>{restaurant.city}</p>}
            </div>
            <button onClick={refresh} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-white)', background: 'transparent', color: 'var(--text-2)', fontSize: 12, cursor: 'pointer' }}>
              <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} /> Refresh
            </button>
          </div>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-white)' }}>
            {TABS.map(([t, label, icon]) => (
              <button key={t} onClick={() => setTab(t)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', fontSize: 13, fontWeight: tab === t ? 600 : 400, color: tab === t ? 'var(--gold-400)' : 'var(--text-2)', borderBottom: `2px solid ${tab === t ? 'var(--gold-400)' : 'transparent'}`, background: 'transparent', marginBottom: -1, transition: 'all 0.2s' }}>
                {icon}{label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="wrap" style={{ padding: '32px 24px' }}>
        {!restaurant ? (
          <SetupFlow userId={user!.id} onCreated={loadData} />
        ) : (
          <>
            {tab === 'overview' && <OverviewTab activeOrders={activeOrders} completedOrders={completedOrders} totalRevenue={totalRevenue} menuItems={menuItems} orders={orders} />}
            {tab === 'orders' && <OrdersTab orders={orders} onAdvance={advanceOrderStatus} />}
            {tab === 'menu' && <MenuTab items={menuItems} onToggle={toggleItemAvailability} />}
            {tab === 'settings' && <SettingsTab restaurant={restaurant} onSave={loadData} />}
          </>
        )}
      </div>

      {/* Legal footer */}
      <div style={{ borderTop: '1px solid var(--border-white)', marginTop: 40 }}>
        <div className="wrap" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>© {new Date().getFullYear()} Eagle Groupe · eagle-groupe.tn · Droits d'auteur déposés.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {([['Mentions Légales', '/legal/mentions-legales'], ['CGU', '/legal/cgu'], ['Confidentialité', '/legal/confidentialite']] as const).map(([label, to]) => (
              <Link
                key={to}
                to={to}
                style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-400)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ activeOrders, completedOrders, totalRevenue, menuItems, orders }: { activeOrders: FullOrder[]; completedOrders: FullOrder[]; totalRevenue: number; menuItems: MenuItem[]; orders: FullOrder[] }) {
  const stats = [
    { label: 'Active Orders', value: activeOrders.length, color: 'var(--amber)', icon: <Clock size={18} /> },
    { label: 'Completed Today', value: completedOrders.length, color: 'var(--green)', icon: <CheckCircle2 size={18} /> },
    { label: 'Total Revenue', value: `${totalRevenue.toFixed(0)} TND`, color: 'var(--gold-400)', icon: <TrendingUp size={18} /> },
    { label: 'Menu Items', value: menuItems.length, color: 'var(--blue)', icon: <UtensilsCrossed size={18} /> },
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        {stats.map(s => (
          <div key={s.label} style={{ padding: '22px 24px', borderRadius: 'var(--r-xl)', background: 'var(--surf-1)', border: '1px solid var(--border-white)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</span>
              <div style={{ color: s.color }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>{s.value}</div>
          </div>
        ))}
      </div>
      {activeOrders.length > 0 && (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 16 }}>Active Orders</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeOrders.slice(0, 5).map(order => <OrderRow key={order.id} order={order} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function OrdersTab({ orders, onAdvance }: { orders: FullOrder[]; onAdvance: (id: string, s: OrderStatus) => void }) {
  const [filter, setFilter] = useState<'active' | 'all'>('active')
  const shown = filter === 'active' ? orders.filter(o => !TERMINAL_STATUSES.includes(o.status as typeof TERMINAL_STATUSES[number])) : orders
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['active', 'all'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: 'var(--r-pill)', fontSize: 12, fontWeight: 600, border: `1px solid ${filter === f ? 'var(--border-gold-h)' : 'var(--border-white)'}`, background: filter === f ? 'rgba(212,160,23,0.1)' : 'transparent', color: filter === f ? 'var(--gold-400)' : 'var(--text-3)', textTransform: 'capitalize' }}>
            {f === 'active' ? 'Active Orders' : 'All Orders'}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <EmptyState icon={<ClipboardList size={48} />} title="Aucune commande à afficher" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {shown.map(order => <OrderRow key={order.id} order={order} onAdvance={onAdvance} />)}
        </div>
      )}
    </div>
  )
}

function OrderRow({ order, onAdvance }: { order: FullOrder; onAdvance?: (id: string, s: OrderStatus) => void }) {
  const cfg = STATUS_CONFIG[order.status]
  return (
    <div style={{ padding: '18px 22px', borderRadius: 'var(--r-lg)', background: 'var(--surf-1)', border: '1px solid var(--border-white)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em' }}>#{order.id.slice(0, 8).toUpperCase()}</span>
          <Badge color={cfg.color}>{cfg.label}</Badge>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {order.items?.slice(0, 4).map(oi => <span key={oi.id} style={{ fontSize: 12, color: 'var(--text-2)' }}>{oi.quantity}× {oi.menu_item?.name}</span>)}
          {(order.items?.length || 0) > 4 && <span style={{ fontSize: 12, color: 'var(--text-3)' }}>+{order.items.length - 4} more</span>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold-400)' }}>{order.total_amount.toFixed(2)} TND</span>
        {onAdvance && cfg.next && (
          <Button size="sm" variant="outline" onClick={() => onAdvance(order.id, cfg.next!)}>→ {STATUS_CONFIG[cfg.next].label}</Button>
        )}
      </div>
    </div>
  )
}

function MenuTab({ items, onToggle }: { items: MenuItem[]; onToggle: (item: MenuItem) => void }) {
  return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24 }}>{items.length} menu item{items.length !== 1 ? 's' : ''}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', borderRadius: 'var(--r-lg)', background: 'var(--surf-1)', border: '1px solid var(--border-white)', opacity: item.is_available ? 1 : 0.6 }}>
            {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', objectFit: 'cover', flexShrink: 0 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>{item.name}</h4>
              <p style={{ fontSize: 12, color: 'var(--text-3)' }}>{item.price.toFixed(2)} TND</p>
            </div>
            <button onClick={() => onToggle(item)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 'var(--r-sm)', border: `1px solid ${item.is_available ? 'var(--border-gold)' : 'var(--border-white)'}`, background: 'transparent', color: item.is_available ? 'var(--gold-400)' : 'var(--text-3)', fontSize: 12, fontWeight: 600 }}>
              {item.is_available ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
              {item.is_available ? 'Available' : 'Hidden'}
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <EmptyState icon={<UtensilsCrossed size={48} />} title="Aucun article pour l'instant" />
        )}
      </div>
    </div>
  )
}

function SettingsTab({ restaurant, onSave }: { restaurant: Restaurant; onSave: () => void }) {
  const [name, setName] = useState(restaurant.name)
  const [description, setDescription] = useState(restaurant.description || '')
  const [phone, setPhone] = useState(restaurant.phone || '')
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await (supabase as any).from('restaurants').update({ name, description, phone }).eq('id', restaurant.id)
    setSaving(false)
    if (error) toast.error('Failed to save')
    else { toast.success('Settings saved'); onSave() }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Restaurant settings form */}
      <div style={{ maxWidth: 560 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', marginBottom: 24 }}>Paramètres du Restaurant</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Nom du Restaurant" value={name} onChange={e => setName(e.target.value)} required />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ background: 'var(--surf-2)', border: '1px solid var(--border-white)', borderRadius: 'var(--r-sm)', color: 'var(--text-1)', fontSize: 14, padding: '10px 14px', resize: 'vertical', fontFamily: 'var(--font-sans)', outline: 'none' }} onFocus={e => e.currentTarget.style.borderColor = 'var(--border-gold-h)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border-white)'} />
          </div>
          <Input label="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
          <Button type="submit" loading={saving} style={{ alignSelf: 'flex-start' }}>Enregistrer</Button>
        </form>
      </div>

      {/* Legal section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-white)' }}>
          <div style={{ width: 26, height: 26, borderRadius: 'var(--r-sm)', background: 'rgba(212,160,23,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={13} style={{ color: 'var(--gold-500)' }} />
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>Informations Légales</h2>
        </div>

        {/* Copyright certificate */}
        <div style={{ padding: '16px 18px', background: 'rgba(212,160,23,0.05)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-lg)', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Settings size={16} color="#000" />
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 3 }}>
              Certificat de Droits d'Auteur Déposés
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>
              Eagle Groupe · <strong style={{ color: 'var(--text-2)' }}>eagle-groupe.tn</strong> · Code source React/Vite, animations 4K, identité visuelle et branding protégés · Loi n°94-36 &amp; Convention de Berne
            </p>
          </div>
        </div>

        {/* Legal links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          {([
            ['Mentions Légales', '/legal/mentions-legales', 'Éditeur, propriété intellectuelle, INPDP'],
            ["Conditions d'Utilisation", '/legal/cgu', 'CGU, IP code source & animations 4K'],
            ['Confidentialité', '/legal/confidentialite', 'Données personnelles, INPDP, localisation'],
          ] as const).map(([label, to, desc]) => (
            <Link key={to} to={to} style={{
              display: 'block', padding: '14px 16px',
              background: 'var(--surf-2)', border: '1px solid var(--border-white)',
              borderRadius: 'var(--r-lg)', textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'; (e.currentTarget as HTMLElement).style.background = 'var(--surf-3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-white)'; (e.currentTarget as HTMLElement).style.background = 'var(--surf-2)' }}
            >
              <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--gold-400)', marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>{desc}</p>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: 14, fontSize: 11, color: 'var(--text-3)' }}>
          Pour toute question légale : <a href="mailto:legal@eagle-groupe.tn" style={{ color: 'var(--gold-600)' }}>legal@eagle-groupe.tn</a>
        </p>
      </div>
    </div>
  )
}

function SetupFlow({ userId, onCreated }: { userId: string; onCreated: () => void }) {
  const [name, setName] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [city, setCity] = useState('')
  const [creating, setCreating] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    const { error } = await (supabase as any).from('restaurants').insert({ owner_id: userId, name, cuisine_type: cuisine, city, is_open: true })
    setCreating(false)
    if (error) toast.error('Failed to create restaurant')
    else { toast.success('Restaurant created!'); onCreated() }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: '60px 0' }}>
      <div style={{ width: 64, height: 64, borderRadius: 'var(--r-xl)', background: 'rgba(212,160,23,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--gold-400)' }}>
        <AlertCircle size={28} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-1)', marginBottom: 10 }}>Set Up Your Restaurant</h2>
      <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 32 }}>Create a restaurant profile to start receiving orders on The Eagle TN.</p>
      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
        <Input label="Restaurant Name" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Dar Zitouna" />
        <Input label="Cuisine Type" value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="e.g. Tunisian" />
        <Input label="City" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Tunis" />
        <Button type="submit" loading={creating} fullWidth size="lg" style={{ marginTop: 8 }}>Create Restaurant Profile</Button>
      </form>
    </div>
  )
}
