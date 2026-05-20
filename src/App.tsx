import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: 'black' }}>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>مرحباً! الموقع يعمل.</h1>
      </div>
      <Footer />
    </div>
  )
}
