import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, MapPin, ShoppingBag } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { entries, updateQty, removeItem, clearCart, total, restaurantId, restaurantName } = useCartStore()
  const { user } = useAuthStore()
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [placing, setPlacing] = useState(false)
  const navigate = useNavigate()

  const subtotal = total()
  const deliveryFee = 3.5
  const grandTotal = subtotal + deliveryFee

  async function handlePlaceOrder() {
    if (!user) { navigate('/auth'); return }
    if (!address.trim()) { toast.error('Please enter a delivery address'); return }
    if (!restaurantId) return
    setPlacing(true)
    try {
      const { data: order, error } = await (supabase as any).from('orders').insert({ customer_id: user.id, restaurant_id: restaurantId, status: 'pending', total_amount: grandTotal, delivery_fee: deliveryFee, delivery_address: address, delivery_notes: notes || null }).select().single()
      if (error) throw error
      await (supabase as any).from('order_items').insert(entries.map(e => ({ order_id: order.id, menu_item_id: e.item.id, quantity: e.quantity, unit_price: e.item.price, subtotal: e.item.price * e.quantity })))
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/orders')
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  if (entries.length === 0) return (
    <div style={{ paddingTop: 88, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '88px 24px 40px' }}>
      <ShoppingBag size={64} color="var(--text-3)" style={{ marginBottom: 20 }} />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-1)', marginBottom: 10 }}>Your cart is empty</h2>
      <p style={{ fontSize: 15, color: 'var(--text-3)', marginBottom: 32 }}>Discover our partner restaurants and add something delicious.</p>
      <Link to="/restaurants"><Button size="lg">Browse Restaurants</Button></Link>
    </div>
  )

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '40px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>Your Order</h1>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 36 }}>From {restaurantName}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {entries.map(entry => (
              <div key={entry.item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 'var(--r-lg)', background: 'var(--surf-1)', border: '1px solid var(--border-white)' }}>
                {entry.item.image_url && <img src={entry.item.image_url} alt={entry.item.name} style={{ width: 72, height: 72, borderRadius: 'var(--r-md)', objectFit: 'cover', flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', marginBottom: 3 }}>{entry.item.name}</h4>
                  <p style={{ fontSize: 13, color: 'var(--gold-400)', fontWeight: 600 }}>{entry.item.price.toFixed(2)} TND</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => updateQty(entry.item.id, entry.quantity - 1)} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid var(--border-white)', background: 'var(--surf-2)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', minWidth: 20, textAlign: 'center' }}>{entry.quantity}</span>
                  <button onClick={() => updateQty(entry.item.id, entry.quantity + 1)} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid var(--border-gold)', background: 'transparent', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
                </div>
                <div style={{ minWidth: 72, textAlign: 'right' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginBottom: 6 }}>{(entry.item.price * entry.quantity).toFixed(2)} TND</p>
                  <button onClick={() => removeItem(entry.item.id)} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, marginLeft: 'auto' }}><Trash2 size={12} /> Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: 'sticky', top: 80, background: 'var(--surf-1)', border: '1px solid var(--border-gold)', borderRadius: 'var(--r-xl)', padding: '28px 24px', boxShadow: 'var(--shadow-card)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 20 }}>Order Summary</h3>
            <Input label="Delivery Address" placeholder="Street, city, zip..." value={address} onChange={e => setAddress(e.target.value)} icon={<MapPin size={15} />} wrapStyle={{ marginBottom: 14 }} required />
            <Input label="Notes (optional)" placeholder="Special instructions..." value={notes} onChange={e => setNotes(e.target.value)} wrapStyle={{ marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)' }}><span>Subtotal</span><span>{subtotal.toFixed(2)} TND</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)' }}><span>Delivery fee</span><span>{deliveryFee.toFixed(2)} TND</span></div>
              <div className="gold-divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}><span>Total</span><span style={{ color: 'var(--gold-400)' }}>{grandTotal.toFixed(2)} TND</span></div>
            </div>
            <Button fullWidth size="lg" loading={placing} onClick={handlePlaceOrder}>{user ? 'Place Order' : 'Sign In to Order'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
