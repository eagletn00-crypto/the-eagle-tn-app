import { motion } from 'framer-motion';
import { cardVariants } from './animations'; // استيراد الحركات التي نقلناها

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>The Eagle TN</h1>
      </header>

      <main>
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible"
        >
          <h2>مرحباً بك في Eagle TN</h2>
          <p>توصيل أشهى المأكولات في تونس بكل أناقة.</p>
        </motion.div>
      </main>
    </div>
  );
}
