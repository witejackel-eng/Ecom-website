"use client";

import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "All Products",
    "IP Cameras",
    "Dome Cameras",
    "Bullet Cameras",
    "Dual Light Cameras",
    "NVR Systems",
    "Biometric Machines",
    "Accessories"
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0F0F0F] p-6 text-[#F5F0E8] overflow-y-auto">
      <div className="flex justify-between items-center mb-8 md:hidden">
        <h2 className="font-heading text-xl">Filters</h2>
        <button onClick={() => setIsOpen(false)}><X className="h-6 w-6" /></button>
      </div>
      <h2 className="font-heading text-xl mb-8 hidden md:block">Filters</h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4 font-heading">Category</h3>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-3">
            <Checkbox.Root className="w-5 h-5 border border-[#2A2A2A] rounded flex items-center justify-center data-[state=checked]:bg-[#F28C38] data-[state=checked]:border-[#F28C38]">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-[#0A0A0A]" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="ml-3 text-sm text-[#F5F0E8]">{cat}</label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4 font-heading">Price Range (₹0 - ₹20,000)</h3>
        <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" defaultValue={[0, 20000]} max={20000} step={500}>
          <Slider.Track className="bg-[#2A2A2A] relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-[#F28C38] rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-[#F28C38] rounded-full shadow-[0_0_10px_rgba(242,140,56,0.5)] focus:outline-none" />
          <Slider.Thumb className="block w-5 h-5 bg-[#F28C38] rounded-full shadow-[0_0_10px_rgba(242,140,56,0.5)] focus:outline-none" />
        </Slider.Root>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden p-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-2 bg-[#111] border border-[#2A2A2A] text-[#F5F0E8] font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 border-r border-[#2A2A2A] h-[calc(100vh-80px)] sticky top-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[60] md:hidden bg-[#0F0F0F]"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
