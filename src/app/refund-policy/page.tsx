export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-white text-5xl md:text-6xl font-black tracking-tighter mb-12">Refund & Return Policy</h1>
        <div className="glass rounded-[2rem] border border-white/5 p-12 space-y-8">
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">General Policy</h2>
            <p className="text-gray-400 leading-relaxed">This policy governs all transactions made through our portal. By placing an order, you agree to the terms stated herein.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">1. Return Eligibility</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Returns are accepted only for defective, damaged, or incorrect products delivered.</li>
              <li>You must notify us within 48 hours of delivery via email or phone with clear proof (photos/videos).</li>
              <li>Products must be unused, uninstalled, and in original packaging with all accessories and manuals intact.</li>
              <li>Returns are not accepted for items damaged due to improper installation, mishandling, or electrical faults.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">2. Non-Returnable Items</h2>
            <p className="text-gray-400 leading-relaxed">The following items are non-returnable unless defective on arrival:</p>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2 mt-2">
              <li>Cables, connectors, and accessories</li>
              <li>Software-activated devices</li>
              <li>Customized or special-order products</li>
              <li>Products with tampered serial numbers or missing packaging</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">3. Refund Process</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Approved refunds will be processed within 7–10 business days after inspection and confirmation.</li>
              <li>Refunds are made to the original payment method only.</li>
              <li>Shipping and installation charges are non-refundable.</li>
              <li>In case of partial returns, only the product value will be refunded.</li>
            </ul>
          </section>          <section>
            <h2 className="text-white text-2xl font-bold mb-4">4. Cancellation Policy</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Orders can be cancelled before dispatch by contacting customer support.</li>
              <li>Once dispatched, cancellation is not possible.</li>
              <li>If payment has been made and the order is cancelled before dispatch, the refund will be processed within 7–10 business days.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">5. Replacement Policy</h2>
            <p className="text-gray-400 leading-relaxed">If a product is found defective within the warranty period, replacement will be handled as per OEM warranty terms. We may assist in coordination but are not liable for OEM delays or decisions.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">6. Shipping & Return Costs</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed space-y-2">
              <li>Return shipping costs are borne by the buyer unless the product is defective or incorrect.</li>
              <li>In case of our error, shipping charges will be reimbursed after verification.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed">Our liability is limited to the invoice value of the product. No compensation shall be provided for indirect or consequential losses.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">8. Governing Law & Jurisdiction</h2>
            <p className="text-gray-400 leading-relaxed">This policy is governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.</p>
          </section>
        </div>
      </div>
    </main>
  );
}