import FadeIn from "@/components/ui/FadeIn";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/city-night.jpg')" }}>
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <h1 className="font-heading text-5xl mb-8 text-white">About DeviceDestination</h1>
          <div className="prose prose-invert prose-lg max-w-none text-gray-100">
            <p>
              DeviceDestination is a premier provider of professional security, surveillance, and biometric attendance solutions. 
              We specialize in delivering reliable, high-performance equipment tailored to meet the rigorous demands of modern business environments.
            </p>
            <p>
              Our commitment to quality ensures that every product we offer is thoroughly vetted for durability, 
              clarity, and seamless integration. We don't just sell security devices; we provide peace of mind through trusted technology from industry leaders like CP Plus and ESSL.
            </p>
            <h2 className="font-heading text-3xl text-white mt-12 mb-6">Our Mission</h2>
            <p>To empower businesses and institutions with state-of-the-art security technology that enhances safety, operational efficiency, and accountability.</p>
            
            <h2 className="font-heading text-3xl text-white mt-12 mb-6">Why Choose DeviceDestination</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
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
