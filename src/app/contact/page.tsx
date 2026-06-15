import FadeIn from "@/components/ui/FadeIn";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex-1 py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">Our security specialists are ready to assist you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Email", info: "sales@konnektedge.com" },
              { icon: Phone, title: "Phone", info: "+91 98765 43210" },
              { icon: MapPin, title: "Headquarters", info: "Mumbai, Maharashtra, India" },
            ].map((item, i) => (
              <div key={i} className="bg-surface p-8 rounded-xl border border-border text-center hover:border-primary/50 transition-colors duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.info}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
