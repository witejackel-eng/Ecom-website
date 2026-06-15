"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import NumberTicker from "@/components/ui/NumberTicker";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-[#FAFAFA] overflow-hidden py-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F5] to-white" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#F28C38 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <h1 className="mb-6">
              Premium Security & <br/> <span className="text-[#F28C38]">Surveillance Solutions</span>
            </h1>
            <p className="description mb-10 max-w-2xl leading-relaxed">
              Enterprise-grade CCTV and surveillance systems designed for homes, businesses and institutions.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#F28C38] px-8 py-4 text-sm font-bold text-white hover:bg-[#C96E1A] transition-all duration-300 shadow-md shadow-[#F28C38]/20"
                >
                  Explore Products
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#F28C38] px-8 py-4 text-sm font-bold text-[#F28C38] hover:bg-[#F28C38] hover:text-white transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col">
                <div className="text-2xl font-heading font-bold text-[#1A1A1A] mb-1">
                  <NumberTicker value={10000} />+
                </div>
                <div className="text-xs uppercase tracking-wider text-[#666666]">Cameras Installed</div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-heading font-bold text-[#1A1A1A] mb-1">
                  <NumberTicker value={500} />+
                </div>
                <div className="text-xs uppercase tracking-wider text-[#666666]">Business Clients</div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-heading font-bold text-[#1A1A1A] mb-1">5</div>
                <div className="text-xs uppercase tracking-wider text-[#666666]">Years Warranty</div>
              </div>
              <div className="col-span-2 md:col-span-1 text-xs font-bold uppercase tracking-wider text-[#F28C38] pt-2">
                Delhi • Noida • Gurgaon • Faridabad
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
