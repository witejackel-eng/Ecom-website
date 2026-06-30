import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { Shield, Eye, Target, Users, Zap, CheckCircle2, TrendingUp, Handshake, Headphones, MapPin, Award, ShieldCheck, Lightbulb, MessageSquare, ShoppingBag, CreditCard, Truck, Wrench, Lock, MessageCircle, Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Who We Are */}
        <section className="py-24">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <FadeIn direction="up">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// WHO WE ARE</span>
              <h1 className="text-white text-6xl font-black tracking-tighter mb-8 leading-tight">
                Security Equipment <br/><span className="text-[var(--color-tangerine)]">Done Properly.</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                DeviceDestination is an authorised OEM supplier serving Delhi NCR. We provide genuine CCTV systems, access control, biometric solutions, video door phones, PBX systems, and HDMI & IT hardware accessories to homes, offices, shops, and commercial establishments.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We are a primarily online seller focused on transparent pricing, accurate specifications, and genuine OEM warranty support. Every product is sourced through authorised channels, and installation is facilitated through certified third-party installation partners where required.
              </p>
            </FadeIn>
            
            <ScaleIn duration={1} className="relative">
              <div className="absolute inset-0 bg-[var(--color-tangerine)] rounded-[2rem] blur-[80px] opacity-10" />
              <div className="relative glass rounded-[2rem] border border-[rgba(255,138,0,0.3)] p-12 overflow-hidden flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-[rgba(255,165,0,0.1)] border border-[rgba(255,138,0,0.2)] flex items-center justify-center text-[var(--color-tangerine)]">
                    <Shield size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white font-bold">OEM-Authorised Partner</h3>
                    <p className="text-[var(--color-tangerine)] text-[10px] uppercase tracking-[0.2em] font-black">CP PLUS & ESSL AUTHORISED DEALER</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "✓ Genuine OEM Products",
                    "✓ OEM Warranty Support",
                    "✓ Certified Installation Partners",
                    "✓ Delhi NCR Delivery"
                  ].map((item, i) => (
                    <li key={i} className="text-white font-bold text-lg flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScaleIn>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6 block">// OUR MISSION</span>
              <h2 className="text-white text-5xl font-black tracking-tighter mb-8 leading-tight">Our Mission.</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                Deliver genuine OEM security and IT hardware with transparent pricing and reliable after-sales coordination. We operate exclusively online, providing accurate product information, official warranty support, and a streamlined path to installation through certified third-party partners wherever needed.
              </p>
              <ul className="space-y-5">
                {[
                  "Quality Products — Sourced from OEM-authorised channels with full traceability.",
                  "Transparent Pricing — Tax-inclusive figures presented clearly with no hidden charges.",
                  "Genuine OEM Warranty — Official manufacturer warranty registration and claims support.",
                  "Secure Online Shopping — Protected transactions with order confirmation and dedicated assistance.",
                  "Installation Facilitation — Coordination with certified third-party professionals for commissioned setup."
                ].map((item, i) => (
                  <li key={i} className="text-white font-bold text-lg flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)] mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { title: "Integrity", desc: "Genuine OEM products with upfront, transparent pricing.", icon: ShieldCheck },
                { title: "Reliability", desc: "Consistent supply, authentic documentation, and dependable warranty support.", icon: CheckCircle2 },
                { title: "Customer Focus", desc: "Responsive assistance from enquiry through post-purchase warranty service.", icon: Users },
                { title: "Innovation", desc: "Continuously expanding our catalog with modern security technologies.", icon: Lightbulb },
              ].map((val, i) => (
                <div key={i} className="glass border border-white/5 rounded-3xl p-7 flex flex-col items-center text-center gap-4">
                  <val.icon className="text-[var(--color-tangerine)]" size={24} />
                  <h3 className="text-white font-bold text-base leading-snug">{val.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="text-center mb-16">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// HOW WE WORK</span>
             <h2 className="text-white text-5xl font-black tracking-tighter">Our Process.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: "Consultation", desc: "Understanding your security requirements, site constraints, and budget before any recommendation." },
              { icon: ShoppingBag, title: "Product Recommendation", desc: "Matching genuine OEM products to your specific environment with clear specifications." },
              { icon: CreditCard, title: "Secure Purchase", desc: "Simple online ordering with tax-inclusive pricing and instant order confirmation." },
              { icon: Truck, title: "Delivery", desc: "Timely dispatch and delivery coordination across Delhi NCR with status updates." },
              { icon: ShieldCheck, title: "Warranty Support", desc: "OEM warranty registration, claims assistance, and continued after-sales coordination." },
              { icon: Wrench, title: "Certified Installation Partner (Optional)", desc: "Connection with certified third-party professionals for commissioned system setup and configuration." },
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-[1.5rem] border border-white/5 hover:border-[rgba(255,138,0,0.3)] transition-all duration-300 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-[rgba(255,138,0,0.05)] border border-[rgba(255,138,0,0.15)] flex items-center justify-center text-[var(--color-tangerine)] mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl text-white font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Statements */}
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] mb-24 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { title: "OEM Warranty", icon: Shield },
              { title: "Secure Payments", icon: Lock },
              { title: "Authorised Dealer", icon: Award },
              { title: "Warranty Assistance", icon: Headphones },
              { title: "Delhi NCR Delivery", icon: MapPin },
              { title: "Responsive Support", icon: MessageCircle },
              { title: "Corporate Solutions", icon: Building2 },
            ].map((stat, i) => (
              <div key={i} className="glass border border-white/5 rounded-2xl p-6 flex items-center gap-5">
                <div className="h-12 w-12 rounded-xl bg-[rgba(255,138,0,0.05)] border border-[rgba(255,138,0,0.15)] flex items-center justify-center text-[var(--color-tangerine)] shrink-0">
                  <stat.icon size={22} />
                </div>
                <h3 className="text-base text-white font-bold leading-snug">{stat.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
