export default function App() {
  // اجعل هذه القيمة false فوراً للتأكد أن الموقع يفتح بدون شاشة البداية
  const [showSplash, setShowSplash] = useState(false); 

  return (
    <>
      <Toaster />
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/restaurants/:id" element={<RestaurantPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/legal/mentions-legales" element={<MentionsLegales />} />
              <Route path="/legal/cgu" element={<CGU />} />
              <Route path="/legal/confidentialite" element={<Confidentialite />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
