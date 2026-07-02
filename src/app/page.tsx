import Hero from "@/components/Hero";
import Link from "next/link";
import { Shield, Eye, HardDrive, Zap, CheckCircle2, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ProductCard";
import FaqSection from "./FaqSection";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-1">
      <Hero />

      {/* What We Offer */}
      <section className="relative py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6 block">// WHAT WE OFFER</span>
            <h2 className="text-white text-6xl md:text-7xl font-black tracking-tighter">
              Everything <span className="text-[var(--color-tangerine)]">You Need.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dome Cameras", icon: Eye },
              { name: "Bullet Cameras", icon: Shield },
              { name: "NVR Systems", icon: HardDrive },
              { name: "Biometric Machines", icon: Zap },
            ].map((cat) => (
              <div key={cat.name} className="group h-full flex flex-col p-10 rounded-3xl border border-[rgba(255,138,0,0.18)] bg-transparent hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[rgba(255,138,0,0.55)] hover:-translate-y-[2px]">
                <div className="w-16 h-16 bg-[rgba(255,165,0,0.1)] rounded-xl flex items-center justify-center mb-5 mx-auto lg:mx-0">
                  <cat.icon className="text-[var(--color-tangerine)]" size={36} />
                </div>
                <h3 className="text-xl font-bold text-white text-center lg:text-left">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="relative py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[60vw] h-96 bg-teal-500/3 rounded-full blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6 block">// TOP SELLERS</span>
              <h2 className="text-white text-6xl font-black tracking-tighter leading-[0.95]">Popular Products.</h2>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[var(--color-tangerine)] transition-colors">
              Browse All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers */}
      <section className="relative py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/4 rounded-full blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative glass rounded-[3rem] p-12 lg:p-16 grid lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6 block">// WHY US</span>
              <h2 className="text-white text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-[0.95]">Why Customers <br/> Come <span className="text-[var(--color-tangerine)]">Back.</span></h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">We combine high-end OEM products with certified installation partners and dedicated post-sales support across Delhi NCR.</p>
              <div className="space-y-5">
                {[
                  "Authorised CP Plus & eSSL dealer — genuine OEM products, not grey market",
                  "OEM warranty support and certified third-party installation partners across Delhi NCR",
                  "Transparent pricing — no hidden charges, no surprises"
                ].map(f => (
                  <div key={f} className="flex items-start gap-3 text-white/90 font-medium text-sm">
                    <CheckCircle2 className="text-[var(--color-tangerine)] mt-0.5 shrink-0" size={18} /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-10 lg:mt-0">
              {[
                { number: "2,000+", label: "Products Delivered" },
                { number: "250+", label: "Happy Clients" },
                { number: "OEM", label: "Warranty on All Products" },
                { number: "4 Cities", label: "Delhi · Noida · Gurgaon · Faridabad" }
              ].map((stat, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 flex flex-col justify-center h-full">
                  <div className="text-[var(--color-tangerine)] text-5xl lg:text-5xl font-black leading-none">{stat.number}</div>
                  <div className="text-gray-500/70 text-sm mt-3">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

    </main>
  );
}