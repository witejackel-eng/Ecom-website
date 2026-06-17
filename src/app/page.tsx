import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, Shield, Eye, HardDrive, Zap, CheckCircle2, ChevronRight, Download, Eye as ViewIcon, MessageSquare } from "lucide-react";
import { products } from "@/data/products";
import { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ProductCard";
import Accordion from "@/components/ui/Accordion";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-1 bg-[var(--color-navy-deep)]">
      <Hero />

      {/* What We Offer - Transparent Background, Gradient/Glass Cards */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// WHAT WE OFFER</span>
            <h2 className="text-white text-6xl md:text-7xl font-black tracking-tighter mb-6">
              Everything <span className="text-[var(--color-tangerine)]">You Need.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Dome Cameras", icon: Eye },
              { name: "Bullet Cameras", icon: Shield },
              { name: "NVR Systems", icon: HardDrive },
              { name: "Biometric Machines", icon: Zap },
            ].map((cat) => (
              <div key={cat.name} className="group p-8 rounded-3xl border border-tangerine hover:border-tangerine-hover bg-transparent hover:bg-[var(--color-navy-card)] transition-all duration-300">
                <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[var(--color-navy-card)] border border-tangerine text-[var(--color-tangerine)] mb-8 group-hover:glow-tangerine">
                  <cat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products - Darker Background */}
      <section className="py-32 bg-[var(--color-navy-card)] border-y border-[rgba(255,138,0,0.18)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// TOP SELLERS</span>
              <h2 className="text-white text-5xl font-black tracking-tighter">Popular Products.</h2>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--color-tangerine)] transition-colors">
              Browse All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers - Glass container */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass rounded-[3rem] p-12 lg:p-20 border-tangerine grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block">// WHY US</span>
              <h2 className="text-white text-5xl font-black tracking-tighter mb-8">Why Customers <br/> Come <span className="text-[var(--color-tangerine)]">Back.</span></h2>
              <p className="text-gray-400 text-lg mb-8">We combine high-end technology with expert installation and dedicated post-sales support.</p>
              <div className="space-y-4">
                {["Military-grade security", "24/7 Redundant monitoring", "Expert installation"].map(f => (
                  <div key={f} className="flex items-center gap-3 text-white font-bold text-sm">
                    <CheckCircle2 className="text-[var(--color-tangerine)]" size={18} /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="bg-[var(--color-navy-deep)] p-6 rounded-2xl border border-tangerine h-40" />)}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Lighter Background & Glow */}
      <section className="py-32 bg-[rgba(255,138,0,0.03)] border-y border-[rgba(255,138,0,0.1)]">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block text-center">// FAQS</span>
          <h2 className="text-white text-5xl font-black tracking-tighter text-center mb-16">Questions We Get <span className="text-[var(--color-tangerine)]">Asked.</span></h2>
          <div className="space-y-4">
            <Accordion items={[
              { question: "Which system is right?", answer: "We will consult based on your specific requirements." },
              { question: "Do you install?", answer: "Yes, we handle complete turnkey installation." },
            ]} />
          </div>
        </div>
      </section>

      {/* CTA - Radial Glow Stripe-like */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-tangerine)_0%,_transparent_70%)] opacity-10" />
        <div className="mx-auto max-w-5xl px-6 relative">
          <div className="bg-[var(--color-navy-card)] rounded-[3rem] border border-tangerine p-16 text-center glow-tangerine">
            <h2 className="text-white text-6xl font-black tracking-tighter mb-8">Let's Secure <br/> Your World.</h2>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 rounded-full bg-[var(--color-tangerine)] text-white font-bold">Get a Quote</button>
              <button className="px-8 py-4 rounded-full border border-tangerine text-white font-bold">Browse Products</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
