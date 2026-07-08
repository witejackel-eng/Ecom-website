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
          <p className="text-xl text-white/55 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about CCTV, biometric systems, networking products, or OEM warranty? Request a quotation or speak with our team for expert product guidance.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <div className="glass p-8 lg:p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <MapPin size={24} />
                    </div>
                    <h3 className="font-bold text-white text-lg tracking-tight uppercase">Office</h3>
                  </div>
                  <p className="text-white/55 leading-relaxed font-bold mb-5">
                    Plot No. 94, 3rd Floor, Block - B, Sector - 13, Dwarka, New Delhi - 110075
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] transition-all duration-200"
                  >
                    View on Google Maps
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <a href="tel:+918368561919" className="glass p-8 lg:p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-6">
                      <Phone size={24} />
                    </div>
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] mb-2">Phone</p>
                    <p className="text-white font-bold tracking-tight text-sm">+91 83685 61919</p>
                  </a>
                  <a href="mailto:manish@insight-solutions.in" className="glass p-8 lg:p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-6">
                      <Mail size={24} />
                    </div>
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] mb-2">Email</p>
                    <p className="text-white font-bold tracking-tight text-sm break-all">manish@insight-solutions.in</p>
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-8 lg:p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg tracking-tight uppercase">Business Hours</h3>
                      <p className="text-white/55 font-bold mt-1.5 text-sm leading-relaxed">Monday – Saturday<br/>10:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ScaleIn duration={1}>
              <div className="mb-8">
                <p className="text-white/70 text-sm font-medium mb-3">Need immediate assistance?</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <a href="tel:+918368561919" className="text-[var(--color-tangerine)] font-bold hover:underline underline-offset-4 decoration-white/20 transition-all">Call Us</a>
                  <a href="mailto:manish@insight-solutions.in" className="text-[var(--color-tangerine)] font-bold hover:underline underline-offset-4 decoration-white/20 transition-all">Email Us</a>
                  <span className="text-gray-400">Business Hours: Mon – Sat, 10 AM – 7 PM</span>
                </div>
              </div>

              <form className="glass p-8 lg:p-12 rounded-[3rem] border-white/10 space-y-7 relative overflow-hidden group">
                <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
                
                <div className="relative z-10 grid sm:grid-cols-2 gap-7">
                  <div className="space-y-2.5">
                    <label htmlFor="name" className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Name</label>
                    <input 
                      id="name"
                      placeholder="Your full name" 
                      className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="email" className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Email</label>
                    <input 
                      id="email"
                      type="email"
                      placeholder="you@company.com" 
                      className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="phone" className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Phone Number</label>
                    <input 
                      id="phone"
                      placeholder="+91 98765 43210" 
                      className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="company" className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Company <span className="normal-case tracking-normal text-gray-500 font-medium">(Optional)</span></label>
                    <input 
                      id="company"
                      placeholder="Company name" 
                      className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <label htmlFor="subject" className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Subject</label>
                  <select id="subject" className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium appearance-none">
                    <option value="" className="bg-[#0D2530]">Select a topic</option>
                    <option value="inquiry" className="bg-[#0D2530]">Product Inquiry</option>
                    <option value="bulk" className="bg-[#0D2530]">Bulk Order</option>
                    <option value="warranty" className="bg-[#0D2530]">Warranty Support</option>
                    <option value="installation" className="bg-[#0D2530]">Installation Assistance</option>
                    <option value="general" className="bg-[#0D2530]">General Enquiry</option>
                  </select>
                </div>
                
                <div className="space-y-2.5">
                  <label htmlFor="message" className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Message</label>
                  <textarea 
                    id="message"
                    placeholder="Tell us about your requirements, project scope, or any questions you have." 
                    rows={5} 
                    className="w-full p-5 bg-white/[0.04] border border-white/10 rounded-[1.5rem] text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none resize-none font-medium leading-relaxed"
                  ></textarea>
                </div>

                <motion.button 
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white font-black text-sm uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center gap-3 shadow-lg shadow-[var(--color-tangerine)]/20 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/30 transition-all duration-300"
                >
                  Send Message <Send size={18} />
                </motion.button>

                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" /> Genuine OEM Products</span>
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" /> OEM Warranty Support</span>
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" /> Secure Enquiries</span>
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" /> Responds within one business day</span>
                </div>
              </form>
            </ScaleIn>
          </div>
        </div>
      </div>
    </main>
  );
}