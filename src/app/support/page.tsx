"use client";

import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import { LifeBuoy, FileText, ShieldCheck, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-24">
          <SectionLabel>Client Intelligence</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
            Support <span className="text-gradient">Portal.</span>
          </h1>
          <p className="text-xl text-white/55 max-w-2xl mx-auto font-medium">
            Expert resources and redundant assistance protocols for your DeviceDestination hardware ecosystem.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            { icon: LifeBuoy, title: "Technical Support", desc: "Expert assistance with deployment, multi-platform configuration, and systemic troubleshooting." },
            { icon: FileText, title: "Asset Documentation", desc: "Secure access to operational manuals, architecture datasheets, and intelligence setup guides." },
            { icon: ShieldCheck, title: "Warranty Protocols", desc: "Comprehensive lifecycle management and secure claim verification for your security infrastructure." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="glass p-12 rounded-[3rem] border-white/5 hover:border-white/20 transition-all duration-500 group h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">{item.desc}</p>
                  <Link 
                    href={i === 1 ? "/downloads" : "/contact"} 
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-all group/link"
                  >
                    Enter Module <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.4} className="mt-32">
          <div className="glass p-12 lg:p-16 rounded-[4rem] border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary opacity-[0.02] -z-10" />
            <h2 className="text-white text-3xl md:text-4xl font-black tracking-tighter mb-6">Need Immediate Technical <span className="text-gradient">Intervention?</span></h2>
            <p className="text-white/55 mb-10 max-w-xl mx-auto font-medium">Our emergency engineering team is available for urgent architecture support and system recovery.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:+918368561919" className="btn-primary flex items-center justify-center gap-3 min-w-[240px]">
                Secure Voice Line
              </a>
              <Link href="/contact" className="px-10 py-5 rounded-full glass text-white font-black text-[10px] uppercase tracking-[0.2em] border border-white/10 hover:bg-white/5 transition-all min-w-[240px]">
                Initiate Ticket
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
