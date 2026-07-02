
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const footerData = [
    {
      section: "Solutions",
      links: [
        { name: "Dome Cameras", href: "/products?category=Dome%20Cameras", type: "internal" },
        { name: "Bullet Cameras", href: "/products?category=Bullet%20Cameras", type: "internal" },
        { name: "NVR Systems", href: "/products?category=NVR%20Systems", type: "internal" },
        { name: "Biometric Machines", href: "/products?category=Biometric%20Devices", type: "internal" },
      ],
    },
    {
      section: "Organization",
      links: [
        { name: "About", href: "/about", type: "internal" },
        { name: "Contact", href: "/contact", type: "internal" },
        { name: "Products", href: "/products", type: "internal" },
        { name: "Terms & Conditions", href: "/terms", type: "internal" },
        { name: "Refund & Return Policy", href: "/refund-policy", type: "internal" }
      ],
    },
    {
      section: "Manufacturers",
      links: [
        { name: "CP Plus", href: "https://www.cpplusworld.com", type: "external" },
        { name: "eSSL", href: "https://www.esslsecurity.com", type: "external" },
      ],
    },
    {
      section: "Contact",
      links: [
        { name: "+91 83685 61919", href: "tel:+918368561919", type: "external" },
        { name: "manish@insight-solutions.in", href: "mailto:manish@insight-solutions.in", type: "external" },
        { name: "Dwarka, New Delhi", href: null, type: "text" },
      ],
    },
  ];

  return (
    <footer className="relative py-20 border-t border-[rgba(255,138,0,0.18)] bg-[var(--color-navy-deep)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10">
          {footerData.map((section) => (
            <div key={section.section}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-6">
                {section.section}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.type === "internal" ? (
                      <Link href={link.href!} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                        {link.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-all" />
                      </Link>
                    ) : link.type === "external" ? (
                      <a 
                        href={link.href!} 
                        className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                        target={link.href!.startsWith("http") ? "_blank" : undefined}
                        rel={link.href!.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {link.name}
                        {link.href!.startsWith("http") && <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-all" />}
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm">{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-12 pt-10 pb-6">
          <div className="text-center space-y-5">
            <p className="text-[var(--color-tangerine)] text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
              ✦ Safe Shopping &nbsp;•&nbsp; OEM Warranty &nbsp;•&nbsp; Genuine Products &nbsp;•&nbsp; Secure Payments
            </p>
            <p className="text-white/50 text-xs leading-relaxed max-w-3xl mx-auto">
              All products are sold with OEM warranty only. Installation and service are provided by certified third-party partners at the customer&apos;s discretion. By using this website, you agree to our 
              <Link href="/terms" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors mx-1">Terms & Conditions</Link>, 
              <Link href="/refund-policy" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors mx-1">Return/Refund Policy</Link>, and Privacy Policy. 
              All disputes are subject to the jurisdiction of New Delhi, India.
            </p>
            <p className="text-white/30 text-[11px] italic">
              DeviceDestination.com &ndash; Powered by Insight Business Solution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
