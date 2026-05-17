export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'customer' | 'partner' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'customer' | 'partner' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'customer' | 'partner' | 'admin'
          updated_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          owner_id: string | null
          name: string
          description: string | null
          cuisine_type: string | null
          image_url: string | null
          cover_url: string | null
          address: string | null
          city: string | null
          phone: string | null
          is_open: boolean
          is_featured: boolean
          delivery_time_min: number
          delivery_time_max: number
          delivery_fee: number
          minimum_order: number
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id?: string | null
          name: string
          description?: string | null
          cuisine_type?: string | null
          image_url?: string | null
          cover_url?: string | null
          address?: string | null
          city?: string | null
          phone?: string | null
          is_open?: boolean
          is_featured?: boolean
          delivery_time_min?: number
          delivery_time_max?: number
          delivery_fee?: number
          minimum_order?: number
          rating?: number
          review_count?: number
        }
        Update: {
          name?: string
          description?: string | null
          cuisine_type?: string | null
          image_url?: string | null
          cover_url?: string | null
          address?: string | null
          city?: string | null
          phone?: string | null
          is_open?: boolean
          is_featured?: boolean
          delivery_time_min?: number
          delivery_time_max?: number
          delivery_fee?: number
          minimum_order?: number
          rating?: number
          review_count?: number
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          description: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          description?: string | null
          display_order?: number
        }
        Update: {
          name?: string
          description?: string | null
          display_order?: number
        }
      }
      menu_items: {
        Row: {
          id: string
          restaurant_id: string
          category_id: string | null
          name: string
          description: string | null
          price: number
          image_url: string | null
          is_available: boolean
          is_popular: boolean
          preparation_time: number | null
          calories: number | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          category_id?: string | null
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          is_available?: boolean
          is_popular?: boolean
          preparation_time?: number | null
          calories?: number | null
          display_order?: number
        }
        Update: {
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          is_available?: boolean
          is_popular?: boolean
          preparation_time?: number | null
          calories?: number | null
          display_order?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          restaurant_id: string
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_fee: number
          delivery_address: string
          delivery_notes: string | null
          estimated_delivery_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          restaurant_id: string
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_fee: number
          delivery_address: string
          delivery_notes?: string | null
          estimated_delivery_time?: string | null
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
          delivery_notes?: string | null
          estimated_delivery_time?: string | null
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          menu_item_id: string
          quantity: number
          unit_price: number
          subtotal: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          menu_item_id: string
          quantity: number
          unit_price: number
          subtotal: number
          notes?: string | null
        }
        Update: {
          quantity?: number
          notes?: string | null
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          menu_item_id: string
          restaurant_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          menu_item_id: string
          restaurant_id: string
          quantity: number
        }
        Update: {
          quantity?: number
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Restaurant = Database['public']['Tables']['restaurants']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type CartItem = Database['public']['Tables']['cart_items']['Row']
export type OrderStatus = Order['status']
