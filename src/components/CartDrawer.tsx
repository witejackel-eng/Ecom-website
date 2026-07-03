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
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0A1F2E] border-l border-[rgba(255,138,0,0.15)] z-[60] flex flex-col shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-5 border-b border-white/10 shrink-0">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} className="text-[var(--color-tangerine)]" />
                  <h2 className="text-lg font-bold text-white tracking-tight">Your Cart</h2>
                  {cartCount > 0 && (
                    <span className="bg-[var(--color-tangerine)] text-white text-[11px] font-bold px-2 py-0.5 rounded-full leading-none">{cartCount}</span>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  className="h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center transition-all duration-200 shadow-lg shrink-0"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 font-medium">Review your selected security products.</p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto cart-body px-6">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  className="pt-20 text-center"
                >
                  <div className="mx-auto h-20 w-20 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center mb-6">
                    <ShoppingCart size={36} className="text-gray-500" />
                  </div>
                  <h3 className="text-white text-base font-bold mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
                    Add CCTV cameras, networking equipment, or accessories to start building your quotation.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center px-6 py-3 mt-8 rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white text-sm font-bold shadow-lg shadow-[var(--color-tangerine)]/20 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/30 hover:-translate-y-0.5 transition-all duration-250"
                  >
                    Browse Products
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="py-6 space-y-5"
                >
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="flex gap-4 pb-5 border-b border-white/5 last:border-b-0"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold leading-snug truncate">{item.name}</h4>
                        <p className="text-gray-500 text-xs mt-1">{item.model}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center text-base hover:bg-white/10 hover:text-white transition-all duration-200"
                          >
                            −
                          </button>
                          <span className="text-white text-sm font-semibold w-6 text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center text-base hover:bg-white/10 hover:text-white transition-all duration-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0 flex flex-col items-end justify-between">
                        <p className="text-orange-400 text-sm font-bold tabular-nums">₹{(item.mrp * item.quantity).toLocaleString('en-IN')}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 text-[11px] font-medium hover:text-red-400 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 px-6 pb-6 pt-4 border-t border-white/5">
              {cartItems.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm font-medium">Subtotal</span>
                      <span className="text-white text-xl font-bold tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-gray-500 text-xs">Taxes</span>
                      <span className="text-gray-500 text-xs">Included</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { router.push('/checkout'); closeCart(); }}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white font-bold text-sm shadow-lg shadow-[var(--color-tangerine)]/20 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/30 hover:-translate-y-0.5 transition-all duration-250"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={closeCart}
                    className="w-full py-3.5 mt-3 rounded-full border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/[0.03] hover:text-white transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <p className="text-center text-gray-600 text-[11px] font-medium py-2">Your quotation will appear here</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}