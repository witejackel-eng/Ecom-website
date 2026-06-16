import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Dome Cameras", href: "/products?category=Dome%20Cameras" },
        { name: "Bullet Cameras", href: "/products?category=Bullet%20Cameras" },
        { name: "Color Dome Cameras", href: "/products?category=Color%20Dome%20Cameras" },
        { name: "Color Bullet Cameras", href: "/products?category=Color%20Bullet%20Cameras" },
        { name: "NVR Systems", href: "/products?category=NVR%20Systems" },
        { name: "Biometric Devices", href: "/products?category=Biometric%20Devices" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About DeviceDestination", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Warranty Info", href: "/warranty" },
        { name: "Product Downloads", href: "/downloads" },
      ],
    },
  ];

  return (
    <footer className="bg-[#FAFAFA] border-t border-[#E5E5E5] text-[#666666]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="font-heading text-2xl text-[#1A1A1A] block">
              DeviceDestination
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium surveillance and biometric security solutions for homes, businesses, and institutions.
            </p>
            <div className="text-xs space-y-2">
              <p className="font-bold text-[#1A1A1A]">Contact</p>
              <p>Plot No. 94, 3rd Floor, Block - B, Pocket - 10, Sector - 13, Dwarka, New Delhi - 110075</p>
              <p>
                <a href="tel:+918368561919" className="hover:text-[#F28C38]">+91 83685 61919</a> / 
                <a href="tel:+919873870992" className="hover:text-[#F28C38]"> +91 98738 70992</a>
              </p>
              <p>
                <a href="mailto:manish@insight-solutions.in" className="hover:text-[#F28C38]">manish@insight-solutions.in</a>
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ibsinfra" target="_blank" rel="noreferrer" className="text-sm hover:text-[#F28C38]">Facebook</a>
              <a href="https://www.linkedin.com/in/insight-business-4b71bb37b/" target="_blank" rel="noreferrer" className="text-sm hover:text-[#F28C38]">LinkedIn</a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F28C38] mb-6 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm">
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

        <div className="mt-16 border-t border-[#E5E5E5] pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} DeviceDestination. All Rights Reserved.</p>
          <p className="mt-2 text-[#888]">Locations Served: Delhi, Noida, Gurgaon, Faridabad</p>
        </div>
      </div>
    </footer>
  );
}
