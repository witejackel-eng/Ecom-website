"use client";

import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import JsonLdInline from "@/components/JsonLdInline";
import {
  Shield, Eye, Target, Users, Zap, CheckCircle2, TrendingUp,
  Handshake, Headphones, MapPin, Award, ShieldCheck, Lightbulb,
  MessageSquare, ShoppingBag, CreditCard, Truck, Wrench, Lock,
  MessageCircle, Building2
} from "lucide-react";

const ORG_DATA = {
  '@type': 'Organization',
  name: 'DeviceDestination',
  legalName: 'Insight Business Solutions',
  url: 'https://devicedestination.com',
  logo: 'https://devicedestination.com/favicon.svg',
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
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 overflow-hidden">
      <JsonLdInline id="json-ld-organization" data={ORG_DATA} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <section className="py-24">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <FadeIn direction="up">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// WHO WE ARE</span>
              <h1 className="text-white text-6xl font-black tracking-tighter mb-8 leading-tight">Security Equipment<br/>Done Properly.</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">DeviceDestination is an authorised OEM supplier serving Delhi NCR, providing genuine CCTV systems, biometric solutions, and networking products.</p>
              <p className="text-gray-400 leading-relaxed">We are primarily online with transparent pricing, accurate specs, and full OEM warranty. Certified installation partners available on request.</p>
            </FadeIn>
            <ScaleIn duration={1} className="relative">
              <div className="absolute inset-0 bg-[var(--color-tangerine)] rounded-[2rem] blur-[80px] opacity-10" />
              <div className="relative glass rounded-[2rem] border border-[rgba(255,138,0,0.3)] p-12 overflow-hidden flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-[rgba(255,165,0,0.1)] border border-[rgba(255,138,0,0.2)] flex items-center justify-center text-[var(--color-tangerine)]"><Shield size={32} /></div>
                  <div><h3 className="text-2xl text-white font-bold">OEM-Authorised Partner</h3><p className="text-[var(--color-tangerine)] text-[10px] uppercase tracking-[0.2em] font-black">CP PLUS &amp; ESSL AUTHORISED DEALER</p></div>
                </div>
                <ul className="space-y-4">
                  {['Genuine OEM Products', 'OEM Warranty Support', 'Certified Installation Partners', 'Delhi NCR Delivery'].map((item, i) => (
                    <li key={i} className="text-white font-bold text-lg flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" />{item}</li>
                  ))}
                </ul>
              </div>
            </ScaleIn>
          </div>
        </section>
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// OUR VALUES</span>
            <h2 className="text-white text-5xl font-black tracking-tighter">What Drives Us.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Transparent Pricing', desc: 'No hidden charges.' },
              { icon: ShieldCheck, title: 'Genuine OEM Products', desc: 'Every item sourced through authorised channels with full OEM warranty.' },
              { icon: Users, title: 'Expert Guidance', desc: 'Our team helps you select the right equipment for your environment.' },
              { icon: Truck, title: 'Delhi NCR Delivery', desc: 'Reliable delivery with real-time tracking.' },
              { icon: Handshake, title: 'Certified Partners', desc: 'We connect you with certified third-party installers.' },
              { icon: Headphones, title: 'Post-Sales Support', desc: 'OEM warranty assistance and responsive support.' },
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-[1.5rem] border border-white/5 hover:border-[rgba(255,138,0,0.3)] transition-all duration-300 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-[rgba(255,138,0,0.05)] border border-[rgba(255,138,0,0.15)] flex items-center justify-center text-[var(--color-tangerine)] mb-6"><item.icon size={28} /></div>
                <h3 className="text-xl text-white font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="text-center mb-16"><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// HOW WE WORK</span><h2 className="text-white text-5xl font-black tracking-tighter">Our Process.</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: 'Consultation', desc: 'Understanding your security requirements before any recommendation.' },
              { icon: ShoppingBag, title: 'Product Recommendation', desc: 'Matching genuine OEM products to your specific environment.' },
              { icon: CreditCard, title: 'Secure Purchase', desc: 'Simple online ordering with tax-inclusive pricing.' },
              { icon: Truck, title: 'Delivery', desc: 'Timely dispatch across Delhi NCR with status updates.' },
              { icon: ShieldCheck, title: 'Warranty Support', desc: 'OEM warranty registration and claims assistance.' },
              { icon: Wrench, title: 'Installation (Optional)', desc: 'Certified third-party professionals for system setup.' },
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-[1.5rem] border border-white/5 hover:border-[rgba(255,138,0,0.3)] transition-all duration-300 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-[rgba(255,138,0,0.05)] border border-[rgba(255,138,0,0.15)] flex items-center justify-center text-[var(--color-tangerine)] mb-6"><item.icon size={28} /></div>
                <h3 className="text-xl text-white font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] mb-24 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { title: 'OEM Warranty', icon: Shield },
              { title: 'Secure Payments', icon: Lock },
              { title: 'Authorised Dealer', icon: Award },
              { title: 'Warranty Assistance', icon: Headphones },
              { title: 'Delhi NCR Delivery', icon: MapPin },
              { title: 'Responsive Support', icon: MessageCircle },
              { title: 'Corporate Solutions', icon: Building2 },
            ].map((stat, i) => (
              <div key={i} className="glass border border-white/5 rounded-2xl p-6 flex items-center gap-5">
                <div className="h-12 w-12 rounded-xl bg-[rgba(255,138,0,0.05)] border border-[rgba(255,138,0,0.15)] flex items-center justify-center text-[var(--color-tangerine)] shrink-0"><stat.icon size={22} /></div>
                <h3 className="text-base text-white font-bold leading-snug">{stat.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
