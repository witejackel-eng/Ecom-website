"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main 
      className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: "url('/images/city-night.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0A0A0A"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="font-heading text-5xl mb-4 text-white">Contact Us</h1>
          <p className="text-xl text-gray-200">Get in touch with our security experts at DeviceDestination</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div className="p-6 bg-[#111]/80 backdrop-blur border border-[#2A2A2A] rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="h-6 w-6 text-[#F28C38]" />
                <h3 className="font-bold text-white">Our Office</h3>
              </div>
              <p className="text-sm text-gray-200">Plot No. 94, 3rd Floor, Block - B, Pocket - 10, Sector - 13, Dwarka, New Delhi - 110075</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a href="tel:+918368561919" className="p-6 bg-[#111]/80 backdrop-blur border border-[#2A2A2A] rounded-xl hover:border-[#F28C38]">
                <Phone className="h-6 w-6 text-[#F28C38] mb-2" />
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm text-white">+91 83685 61919</p>
              </a>
              <a href="mailto:manish@insight-solutions.in" className="p-6 bg-[#111]/80 backdrop-blur border border-[#2A2A2A] rounded-xl hover:border-[#F28C38]">
                <Mail className="h-6 w-6 text-[#F28C38] mb-2" />
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm text-white">manish@insight-solutions.in</p>
              </a>
            </div>
            <div className="p-6 bg-[#111]/80 backdrop-blur border border-[#2A2A2A] rounded-xl">
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-[#F28C38]" />
                <div>
                  <h3 className="font-bold text-white">Business Hours</h3>
                  <p className="text-sm text-gray-200">Monday – Saturday, 10:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4 bg-[#111]/80 backdrop-blur p-8 rounded-2xl border border-[#2A2A2A]">
            <input placeholder="Your Name" className="w-full p-3 bg-[#0A0A0A]/50 border border-[#2A2A2A] rounded-lg text-white" />
            <input placeholder="Your Email" className="w-full p-3 bg-[#0A0A0A]/50 border border-[#2A2A2A] rounded-lg text-white" />
            <textarea placeholder="Your Message" rows={4} className="w-full p-3 bg-[#0A0A0A]/50 border border-[#2A2A2A] rounded-lg text-white"></textarea>
            <button className="w-full py-4 bg-[#F28C38] text-[#0A0A0A] font-bold rounded-lg flex items-center justify-center gap-2">
              Send Message <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
