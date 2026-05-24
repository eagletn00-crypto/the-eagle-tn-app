// قم باستيراد الـ store الخاص بالسلة
import { useCartStore } from './store/cartStore'; 

function App() {
  // استخرج الحالة من الـ store مباشرة
  const { items, getTotalPrice } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = getTotalPrice();

  return (
    <Router>
      <Toaster position="top-right" />
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* الآن يعمل الشريط ديناميكياً مع بيانات السلة الحقيقية */}
      {itemCount > 0 && (
        <FloatingCartBar 
          itemCount={itemCount} 
          totalPrice={totalPrice} 
          onCheckout={() => console.log('Proceeding to checkout...')} 
        />
      )}
    </Router>
  );
}
