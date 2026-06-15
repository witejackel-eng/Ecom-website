"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-96 bg-[#0F0F0F] border-l border-[#C9A84C] z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-2xl text-[#F5F0E8]">Your Cart ({cartCount})</h2>
              <button onClick={closeCart} className="text-[#F5F0E8] hover:text-[#F28C38]">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center pt-20 text-[#888]">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                  <Link href="/products" onClick={closeCart} className="text-[#F28C38] hover:underline mt-4 block">Continue Shopping</Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 border-b border-[#2A2A2A] pb-4">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-[#F5F0E8] font-bold">{item.name}</h4>
                      <p className="text-xs text-[#888]">{item.model}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 border border-[#C9A84C] text-[#C9A84C] rounded">-</button>
                          <span className="text-[#F5F0E8]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 border border-[#C9A84C] text-[#C9A84C] rounded">+</button>
                        </div>
                        <p className="text-[#F28C38] font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#888] hover:text-red-500">×</button>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-[#2A2A2A] pt-6 mt-6">
                <div className="flex justify-between text-[#F5F0E8] mb-2">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-[#888] mb-6">GST included in price</p>
                <Link href="/checkout" onClick={closeCart} className="w-full flex items-center justify-center gap-2 py-3 bg-[#F28C38] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#C96E1A]">
                  Continue to Checkout <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
