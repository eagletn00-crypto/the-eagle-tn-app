import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface UseCartReturn {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (id: string) => CartItem | undefined;
}

/**
 * Custom hook for managing cart state
 * Provides cart operations and calculated totals
 */
export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate total items count
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add item to cart or increment quantity if exists
  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        // Item already exists, increment quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      // New item, add to cart
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Get specific item
  const getItem = useCallback(
    (id: string) => items.find((item) => item.id === id),
    [items]
  );

  return {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
  };
};
