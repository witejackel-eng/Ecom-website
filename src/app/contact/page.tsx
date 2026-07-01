"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import JsonLdInline from "@/components/JsonLdInline";

const LOCAL_BUSINESS_DATA = {
  '@type': 'LocalBusiness',
  name: 'DeviceDestination',
  description: 'Authorised CP Plus & ESSL dealer â€” genuine OEM security equipment across Delhi NCR.',
  url: 'https://devicedestination.com',
  email: 'manish@insight-solutions.in',
  telephone: '+91-83685-61919',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 94, 3rd Floor, Block - B, Sector - 13',
    addressLocality: 'Dwarka',
    addressRegion: 'New Delhi',
    postalCode: '110075',
    addressCountry: 'IN',
  },
  priceRange: 'â‚¹â‚¹',
  areaServed: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Dwarka'],
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    opens: '09:30', closes: '19:00',
  }],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <JsonLdInline id="json-ld-contact" data={LOCAL_BUSINESS_DATA} />
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-[rgba(255,138,0,0.4)] hover:text-[var(--color-tangerine)] transition-all duration-200">
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
                    <p className="text-white font-bold tracking-tight text-sm">manish@insight-solutions.in</p>
                  </a>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="glass p-8 lg:p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Clock size={24} />
                    </div>
                    <h3 className="font-bold text-white text-lg tracking-tight uppercase">Business Hours</h3>
                  </div>
                  <p className="text-white/55 leading-relaxed">Monday â€“ Saturday: 9:30 AM â€“ 7:00 PM IST</p>
                  <p className="text-white/30 text-sm mt-1">Sunday: Closed</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
          <div className="lg:col-span-7">
            <ScaleIn>
              <form className="glass p-8 lg:p-12 rounded-[3rem] border-white/5 space-y-6" onSubmit={(e) => e.preventDefault()}
                noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Full Name *</label>
                    <input required aria-required="true" className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium" placeholder="Your name" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Phone *</label>
                    <input required type="tel" aria-required="true" className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Email *</label>
                  <input required type="email" aria-required="true" className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium" placeholder="your@email.com" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Company <span className="normal-case tracking-normal text-gray-500 font-medium">(Optional)</span></label>
                  <input className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium" placeholder="Company name" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Subject</label>
                  <select aria-label="Subject" className="w-full h-14 px-5 bg-white/[0.04] border border-white/10 rounded-2xl text-white focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none font-medium appearance-none">
                    <option value="" className="bg-[#0D2530]">Select a topic</option>
                    <option value="inquiry" className="bg-[#0D2530]">Product Inquiry</option>
                    <option value="bulk" className="bg-[#0D2530]">Bulk Order</option>
                    <option value="warranty" className="bg-[#0D2530]">Warranty Support</option>
                    <option value="installation" className="bg-[#0D2530]">Installation Assistance</option>
                    <option value="general" className="bg-[#0D2530]">General Enquiry</option>
                  </select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.25em] ml-1">Message *</label>
                  <textarea required aria-required="true" rows={5} className="w-full p-5 bg-white/[0.04] border border-white/10 rounded-[1.5rem] text-white placeholder:text-gray-500 focus:border-[var(--color-tangerine)] focus:bg-white/[0.07] transition-all duration-200 outline-none resize-none font-medium leading-relaxed" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full py-5 bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white font-black text-sm uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center gap-3 shadow-lg shadow-[var(--color-tangerine)]/20 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/30 transition-all duration-300">
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