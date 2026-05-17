import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, Truck } from 'lucide-react'
import type { Restaurant } from '../lib/database.types'

const COVERS: Record<string, string> = {
  'Am Ali Kitchen':      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=800&auto=compress',
  'Dar Zitouna':         'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=800&auto=compress',
  'Grill House Carthage':'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?w=800&auto=compress',
}
const FALLBACK = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=800&auto=compress'

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [hovered, setHovered] = useState(false)
  const cover = restaurant.cover_url || COVERS[restaurant.name] || FALLBACK

  return (
    <Link to={`/restaurants/${restaurant.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 'var(--r-lg)', border: `1px solid ${hovered ? 'var(--border-gold-h)' : 'var(--border-white)'}`, overflow: 'hidden', background: 'var(--surf-1)', boxShadow: hovered ? 'var(--shadow-gold)' : 'var(--shadow-card)', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
        <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
          <img src={cover} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
          {restaurant.is_featured && (
            <div style={{ position: 'absolute', top: 12, left: 12, padding: '3px 10px', borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-400))', color: 'var(--ink-1)', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Featured</div>
          )}
        </div>
        <div style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>{restaurant.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <Star size={13} fill="var(--gold-400)" color="var(--gold-400)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-400)' }}>{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{restaurant.cuisine_type} · {restaurant.city}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-2)' }}><Clock size={13} color="var(--text-3)" />{restaurant.delivery_time_min} min</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-2)' }}><Truck size={13} color="var(--text-3)" />{restaurant.delivery_fee === 0 ? 'Free delivery' : `${restaurant.delivery_fee} TND`}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 'auto' }}>Min {restaurant.minimum_order} TND</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
