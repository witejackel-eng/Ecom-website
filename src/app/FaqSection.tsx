"use client";

import { useState } from "react";
import Accordion from "@/components/ui/Accordion";

export default function FaqSection() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const faqs = [
    { question: "What types of products do you offer?", answer: "We offer a wide range of CCTV cameras (dome, bullet, color night vision), NVR systems, access control solutions, HDMI cables, PBX systems, video door phones (VDP), biometric attendance devices, and IT hardware accessories. All products are sourced from reputed OEMs and come with official warranty." },
    { question: "How do I choose the right camera for my needs?", answer: "For indoor use — homes or small offices — a 2MP or 4MP dome camera is usually sufficient. For outdoor areas or larger spaces, a bullet camera with night vision is recommended. If you are unsure, contact us and we will guide you to the best option based on your site requirements." },
    { question: "Do you provide installation services?", answer: "We are primarily an online seller. However, if you require installation, we can connect you with certified third-party installers who handle complete setup — cabling, mounting, NVR configuration, and mobile app setup. Installation charges are separate, and the service responsibility lies with the installer." },
    { question: "How long does installation typically take?", answer: "Installation time depends on the number of cameras and the complexity of the site. Since we connect you with third-party installers, timelines are confirmed directly with the installer during the site visit. A standard 4-camera setup typically takes 4–6 hours." },
    { question: "Can I view my cameras remotely on my phone?", answer: "Yes. Most of our listed brands support remote viewing via dedicated mobile apps. Once the system is configured by the installer, you can monitor your cameras from anywhere with an active internet connection." },
    { question: "What warranty do you offer on products?", answer: "All products come with OEM warranty. Warranty duration varies by brand. Your invoice acts as the warranty card. Claims are handled directly at the OEM service centre, and we assist you if you face any difficulty." },
    { question: "Do you sell accessories like cables and connectors?", answer: "Yes. We stock HDMI cables, connectors, PBX systems, VDP units, and IT hardware accessories. All accessories are tested and covered under OEM warranty." },
    { question: "How secure is the payment process?", answer: "Payments are processed through secure gateways — UPI, net banking, and cards. We use industry-standard encryption to protect your data and do not store sensitive payment details like CVV or banking passwords." },
    { question: "Do you deliver outside Delhi NCR?", answer: "Currently, we deliver across Delhi NCR including Delhi, Noida, Gurgaon, and Faridabad. We are expanding to all-India delivery very soon. Delivery timelines depend on product availability and your location." },
  ];
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section className="py-28 bg-[rgba(255,138,0,0.03)] border-y border-[rgba(255,138,0,0.1)]">
      <div className="mx-auto max-w-4xl px-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)] mb-4 block text-center">// FAQS</span>
        <h2 className="text-white text-5xl lg:text-6xl font-black tracking-tighter text-center mb-12 leading-[0.95]">Questions We Get <span className="text-[var(--color-tangerine)]">Asked.</span></h2>
        <div className="space-y-4">
          <Accordion items={visibleFaqs} />
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-8 mx-auto block text-sm font-bold uppercase tracking-wider border border-[var(--color-tangerine)] text-[var(--color-tangerine)] bg-transparent hover:bg-[var(--color-tangerine)] hover:text-white transition-colors py-3 px-10 rounded-full"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
}
