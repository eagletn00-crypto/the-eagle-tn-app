import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface FloatingCartBarProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
  isLoading?: boolean;
  currencySymbol?: string;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount,
  totalPrice,
  onCheckout,
  isLoading = false,
  currencySymbol = 'DT',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide animation trigger based on cart items
  useEffect(() => {
    setIsVisible(itemCount > 0);
  }, [itemCount]);

  if (!isVisible) return null;

  return (
    <>
      {/* Spacer for fixed bottom bar */}
      <div className="h-24 md:h-20" />

      {/* Floating Cart Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
        style={{
          animation: 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        {/* Background with gradient */}
        <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-t-2 border-[#d4af37] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24 md:h-20">
              {/* Left: Cart Icon & Item Count */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Cart Icon Container */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#d4af37] rounded-full opacity-10 blur-lg" />
                  <div className="relative bg-[#d4af37] bg-opacity-10 border border-[#d4af37] rounded-full p-3 md:p-4 transition-all duration-300 hover:bg-opacity-20">
                    <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />
                  </div>

                  {/* Item Count Badge */}
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#0a0a0a] text-xs md:text-sm font-bold rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center animate-pulse">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>

                {/* Cart Info */}
                <div className="hidden sm:block">
                  <p className="text-xs md:text-sm text-[#9ca3af] font-medium">
                    {itemCount === 1 ? 'Item' : 'Items'} in cart
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-white mt-1">
                    <span className="text-[#d4af37]">{totalPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })}</span>
                    {' '}
                    <span className="text-sm md:text-lg text-[#9ca3af]">
                      {currencySymbol}
                    </span>
                  </p>
                </div>
              </div>

              {/* Mobile: Compact Price Display */}
              <div className="sm:hidden text-right">
                <p className="text-sm text-[#9ca3af] font-medium">Total</p>
                <p className="text-xl font-bold text-white">
                  <span className="text-[#d4af37]">{totalPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })}</span>
                  {' '}
                  <span className="text-xs text-[#9ca3af]">{currencySymbol}</span>
                </p>
              </div>

              {/* Right: Checkout Button */}
              <button
                onClick={onCheckout}
                disabled={isLoading || itemCount === 0}
                className={`
                  flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4
                  font-bold text-sm md:text-base rounded-lg md:rounded-xl
                  transition-all duration-300 transform
                  focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
                  ${
                    isLoading || itemCount === 0
                      ? 'bg-[#d4af37] bg-opacity-50 text-[#0a0a0a] cursor-not-allowed'
                      : 'bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e5c158] shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:scale-105 active:scale-95'
                  }
                `}
              >
                <span>
                  {isLoading ? 'Processing...' : 'Order Now'}
                </span>
                {!isLoading && <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingCartBar;
