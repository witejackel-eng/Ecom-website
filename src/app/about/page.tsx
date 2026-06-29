import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { Shield, Eye, Target, Users, Zap, CheckCircle2, TrendingUp, Handshake, Headphones, MapPin, Award } from "lucide-react";

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
                DeviceDestination is a Delhi-based supplier of CP Plus and ESSL security systems. We supply and install CCTV cameras, NVR systems, and biometric attendance devices for homes, shops, offices, and factories across Delhi NCR.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We started because too many customers were getting oversold, overcharged, or left with systems nobody would support after installation. Our approach is simple: recommend what you actually need, charge a fair price, and be reachable after the sale.
              </p>
            </FadeIn>
            
            <ScaleIn duration={1} className="relative">
              <div className="absolute inset-0 bg-[var(--color-tangerine)] rounded-[2rem] blur-[80px] opacity-10" />
              <div className="relative glass rounded-[2rem] border border-[rgba(255,138,0,0.3)] p-12 overflow-hidden flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-[rgba(255,165,0,0.1)] border border-[rgba(255,165,0,0.2)] flex items-center justify-center text-[var(--color-tangerine)]">
                    <Shield size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white font-bold">Verified Partner</h3>
                    <p className="text-[var(--color-tangerine)] text-[10px] uppercase tracking-[0.2em] font-black">CP PLUS & ESSL AUTHORISED DEALER</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "✓ Genuine Products",
                    "✓ Professional Installation",
                    "✓ After-Sales Support",
                    "✓ Delhi NCR Coverage"
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
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)]">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// OUR MISSION</span>
              <h2 className="text-white text-5xl font-black tracking-tighter mb-6">Built on Integrity.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To make professional-grade security accessible to every home and business owner in Delhi NCR — without inflated quotes, unnecessary upsells, or going silent after installation.
              </p>
              <ul className="space-y-4">
                {[
                  "Integrity — Transparent dealings and honest recommendations — no inflated quotes, no unnecessary upsells.",
                  "Reliability — Genuine OEM-certified products with official warranty. No grey market, no counterfeits.",
                  "Customer Focus — Tailored solutions for homes, shops, offices, and factories across Delhi NCR.",
                  "Innovation — Keeping pace with evolving security technologies to give you the best options available.",
                ].map((item, i) => (
                  <li key={i} className="text-white font-bold text-lg flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-tangerine)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "Transparency", icon: Eye },
                { title: "Reliability", icon: Shield },
                { title: "Support", icon: Headphones },
              ].map((val, i) => (
                <div key={i} className="glass border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center gap-4">
                  <val.icon className="text-[var(--color-tangerine)]" size={32} />
                  <h3 className="text-white font-bold">{val.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)]">
          <div className="text-center mb-16">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// HOW WE WORK</span>
             <h2 className="text-white text-5xl font-black tracking-tighter">Our Process.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Honest Recommendations", desc: "We tell you what you need, not what costs more. If a ₹3,100 camera solves your problem, we will say so." },
              { icon: Users, title: "Proper Installation", desc: "Cameras mounted cleanly, cables managed, NVR configured, mobile app set up. No shortcuts, no loose wires." },
              { icon: Zap, title: "Reachable After the Sale", desc: "Our number is on the website. We pick up when our customers call." },
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[2rem] border border-white/5 hover:border-[rgba(255,138,0,0.3)] transition-all duration-300 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-[rgba(255,165,0,0.05)] border border-[rgba(255,165,0,0.2)] flex items-center justify-center text-[var(--color-tangerine)] mb-8">
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Statements */}
        <section className="py-24 border-t border-[rgba(255,138,0,0.1)] mb-24">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Authorised Dealer", icon: Award },
              { title: "Delhi NCR Coverage", icon: MapPin },
              { title: "5 Years Experience", icon: TrendingUp },
              { title: "Responsive Support", icon: Headphones },
            ].map((stat, i) => (
              <div key={i} className="glass border border-white/5 rounded-2xl p-8 flex items-center gap-6">
                <div className="h-14 w-14 rounded-full bg-[rgba(255,165,0,0.05)] border border-[rgba(255,165,0,0.2)] flex items-center justify-center text-[var(--color-tangerine)]">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-xl text-white font-bold">{stat.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
