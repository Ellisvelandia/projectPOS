'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { MenuItem } from '@/components/ui/menu-item';
import { OrderItem } from '@/components/ui/order-item';
import { supabase } from '@/lib/supabase';

const categories = ['STARTER', 'MAIN COURSE', 'DRINKS', 'DESSERTS'];

const menuItems = [
  {
    id: 1,
    name: 'CHICKEN WINGS',
    price: 20,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80',
    category: 'STARTER',
    isSpicy: true,
  },
  {
    id: 2,
    name: 'FRENCH FRIES',
    price: 5,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80',
    category: 'STARTER',
    isVegetarian: true,
  },
  {
    id: 3,
    name: 'SUMMER SALAD',
    price: 10,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    category: 'STARTER',
    isVegetarian: true,
  },
];

interface OrderItemType {
  id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export default function POSPage() {
  const [activeTab, setActiveTab] = useState('STARTER');
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);

  const addToOrder = (menuItem: typeof menuItems[0]) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.id === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const incrementQuantity = (id: number) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceCharge = subtotal * 0.1;
  const total = subtotal + serviceCharge;

  const handleCheckout = async () => {
    if (orderItems.length === 0) {
      alert('Please add items to your order');
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            total_amount: total,
            status: 'completed',
            payment_method: 'cash'
          }
        ]);

      if (error) throw error;
      setOrderItems([]);
      alert('Order completed successfully!');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Error processing order. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side - Menu Items */}
      <div className="flex-1 p-6">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search product or any order..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
            October 18th 2022, 10:00AM
          </span>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 gap-4 mb-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={`py-2 px-4 rounded-lg ${
                  activeTab === category ? 'bg-green-700 text-white' : 'bg-gray-100'
                }`}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="grid grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                  onClick={() => addToOrder(item)}
                />
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Right side - Order Summary */}
      <div className="w-1/3 bg-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">ORDER #2</h2>
          <div className="text-sm text-gray-500">
            GUESTS: 2
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {orderItems.map((item) => (
              <OrderItem
                key={item.id}
                {...item}
                onIncrement={() => incrementQuantity(item.id)}
                onDecrement={() => decrementQuantity(item.id)}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Charge (10%)</span>
            <span>${serviceCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}