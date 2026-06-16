"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import NumberTicker from "@/components/ui/NumberTicker";

const stats = [
  { label: "Cameras Installed", value: "10,000+" },
  { label: "Business Clients", value: "500+" },
  { label: "Years Warranty", value: "5" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Hero Image Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/city-night.jpg')" }}
      >
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(135deg, rgba(10,31,46,0.80) 0%, rgba(13,61,79,0.60) 50%, rgba(10,31,46,0.75) 100%)"
          }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <FadeIn direction="up">
          <div className="text-left">
            <h1 className="text-[72px] font-extrabold text-white leading-[1.1] mb-6">
              Secure What <br/> Matters Most
            </h1>
            <p className="text-[18px] text-gray-300 mb-10 leading-relaxed">
              Enterprise-grade CCTV, surveillance and biometric solutions designed for homes, businesses and institutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-8 py-4 rounded-full bg-[#F28C38] text-white font-semibold hover:brightness-110 transition-all duration-200"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#0A2A35] transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Right Column: Stats */}
        <FadeIn direction="left" delay={0.2}>
          <div className="flex flex-col gap-12 border-l border-white/20 pl-12">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="text-[64px] font-extrabold text-white mb-1 leading-none">
                  {i === 2 ? stat.value : <NumberTicker value={parseInt(stat.value)} />}{i === 0 || i === 1 ? "+" : ""}
                </div>
                <div className="text-[16px] text-gray-300 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
            <div className="text-[16px] text-[#F28C38] font-bold tracking-widest pt-4">
              Delhi • Noida • Gurgaon • Faridabad
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
