import FadeIn from "@/components/ui/FadeIn";
import { LifeBuoy, FileText, ShieldCheck } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="flex-1 py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Support Center</h1>
            <p className="text-lg text-gray-600">Resources and assistance for your DeviceDestination products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: LifeBuoy, title: "Technical Support", desc: "Get help with installation, configuration, and troubleshooting." },
              { icon: FileText, title: "Documentation", desc: "Access user manuals, datasheets, and setup guides." },
              { icon: ShieldCheck, title: "Warranty Claims", desc: "Learn about our warranty policies and how to file a claim." },
            ].map((item, i) => (
              <div key={i} className="bg-surface p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
