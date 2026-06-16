"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { ArrowUpRight, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Solutions",
      links: [
        { name: "All Collections", href: "/products" },
        { name: "Dome Series", href: "/products?category=Dome%20Cameras" },
        { name: "Bullet Series", href: "/products?category=Bullet%20Cameras" },
        { name: "Color Night Vision", href: "/products?category=Color%20Dome%20Cameras" },
        { name: "NVR Architecture", href: "/products?category=NVR%20Systems" },
        { name: "Biometric Access", href: "/products?category=Biometric%20Devices" },
      ],
    },
    {
      title: "Organization",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Contact Architecture", href: "/contact" },
        { name: "Privacy Protocol", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Manufacturers",
      links: [
        { name: "CP Plus", href: "https://www.cpplusworld.com/" },
        { name: "ESSL Security", href: "https://esslsecurity.com/" },
        { name: "Hikvision", href: "https://www.hikvision.com/" },
        { name: "Dahua Technology", href: "https://www.dahuasecurity.com/" },
      ],
    },
  ];

  return (
    <footer className="relative pt-32 pb-16 overflow-hidden border-t border-white/5 bg-[#031E2A]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 relative z-10">
          {/* Brand & Narrative */}
          <div className="lg:col-span-5 space-y-12">
            <FadeIn direction="none">
              <Link href="/" className="text-4xl font-black text-white tracking-tighter">
                DeviceDestination<span className="text-primary">.</span>
              </Link>
              <p className="mt-8 text-xl text-white/75 leading-relaxed max-w-md font-medium">
                Designing bespoke security ecosystems for those who demand uncompromising protection and absolute clarity.
              </p>
            </FadeIn>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/55 group">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm leading-relaxed">
                  Plot No. 94, 3rd Floor, Block - B, Sector - 13, Dwarka, New Delhi - 110075
                </span>
              </div>
              <div className="flex items-center gap-4 text-white/55">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col text-sm">
                  <a href="tel:+918368561919" className="hover:text-primary transition-colors">+91 83685 61919</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/55">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:manish@insight-solutions.in" className="text-sm hover:text-primary transition-colors">manish@insight-solutions.in</a>
              </div>
            </div>
          </div>

          {/* Links Hierarchy */}
          <div className="lg:col-span-7">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {footerSections.map((section) => (
                <StaggerItem key={section.title}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">
                    {section.title}
                  </h3>
                  <ul className="space-y-6">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href} 
                          className="text-white/55 hover:text-primary text-sm transition-all duration-300 flex items-center gap-2 group"
                        >
                          {link.name}
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Massive Watermark */}
        <div className="relative pt-16 border-t border-white/5 overflow-hidden">
          <h2 className="text-[clamp(80px,12vw,220px)] font-black text-white/5 leading-none tracking-tighter uppercase whitespace-nowrap select-none opacity-[0.04]">
            DeviceDestination
          </h2>
          
          <div className="absolute bottom-16 left-0 w-full flex flex-col md:flex-row justify-between items-center gap-8 px-2">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} DeviceDestination &middot; All Rights Reserved
            </p>
            
            <div className="flex gap-8">
              <a href="https://facebook.com" className="text-white/20 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="https://linkedin.com" className="text-white/20 hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
            
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
              Delhi &middot; Noida &middot; Gurgaon &middot; Faridabad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
