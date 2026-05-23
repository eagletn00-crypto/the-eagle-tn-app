import { useCartStore } from '../store/cartStore';

export const FloatingCartBar = () => {
  // جلب البيانات من المخزن باستخدام الهيكل الموجود في 1000094494.png
  const entries = useCartStore((state) => state.entries);
  const total = useCartStore((state) => state.total()); // دالة الـ total في الملف ترجع الرقم
  const count = useCartStore((state) => state.count()); // دالة الـ count في الملف ترجع الرقم

  // التحقق من وجود عناصر
  if (entries.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black text-white border-t border-[#d4af37]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span>{count} items</span>
        </div>
        <div className="font-bold">
          Total: {total.toFixed(3)} DT
        </div>
        <button className="bg-[#d4af37] text-black px-4 py-2 rounded">
          Order Now
        </button>
      </div>
    </div>
  );
};
