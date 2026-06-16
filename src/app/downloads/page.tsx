"use client";

import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import { Download, FileText, BookOpen, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

export default function DownloadsPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-24">
          <SectionLabel>Resource Center</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
            Technical <span className="text-gradient">Assets.</span>
          </h1>
          <p className="text-xl text-white/55 max-w-2xl mx-auto font-medium">
            Access secure documentation, configuration protocols, and architecture datasheets for your surveillance ecosystem.
          </p>
        </FadeIn>

        <ScaleIn duration={0.8}>
          <div className="glass rounded-[3rem] border-white/10 overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000" />
            
            <div className="p-10 md:p-12 border-b border-white/5 relative z-10">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">Encryption & Protocols</h3>
            </div>
            
            <div className="divide-y divide-white/5 relative z-10">
              {[
                { name: "CP Plus Architecture Series - Full Datasheet", type: "Technical PDF", size: "2.4 MB" },
                { name: "NVR Configuration & Intelligence Setup Guide", type: "Operational Guide", size: "4.1 MB" },
                { name: "Global Warranty & Return Protocol Document", type: "Security Compliance", size: "1.2 MB" },
              ].map((doc, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-10 md:p-12 hover:bg-white/[0.02] transition-all group/item">
                  <div className="flex items-center gap-6 mb-6 sm:mb-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-primary shadow-xl group-hover/item:bg-primary group-hover/item:text-white transition-all">
                      {i === 0 ? <FileText size={28} /> : <BookOpen size={28} />}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white group-hover/item:text-primary transition-colors">{doc.name}</p>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">{doc.type} &middot; {doc.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all group/btn">
                    <Download size={16} className="group-hover/btn:scale-110 transition-transform" />
                    Secure Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ScaleIn>

        <FadeIn direction="up" delay={0.4} className="mt-20 text-center">
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] mb-8">Require Custom Documentation?</p>
          <a href="/contact" className="inline-flex items-center gap-3 glass px-10 py-5 rounded-full border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
            Contact Engineering <ArrowRight size={14} className="text-primary" />
          </a>
        </FadeIn>
      </div>
    </main>
  );
}
