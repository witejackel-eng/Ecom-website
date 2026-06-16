import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, Shield, Eye, HardDrive, Wrench, Cog, CheckCircle2, Zap, Globe } from "lucide-react";
import { products } from "@/data/products";
import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ProductCard";
import SectionLabel from "@/components/SectionLabel";
import Accordion from "@/components/ui/Accordion";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-1">
      <Hero />

      {/* Featured Categories - Solutions */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <SectionLabel>Solutions</SectionLabel>
              <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter mb-6">
                Security <span className="text-gradient">Architectures.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/55 text-lg font-medium">
                Comprehensive ecosystem coverage for high-stakes environments, from domestic monitoring to industrial surveillance.
              </p>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dome Cameras", desc: "Discreet high-definition indoor monitoring", icon: Eye },
              { name: "Bullet Cameras", desc: "Long-range precision outdoor surveillance", icon: Shield },
              { name: "NVR Systems", desc: "Centralized intelligence and management", icon: HardDrive },
              { name: "Biometric Machines", desc: "Advanced biometric access control", icon: Zap },
            ].map((cat) => (
              <StaggerItem key={cat.name}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative h-[420px] overflow-hidden rounded-[24px] glass border-white/5 block hover:border-white/20 transition-all duration-700 ease-out"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="mb-8 h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl">
                      <cat.icon size={28} />
                    </div>
                    <h3 className="text-3xl text-white mb-4 font-black tracking-tight">{cat.name}</h3>
                    <p className="text-white/40 text-sm mb-8 leading-relaxed line-clamp-2 font-medium">{cat.desc}</p>
                    <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      Explore Series <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 relative">
        <div className="absolute top-1/2 left-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <SectionLabel>Products</SectionLabel>
                <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter mb-6">
                  Featured <span className="text-gradient">Innovations.</span>
                </h2>
                <p className="text-white/55 text-lg font-medium leading-relaxed">
                  Professional-grade hardware selected for uncompromising reliability and next-generation performance.
                </p>
              </div>
              <Link href="/products" className="group flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.3em] glass border-white/10 px-10 py-5 rounded-full hover:bg-white/5 transition-all duration-300">
                View Collections <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product as any} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why DeviceDestination - Premium Features */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="glass rounded-[4rem] p-12 lg:p-24 border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <SectionLabel>Legacy Architecture</SectionLabel>
                <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter mb-10 leading-tight">
                  The Gold Standard <br/> of <span className="text-gradient">Security.</span>
                </h2>
                <p className="mb-12 text-lg text-white/55 font-medium leading-relaxed">
                  DeviceDestination is not just a provider; we are architects of safety. Our systems are engineered for the most demanding environments globally.
                </p>
                
                <div className="space-y-6">
                  {[
                    "Military-grade encryption protocols",
                    "AI-driven anomaly detection",
                    "Seamless multi-platform integration",
                    "24/7 Redundant monitoring support"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-6 text-white/75 font-bold uppercase text-[11px] tracking-widest">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-lg">
                        <CheckCircle2 size={14} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Absolute Quality", desc: "Rigorous stress-testing in extreme conditions." },
                  { icon: Globe, title: "Global Compliance", desc: "Adherent to international security regulations." },
                  { icon: Wrench, title: "Elite Engineering", desc: "Certified specialists for every installation." },
                  { icon: Cog, title: "Systemic Fusion", desc: "Holistic ecosystems that evolve with your data." },
                ].map((item, i) => (
                  <div key={i} className="glass p-8 rounded-[32px] border-white/10 hover:bg-white/5 transition-all duration-500 group/item">
                    <item.icon className="h-8 w-8 text-primary mb-8 group-hover/item:scale-110 transition-transform" />
                    <h4 className="text-white text-xl font-bold mb-4">{item.title}</h4>
                    <p className="text-white/40 text-[11px] font-medium leading-relaxed uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-24">
              <SectionLabel>Intelligence Hub</SectionLabel>
              <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter">Expert <span className="text-gradient">Insights.</span></h2>
            </div>
          </FadeIn>
          <div className="glass rounded-[3rem] p-4 md:p-10 border-white/5 shadow-2xl">
            <Accordion items={[
              { question: "How do I choose the right surveillance architecture?", answer: "Our elite consultants evaluate your specific spatial requirements and risk profiles to architect a customized monitoring ecosystem." },
              { question: "What is your deployment timeline?", answer: "Deployment usually occurs within 48 to 72 hours following a comprehensive site architecture assessment." },
              { question: "Do you offer redundant support protocols?", answer: "Yes, we provide enterprise-tier maintenance packages that ensure continuous operation and zero-latency technical intervention." },
              { question: "Can I monitor systems through encrypted remote access?", answer: "Absolutely. Our systems utilize military-grade encryption for secure, real-time remote monitoring via our proprietary global interface." },
              { question: "What is the warranty lifecycle of your hardware?", answer: "All professional hardware is backed by an extensive manufacturer warranty, typically ranging from 24 to 60 months." },
            ]} />
          </div>
        </div>
      </section>

      {/* CTA - Cinematic Redesign */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
          <ScaleIn className="glass rounded-[4rem] p-12 md:p-24 text-center border-white/10 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
            <div className="relative z-10">
              <h2 className="text-white text-5xl md:text-8xl mb-12 font-black tracking-tighter leading-none">
                Architect Your <br/> <span className="text-gradient">Total Security.</span>
              </h2>
              <p className="text-xl text-white/55 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                Experience the pinnacle of professional surveillance. Our specialists are ready to design your bespoke security ecosystem today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link
                  href="/contact"
                  className="btn-primary px-12 py-6 text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 min-w-[280px]"
                >
                  Initiate Consultation
                </Link>
                <Link
                  href="/products"
                  className="px-12 py-6 rounded-full glass text-white font-black text-sm uppercase tracking-[0.3em] hover:bg-white/5 transition-all border border-white/10 min-w-[280px]"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </main>
  );
}
