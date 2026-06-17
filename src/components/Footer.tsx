"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-16 border-t border-[rgba(255,138,0,0.18)] bg-[var(--color-navy-deep)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {["Solutions", "Organization", "Manufacturers", "Contact"].map((section) => (
            <div key={section}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-8">
                {section}
              </h3>
              <ul className="space-y-4">
                {["Link 1", "Link 2", "Link 3"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors flex items-center gap-2 group">
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
