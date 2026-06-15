"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-[#FAFAFA] overflow-hidden py-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F5] to-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-[#C96E1A] mb-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest">Enterprise Security Solutions</span>
            </div>
            <h1 className="mb-6">
              Premium Security & <br/> <span className="text-[#F28C38]">Surveillance Solutions</span>
            </h1>
            <p className="description mb-10 max-w-2xl leading-relaxed">
              Enterprise-grade CCTV and surveillance systems designed for homes, businesses and institutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F28C38] px-8 py-4 text-sm font-bold text-white hover:bg-[#C96E1A] transition-all duration-300 shadow-md shadow-[#F28C38]/20"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[#F28C38] px-8 py-4 text-sm font-bold text-[#F28C38] hover:bg-[#F28C38] hover:text-white transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
