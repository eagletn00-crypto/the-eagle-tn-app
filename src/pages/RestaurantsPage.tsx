import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Restaurant } from '../lib/database.types'
import RestaurantCard from '../components/RestaurantCard'
import Input from '../components/ui/Input'

const CUISINES = ['All', 'Tunisian', 'Fine Dining', 'Grill & Seafood', 'Italian', 'Asian']

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('All')

  useEffect(() => {
    supabase.from('restaurants').select('*').eq('is_open', true).order('rating', { ascending: false })
      .then(({ data }) => { setRestaurants((data as Restaurant[]) || []); setLoading(false) })
  }, [])

  const filtered = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || (r.cuisine_type || '').toLowerCase().includes(search.toLowerCase())
    const matchCuisine = cuisine === 'All' || r.cuisine_type === cuisine
    return matchSearch && matchCuisine
  })

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div style={{ background: 'var(--surf-1)', borderBottom: '1px solid var(--border-white)', padding: '40px 0 32px' }}>
        <div className="wrap">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 8 }}>Curated Partners</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-1)', marginBottom: 24 }}>Restaurants</h1>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 280px', maxWidth: 420 }}>
              <Input placeholder="Search restaurants or cuisine..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={16} />} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CUISINES.map(c => (
                <button key={c} onClick={() => setCuisine(c)} style={{ padding: '8px 16px', borderRadius: 'var(--r-pill)', border: `1px solid ${cuisine === c ? 'var(--border-gold-h)' : 'var(--border-white)'}`, background: cuisine === c ? 'rgba(212,160,23,0.12)' : 'transparent', color: cuisine === c ? 'var(--gold-400)' : 'var(--text-3)', fontSize: 12, fontWeight: 600, transition: 'all 0.2s' }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ padding: '48px 24px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--surf-1)', border: '1px solid var(--border-white)' }}>
                <div style={{ height: 180, background: 'var(--surf-2)' }} />
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ height: 20, background: 'var(--surf-2)', borderRadius: 4, marginBottom: 8, width: '60%' }} />
                  <div style={{ height: 14, background: 'var(--surf-2)', borderRadius: 4, width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <SlidersHorizontal size={48} color="var(--text-3)" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontSize: 18, color: 'var(--text-2)', marginBottom: 8 }}>No restaurants found</p>
            <p style={{ fontSize: 14, color: 'var(--text-3)' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24 }}>{filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} available</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
