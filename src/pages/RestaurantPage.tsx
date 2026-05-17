import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Clock, Truck, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Restaurant, Category, MenuItem } from '../lib/database.types'
import { useCartStore } from '../store/cartStore'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { addItem, entries, restaurantId: cartRestaurantId } = useCartStore()

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('restaurants').select('*').eq('id', id).maybeSingle(),
      supabase.from('categories').select('*').eq('restaurant_id', id).order('display_order'),
      supabase.from('menu_items').select('*').eq('restaurant_id', id).eq('is_available', true).order('display_order'),
    ]).then(([{ data: rest }, { data: cats }, { data: its }]) => {
      if (!rest) { navigate('/restaurants'); return }
      setRestaurant(rest as Restaurant)
      const c = (cats as Category[]) || []
      setCategories(c)
      setItems((its as MenuItem[]) || [])
      if (c.length > 0) setActiveCategory(c[0].id)
      setLoading(false)
    })
  }, [id])

  function getQty(itemId: string) { return entries.find(e => e.item.id === itemId)?.quantity || 0 }

  function handleAdd(item: MenuItem) {
    if (cartRestaurantId && cartRestaurantId !== restaurant!.id) {
      toast.error('Cart cleared — adding item from new restaurant', { duration: 3000 })
    }
    addItem(item, restaurant!.id, restaurant!.name)
    toast.success(`${item.name} added`, { icon: '✓' })
  }

  if (loading) return <LoadingSpinner />
  if (!restaurant) return null

  const visibleItems = activeCategory ? items.filter(i => i.category_id === activeCategory) : items
  const cartCount = entries.reduce((s, e) => s + e.quantity, 0)

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      {/* Cover */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img src={restaurant.cover_url || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=1600&auto=compress'} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(0,0,0,0.3) 60%)' }} />
        <div className="wrap" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 28px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-1)', marginBottom: 8 }}>{restaurant.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{restaurant.cuisine_type}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--gold-400)' }}><Star size={13} fill="var(--gold-400)" /> {restaurant.rating.toFixed(1)} ({restaurant.review_count} reviews)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-2)' }}><Clock size={13} /> {restaurant.delivery_time_min} min</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-2)' }}><Truck size={13} /> {restaurant.delivery_fee === 0 ? 'Free delivery' : `${restaurant.delivery_fee} TND`}</div>
            {restaurant.city && <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-2)' }}><MapPin size={13} /> {restaurant.city}</div>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, padding: '32px 24px', alignItems: 'start' }}>
        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 80 }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 12 }}>Menu</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} style={{ padding: '8px 14px', borderRadius: 'var(--r-sm)', textAlign: 'left', fontSize: 13, fontWeight: activeCategory === c.id ? 600 : 400, color: activeCategory === c.id ? 'var(--gold-400)' : 'var(--text-2)', background: activeCategory === c.id ? 'rgba(212,160,23,0.1)' : 'transparent', border: `1px solid ${activeCategory === c.id ? 'var(--border-gold)' : 'transparent'}`, transition: 'all 0.2s' }}>{c.name}</button>
            ))}
          </div>
          {cartCount > 0 && (
            <div style={{ marginTop: 24, padding: 16, borderRadius: 'var(--r-lg)', background: 'var(--surf-2)', border: '1px solid var(--border-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <ShoppingCart size={15} color="var(--gold-400)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
              </div>
              <Button fullWidth size="sm" onClick={() => navigate('/cart')}>View Cart</Button>
            </div>
          )}
        </div>

        {/* Items */}
        <div>
          {categories.length > 0 && <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginBottom: 24 }}>{categories.find(c => c.id === activeCategory)?.name || 'All Items'}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {visibleItems.map(item => (
              <MenuItemCard key={item.id} item={item} qty={getQty(item.id)}
                onAdd={() => handleAdd(item)}
                onUpdateQty={q => { if (q <= 0) useCartStore.getState().removeItem(item.id); else useCartStore.getState().updateQty(item.id, q) }} />
            ))}
          </div>
          {visibleItems.length === 0 && <p style={{ color: 'var(--text-3)', fontSize: 14 }}>No items in this category.</p>}
        </div>
      </div>
    </div>
  )
}

function MenuItemCard({ item, qty, onAdd, onUpdateQty }: { item: MenuItem; qty: number; onAdd: () => void; onUpdateQty: (q: number) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 'var(--r-lg)', border: `1px solid ${hovered ? 'var(--border-gold)' : 'var(--border-white)'}`, background: 'var(--surf-1)', overflow: 'hidden', transition: 'all 0.25s ease', boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.4)' : 'none' }}>
      {item.image_url && (
        <div style={{ height: 140, overflow: 'hidden' }}>
          <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', transform: hovered ? 'scale(1.05)' : 'none' }} />
        </div>
      )}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.2 }}>{item.name}</h4>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold-400)', flexShrink: 0 }}>{item.price.toFixed(2)} TND</span>
        </div>
        {item.description && <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 12 }}>{item.description}</p>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {item.preparation_time} min</span>
          {qty > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => onUpdateQty(qty - 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border-gold)', background: 'transparent', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', minWidth: 16, textAlign: 'center' }}>{qty}</span>
              <button onClick={onAdd} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'var(--gold-500)', color: 'var(--ink-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
            </div>
          ) : (
            <button onClick={onAdd} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 'var(--r-pill)', border: '1px solid var(--border-gold-h)', background: 'transparent', color: 'var(--gold-400)', fontSize: 12, fontWeight: 600, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,160,23,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              <Plus size={13} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
