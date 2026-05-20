import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Placeholder pages - replace these with your actual pages
const Home = () => <div style={{ padding: '20px' }}><h1>مرحباً! الموقع يعمل.</h1></div>
const Restaurants = () => <div style={{ padding: '20px' }}><h1>Restaurants</h1></div>
const Cart = () => <div style={{ padding: '20px' }}><h1>Your Cart</h1></div>
const Auth = () => <div style={{ padding: '20px' }}><h1>Authentication</h1></div>
const Orders = () => <div style={{ padding: '20px' }}><h1>My Orders</h1></div>
const Dashboard = () => <div style={{ padding: '20px' }}><h1>Dashboard</h1></div>

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#000000'
      }}>
        <Navbar />
        
        <main style={{ flex: 1, paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}
