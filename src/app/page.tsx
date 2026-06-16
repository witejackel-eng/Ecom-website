import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, Shield, Eye, HardDrive, Wrench, Cog } from "lucide-react";
import { products } from "@/data/products";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import ProductCard from "@/components/ProductCard";
import SectionLabel from "@/components/SectionLabel";
import Accordion from "@/components/ui/Accordion";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-1 bg-white">
      <Hero />

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <SectionLabel>Solutions</SectionLabel>
              <h2 className="font-heading text-4xl sm:text-5xl text-[#1A1A1A] mb-4">
                Security Solutions
              </h2>
              <p className="text-[#666666] max-w-2xl mx-auto text-lg">
                Comprehensive coverage for every environment.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Dome Cameras", desc: "Discreet indoor monitoring" },
              { name: "Bullet Cameras", desc: "Long-range outdoor surveillance" },
              { name: "NVR Systems", desc: "Centralized recording and management" },
              { name: "Biometric Machines", desc: "Advanced attendance & access" },
            ].map((cat) => (
              <StaggerItem key={cat.name}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md border border-gray-100 block shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 ease-out"
                >
                  <ProductPlaceholder className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl text-white mb-2 font-heading">{cat.name}</h3>
                    <p className="text-white/80 text-sm mb-4 description">{cat.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#F28C38]">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="flex items-end justify-between mb-16">
              <div>
                <SectionLabel>Products</SectionLabel>
                <h2 className="mb-4">
                  Featured Products
                </h2>
                <p className="description">
                  Trusted equipment selected for professional requirements.
                </p>
              </div>
              <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[#F28C38] hover:text-[#C96E1A] transition-colors group">
                View all products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

      {/* Why DeviceDestination */}
      <section className="py-24 bg-white border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <SectionLabel>Why Us</SectionLabel>
              <h2 className="mb-6">
                Why DeviceDestination
              </h2>
              <p className="description max-w-2xl mx-auto leading-relaxed">
                We provide professional security, surveillance, and biometric systems built for reliability. 
                Our equipment is selected based on rigorous testing and proven performance in real-world business environments.
              </p>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Shield, title: "Trusted Equipment", desc: "Every product is vetted for durability and consistent performance." },
                { icon: Eye, title: "Clear Monitoring", desc: "High-definition capture ensures accurate identification and coverage." },
                { icon: Wrench, title: "Expert Support", desc: "Our certified specialists handle professional installation and provide ongoing technical support." },
                { icon: Cog, title: "Tailored Solutions", desc: "Custom-configured systems designed to meet the specific security needs of your industry." },
              ].map((item, i) => (
                <StaggerItem key={i} className="flex gap-4 p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5]">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-[#F28C38]/10 text-[#F28C38]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-[#1A1A1A] mb-1">{item.title}</h3>
                    <p className="description text-sm">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center">
              <SectionLabel>Trusted Brands</SectionLabel>
              <p className="text-sm font-medium text-[#888] uppercase tracking-wider mb-8">
                Trusted by leading security manufacturers
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {["CP Plus", "ESSL"].map((brand) => (
                <span key={brand} className="font-heading text-2xl text-[#666666] hover:text-[#F28C38] transition-colors duration-300 cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mb-4">Frequently Asked Questions</h2>
            </div>
          </FadeIn>
          <Accordion items={[
            { question: "How do I choose the right surveillance system?", answer: "Our experts assess your premises to recommend the optimal camera type, resolution, and NVR capacity." },
            { question: "What is your installation timeline?", answer: "Most installations are completed within 48-72 hours of site assessment." },
            { question: "Do you offer post-installation support?", answer: "Yes, we provide comprehensive technical support and maintenance packages." },
            { question: "Can I monitor cameras remotely?", answer: "Absolutely, all our NVR systems support remote viewing via iCMOB/gCMOB mobile apps." },
            { question: "Are your products covered under warranty?", answer: "Yes, all hardware comes with a standard manufacturer warranty of 1-2 years." },
          ]} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="font-heading text-4xl sm:text-5xl mb-6 text-[#1A1A1A]">
              Ready to secure your business?
            </h2>
            <p className="text-lg text-[#666666] mb-10 max-w-2xl mx-auto leading-relaxed">
              Speak with our security specialists to find the right surveillance solution for your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F28C38] px-8 py-4 text-sm font-bold text-white hover:bg-[#C96E1A] transition-all duration-300 group"
            >
              Contact Our Team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
