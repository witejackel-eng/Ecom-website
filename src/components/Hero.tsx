"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/city-night.jpg')" }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,31,46,0.65)_0%,rgba(13,61,79,0.45)_50%,rgba(10,31,46,0.60)_100%)]" />
      </div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-tangerine)] rounded-full blur-[120px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-tangerine)] rounded-full blur-[120px] opacity-5 animate-pulse delay-1000" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6">
            // Professional Security Ecosystems
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            Secure Your <br/> <span className="text-[var(--color-tangerine)]">World.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            CP Plus and ESSL cameras, NVR systems, and biometric devices — supplied and installed across Delhi, Noida, Gurgaon, and Faridabad.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="px-8 py-4 rounded-full bg-[var(--color-tangerine)] text-white font-bold flex items-center gap-2 hover:bg-[var(--color-tangerine-light)] transition-all">
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-full border border-[rgba(255,138,0,0.3)] text-white font-bold hover:bg-white/5 transition-all">
              Request Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
