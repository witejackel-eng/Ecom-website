"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, Eye, ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Specific Adwise Palette */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/city-night.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="section-label mb-6 block">
            // NEXT-GEN SECURITY ARCHITECTURE
          </span>
          <h1 className="text-white mb-8">
            Secure What <br/> 
            <span className="text-gradient">Matters Most.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            Enterprise-grade CCTV, surveillance and biometric solutions designed for high-stakes environments, modern homes, and global institutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/products"
                className="btn-primary flex items-center justify-center gap-2 group w-full"
              >
                Explore Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="px-10 py-4 rounded-full glass text-white font-bold hover:bg-white/10 transition-all duration-300 border border-white/10 flex items-center justify-center w-full"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Floating Visual */}
        <motion.div 
          style={{ y: y1 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 1, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10 glass p-4 rounded-[3rem] border-white/10 shadow-2xl"
          >
            <div className="relative aspect-[4/5] w-[400px] overflow-hidden rounded-[2.5rem]">
              <img 
                src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=1000" 
                alt="Security Technology" 
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Titan Series</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest">Active Protection</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute -top-10 -right-10 glass p-6 rounded-2xl border-white/10 shadow-2xl z-20"
          >
            <Eye className="text-primary h-8 w-8" />
          </motion.div>
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
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
