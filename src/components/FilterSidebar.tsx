"use client";

import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

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
    <div className="flex flex-col h-full bg-white p-6 text-[#1A1A1A] overflow-y-auto border-r border-[#E5E5E5]">
      <div className="flex justify-between items-center mb-8 md:hidden">
        <h2 className="font-heading text-xl">Filters</h2>
        <button onClick={() => setIsOpen(false)}><X className="h-6 w-6" /></button>
      </div>
      <h2 className="font-heading text-xl mb-8 hidden md:block">Filters</h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-widest text-[#F28C38] font-bold mb-4 font-heading">Category</h3>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-3">
            <Checkbox.Root 
              className="w-5 h-5 border border-[#E5E5E5] rounded flex items-center justify-center data-[state=checked]:bg-[#F28C38] data-[state=checked]:border-[#F28C38]"
              onCheckedChange={() => handleCategoryChange(cat)}
              checked={selectedCategories.includes(cat)}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="ml-3 text-sm text-[#1A1A1A]">{cat}</label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-widest text-[#F28C38] font-bold mb-4 font-heading">Price Range (₹0 - ₹20,000)</h3>
        <Slider.Root 
          className="relative flex items-center select-none touch-none w-full h-5" 
          value={[priceRange[0], priceRange[1]]} 
          max={20000} 
          step={500}
          onValueChange={handlePriceChange}
        >
          <Slider.Track className="bg-[#E5E5E5] relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-[#F28C38] rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-[#F28C38] rounded-full shadow-lg focus:outline-none" />
          <Slider.Thumb className="block w-5 h-5 bg-[#F28C38] rounded-full shadow-lg focus:outline-none" />
        </Slider.Root>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden p-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-2 bg-[#FAFAFA] border border-[#E5E5E5] text-[#1A1A1A] font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <aside className="hidden md:block w-72 flex-shrink-0 h-[calc(100vh-80px)] sticky top-20">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[60] md:hidden bg-white"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
