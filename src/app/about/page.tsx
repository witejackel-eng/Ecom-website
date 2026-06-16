import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { Shield, Eye, Target, Users, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="up">
            <SectionLabel>Our Legacy</SectionLabel>
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
              Architecting <span className="text-gradient">Peace of Mind</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              DeviceDestination is a premier provider of professional security, surveillance, and biometric attendance solutions. 
              We specialize in delivering reliable, high-performance equipment tailored to meet the rigorous demands of modern business environments.
            </p>
            <p className="text-white/40 leading-relaxed">
              Our commitment to quality ensures that every product we offer is thoroughly vetted for durability, 
              clarity, and seamless integration. We don't just sell security devices; we provide peace of mind through trusted technology from industry leaders like CP Plus and ESSL.
            </p>
          </FadeIn>
          
          <ScaleIn duration={1} className="relative aspect-square">
            <div className="absolute inset-0 bg-premium-gradient rounded-[4rem] blur-[100px] opacity-20 -z-10" />
            <div className="h-full w-full glass rounded-[4rem] border-white/10 overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=1000" 
                alt="Security Technology" 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-6">
                  <Shield size={32} />
                </div>
                <h3 className="text-3xl text-white font-bold mb-2">Established Integrity</h3>
                <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Excellence in Surveillance</p>
              </div>
            </div>
          </ScaleIn>
        </div>

        <section className="mb-32">
          <FadeIn direction="up" className="text-center mb-20">
            <SectionLabel>Core Values</SectionLabel>
            <h2 className="text-white">Our <span className="text-gradient">Mission</span></h2>
            <p className="max-w-2xl mx-auto mt-6 text-white/60">
              To empower businesses and institutions with state-of-the-art security technology that enhances safety, operational efficiency, and accountability.
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Precision", desc: "Absolute clarity in monitoring and identification protocols." },
              { icon: Users, title: "Reliability", desc: "Consistency that enterprises trust for their most critical assets." },
              { icon: Zap, title: "Innovation", desc: "Leading the integration of AI and biometric advancement." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="glass p-12 rounded-[3rem] border-white/5 hover:border-white/20 transition-all duration-500 group h-full">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-4">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5" />
          <div className="mx-auto max-w-5xl">
            <FadeIn direction="up" className="text-center mb-16">
              <h2 className="text-white">Why Choose <span className="text-gradient">DeviceDestination</span></h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
              {[
                "Enterprise-grade surveillance solutions",
                "Verified CP Plus & ESSL partner",
                "Professional installation & expert support",
                "Tailored solutions for diverse industry needs",
                "Next-generation biometric integration",
                "Redundant monitoring architectures"
              ].map((text, i) => (
                <FadeIn key={i} direction="left" delay={i * 0.1}>
                  <div className="flex items-center gap-6 group">
                    <div className="h-10 w-10 rounded-xl glass border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Globe size={18} />
                    </div>
                    <span className="text-lg text-white/60 font-medium group-hover:text-white transition-colors">{text}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
