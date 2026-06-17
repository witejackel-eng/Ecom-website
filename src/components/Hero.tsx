"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const stats = [
    { label: "Projects", value: "5000+" },
    { label: "Years", value: "10+" },
    { label: "Support", value: "24/7" },
    { label: "Genuine", value: "100%" },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-tangerine)] rounded-full blur-[120px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-tangerine)] rounded-full blur-[120px] opacity-5 animate-pulse delay-1000" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center mb-20">
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
            Premium surveillance solutions for businesses that demand uncompromising protection and absolute clarity.
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

      {/* Stats Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 w-full max-w-5xl">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="glass p-6 rounded-3xl border border-tangerine hover:border-tangerine-hover glow-tangerine"
          >
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
