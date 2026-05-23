import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from './cartStore'; // تأكد من المسار الصحيح للملف

export const FloatingCartBar = () => {
  // جلب البيانات مباشرة من المخزن
  const items = useCartStore((state) => state.items);
  
  // افترضنا هنا وجود دوال لحساب الإجمالي والعدد في cartStore.ts
  // إذا لم تكن موجودة، يمكنك حسابها هنا مباشرة:
  const itemCount = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black text-white border-t border-[#d4af37]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-[#d4af37]" />
          <span>{itemCount} items</span>
        </div>
        <div className="font-bold">
          Total: {totalPrice.toFixed(3)} DT
        </div>
        <button className="bg-[#d4af37] text-black px-4 py-2 rounded">
          Order Now
        </button>
      </div>
    </div>
  );
};
