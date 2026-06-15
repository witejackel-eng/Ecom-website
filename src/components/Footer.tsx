import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "Dome Cameras", href: "/products?category=Dome%20Cameras" },
        { name: "Bullet Cameras", href: "/products?category=Bullet%20Cameras" },
        { name: "NVR Systems", href: "/products?category=Network%20Video%20Recorders" },
        { name: "All Products", href: "/products" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Warranty Information", href: "/warranty" },
        { name: "Product Downloads", href: "/downloads" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Konnekt Edge", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-[#080808] border-t border-[#2A2A2A] text-[#888]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="font-heading text-2xl text-[#F5F0E8] mb-6 block">
              Konnekt Edge
            </Link>
            <p className="text-sm leading-relaxed">
              Premium surveillance solutions designed for enterprise security.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-4 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-[#F28C38] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#2A2A2A] pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} Konnekt Edge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
