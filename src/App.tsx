import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingCartBar from './components/FloatingCartBar';
import { useCart } from './hooks/useCart';
import { ShoppingBag, Plus, Minus, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating?: number;
  reviews?: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chicken Shawarma',
    price: 12.5,
    description: 'Delicious grilled chicken with spices',
    category: 'Sandwiches',
    rating: 4.8,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Merguez Sandwich',
    price: 10.0,
    description: 'Spicy sausage with fresh vegetables',
    category: 'Sandwiches',
    rating: 4.6,
    reviews: 95,
  },
  {
    id: '3',
    name: 'Falafel Wrap',
    price: 8.5,
    description: 'Crispy falafel with tahini sauce',
    category: 'Vegetarian',
    rating: 4.7,
    reviews: 87,
  },
  {
    id: '4',
    name: 'Mixed Kebab',
    price: 15.0,
    description: 'Assorted meat kebab platter',
    category: 'Platters',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '5',
    name: 'Grilled Fish',
    price: 16.5,
    description: 'Fresh grilled fish with lemon',
    category: 'Seafood',
    rating: 4.8,
    reviews: 112,
  },
  {
    id: '6',
    name: 'Couscous Bowl',
    price: 11.0,
    description: 'Traditional couscous with vegetables',
    category: 'Platters',
    rating: 4.7,
    reviews: 103,
  },
];

// Modern gradient placeholder images
const getImageGradient = (id: string) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ];
  return gradients[parseInt(id) % gradients.length];
};

// Animation variants for cards
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

// Animation variants for header
const headerVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Animation variants for title section
const titleVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

function App() {
  const { items, itemCount, totalPrice, addItem, removeItem, clearCart, getItem } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleAddItem = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Animation */}
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="sticky top-0 z-40 bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  The Eagle TN
                </h1>
                <p className="text-xs md:text-sm text-gray-500">
                  Premium Food Delivery
                </p>
              </div>
            </div>
            {itemCount > 0 && (
              <motion.div 
                className="text-right"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <p className="text-sm text-gray-600">Cart Items</p>
                <motion.p 
                  className="text-2xl font-bold text-amber-600"
                  key={itemCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {itemCount}
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title Section with Animation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="mb-10"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-black mb-3" 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Menu
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover our curated selection of authentic Tunisian dishes, expertly prepared and delivered with elegance to your door.
          </p>
        </motion.div>

        {/* Products Grid - Modern Card Layout with Animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 md:pb-24"
          initial="hidden"
          animate="visible"
        >
          {SAMPLE_PRODUCTS.map((product, index) => {
            const cartItem = getItem(product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <motion.div
                key={product.id}
                custom={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50"
              >
                {/* Product Image Placeholder - High Quality Gradient */}
                <motion.div 
                  className="h-56 w-full relative overflow-hidden bg-gradient-to-br"
                  style={{ 
                    background: getImageGradient(product.id),
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Overlay pattern for visual interest */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
                  
                  {/* Category badge with animation */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="bg-white bg-opacity-95 text-gray-800 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Product Info */}
                <div className="p-6 md:p-7">
                  {/* Name - Serif Font */}
                  <motion.h3 
                    className="text-2xl font-bold text-black mb-2 group-hover:text-amber-600 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h3>

                  {/* Description - Serif Font for Elegance */}
                  <p 
                    className="text-gray-600 text-base mb-4 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {product.description}
                  </p>

                  {/* Rating with Stagger Animation */}
                  <motion.div 
                    className="flex items-center gap-2 mb-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 + i * 0.05 }}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating || 0)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </motion.div>

                  {/* Footer - Price and Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <motion.p 
                      className="text-2xl md:text-3xl font-bold text-amber-600" 
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.price.toLocaleString('en-US', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}{' '}
                      <span className="text-sm text-gray-500">DT</span>
                    </motion.p>

                    {/* Quantity Controls */}
                    {quantity > 0 ? (
                      <motion.div 
                        className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <motion.button
                          onClick={() => removeItem(product.id)}
                          className="text-amber-600 hover:text-amber-700 transition-colors p-1"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <motion.span 
                          className="text-gray-800 font-bold w-6 text-center"
                          key={quantity}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          {quantity}
                        </motion.span>
                        <motion.button
                          onClick={() => handleAddItem(product)}
                          className="text-amber-600 hover:text-amber-700 transition-colors p-1"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.button
                        onClick={() => handleAddItem(product)}
                        className="px-6 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        Add
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Floating Cart Bar with Telegram Integration */}
      <FloatingCartBar
        itemCount={itemCount}
        totalPrice={totalPrice}
        items={items}
        
        onCheckout={handleCheckout}
        isLoading={isCheckingOut}
        currencySymbol="DT"
      />
    </div>
  );
}

export default App;
