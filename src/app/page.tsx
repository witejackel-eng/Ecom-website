import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, Shield, Eye, HardDrive } from "lucide-react";
import { products } from "@/data/products";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import ProductPlaceholder from "@/components/ProductPlaceholder";

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
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] block hover:shadow-lg transition-all duration-300"
                >
                  <ProductPlaceholder className="absolute inset-0" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-xl text-[#1A1A1A] mb-2">{cat.name}</h3>
                    <p className="description text-sm mb-4">{cat.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#F28C38] group-hover:gap-3 transition-all duration-300">
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
                <div className="bg-white rounded-xl p-4 border border-[#E5E5E5] shadow-sm hover:shadow-lg hover:border-[#F28C38]/30 transition-all duration-300">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square rounded-lg bg-[#FAFAFA] mb-4 overflow-hidden">
                      <ProductPlaceholder className="absolute inset-0" />
                    </div>
                    <h3 className="text-lg text-[#1A1A1A] mb-1 group-hover:text-[#F28C38] transition-colors">{product.name}</h3>
                    <p className="description text-xs uppercase tracking-wide mb-3">Model: {product.model}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-[#F28C38]">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm text-[#888] line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                    </div>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why DeviceDestination */}
      <section className="py-24 bg-white border-y border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="mb-6">
                  Why DeviceDestination
                </h2>
                <p className="description mb-8 leading-relaxed">
                  We provide professional security, surveillance, and biometric systems built for reliability. 
                  Our equipment is selected based on rigorous testing and proven performance in real-world business environments.
                </p>
                <StaggerContainer className="space-y-6">
                  {[
                    { icon: Shield, title: "Trusted Equipment", desc: "Every product is vetted for durability and consistent performance." },
                    { icon: Eye, title: "Clear Monitoring", desc: "High-definition capture ensures accurate identification and coverage." },
                    { icon: HardDrive, title: "Scalable Systems", desc: "Solutions that grow with your business requirements." },
                  ].map((item, i) => (
                    <StaggerItem key={i} className="flex gap-4">
                      <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-[#F28C38]/10 text-[#F28C38]">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl text-[#1A1A1A] mb-1">{item.title}</h3>
                        <p className="description text-sm">{item.desc}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E5E5E5]">
                <ProductPlaceholder />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* Brands */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
              Trusted by leading security manufacturers
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {["CP Plus", "Hikvision", "Dahua", "Axis", "Bosch"].map((brand) => (
                <span key={brand} className="font-heading text-2xl text-gray-400 hover:text-primary transition-colors duration-300 cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="font-heading text-4xl sm:text-5xl mb-6">
              Ready to secure your business?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Speak with our security specialists to find the right surveillance solution for your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-medium text-white hover:bg-primary-hover transition-all duration-300 group"
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
