"use client";

import { motion } from "framer-motion";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-background/50 backdrop-blur-md border-b border-white/5 overflow-hidden py-1.5">
      <motion.div
        className="whitespace-nowrap text-white/40 text-[10px] font-medium uppercase tracking-[0.3em]"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        Free shipping on orders above ₹5,000 · Serving Delhi, Noida, Gurgaon & Faridabad · Call: +91 83685 61919 · Premium Security Solutions
      </motion.div>
    </div>
  );
}
