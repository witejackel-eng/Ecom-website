"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const footerData = [
    {
      section: "Solutions",
      links: [
        { name: "Dome Cameras", href: "/products?category=Dome%20Cameras" },
        { name: "Bullet Cameras", href: "/products?category=Bullet%20Cameras" },
        { name: "NVR Systems", href: "/products?category=NVR%20Systems" },
        { name: "Biometric Machines", href: "/products?category=Biometric%20Devices" },
      ],
    },
    {
      section: "Organization",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Products", href: "/products" },
      ],
    },
    {
      section: "Manufacturers",
      links: [
        { name: "CP Plus", href: "https://www.cpplusworld.com/" },
        { name: "eSSL", href: "https://esslsecurity.com/" },
      ],
    },
    {
      section: "Contact",
      links: [
        { name: "+91 83685 61919", href: "tel:+918368561919" },
        { name: "manish@insight-solutions.in", href: "mailto:manish@insight-solutions.in" },
        { name: "Dwarka, New Delhi", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative py-16 border-t border-[rgba(255,138,0,0.18)] bg-[var(--color-navy-deep)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerData.map((section) => (
            <div key={section.section}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6">
                {section.section}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors flex items-center gap-2 group">
                      {link.name}
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
