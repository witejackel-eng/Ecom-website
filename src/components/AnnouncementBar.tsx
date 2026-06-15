"use client";

import { motion } from "framer-motion";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-[#0A0A0A] border-b border-[#2A2A2A] overflow-hidden py-2">
      <motion.div
        className="whitespace-nowrap text-[#F28C38] text-xs font-heading uppercase tracking-widest"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        Free shipping on orders above ₹5,000 · Trusted by 500+ businesses across India · Premium Security Solutions
      </motion.div>
    </div>
  );
}
