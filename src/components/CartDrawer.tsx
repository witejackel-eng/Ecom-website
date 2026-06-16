"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass border-l border-white/10 z-[60] p-8 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <SectionLabel>Ecosystem</SectionLabel>
                <h2 className="text-3xl font-black text-white tracking-tighter">Your Cart ({cartCount})</h2>
              </div>
              <button onClick={closeCart} className="h-12 w-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center pt-20">
                  <div className="h-24 w-24 rounded-full glass flex items-center justify-center mx-auto mb-8 text-white/10">
                    <ShoppingCart size={40} />
                  </div>
                  <p className="text-white/30 font-medium mb-8 uppercase tracking-[0.2em] text-xs">Your system is empty</p>
                  <Link href="/products" onClick={closeCart} className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                    Continue Browsing <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-6 group">
                    <div className="relative h-24 w-24 rounded-2xl glass border-white/10 overflow-hidden bg-white/5 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover p-2" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-white font-bold leading-tight line-clamp-2">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.model}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center glass rounded-xl border-white/5 p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="h-8 w-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-white text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="h-8 w-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-primary font-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="mt-8 space-y-6">
                <div className="glass rounded-[2rem] p-8 border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Total Investment</span>
                    <span className="text-2xl font-black text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    <span>Tax protocols</span>
                    <span>Inclusive</span>
                  </div>
                </div>
                
                <Link href="/checkout" onClick={closeCart} className="w-full h-16 bg-premium-gradient text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/20">
                  Deploy System <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
