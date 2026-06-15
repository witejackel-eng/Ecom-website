"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const stats = [
  { label: "Cameras Installed", value: "10,000+" },
  { label: "Business Clients", value: "500+" },
  { label: "Warranty", value: "5 Years" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-white overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] to-white" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F28C38 2px, transparent 2px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl">
            <h1 className="mb-6">
              Secure What <span className="text-[#F28C38]">Matters Most</span>
            </h1>
            <p className="description mb-10 max-w-2xl leading-relaxed">
              Enterprise-grade CCTV, surveillance and biometric solutions designed for homes, businesses and institutions.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-16">
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

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-2xl font-heading font-bold text-[#1A1A1A] mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-[#666666]">{stat.label}</div>
                </motion.div>
              ))}
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
