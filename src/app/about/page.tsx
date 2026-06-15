import FadeIn from "@/components/ui/FadeIn";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <h1 className="font-heading text-5xl mb-8">About DeviceDestination</h1>
          <div className="prose prose-invert prose-lg max-w-none text-[#888]">
            <p>
              DeviceDestination is a premier provider of professional security, surveillance, and biometric attendance solutions. 
              We specialize in delivering reliable, high-performance equipment tailored to meet the rigorous demands of modern business environments.
            </p>
            <p>
              Our commitment to quality ensures that every product we offer is thoroughly vetted for durability, 
              clarity, and seamless integration. We don't just sell security devices; we provide peace of mind through trusted technology from industry leaders like CP Plus and ESSL.
            </p>
            <h2 className="font-heading text-3xl text-[#F5F0E8] mt-12 mb-6">Our Mission</h2>
            <p>To empower businesses and institutions with state-of-the-art security technology that enhances safety, operational efficiency, and accountability.</p>
            
            <h2 className="font-heading text-3xl text-[#F5F0E8] mt-12 mb-6">Why Choose DeviceDestination</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enterprise-grade surveillance solutions</li>
              <li>Verified CP Plus & ESSL partner</li>
              <li>Professional installation & expert support</li>
              <li>Tailored solutions for diverse industry needs</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
