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

  useEffect(() => {
    if (orderSent) {
      const timer = setTimeout(() => setOrderSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [orderSent]);

  const handleCheckoutClick = async () => {
    try {
      setIsSendingToTelegram(true);
      const telegramSuccess = await sendOrderToTelegram({ items, totalPrice, currencySymbol });

      if (telegramSuccess) {
        setOrderSent(true);
        toast.success('✅ Order sent to restaurant!');
        setTimeout(() => onCheckout(), 500);
      } else {
        toast.error('❌ Failed to send order.');
      }
    } catch (error) {
      toast.error('❌ An error occurred.');
    } finally {
      setIsSendingToTelegram(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="h-24 md:h-20" />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up" style={{ animation: 'slideUp 0.5s ease-out forwards' }}>
        <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-t-2 border-[#d4af37] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24 md:h-20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-[#d4af37] bg-opacity-10 border border-[#d4af37] rounded-full p-3">
                    <ShoppingCart className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{totalPrice.toFixed(3)} {currencySymbol}</p>
                </div>
              </div>
              <button
                onClick={handleCheckoutClick}
                disabled={isLoading || isSendingToTelegram || orderSent}
                className="bg-[#d4af37] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#e5c158] transition-all"
              >
                {orderSent ? <Check /> : (isSendingToTelegram ? 'Sending...' : 'Order Now')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </>
  );
};

export default FloatingCartBar;
