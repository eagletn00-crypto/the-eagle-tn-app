import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>الموقع يعمل!</h1>
      </div>
      <Footer />
    </>
  );
}
