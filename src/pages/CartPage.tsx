import { useContext } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';

export function CartPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartPage must be used within a CartProvider');
  }

  const { cartItems, removeFromCart, updateQuantity } = cartContext;

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
              <Button className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572] " style={{cursor: "pointer"}}>
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        style={{cursor: "pointer"}}
                      >
                        <Minus className="w-4 h-4 text-[#5C4033]" />
                      </button>
                      <span className="text-[#2C1810] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        style={{cursor: "pointer"}}
                      >
                        <Plus className="w-4 h-4 text-[#5C4033]" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-\[\#D4AF37\]-100 rounded-full"
                      style={{cursor: "pointer"}}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md border-2 border-[#C5A572]/20 p-6"
              >
                <h2 className="text-xl text-[#2C1810] mb-4 font-serif">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-[#5C4033]">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5C4033]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="border-t border-[#C5A572]/20 pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-[#2C1810]">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* --- ADDED COUPON FORM --- */}
                <div className="mt-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-[#5C4033] mb-2">
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coupon"
                      placeholder="Enter coupon code"
                      className="w-full flex-1 rounded-md border border-[#C5A572]/50 px-3 py-2 text-sm text-[#2C1810] placeholder:text-[#5C4033]/70 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      style={{ cursor: "text" }}
                    />
                    <Button
                      type="button" 
                      className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                      style={{ cursor: "pointer", whiteSpace: "nowrap" }} 
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                  style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-center mt-4 text-[#5C4033]">
                  Free shipping on orders above ₹500
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}