import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOrderToTelegram, OrderData } from '../services/telegramService';

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
      const timer = setTimeout(() => { setOrderSent(false); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderSent]);

  const handleCheckoutClick = async () => {
    try {
      setIsSendingToTelegram(true);

      const orderData: OrderData = {
        items: items,
        totalPrice: totalPrice,
        currencySymbol: currencySymbol || 'DT',
      };

      const telegramSuccess = await sendOrderToTelegram(orderData);

      if (telegramSuccess) {
        setOrderSent(true);
        toast.success('✅ Order sent to restaurant!', { duration: 3000 });
        setTimeout(() => { onCheckout(); }, 500);
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
  const isProcessing = isLoading || isSendingToTelegram;

  return (
    <>
      <div className="h-24 md:h-20" />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-t-2 border-[#d4af37] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24 md:h-20">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-[#d4af37]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <p className="text-xl font-bold text-white">
                  {totalPrice.toFixed(3)} <span className="text-[#d4af37]">{currencySymbol}</span>
                </p>
              </div>
              <button
                onClick={handleCheckoutClick}
                disabled={isProcessing || orderSent}
                className="bg-[#d4af37] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#e5c158]"
              >
                {orderSent ? 'Sent!' : isProcessing ? 'Sending...' : 'Order Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingCartBar;
