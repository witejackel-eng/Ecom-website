"use client";

import { useState } from "react";
import { FaqContent, faqs } from "./faq-content";

export default function FaqSection() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleFaqs = faqs.slice(0, showAll ? faqs.length : 4);

  return <FaqContent visibleFaqs={visibleFaqs} showAll={showAll} onToggle={() => setShowAll(!showAll)} />;
}
