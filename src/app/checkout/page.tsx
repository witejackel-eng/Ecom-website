"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Lock, CreditCard, ArrowRight, Package } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const phone = formData.get("phone") as string;
    const pin = formData.get("pin") as string;
    
    const newErrors: any = {};
    if (phone.length !== 10) newErrors.phone = "Must be 10 digits";
    if (pin.length !== 6) newErrors.pin = "Must be 6 digits";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <ScaleIn duration={0.8}>
          <div className="glass p-12 lg:p-20 rounded-[4rem] border-white/10 max-w-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-premium-gradient opacity-5 -z-10" />
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">Order Successfully <span className="text-gradient">Architected</span></h2>
            <p className="text-white/50 mb-12 text-lg leading-relaxed">Your order number is <span className="text-primary font-bold">#{Math.floor(100000 + Math.random() * 900000)}</span>. Our elite dispatch team will contact you within 24 hours to coordinate secure deployment.</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-3">
              Continue Exploration <ArrowRight size={20} />
            </Link>
          </div>
        </ScaleIn>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn direction="up" className="mb-20">
          <SectionLabel>Checkout</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter">Finalize <span className="text-gradient">Deployment</span></h1>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left: Summary */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn direction="up" delay={0.2}>
              <div className="glass p-10 rounded-[3rem] border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Package size={80} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <Package size={20} className="text-primary" /> Order Architecture
                </h3>
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center group">
                      <div className="flex flex-col">
                        <span className="text-white/70 font-medium group-hover:text-white transition-colors">{item.name}</span>
                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.quantity} Unit(s)</span>
                      </div>
                      <span className="text-white font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Total Investment</span>
                  <span className="text-3xl font-black text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className="space-y-4">
              <div className="flex items-center gap-4 text-white/40">
                <ShieldCheck size={18} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Transmission Protocol</span>
              </div>
              <div className="flex items-center gap-4 text-white/40">
                <Lock size={18} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Dispatch Verification</span>
              </div>
            </FadeIn>
          </div>

          {/* Right: Payment/Details */}
          <div className="lg:col-span-7">
            <ScaleIn duration={1}>
              <form onSubmit={handleSubmit} className="glass p-12 lg:p-16 rounded-[4rem] border-white/10 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
                
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                  <CreditCard size={20} className="text-primary" /> Personnel Details
                </h3>

                <div className="relative z-10 grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3 col-span-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Full Identity</label>
                    <input name="name" required placeholder="Full Name" className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none" />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Communication Channel</label>
                    <input name="email" type="email" required placeholder="Email Address" className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Secure Line</label>
                    <input name="phone" required placeholder="Phone (10 digits)" className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none" />
                    {errors.phone && <span className="text-primary text-[10px] font-bold uppercase ml-4">{errors.phone}</span>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Sector Code</label>
                    <input name="pin" required placeholder="PIN Code (6 digits)" className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none" />
                    {errors.pin && <span className="text-primary text-[10px] font-bold uppercase ml-4">{errors.pin}</span>}
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-6 bg-primary text-white font-black text-sm uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 relative z-10"
                >
                  Finalize Acquisition <ArrowRight size={18} />
                </motion.button>
              </form>
            </ScaleIn>
          </div>
        </div>
      </div>
    </main>
  );
}
