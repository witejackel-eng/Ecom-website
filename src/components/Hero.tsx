"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0A0A0A] overflow-hidden">
      {/* Background Gradients & Dot Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A0E00] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#F28C38 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Animated Orb */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F28C38] rounded-full mix-blend-screen blur-[128px] opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl leading-[1.1] text-[#F5F0E8] mb-8">
              Securing Your <br/> <span className="text-[#F28C38]">Future</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
              Professional surveillance solutions that blend luxury aesthetics with enterprise-grade security. 
              Engineered for those who demand the best.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F28C38] px-8 py-4 text-sm font-bold text-[#0A0A0A] hover:border-[#C9A84C] hover:border hover:bg-[#C96E1A] transition-all duration-300 group"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[#C9A84C] px-8 py-4 text-sm font-bold text-[#F5F0E8] hover:bg-[#C9A84C]/10 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="mt-16 flex gap-8 text-[#C9A84C] text-sm font-heading uppercase tracking-widest">
              <span>500+ Clients</span>
              <span>10,000+ Cameras Installed</span>
              <span>5 Year Warranty</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
