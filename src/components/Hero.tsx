"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, Eye, Activity } from "lucide-react";

const stats = [
  { label: "Cameras Installed", value: "10k+" },
  { label: "Business Clients", value: "500+" },
  { label: "Years Warranty", value: "5" },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden pt-20">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=2000')",
            opacity: 0.15
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -80, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-primary-dark/30 rounded-full blur-[150px]"
        />
      </div>

      {/* Floating Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-[20%] right-[15%] z-10 hidden lg:block">
        <div className="glass p-6 rounded-3xl flex items-center gap-4 border-white/10 shadow-2xl">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Shield size={24} />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Enterprise Security</div>
            <div className="text-white/40 text-[10px] uppercase tracking-widest">Active Protection</div>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-[25%] left-[10%] z-10 hidden lg:block">
        <div className="glass p-6 rounded-3xl flex items-center gap-4 border-white/10 shadow-2xl">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Eye size={24} />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Smart Monitoring</div>
            <div className="text-white/40 text-[10px] uppercase tracking-widest">AI Detection</div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-8">
            Next-Gen Security Architecture
          </span>
          <h1 className="text-white mb-8">
            Secure What <br/> 
            <span className="text-gradient">Matters Most</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            Enterprise-grade CCTV, surveillance and biometric solutions designed for high-stakes environments, modern homes, and institutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="px-10 py-5 rounded-full bg-premium-gradient text-white font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 border border-white/10 block w-full sm:w-auto"
              >
                Explore Collection
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="px-10 py-5 rounded-full glass text-white font-bold hover:bg-white/10 transition-all duration-300 border border-white/10 block w-full sm:w-auto"
              >
                Request Consultation
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto border-t border-white/5 pt-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
