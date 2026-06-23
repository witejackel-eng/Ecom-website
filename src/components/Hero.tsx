"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section 
      className="relative min-h-[90vh] flex flex-col items-start justify-center pt-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A1F2E 0%, #0D3D4F 40%, #0A2A35 70%, #061418 100%)'
      }}
    >
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-tangerine)] rounded-full blur-[120px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-tangerine)] rounded-full blur-[120px] opacity-5 animate-pulse delay-1000" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-left w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6 text-left">
            // Professional Security Ecosystems
          </span>
          <h1 
            className="text-white font-black tracking-tighter mb-8"
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: '1.1'
            }}
          >
            Secure Your <br/> <span className="text-[var(--color-tangerine)]">World.</span>
          </h1>
          <p 
            className="text-gray-300 mb-12"
            style={{
              maxWidth: '540px',
              textAlign: 'left',
              fontSize: '18px',
              lineHeight: '1.7',
              color: 'rgba(255,255,255,0.75)'
            }}
          >
            CP Plus and ESSL cameras, NVR systems, and biometric devices — supplied and installed across Delhi, Noida, Gurgaon, and Faridabad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
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
