import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOrderToTelegram } from '../services/telegramService';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface FloatingCartBarProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
  isLoading?: boolean;
  currencySymbol?: string;
  items?: CartItem[];
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount,
  totalPrice,
  onCheckout,
  isLoading = false,
  currencySymbol = 'DT',
  items = [],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSendingToTelegram, setIsSendingToTelegram] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  useEffect(() => {
    setIsVisible(itemCount > 0);
  }, [itemCount]);

  const handleCheckoutClick = async () => {
    try {
      setIsSendingToTelegram(true);
      const success = await sendOrderToTelegram({ items, totalPrice, currencySymbol });
      if (success) {
        setOrderSent(true);
        toast.success('✅ Order Sent!');
        setTimeout(() => onCheckout(), 1000);
      } else {
        toast.error('❌ Failed to send.');
      }
    } catch (e) {
      toast.error('❌ Error occurred.');
    } finally {
      setIsSendingToTelegram(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="h-24" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-[#d4af37] p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-[#d4af37] bg-opacity-20 rounded-full">
              <ShoppingCart className="text-[#d4af37] w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {itemCount}
                </span>
              )}
            </div>
            <div className="text-white">
              <p className="text-xs text-gray-400">Total</p>
              <p className="font-bold">{totalPrice.toFixed(3)} {currencySymbol}</p>
            </div>
          </div>
          <button
            onClick={handleCheckoutClick}
            disabled={isSendingToTelegram || orderSent}
            className="bg-[#d4af37] text-black font-bold px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            {orderSent ? <Check /> : (isSendingToTelegram ? 'Sending...' : 'Checkout')}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingCartBar;
