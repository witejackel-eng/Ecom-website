"use client";

import { MapPin, Phone, Mail, Clock, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const contactDetails = [
    { icon: MapPin, title: "Address", content: "Plot No. 94, 3rd Floor, Block - B, Pocket - 10, Sector - 13, Dwarka, New Delhi - 110075" },
    { icon: Phone, title: "Phone", content: "+91 83685 61919 / +91 98738 70992", href: "tel:+918368561919" },
    { icon: Mail, title: "Email", content: "manish@insight-solutions.in", href: "mailto:manish@insight-solutions.in" },
    { icon: Clock, title: "Hours", content: "Monday – Saturday, 10:00 AM – 7:00 PM" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-heading text-5xl mb-4">Contact Us</h1>
        <p className="text-xl text-[#888] mb-12">Get in touch with our security experts</p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {contactDetails.map((item) => (
              <a 
                key={item.title} 
                href={item.href || "#"} 
                className="flex items-start gap-4 p-6 bg-[#111] border border-[#2A2A2A] rounded-xl hover:border-[#F28C38] transition-colors"
              >
                <item.icon className="h-6 w-6 text-[#F28C38] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#C9A84C] mb-1">{item.title}</h3>
                  <p className="text-sm">{item.content}</p>
                </div>
              </a>
            ))}
            
            <div className="pt-6">
              <h3 className="text-[#C9A84C] font-bold mb-4">Areas We Serve</h3>
              <div className="flex flex-wrap gap-2">
                {["Delhi", "Noida", "Gurgaon", "Faridabad", "Dwarka"].map(area => (
                  <span key={area} className="px-3 py-1 bg-[#1A1A1A] border border-[#F28C38] text-[#F28C38] rounded-full text-xs font-bold uppercase">{area}</span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <a href="https://www.facebook.com/ibsinfra" target="_blank" rel="noreferrer" className="p-3 bg-[#1A1A1A] rounded-full border border-[#2A2A2A] hover:border-[#F28C38]"><Facebook className="h-6 w-6 text-[#F5F0E8]" /></a>
              <a href="https://www.linkedin.com/in/insight-business-4b71bb37b/" target="_blank" rel="noreferrer" className="p-3 bg-[#1A1A1A] rounded-full border border-[#2A2A2A] hover:border-[#F28C38]"><Linkedin className="h-6 w-6 text-[#F5F0E8]" /></a>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#2A2A2A] h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.717657924376!2d77.03795551508103!3d28.58356978243689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b4a6256f103%3A0x67586a11e4003d8b!2sSector%2013%2C%20Dwarka%2C%20New%20Delhi%2C%20Delhi%20110075!5e0!3m2!1sen!2sin!4v1685600000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
