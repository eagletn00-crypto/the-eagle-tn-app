import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, Shield, Utensils, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Restaurant } from '../lib/database.types'
import RestaurantCard from '../components/RestaurantCard'
import Button from '../components/ui/Button'

const HERO_BG = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=1600&auto=compress'

const STATS = [
  { value: '50+', label: 'Partner Restaurants' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '30min', label: 'Avg Delivery' },
  { value: '24/7', label: 'Customer Support' },
]

const HOW = [
  { n: '01', title: 'Choose Your Restaurant', body: "Browse Tunisia's finest dining establishments, from traditional Tunisian to international cuisine." },
  { n: '02', title: 'Build Your Order', body: 'Select from carefully curated menus with premium ingredients and authentic recipes.' },
  { n: '03', title: 'Swift Delivery', body: 'Your order arrives hot and fresh, handled with the care befitting a luxury experience.' },
]

export default function HomePage() {
  const [featured, setFeatured] = useState<Restaurant[]>([])

  useEffect(() => {
    supabase.from('restaurants').select('*').eq('is_featured', true).eq('is_open', true).limit(3)
      .then(({ data }) => setFeatured((data as Restaurant[]) || []))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(8,8,8,0.4) 100%)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 80 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 'var(--r-pill)', border: '1px solid var(--border-gold)', marginBottom: 32 }}>
              <span className="dot-pulse" style={{ background: 'var(--gold-400)' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>Premium Delivery · Tunisia</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              Taste the<br /><span className="gold-text">Finest of</span><br />Tunisia
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
              From the medinas of Tunis to your doorstep — we deliver exceptional meals from the country's most celebrated culinary destinations.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/restaurants"><Button size="lg" style={{ gap: 10 }}>Explore Restaurants <ArrowRight size={16} /></Button></Link>
              <Link to="/auth"><Button variant="outline" size="lg">Partner With Us</Button></Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border-gold)' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '20px 24px' }}>
            {STATS.map(s => (
              <div key={s.value} style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--gold-400)', marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section style={{ padding: '96px 0' }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 8 }}>Curated Selection</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.1 }}>Featured Restaurants</h2>
              </div>
              <Link to="/restaurants" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gold-400)', fontWeight: 600 }}>View All <ChevronRight size={15} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {featured.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section style={{ padding: '96px 0', background: 'var(--surf-1)', borderTop: '1px solid var(--border-white)', borderBottom: '1px solid var(--border-white)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 8 }}>Simple Process</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-1)' }}>How It Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {HOW.map(h => (
              <div key={h.n} className="carbon" style={{ padding: 32, borderRadius: 'var(--r-xl)', border: '1px solid var(--border-white)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, color: 'var(--gold-800)', lineHeight: 1, marginBottom: 20 }}>{h.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', marginBottom: 10, fontFamily: 'var(--font-serif)' }}>{h.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7 }}>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section style={{ padding: '96px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { icon: <Star size={24} />, title: 'Curated Quality', body: "Only Tunisia's highest-rated restaurants earn a place on our platform." },
              { icon: <Clock size={24} />, title: 'On-Time Promise', body: 'We guarantee delivery within the promised window or your next delivery is free.' },
              { icon: <Shield size={24} />, title: 'Secure Payments', body: 'End-to-end encrypted payments with full buyer protection on every order.' },
              { icon: <Utensils size={24} />, title: 'Authentic Flavors', body: "Preserving Tunisia's rich culinary heritage, one delivery at a time." },
            ].map(v => (
              <div key={v.title} style={{ padding: '28px 24px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-white)', background: 'var(--surf-1)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--r-md)', background: 'rgba(212,160,23,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-400)', marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--surf-1)', borderTop: '1px solid var(--border-gold)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'var(--text-1)', marginBottom: 16 }}>
            Ready to experience <span className="gold-text">premium delivery</span>?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 36 }}>Join thousands of satisfied customers across Tunisia.</p>
          <Link to="/restaurants"><Button size="lg">Order Now <ArrowRight size={16} /></Button></Link>
        </div>
      </section>
    </div>
  )
}
