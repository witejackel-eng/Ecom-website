/**
 * JsonLdScripts — injects site-wide JSON-LD structured data into the DOM.
 *
 * Renders as a client component so it can use dangerouslySetInnerHTML
 * for script[type=application/ld+json].
 *
 * The schemas injected here are:
 *   • WebSite + SearchAction  (from @/lib/schemas)
 *   • Organization             (from @/lib/schemas)
 *   • LocalBusiness            (passed from layout)
 *
 * Individual page schemas (Product, BreadcrumbList, FAQ) are injected by
 * their respective page components as inline <script> tags.
 */

'use client';

import { websiteSchema, organizationSchema, localBusinessSchema, buildCombinedSchema, type JsonLdObject } from '@/lib/schemas';

interface JsonLdScriptsProps {
  localBusiness: JsonLdObject;
}

export default function JsonLdScripts({ localBusiness }: JsonLdScriptsProps) {
  const schemas = [
    websiteSchema(),
    organizationSchema(),
    localBusiness,
  ];
  const json = buildCombinedSchema(schemas);

  return (
    <script
      id="json-ld-root"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
