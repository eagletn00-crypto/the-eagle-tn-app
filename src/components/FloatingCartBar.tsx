import React, { useEffect, useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOrderToTelegram } from '../services/telegramService';

interface FloatingCartBarProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
  items?: any[];
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount,
  totalPrice,
  onCheckout,
  items = []
}) => {
  const [isSending, setIsSending] = useState(false);

  const handleCheckout = async () => {
    setIsSending(true);
    try {
      const success = await sendOrderToTelegram({ items, totalPrice });
      if (success) {
        toast.success('Order Sent!');
        onCheckout();
      }
    } catch (error) {
      toast.error('Failed to send order');
    } finally {
      setIsSending(false);
    }
  };

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50 shadow-lg">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm font-bold">Total: {totalPrice.toFixed(3)} DT</p>
          <p className="text-xs text-gray-500">{itemCount} items selected</p>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isSending}
          className="bg-black text-white px-6 py-2 rounded-lg font-bold"
        >
          {isSending ? 'Sending...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default FloatingCartBar;
