"use client";

import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function FilterSidebar() {
  return (
    <>
      {/* Mobile Filter Button (Trigger) */}
      <div className="md:hidden p-4 border-b border-[#2A2A2A]">
        <button className="w-full py-2 bg-[#1A1A1A] border border-[#C9A84C] text-[#F5F0E8] font-bold rounded-lg">
          Filters
        </button>
      </div>

      {/* Sidebar Content */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex flex-col w-64 flex-shrink-0 bg-[#0F0F0F] border-r border-[#C9A84C] p-6 text-[#F5F0E8] h-full"
      >
        <h2 className="font-heading text-xl mb-8">Filters</h2>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-[#F5F0E8] font-bold mb-4 font-heading">Category</h3>
          {["Dome Cameras", "Bullet Cameras", "NVR Systems", "Biometric Machines"].map((cat) => (
            <div key={cat} className="flex items-center mb-3">
              <Checkbox.Root className="w-5 h-5 border border-[#C9A84C] rounded flex items-center justify-center data-[state=checked]:bg-[#F28C38] data-[state=checked]:border-[#F28C38]">
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-[#0A0A0A]" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="ml-3 text-sm">{cat}</label>
            </div>
          ))}
          </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-[#F5F0E8] font-bold mb-4 font-heading">Price Range (₹0 - ₹10,000)</h3>
          <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" defaultValue={[0, 10000]} max={10000} step={100}>
            <Slider.Track className="bg-[#C9A84C] relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-[#F28C38] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-[#F28C38] rounded-full shadow-[0_0_10px_rgba(242,140,56,0.5)] focus:outline-none" />
            <Slider.Thumb className="block w-5 h-5 bg-[#F28C38] rounded-full shadow-[0_0_10px_rgba(242,140,56,0.5)] focus:outline-none" />
          </Slider.Root>
        </div>
      </motion.aside>
    </>
  );
}
