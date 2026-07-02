"use client";

import Link from "next/link";
import { ArrowRight, Trash2, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const tax = cartTotal * 0.18;
  const total = cartTotal + tax;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center">
        <ScaleIn duration={0.8}>
          <div className="glass p-12 lg:p-20 rounded-[4rem] border-white/10 max-w-2xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full glass border-white/10 mb-8 text-white/10">
              <ShoppingCart size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">Your System is <span className="text-gradient">Empty</span></h1>
            <p className="text-white/50 mb-12 text-lg">Looks like you haven't architected any security solutions yet. Start exploring our high-performance hardware collection.</p>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center gap-3"
            >
              Explore Collection <ArrowRight size={20} />
            </Link>
          </div>
        </ScaleIn>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn direction="up" className="mb-20">
          <SectionLabel>Your System</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter">Shopping <span className="text-gradient">Cart</span></h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-8">
            <StaggerContainer className="space-y-6">
              {cartItems.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group flex flex-col sm:flex-row gap-8 items-center">
                    <div className="relative h-32 w-32 shrink-0 rounded-3xl glass border-white/10 overflow-hidden bg-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover p-4"
                      />
                    </div>
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{item.model}</p>
                        <h3 className="text-2xl font-bold text-white leading-tight">{item.name}</h3>
                      </div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
                        <div className="flex items-center glass rounded-2xl border-white/10 p-1.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-10 w-10 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm font-black w-10 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-10 w-10 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="text-2xl font-black text-primary">₹{(item.mrp * item.quantity).toLocaleString('en-IN')}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-red-500 transition-colors p-3 glass border-white/5 rounded-2xl"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <FadeIn direction="up">
              <div className="glass p-10 rounded-[3rem] border-white/10 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
                <h2 className="text-2xl font-black text-white tracking-tight">System Summary</h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Subtotal</span>
                    <span className="text-white font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Protocol Tax (18%)</span>
                    <span className="text-white font-bold">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Total Investment</span>
                    <span className="text-4xl font-black text-white">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <Link
                    href="/checkout"
                    className="btn-primary w-full flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30"
                  >
                    Proceed to Deployment <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-center px-8 py-4 rounded-full glass border-white/10 text-white/40 hover:text-white font-bold text-sm transition-all"
                  >
                    Continue Acquisition
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
