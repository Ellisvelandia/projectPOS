'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, Minus, ShoppingBag, X, CreditCard, Menu } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Chicken Wings',
    price: 12.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    price: 8.99,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
  },
  // Add more mock products as needed
];

const categories = ['All', 'Appetizers', 'Salads', 'Main Course', 'Desserts', 'Beverages'];

export default function Home() {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Initialize window width
    setWindowWidth(window.innerWidth);

    // Update window width when resizing
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsCartOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (windowWidth < 1024) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const CartContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Current Order</h2>
        {windowWidth < 1024 && (
          <button onClick={() => setIsCartOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      <ScrollArea className="flex-1 p-4">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 rounded-full hover:bg-gray-200 touch-manipulation"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 rounded-full hover:bg-gray-200 touch-manipulation"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded-full hover:bg-red-100 text-red-600 touch-manipulation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total Amount:</span>
          <span className="text-xl font-bold text-green-600">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg" 
          disabled={cart.length === 0}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Proceed to Payment
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Modern POS</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="relative touch-manipulation"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="p-4 border-t space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 touch-manipulation ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
          {/* Main Content */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            {/* Desktop Search and Filters */}
            <div className="hidden lg:flex flex-col space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Products Grid */}
            <ScrollArea className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pb-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden touch-manipulation"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <p className="font-bold text-green-600 ml-2">${product.price.toFixed(2)}</p>
                      </div>
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
                      >
                        Add to Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Cart Sidebar - Mobile */}
          {isCartOpen && windowWidth < 1024 && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
                <CartContent />
              </div>
            </div>
          )}

          {/* Cart Sidebar - Desktop */}
          <div className="hidden lg:flex flex-col w-96 border-l bg-white">
            <CartContent />
          </div>
        </div>
      </div>
    </div>
  );
}