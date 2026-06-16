"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
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

        {/* Right: Stats Stack */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col border-l border-white/10 pl-12"
        >
          {[
            { value: "10,000+", label: "CAMERAS INSTALLED" },
            { value: "500+", label: "BUSINESS CLIENTS" },
            { value: "5", label: "YEARS WARRANTY", color: "text-primary" }
          ].map((stat, i) => (
            <div key={i} className="py-6 border-b border-white/10 last:border-b-0">
              <div className={`text-[64px] font-black tracking-tighter ${stat.color || "text-white"}`}>
                {stat.value}
              </div>
              <div className="text-[13px] font-medium text-gray-400 tracking-[0.1em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
