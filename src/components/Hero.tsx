"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-[#0A0A0A] overflow-hidden">
      {/* Background Gradients & Dot Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F28C38 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#C9A84C] rounded-full text-[#C9A84C] mb-8">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Enterprise Security Solutions</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-[#F5F0E8] mb-8">
              Premium Surveillance for <br/> <span className="text-[#F28C38]">Modern Business</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
              DeviceDestination delivers professional-grade security, surveillance, and biometric systems. 
              Engineered for reliability, performance, and peace of mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F28C38] px-8 py-4 text-sm font-bold text-[#0A0A0A] hover:bg-[#C96E1A] transition-all duration-300 group"
              >
                Explore Catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[#C9A84C] px-8 py-4 text-sm font-bold text-[#F5F0E8] hover:bg-[#C9A84C]/10 transition-all duration-300"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
