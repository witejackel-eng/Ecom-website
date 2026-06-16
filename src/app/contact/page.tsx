"use client";

import { MapPin, Phone, Mail, Clock, Send, Globe, Shield, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary-dark/10 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <FadeIn direction="up" className="text-center mb-24">
          <SectionLabel>Connect</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Initiate <span className="text-gradient">Consultation</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Our security architects are ready to design your bespoke surveillance ecosystem.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <div className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <MapPin size={24} />
                    </div>
                    <h3 className="font-bold text-white text-xl uppercase tracking-tighter">Global Headquarters</h3>
                  </div>
                  <p className="text-white/50 leading-relaxed font-medium">
                    Plot No. 94, 3rd Floor, Block - B, Pocket - 10, Sector - 13, Dwarka, New Delhi - 110075
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <a href="tel:+918368561919" className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-6">
                      <Phone size={24} />
                    </div>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-2">Voice Interface</p>
                    <p className="text-white font-bold tracking-tight">+91 83685 61919</p>
                  </a>
                  <a href="mailto:manish@insight-solutions.in" className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-6">
                      <Mail size={24} />
                    </div>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-2">Secure Mail</p>
                    <p className="text-white font-bold tracking-tight text-xs break-all">manish@insight-solutions.in</p>
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl uppercase tracking-tighter">Operational Hours</h3>
                      <p className="text-white/50 font-medium">Mon – Sat &middot; 10:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ScaleIn duration={1}>
              <form className="glass p-12 lg:p-16 rounded-[4rem] border-white/10 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
                
                <div className="relative z-10 grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Identity</label>
                    <input 
                      placeholder="Full Name" 
                      className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Direct Channel</label>
                    <input 
                      placeholder="Email Address" 
                      className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Architecture Requirements</label>
                  <textarea 
                    placeholder="Describe your security objectives..." 
                    rows={5} 
                    className="w-full p-6 bg-white/5 border border-white/5 rounded-[2rem] text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-premium-gradient text-white font-black text-sm uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/20"
                >
                  Initiate Transmission <Send size={18} />
                </motion.button>
              </form>
            </ScaleIn>
          </div>
        </div>
      </div>
    </main>
  );
}
