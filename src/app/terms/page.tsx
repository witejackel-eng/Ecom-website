export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-white text-5xl md:text-6xl font-black tracking-tighter mb-12">Terms & Conditions</h1>
        <div className="glass rounded-[2rem] border border-white/5 p-12 space-y-8">
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-400 leading-relaxed">These Terms & Conditions ("Terms") govern all sales, services, and interactions through our online portal. By accessing or purchasing from the website, you agree to abide by these Terms.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">1. Scope of Business</h2>
            <p className="text-gray-400 leading-relaxed">We deal in IT hardware, CCTV systems, access control devices, HDMI cables, PBX systems, VDP units, and related accessories. Product specifications, features, and compatibility are provided by the respective OEMs. Buyers are advised to verify suitability before purchase.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">2. Product Information</h2>
            <p className="text-gray-400 leading-relaxed">All product descriptions, images, and specifications are for reference only. We are not responsible for typographical errors, omissions, or changes made by manufacturers. Product availability is subject to stock and OEM supply.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">3. Sales & Warranty</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>All products are sold with OEM warranty only.</li>
              <li>Warranty duration and conditions are determined by the manufacturer.</li>
              <li>The invoice issued serves as proof of purchase.</li>
              <li>Warranty claims must be made directly at the OEM service centre.</li>
              <li>We may assist in coordination but bear no liability for OEM warranty decisions or delays.</li>
            </ul>
          </section>          <section>
            <h2 className="text-white text-2xl font-bold mb-4">4. Installation & Services</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>We do not directly provide installation for online orders.</li>
              <li>Upon request, we may connect buyers with independent third-party installers.</li>
              <li>Installation charges are payable directly to the installer.</li>
              <li>We disclaim liability for installation quality, delays, or damages.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">5. Payment & Security</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Payments are processed through secure third-party gateways (UPI, net banking, credit/debit cards).</li>
              <li>We do not store sensitive payment data.</li>
              <li>We are not liable for payment gateway failures or unauthorized access beyond our control.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">6. Delivery & Risk of Loss</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Delivery is available across Delhi NCR and expanding nationwide.</li>
              <li>Risk of loss or damage passes to the buyer once the product is handed over to the courier.</li>
              <li>We are not liable for courier delays or damages after dispatch.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed">Our liability is limited to the invoice value of the product. No claims shall be entertained for indirect, incidental, or consequential damages, including loss of data, business interruption, or financial loss.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">8. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">All content, logos, and materials on the website are our property or that of our licensors. Unauthorized use, reproduction, or distribution is prohibited.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">9. Privacy & Data Protection</h2>
            <p className="text-gray-400 leading-relaxed">We collect customer information solely for order processing, delivery, and warranty support. Data is handled in accordance with the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020. Personal data is never sold or shared except with OEMs, payment gateways, or logistics partners for legitimate business purposes.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">10. Governing Law & Jurisdiction</h2>
            <p className="text-gray-400 leading-relaxed">These Terms are governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">11. Amendments</h2>
            <p className="text-gray-400 leading-relaxed">We reserve the right to modify these Terms at any time without prior notice. Updated Terms will be published on the website and shall apply to all subsequent transactions.</p>
          </section>
        </div>
      </div>
    </main>
  );
}