import { useState } from 'react';
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
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-2">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
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
              <div className="text-right">
                <p className="text-sm text-gray-600">Cart Items</p>
                <p className="text-2xl font-bold text-amber-600">{itemCount}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-10">
          <h2 
            className="text-4xl md:text-5xl font-bold text-black mb-3" 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Menu
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover our curated selection of authentic Tunisian dishes, expertly prepared and delivered with elegance to your door.
          </p>
        </div>

        {/* Products Grid - Modern Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 md:pb-24">
          {SAMPLE_PRODUCTS.map((product) => {
            const cartItem = getItem(product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-50"
              >
                {/* Product Image Placeholder - High Quality Gradient */}
                <div 
                  className="h-56 w-full relative overflow-hidden bg-gradient-to-br"
                  style={{ 
                    background: getImageGradient(product.id),
                  }}
                >
                  {/* Overlay pattern for visual interest */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-95 text-gray-800 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 md:p-7">
                  {/* Name - Serif Font */}
                  <h3 
                    className="text-2xl font-bold text-black mb-2 group-hover:text-amber-600 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {product.name}
                  </h3>

                  {/* Description - Serif Font for Elegance */}
                  <p 
                    className="text-gray-600 text-base mb-4 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Footer - Price and Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <p className="text-2xl md:text-3xl font-bold text-amber-600" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      {product.price.toLocaleString('en-US', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}{' '}
                      <span className="text-sm text-gray-500">DT</span>
                    </p>

                    {/* Quantity Controls */}
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-amber-600 hover:text-amber-700 transition-colors p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-800 font-bold w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleAddItem(product)}
                          className="text-amber-600 hover:text-amber-700 transition-colors p-1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddItem(product)}
                        className="px-6 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Cart Bar with Telegram Integration */}
      <FloatingCartBar
        itemCount={itemCount}
        totalPrice={totalPrice}
        cartItems={items}
        onCheckout={handleCheckout}
        isLoading={isCheckingOut}
        currencySymbol="DT"
      />
    </div>
  );
}

export default App;
