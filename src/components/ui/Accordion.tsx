import { Plus } from "lucide-react";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={index}
          className="group rounded-[24px] border border-white/5 open:glass open:border-primary/30 open:shadow-[0_10px_30px_rgba(255,122,26,0.05)] hover:border-white/10 transition-colors duration-300 overflow-hidden"
        >
          <summary className="flex justify-between items-center gap-6 p-6 md:p-8 text-left cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-bold transition-colors duration-300 text-white/80 group-open:text-primary group-hover:text-white">
              {item.question}
            </span>
            <span className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-white/5 text-primary group-open:bg-primary group-open:text-white group-hover:bg-white/10 transition-all duration-300">
              <Plus size={18} className="transition-transform duration-300 group-open:rotate-45" />
            </span>
          </summary>
          <div className="px-8 pb-8 text-white/50 text-base leading-relaxed max-w-2xl accordion-reveal">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
