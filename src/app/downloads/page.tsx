import FadeIn from "@/components/ui/FadeIn";
import { Download, FileText, BookOpen } from "lucide-react";

export default function DownloadsPage() {
  return (
    <main className="flex-1 py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">Product Downloads</h1>
            <p className="text-lg text-gray-600">Access datasheets, user manuals, and firmware updates.</p>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-hover">
              <h3 className="font-heading text-xl text-foreground">Available Resources</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "CP Plus Camera Series - Full Datasheet", type: "PDF", size: "2.4 MB" },
                { name: "NVR Configuration & Setup Guide", type: "PDF", size: "4.1 MB" },
                { name: "Warranty & Return Policy Document", type: "PDF", size: "1.2 MB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-surface-hover transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {doc.type === "PDF" ? <FileText className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
