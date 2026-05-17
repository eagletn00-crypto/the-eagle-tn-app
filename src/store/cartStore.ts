import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MenuItem } from '../lib/database.types'

export interface CartEntry {
  item: MenuItem
  quantity: number
  restaurantId: string
  restaurantName: string
}

interface CartState {
  entries: CartEntry[]
  restaurantId: string | null
  restaurantName: string | null
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string) => void
  removeItem: (itemId: string) => void
  updateQty: (itemId: string, qty: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      entries: [],
      restaurantId: null,
      restaurantName: null,

      addItem: (item, restaurantId, restaurantName) => {
        const { entries, restaurantId: currentRid } = get()
        if (currentRid && currentRid !== restaurantId) {
          set({ entries: [{ item, quantity: 1, restaurantId, restaurantName }], restaurantId, restaurantName })
          return
        }
        const existing = entries.find((e) => e.item.id === item.id)
        if (existing) {
          set({ entries: entries.map((e) => e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e) })
        } else {
          set({ entries: [...entries, { item, quantity: 1, restaurantId, restaurantName }], restaurantId, restaurantName })
        }
      },

      removeItem: (itemId) => {
        const entries = get().entries.filter((e) => e.item.id !== itemId)
        set({ entries, restaurantId: entries.length ? get().restaurantId : null, restaurantName: entries.length ? get().restaurantName : null })
      },

      updateQty: (itemId, qty) => {
        if (qty <= 0) { get().removeItem(itemId); return }
        set({ entries: get().entries.map((e) => e.item.id === itemId ? { ...e, quantity: qty } : e) })
      },

      clearCart: () => set({ entries: [], restaurantId: null, restaurantName: null }),
      total: () => get().entries.reduce((sum, e) => sum + e.item.price * e.quantity, 0),
      count: () => get().entries.reduce((sum, e) => sum + e.quantity, 0),
    }),
    { name: 'eagle-cart' }
  )
)
