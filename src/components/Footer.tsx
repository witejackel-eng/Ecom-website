import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "Dome Cameras", href: "/products?category=Dome%20Cameras" },
        { name: "Bullet Cameras", href: "/products?category=Bullet%20Cameras" },
        { name: "NVR Systems", href: "/products?category=Network%20Video%20Recorders" },
        { name: "Biometric Machines", href: "/products?category=Biometric%20Machines" },
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
        { name: "About DeviceDestination", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-[#080808] border-t border-[#2A2A2A] text-[#888]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="font-heading text-2xl text-[#F5F0E8] mb-6 block">
              DeviceDestination
            </Link>
            <p className="text-sm leading-relaxed">
              Insight Business Solutions (trading as DeviceDestination). Premium surveillance and biometric security solutions.
            </p>
            <div className="text-xs space-y-1">
              <p>Plot No. 94, 3rd Floor, Block - B, Pocket - 10, Sector - 13, Dwarka, New Delhi - 110075</p>
              <p>Ph: <a href="tel:+918368561919" className="hover:text-[#F28C38]">+91 83685 61919</a> / <a href="tel:+919873870992" className="hover:text-[#F28C38]">+91 98738 70992</a></p>
              <p>Email: <a href="mailto:manish@insight-solutions.in" className="hover:text-[#F28C38]">manish@insight-solutions.in</a></p>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/ibsinfra" target="_blank" rel="noreferrer" className="text-sm hover:text-[#F28C38]">Facebook</a>
              <a href="https://www.linkedin.com/in/insight-business-4b71bb37b/" target="_blank" rel="noreferrer" className="text-sm hover:text-[#F28C38]">LinkedIn</a>
            </div>
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
          <p>&copy; {new Date().getFullYear()} DeviceDestination. All Rights Reserved.</p>
          <p className="mt-2">Locations Served: Delhi, Noida, Gurgaon, Faridabad, Dwarka</p>
        </div>
      </div>
    </footer>
  );
}
