"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div 
            key={index} 
            className={`transition-all duration-500 rounded-[2rem] border ${
              isOpen ? "glass border-white/20" : "border-white/5 hover:border-white/10"
            } overflow-hidden`}
          >
            <button
              className="w-full flex justify-between items-center p-8 text-left group"
              onClick={() => setActiveIndex(isOpen ? null : index)}
            >
              <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                isOpen ? "text-primary" : "text-white/80 group-hover:text-white"
              }`}>
                {item.question}
              </span>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                isOpen ? "bg-primary text-white" : "bg-white/5 text-white/40 group-hover:bg-white/10"
              }`}>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-8 pb-8 text-white/50 text-sm md:text-base leading-relaxed max-w-2xl">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
