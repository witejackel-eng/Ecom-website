import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { Shield, Eye, HardDrive, ArrowRight } from "lucide-react";
import products from "@/data/products.json";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="flex-1 bg-background">
      <AnnouncementBar />
      <Hero />

      {/* Featured Categories */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
                Security Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Comprehensive coverage for every environment.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Dome Cameras", desc: "Discreet indoor monitoring", color: "0EA5E9" },
              { name: "Bullet Cameras", desc: "Long-range outdoor surveillance", color: "0284C7" },
              { name: "NVR Systems", desc: "Centralized recording and management", color: "0369A1" },
              { name: "Biometric Machines", desc: "Advanced attendance & access", color: "F28C38" },
            ].map((cat) => (
              <StaggerItem key={cat.name}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-hover border border-border block"
                >
                  <Image
                    src={`https://placehold.co/800x1000/${cat.color}/ffffff?text=${encodeURIComponent(cat.name)}`}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="font-heading text-2xl text-white mb-2">{cat.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{cat.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
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
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
                  Featured Products
                </h2>
                <p className="text-gray-600 text-lg">
                  Trusted equipment selected for professional requirements.
                </p>
              </div>
              <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors group">
                View all products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <div className="bg-surface rounded-xl p-4 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square rounded-lg bg-surface-hover mb-4 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Model: {product.model}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                    </div>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-12 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Konnekt Edge */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-6">
                  Why DeviceDestination
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We provide professional security systems built for reliability. Our equipment is selected 
                  based on rigorous testing and proven performance in real-world business environments.
                </p>
                <StaggerContainer className="space-y-6">
                  {[
                    { icon: Shield, title: "Trusted Equipment", desc: "Every product is vetted for durability and consistent performance." },
                    { icon: Eye, title: "Clear Monitoring", desc: "High-definition capture ensures accurate identification and coverage." },
                    { icon: HardDrive, title: "Scalable Systems", desc: "Solutions that grow with your business requirements." },
                  ].map((item, i) => (
                    <StaggerItem key={i} className="flex gap-4">
                      <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-foreground mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative aspect-[4/5] rounded-2xl bg-surface-hover overflow-hidden border border-border">
                <Image
                  src="https://placehold.co/1000x1250/0ea5e9/ffffff?text=Professional+Monitoring"
                  alt="Professional security monitoring setup"
                  fill
                  className="object-cover"
                />
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
