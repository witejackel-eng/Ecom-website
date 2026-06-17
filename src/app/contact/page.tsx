"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <FadeIn direction="up" className="text-center mb-24">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
            Get <span className="text-gradient">In Touch.</span>
          </h1>
          <p className="text-xl text-white/55 max-w-2xl mx-auto font-medium">
            Have a question, need a quote, or want to book an installation? We are available Monday to Saturday.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <div className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                      <MapPin size={24} />
                    </div>
                    <h3 className="font-bold text-white text-xl tracking-tight uppercase">Our Office</h3>
                  </div>
                  <p className="text-white/55 leading-relaxed font-bold">
                    Plot No. 94, 3rd Floor, Block - B, Sector - 13, Dwarka, New Delhi - 110075
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <a href="tel:+918368561919" className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-xl">
                      <Phone size={24} />
                    </div>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-2">Phone</p>
                    <p className="text-white font-bold tracking-tight">+91 83685 61919</p>
                  </a>
                  <a href="mailto:manish@insight-solutions.in" className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-xl">
                      <Mail size={24} />
                    </div>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-2">Email</p>
                    <p className="text-white font-bold tracking-tight text-[11px] break-all">manish@insight-solutions.in</p>
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl tracking-tight uppercase">Business Hours</h3>
                      <p className="text-white/55 font-bold mt-1">Monday – Saturday, 10:00 AM – 7:00 PM</p>
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
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-4">YOUR NAME</label>
                    <input 
                      placeholder="Your Name" 
                      className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none font-medium" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-4">YOUR EMAIL</label>
                    <input 
                      placeholder="your@email.com" 
                      className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none font-medium" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-4">YOUR MESSAGE</label>
                  <textarea 
                    placeholder="Tell us what you need — a product question, a quote for your office, or to book an installation." 
                    rows={5} 
                    className="w-full p-6 bg-white/5 border border-white/5 rounded-[2rem] text-white placeholder:text-white/20 focus:border-primary focus:bg-white/10 transition-all outline-none resize-none font-medium"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-primary text-white font-black text-sm uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/30"
                >
                  Send Message <Send size={18} />
                </motion.button>
              </form>
            </ScaleIn>
          </div>
        </div>
      </div>
    </main>
  );
}
