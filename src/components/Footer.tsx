import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-900 font-heading text-xl font-bold">
                K
              </div>
              <span className="font-heading text-2xl text-white tracking-tight">
                Konnekt Edge
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Reliable surveillance solutions and professional security systems. 
              Trusted equipment for monitoring and protection, selected for business requirements.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Products
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products?category=Dome Cameras" className="hover:text-white transition-colors">
                  Dome Cameras
                </Link>
              </li>
              <li>
                <Link href="/products?category=Bullet Cameras" className="hover:text-white transition-colors">
                  Bullet Cameras
                </Link>
              </li>
              <li>
                <Link href="/products?category=Network Video Recorders" className="hover:text-white transition-colors">
                  NVR Systems
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-white transition-colors">
                  Product Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Konnekt Edge
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Konnekt Edge. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span>Designed for professional security applications.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
