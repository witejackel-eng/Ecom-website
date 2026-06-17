"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0A1F2E] border-l border-white/10 z-[60] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center">
                <h2 className="text-[22px] font-bold text-white">Your Cart</h2>
                <span className="ml-2 bg-white/10 text-gray-300 text-[14px] px-2 py-0.5 rounded-full">{cartCount}</span>
              </div>
              <button onClick={closeCart} className="text-white hover:text-gray-300 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 cart-body">
              {cartItems.length === 0 ? (
                <div className="text-center pt-20">
                  <ShoppingCart size={40} className="mx-auto text-gray-500" />
                  <p className="text-gray-400 mt-3">Your cart is empty</p>
                  <Link href="/products" onClick={closeCart} className="text-orange-500 text-sm mt-4 inline-block">Browse Products</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 py-4 border-b border-white/10 last:border-b-0">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium leading-tight line-clamp-2">{item.name}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">{item.model}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-lg">−</button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-lg">+</button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-orange-500 text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 text-[11px] mt-1 hover:text-gray-300">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-white font-bold text-[22px]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Taxes</span>
                    <span className="text-gray-500 text-xs">Included</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => { router.push('/checkout'); closeCart(); }}
                  className="w-full bg-orange-500 text-white py-3.5 rounded-full font-semibold text-[15px]"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={closeCart}
                  className="w-full border border-white/20 text-gray-300 py-3 rounded-full text-[14px] mt-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
