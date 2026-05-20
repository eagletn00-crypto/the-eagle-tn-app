import { useState } from 'react';
import FloatingCartBar from './components/FloatingCartBar';
import { useCart } from './hooks/useCart';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chicken Shawarma',
    price: 12.5,
    description: 'Delicious grilled chicken with spices',
    category: 'Sandwiches',
  },
  {
    id: '2',
    name: 'Merguez Sandwich',
    price: 10.0,
    description: 'Spicy sausage with fresh vegetables',
    category: 'Sandwiches',
  },
  {
    id: '3',
    name: 'Falafel Wrap',
    price: 8.5,
    description: 'Crispy falafel with tahini sauce',
    category: 'Vegetarian',
  },
  {
    id: '4',
    name: 'Mixed Kebab',
    price: 15.0,
    description: 'Assorted meat kebab platter',
    category: 'Platters',
  },
  {
    id: '5',
    name: 'Grilled Fish',
    price: 16.5,
    description: 'Fresh grilled fish with lemon',
    category: 'Seafood',
  },
  {
    id: '6',
    name: 'Couscous Bowl',
    price: 11.0,
    description: 'Traditional couscous with vegetables',
    category: 'Platters',
  },
];

function App() {
  const { itemCount, totalPrice, addItem, removeItem, clearCart, getItem } =
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
      alert(`Order Placed! Total: ${totalPrice.toLocaleString('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })} DT`);
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#d4af37] border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#d4af37] rounded-lg p-2">
                <ShoppingBag className="w-6 h-6 text-[#0a0a0a]" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Eagle.TN
                </h1>
                <p className="text-xs md:text-sm text-[#9ca3af]">
                  Premium Food Delivery
                </p>
              </div>
            </div>
            {itemCount > 0 && (
              <div className="text-right">
                <p className="text-sm text-[#9ca3af]">Cart Items</p>
                <p className="text-2xl font-bold text-[#d4af37]">{itemCount}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Our Menu
          </h2>
          <p className="text-[#9ca3af]">
            Explore our delicious selection of authentic dishes
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 md:pb-24">
          {SAMPLE_PRODUCTS.map((product) => {
            const cartItem = getItem(product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div
                key={product.id}
                className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#d4af37] border-opacity-30 rounded-xl overflow-hidden hover:border-opacity-60 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/10"
              >
                {/* Product Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-[#d4af37] via-[#9d7d28] to-[#5a5a5a] opacity-30 group-hover:opacity-40 transition-opacity" />

                {/* Product Info */}
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm text-[#9ca3af] mb-3">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xl md:text-2xl font-bold text-[#d4af37]">
                      {product.price.toLocaleString('en-US', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}{' '}
                      <span className="text-sm text-[#9ca3af]">DT</span>
                    </p>

                    {/* Quantity Controls */}
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-[#d4af37] bg-opacity-20 border border-[#d4af37] rounded-lg px-3 py-2">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[#d4af37] hover:text-[#e5c158] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-bold w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleAddItem(product)}
                          className="text-[#d4af37] hover:text-[#e5c158] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddItem(product)}
                        className="px-4 py-2 bg-[#d4af37] text-[#0a0a0a] font-bold rounded-lg hover:bg-[#e5c158] transition-colors transform hover:scale-105 active:scale-95"
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

      {/* Floating Cart Bar */}
      <FloatingCartBar
        itemCount={itemCount}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
        isLoading={isCheckingOut}
        currencySymbol="DT"
      />
    </div>
  );
}

export default App;
