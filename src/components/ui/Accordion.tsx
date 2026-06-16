"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-[#E5E5E5] rounded-xl bg-white overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-6 text-left font-heading text-lg text-[#1A1A1A]"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {item.question}
            <motion.div animate={{ rotate: activeIndex === index ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <Plus className="h-5 w-5 text-[#F28C38]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 text-gray-600 text-sm"
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
