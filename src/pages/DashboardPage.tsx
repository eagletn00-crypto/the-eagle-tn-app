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
      const { data: restData, error: restError } = await (supabase as any)
        .from('restaurants')
        .select('*, menu_items(*), orders(*, order_items(*, menu_items(*)))')
        .eq('owner_id', user.id)
        .maybeSingle()

      if (restError) throw restError
      
      setRestaurant(restData)
      if (restData) {
        setOrders((restData.orders as FullOrder[]) || [])
        setMenuItems((restData.menu_items as MenuItem[]) || [])
      }
    } catch (err) {
      console.error("Error loading data:", err)
      toast.error('Failed to load data')
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
    const { error } = await (supabase as any).from('orders').update({ status: nextStatus }).eq('id', orderId)
    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o))
      toast.success(`Order → ${STATUS_CONFIG[nextStatus].label}`)
    } else {
      toast.error('Failed to update status')
    }
  }

  async function toggleItemAvailability(item: MenuItem) {
    const { error } = await (supabase as any).from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id)
    if (!error) {
      setMenuItems(prev => prev.map(i => i.id === item.id ? { ...i, is_available: !i.is_available } : i))
    }
  }

  const activeOrders = orders.filter(o => !TERMINAL_STATUSES.includes(o.status as typeof TERMINAL_STATUSES[number]))
  const completedOrders = orders.filter(o => o.status === 'delivered')
  const totalRevenue = completedOrders.reduce((s, o) => s + (o.total_amount || 0), 0)

  if (loading) return <LoadingSpinner />

  const TABS: [Tab, string, React.ReactNode][] = [
    ['overview', 'Overview', <LayoutDashboard size={14} />],
    ['orders', `Orders${activeOrders.length > 0 ? ` (${activeOrders.length})` : ''}`, <ClipboardList size={14} />],
    ['menu', 'Menu', <UtensilsCrossed size={14} />],
    ['settings', 'Settings', <Settings size={14} />],
  ]

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div style={{ background: 'var(--surf-1)', borderBottom: '1px solid var(--border-white)', padding: '28px 0 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 4 }}>Partner Dashboard</p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text-1)' }}>{restaurant?.name || 'Your Restaurant'}</h1>
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
    </div>
  )
}

