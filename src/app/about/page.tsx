import FadeIn, { StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { Shield, Eye, Target, Users, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="up">
            <SectionLabel>Who We Are</SectionLabel>
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
              Security Equipment <span className="text-gradient">Done Properly.</span>
            </h1>
            <p className="text-xl text-white/75 leading-relaxed mb-8 font-medium">
              DeviceDestination is a Delhi-based supplier of CP Plus and ESSL security systems. 
              We supply and install CCTV cameras, NVR systems, and biometric attendance devices for homes, shops, offices, and factories across Delhi NCR.
            </p>
            <p className="text-white/55 leading-relaxed">
              We started because too many customers were getting oversold, overcharged, or left with systems nobody would support after installation. 
              Our approach is simple: recommend what you actually need, charge a fair price, and be reachable after the sale.
            </p>
          </FadeIn>
          
          <ScaleIn duration={1} className="relative aspect-square">
            <div className="absolute inset-0 bg-primary/10 rounded-[4rem] blur-[100px] opacity-20 -z-10" />
            <div className="h-full w-full glass rounded-[4rem] border-white/10 overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=1000" 
                alt="Security Technology" 
                className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 shadow-2xl shadow-primary/20">
                  <Shield size={32} />
                </div>
                <h3 className="text-3xl text-white font-bold mb-2">Verified Partner</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black">CP PLUS & ESSL AUTHORISED DEALER</p>
              </div>
            </div>
          </ScaleIn>
        </div>

        <section className="mb-32">
          <FadeIn direction="up" className="mb-20">
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter">Our Mission</h2>
            <p className="max-w-2xl mt-8 text-white/55 text-lg font-medium leading-relaxed">
              To make professional-grade security accessible to every home and business owner in Delhi NCR — without inflated quotes, unnecessary upsells, or going silent after installation.
            </p>
          </FadeIn>
          
          <FadeIn direction="up" className="mb-10">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter">How We Work</h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Honest Recommendations", desc: "We tell you what you need, not what costs more. If a ₹3,100 camera solves your problem, we will say so." },
              { icon: Users, title: "Proper Installation", desc: "Cameras mounted cleanly, cables managed, NVR configured, mobile app set up. No shortcuts, no loose wires." },
              { icon: Zap, title: "Reachable After the Sale", desc: "Our number is on the website. We pick up when our customers call." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="glass p-12 rounded-[3rem] border-white/5 hover:border-white/20 transition-all duration-500 group h-full">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-4">{item.title}</h3>
                  <p className="text-white/55 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="py-24 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
          <div className="mx-auto max-w-5xl">
            <FadeIn direction="up" className="text-center mb-16">
              <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter">Why DeviceDestination</h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
              {[
                "Authorised CP Plus and ESSL dealer — not a grey market reseller",
                "In-house installation team covering Delhi, Noida, Gurgaon, and Faridabad",
                "Transparent pricing with no hidden charges",
                "2-year warranty on all products with real post-sale support"
              ].map((text, i) => (
                <FadeIn key={i} direction="left" delay={i * 0.1}>
                  <div className="flex items-center gap-6 group cursor-default">
                    <div className="h-10 w-10 rounded-xl glass border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                      <Globe size={18} />
                    </div>
                    <span className="text-lg text-white/55 font-bold group-hover:text-white transition-colors">{text}</span>
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
