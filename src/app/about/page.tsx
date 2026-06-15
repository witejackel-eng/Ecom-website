import FadeIn from "@/components/ui/FadeIn";

export default function AboutPage() {
  return (
    <main className="flex-1 py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up">
          <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-6">About DeviceDestination</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            DeviceDestination is a premier provider of professional security, surveillance, and biometric attendance solutions. 
            We specialize in delivering reliable, high-performance equipment tailored to meet the rigorous demands of modern business environments.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our commitment to quality ensures that every product we offer is thoroughly vetted for durability, 
            clarity, and seamless integration. We don't just sell security devices; we provide peace of mind through trusted technology from industry leaders like CP Plus and ESSL.
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
