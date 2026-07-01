/**
 * manifest.ts — generates a PWA Web App Manifest at /manifest.json
 *
 * Enables "Add to Home Screen" on mobile browsers and gives the app
 * a native-like identity when installed standalone.
 */

import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DeviceDestination — Security & Biometric Solutions',
    shortName: 'DeviceDestination',
    description: 'Authorised CP Plus & ESSL dealer — CCTV cameras, NVRs, biometric attendance machines. Delhi NCR.',
    startUrl: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0E2732',
    theme_color: '#FF8A00',
    orientation: 'any',
    categories: ['shopping', 'security', 'electronics'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Products',
        shortName: 'Products',
        description: 'Browse security cameras, NVRs and biometrics',
        url: '/products',
        icons: [{ src: '/favicon.svg', sizes: 'any' }],
      },
      {
        name: 'Contact',
        shortName: 'Contact',
        description: 'Get a quote or speak to our team',
        url: '/contact',
        icons: [{ src: '/favicon.svg', sizes: 'any' }],
      },
    ],
    prefer_related_applications: false,
  };
}
