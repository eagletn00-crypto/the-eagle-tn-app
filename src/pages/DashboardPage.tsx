import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, Settings, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { Restaurant, MenuItem, Order, OrderItem } from '../lib/database.types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
// تأكد من وجود هذه الملفات في مساراتها الصحيحة
import SetupFlow from '../components/SetupFlow';
import OverviewTab from '../components/OverviewTab';
import OrdersTab from '../components/OrdersTab';
import MenuTab from '../components/MenuTab';
import SettingsTab from '../components/SettingsTab';

type Tab = 'overview' | 'orders' | 'menu' | 'settings';
type OrderStatus = Order['status'];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: 'amber' | 'blue' | 'gold' | 'green' | 'red' | 'neutral' }> = {
  pending:    { label: 'Pending',    color: 'amber' },
  confirmed:  { label: 'Confirmed',  color: 'blue' },
  preparing:  { label: 'Preparing',  color: 'gold' },
  ready:      { label: 'Ready',      color: 'gold' },
  delivering: { label: 'Delivering', color: 'blue' },
  delivered:  { label: 'Delivered',  color: 'green' },
  cancelled:  { label: 'Cancelled',  color: 'red' },
};

interface FullOrder extends Order {
  items: (OrderItem & { menu_item: MenuItem | null })[];
}

export default function DashboardPage() {
  const { user, profile } = useAuthStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    if (profile && profile.role !== 'partner' && profile.role !== 'admin') { navigate('/'); return; }
    loadData();
  }, [user, profile, navigate]);

  async function loadData() {
    if (!user) return;
    setLoading(true);
    try {
      const { data: restData, error: restError } = await (supabase as any)
        .from('restaurants')
        .select(`*, menu_items(*), orders(*, order_items(*, menu_items(*)))`)
        .eq('owner_id', user.id)
        .maybeSingle();

      if (restError) throw restError;
      
      setRestaurant(restData);
      if (restData) {
        setOrders((restData.orders as FullOrder[]) || []);
        setMenuItems((restData.menu_items as MenuItem[]) || []);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
    toast.success('Dashboard refreshed');
  }

  async function advanceOrderStatus(orderId: string, nextStatus: OrderStatus) {
    const { error } = await (supabase as any).from('orders').update({ status: nextStatus }).eq('id', orderId);
    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
      toast.success(`Order → ${STATUS_CONFIG[nextStatus].label}`);
    } else {
      toast.error('Failed to update status');
    }
  }

  async function toggleItemAvailability(item: MenuItem) {
    const { error } = await (supabase as any).from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id);
    if (!error) {
      setMenuItems(prev => prev.map(i => i.id === item.id ? { ...i, is_available: !i.is_available } : i));
    }
  }

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const totalRevenue = completedOrders.reduce((s, o) => s + (Number(o.total_amount) || 0), 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div style={{ background: 'var(--surf-1)', borderBottom: '1px solid var(--border-white)', padding: '28px 0 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold-600)' }}>PARTNER DASHBOARD</p>
              <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{restaurant?.name || 'Your Restaurant'}</h1>
            </div>
            <button onClick={refresh} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', border: '1px solid var(--border-white)', background: 'transparent', cursor: 'pointer' }}>
              <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} /> Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ padding: '32px 24px' }}>
        {!restaurant ? <SetupFlow userId={user!.id} onCreated={loadData} /> : (
          <>
            {tab === 'overview' && <OverviewTab activeOrders={activeOrders} completedOrders={completedOrders} totalRevenue={totalRevenue} menuItems={menuItems} orders={orders} />}
            {tab === 'orders' && <OrdersTab orders={orders} onAdvance={advanceOrderStatus} />}
            {tab === 'menu' && <MenuTab items={menuItems} onToggle={toggleItemAvailability} />}
            {tab === 'settings' && <SettingsTab restaurant={restaurant} onSave={loadData} />}
          </>
        )}
      </div>
    </div>
  );
}
