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

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 w-full flex items-center justify-center text-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="section-label mb-6 block">
            // SECURITY SYSTEMS
          </span>
          <h1 className="text-white mb-8">
            Protect What <br/> 
            <span className="text-gradient">You've Built.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            CP Plus and ESSL cameras, NVR systems, and biometric devices — supplied and installed across Delhi, Noida, Gurgaon, and Faridabad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
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
      </div>
    </section>
  );
}
