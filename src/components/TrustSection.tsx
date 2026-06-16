import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { ShieldCheck, Cog, FileCheck, Users, Wrench } from "lucide-react";

export default function TrustSection() {
  const process = [
    { icon: Cog, title: "Consultation", desc: "Expert assessment of your security needs." },
    { icon: Wrench, title: "Installation", desc: "Professional, clean, and reliable setup." },
    { icon: FileCheck, title: "Handover", desc: "Testing, training, and documentation." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose DeviceDestination</h2>
            <p className="description">Setting the standard in enterprise security.</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: ShieldCheck, title: "Premium Warranty", desc: "Comprehensive coverage on all installations." },
            { icon: Users, title: "Expert Support", desc: "Dedicated professionals for ongoing assistance." },
            { icon: Wrench, title: "Professional Service", desc: "Meticulous installation and maintenance." },
          ].map((item, i) => (
            <StaggerItem key={i} className="p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#F28C38]/30 transition-all duration-300">
              <item.icon className="h-10 w-10 text-[#F28C38] mb-6" />
              <h3 className="text-xl font-heading mb-2 text-gray-900">{item.title}</h3>
              <p className="description text-sm text-gray-600">{item.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn direction="up">
          <h3 className="font-heading text-3xl mb-12 text-center">Our Installation Process</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {process.map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#F28C38]/10 text-[#F28C38] mb-6">
                  <item.icon className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-[#1A1A1A] mb-2">{item.title}</h4>
                <p className="description text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
