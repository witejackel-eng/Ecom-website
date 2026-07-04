"use client";

import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import SectionLabel from "./SectionLabel";

export default function FilterSidebar({ 
  onFilterChange 
}: { 
  onFilterChange: (categories: string[], priceRange: [number, number]) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleCategoryChange = (cat: string) => {
    const next = selectedCategories.includes(cat) 
      ? selectedCategories.filter(c => c !== cat) 
      : [...selectedCategories, cat];
    setSelectedCategories(next);
    onFilterChange(next, priceRange);
  };

  const handlePriceChange = (val: number[]) => {
    const range: [number, number] = [val[0], val[1]];
    setPriceRange(range);
    onFilterChange(selectedCategories, range);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full glass text-white border-r border-white/5 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
      
      <div className="shrink-0 px-8 pt-8 pb-5 border-b border-white/10 flex items-center justify-between md:hidden">
        <h2 className="text-3xl font-black tracking-tighter">Filters</h2>
        <button
            onClick={() => setIsOpen(false)}
            className="h-11 w-11 shrink-0 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-tangerine)] focus:ring-offset-2 focus:ring-offset-[#0A1F2E] transition-all duration-200"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8">
      <div className="hidden md:block mb-12">
        <SectionLabel>Refine</SectionLabel>
        <h2 className="text-3xl font-black tracking-tighter text-white">Filters</h2>
      </div>

      {/* Category Filter */}
      <div className="mb-12">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-8">CATEGORY</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center group cursor-pointer" onClick={() => handleCategoryChange(cat)}>
              <Checkbox.Root 
                className="w-6 h-6 rounded-xl glass border-white/10 flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-300"
                checked={selectedCategories.includes(cat)}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="ml-4 text-sm font-medium text-white/50 group-hover:text-white transition-colors cursor-pointer">{cat}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-12">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-8">Investment Range</h3>
        <div className="px-2">
          <Slider.Root 
            className="relative flex items-center select-none touch-none w-full h-10" 
            value={[priceRange[0], priceRange[1]]} 
            max={20000} 
            step={500}
            onValueChange={handlePriceChange}
          >
            <Slider.Track className="bg-white/5 relative grow rounded-full h-[4px]">
              <Slider.Range className="absolute bg-primary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-6 h-6 glass border-white/20 rounded-full shadow-2xl focus:outline-none cursor-pointer hover:scale-110 transition-transform" />
            <Slider.Thumb className="block w-6 h-6 glass border-white/20 rounded-full shadow-2xl focus:outline-none cursor-pointer hover:scale-110 transition-transform" />
          </Slider.Root>
          <div className="flex justify-between mt-4">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">₹{priceRange[0]}</span>
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">₹{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden p-6">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-4 glass border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3"
        >
          <Filter className="h-4 w-4 text-primary" /> Filter Systems
        </button>
      </div>

      <aside className="hidden md:block w-80 flex-shrink-0 h-[calc(100vh-120px)] sticky top-32 px-4">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

