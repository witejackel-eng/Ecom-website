import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import JsonLdScripts from '@/components/JsonLdScripts';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import {
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  LOCAL_BUSINESS,
} from '@/app/metadata';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DeviceDestination - Professional Security & Biometric Solutions',
    template: '%s | DeviceDestination',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#0E2732',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    siteName: 'DeviceDestination',
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'DeviceDestination - Professional Security & Biometric Solutions',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'DeviceDestination - Professional Security & Biometric Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeviceDestination - Professional Security & Biometric Solutions',
    description: SITE_DESCRIPTION,
    images: ['/twitter-image'],
  },
  other: {
    'geo.region': 'IN-DL',
    'geo.placename': 'New Delhi',
    'geo.position': '28.5921;77.0488',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className='min-h-full flex flex-col font-sans overflow-x-hidden selection:bg-teal-500/30'
        suppressHydrationWarning
      >
        <AuthProvider>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <JsonLdScripts localBusiness={LOCAL_BUSINESS} />
          <main className='flex-grow'>
            {children}
          </main>
          <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
