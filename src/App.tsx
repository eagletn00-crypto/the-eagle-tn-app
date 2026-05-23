import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/DashboardPage';
// تأكد من استيراد المكون من مساره الصحيح
import { FloatingCartBar } from './components/FloatingCartBar'; 

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* إضافة المكون هنا ليظهر في جميع المسارات داخل الـ Router */}
      {/* تأكد من تمرير البيانات اللازمة له من سياق التطبيق أو حالة عامة */}
      <FloatingCartBar 
        itemCount={0} 
        totalPrice={0} 
        onCheckout={() => console.log('Checkout')} 
      />
    </Router>
  );
}

export default App;
