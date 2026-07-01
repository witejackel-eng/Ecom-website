'use client';

import { useEffect } from 'react';

interface JsonLdInlineProps {
  id: string;
  data: Record<string, unknown>;
}

export default function JsonLdInline({ id, data }: JsonLdInlineProps) {
  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    try {
      el.textContent = JSON.stringify({ '@context': 'https://schema.org', ...data });
      document.head.appendChild(el);
      return () => { const e = document.getElementById(id); if (e) e.remove(); };
    } catch { /* noop */ }
  }, [id, data]);
  return null;
}