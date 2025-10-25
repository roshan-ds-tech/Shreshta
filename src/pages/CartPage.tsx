import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Cube Jaggery - Premium',
      image: 'jaggery-solid-regular.jpg',
      price: 299,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Liquid Jaggery - Pure',
      image: 'natural-liquid-jaggery.jpg',
      price: 349,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl text-[#2C1810] mb-2 font-serif">Shopping Cart</h1>
          <p className="text-[#5C4033]">{cartItems.length} items in your cart</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-[#C5A572] mb-4" />
            <h2 className="text-2xl text-[#2C1810] mb-4">Your cart is empty</h2>
            <p className="text-[#5C4033] mb-8">Add some delicious jaggery products to get started!</p>
            <Link to="/products">
              <Button className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md border-2 border-[#C5A572]/20 p-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-[#2C1810] mb-1">{item.name}</h3>
                      <p className="text-[#D4AF37]">₹{item.price}/kg</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10 h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center text-[#2C1810]">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10 h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-[#2C1810]">₹{item.price * item.quantity}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-md border-2 border-[#C5A572]/20 p-6 sticky top-24"
              >
                <h2 className="text-xl text-[#2C1810] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#5C4033]">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5C4033]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-sm text-[#D4AF37]">
                      Add ₹{500 - subtotal} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-[#C5A572]/30 pt-4">
                    <div className="flex justify-between text-[#2C1810]">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-[#5C4033] mb-2 block">
                      Have a coupon code?
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        className="border-[#C5A572] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <Button
                        variant="outline"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2C1810]"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572] py-6">
                    Proceed to Checkout
                  </Button>

                  <Link to="/products">
                    <Button
                      variant="outline"
                      className="w-full border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-[#C5A572]/30">
                  <h3 className="text-sm text-[#2C1810] mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="px-3 py-2 bg-[#F5E6D3] rounded text-xs text-[#2C1810]">
                      VISA
                    </div>
                    <div className="px-3 py-2 bg-[#F5E6D3] rounded text-xs text-[#2C1810]">
                      MasterCard
                    </div>
                    <div className="px-3 py-2 bg-[#F5E6D3] rounded text-xs text-[#2C1810]">
                      UPI
                    </div>
                    <div className="px-3 py-2 bg-[#F5E6D3] rounded text-xs text-[#2C1810]">
                      COD
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
