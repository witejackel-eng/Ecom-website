"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SectionLabel from "@/components/SectionLabel";
import { Check, ShieldCheck, FileText, Lock, Wrench, Award, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, updateQuantity } = useCart();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "", city: "", pincode: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "This field is required";
    if (!formData.phone || formData.phone.length !== 10) newErrors.phone = "Enter a valid 10-digit number";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Enter a valid email address";
    if (!formData.address) newErrors.address = "This field is required";
    if (!formData.city) newErrors.city = "This field is required";
    if (!formData.pincode) newErrors.pincode = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    const subject = "New Order Request - DeviceDestination";
    const body = `NEW ORDER REQUEST\n\nCUSTOMER DETAILS:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\nNotes: ${formData.notes}\n\nORDER ITEMS:\n${cartItems.map(item => `${item.name} (${item.model}) x${item.quantity} = ₹${item.mrp * item.quantity}`).join("\n")}\n\nTOTAL: ₹${cartTotal}`;
    
    window.location.href = `mailto:sales@insight-solutions.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen pt-40 pb-32 flex items-center justify-center px-6">
        <div className="glass p-16 rounded-[2rem] text-center max-w-lg border-tangerine">
          <Check size={56} className="text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Order Request Sent!</h2>
          <p className="text-gray-300 mb-8">We have received your order request and will call you at {formData.phone} within 2 hours to confirm.</p>
          <Link href="/products" className="bg-primary text-white py-4 px-8 rounded-full font-bold hover:bg-tangerine-light transition-colors">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  const gstAmount = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + gstAmount;

  return (
    <main className="min-h-screen pt-28 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>Checkout</SectionLabel>
        <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-10 tracking-tight">Complete Your Order</h1>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass rounded-[1.5rem] p-6 md:p-8 border-tangerine sticky top-28">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Order Summary</h2>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No items in your cart.</p>
                  <Link href="/products" className="text-primary font-semibold hover:text-tangerine-light transition-colors">Browse Products</Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-white/10 last:border-0">
                        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                          ) : (
                            <div className="text-gray-500 text-xs font-bold uppercase text-center px-1">No Image</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">{item.name}</p>
                          <p className="text-gray-400 text-xs mb-2">Model: {item.model}</p>
                          <div className="flex items-center gap-3 bg-white/5 rounded-lg border border-white/10">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white text-sm font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-primary font-bold text-sm mt-2">₹{item.mrp * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white font-semibold">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">GST (18%)</span>
                      <span className="text-white font-semibold">₹{gstAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-white font-bold text-base">Grand Total</span>
                      <span className="text-primary font-black text-2xl tracking-tight">₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <Wrench size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400 text-xs leading-relaxed">Installation charges will be confirmed separately based on your location.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400 text-xs leading-relaxed">Free shipping across Delhi NCR. Additional charges may apply for remote locations.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400 text-xs leading-relaxed">Estimated response time: within 2 hours during business hours.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trust Section */}
            <div className="glass rounded-[1.5rem] p-6 md:p-8 border-tangerine">
              <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Why Buy From Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={20} className="text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-xs leading-relaxed">Genuine OEM Products</span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-xs leading-relaxed">GST Invoice</span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock size={20} className="text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-xs leading-relaxed">Secure Checkout</span>
                </div>
                <div className="flex items-start gap-3">
                  <Wrench size={20} className="text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-xs leading-relaxed">Installation Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="lg:col-span-8">
            <div className="glass rounded-[1.5rem] p-6 md:p-8 border-tangerine">
              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Customer Information</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-tangerine-light rounded-full mb-8" />

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-5">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-gray-300">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Full Name <span className="text-primary">*</span></label>
                      <input
                        id="name"
                        type="text"
                        required
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/60' : 'border-white/10'} rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">Phone Number <span className="text-primary">*</span></label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/60' : 'border-white/10'} rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all`}
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && <p id="phone-error" className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address <span className="text-primary">*</span></label>
                    <input
                      id="email"
                      type="email"
                      required
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/60' : 'border-white/10'} rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all`}
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-5 pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-gray-300">Address Information</h3>
                  <div>
                    <label htmlFor="address" className="block text-gray-300 text-sm font-medium mb-2">Street Address <span className="text-primary">*</span></label>
                    <input
                      id="address"
                      type="text"
                      required
                      className={`w-full bg-white/5 border ${errors.address ? 'border-red-500/60' : 'border-white/10'} rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all`}
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? "address-error" : undefined}
                    />
                    {errors.address && <p id="address-error" className="text-red-400 text-xs mt-1.5">{errors.address}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="city" className="block text-gray-300 text-sm font-medium mb-2">City <span className="text-primary">*</span></label>
                      <input
                        id="city"
                        type="text"
                        required
                        className={`w-full bg-white/5 border ${errors.city ? 'border-red-500/60' : 'border-white/10'} rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all`}
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "city-error" : undefined}
                      />
                      {errors.city && <p id="city-error" className="text-red-400 text-xs mt-1.5">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-gray-300 text-sm font-medium mb-2">PIN Code <span className="text-primary">*</span></label>
                      <input
                        id="pincode"
                        type="text"
                        required
                        className={`w-full bg-white/5 border ${errors.pincode ? 'border-red-500/60' : 'border-white/10'} rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all`}
                        placeholder="Enter PIN code"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        aria-invalid={!!errors.pincode}
                        aria-describedby={errors.pincode ? "pincode-error" : undefined}
                      />
                      {errors.pincode && <p id="pincode-error" className="text-red-400 text-xs mt-1.5">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-5 pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-gray-300">Additional Information</h3>
                  <div>
                    <label htmlFor="notes" className="block text-gray-300 text-sm font-medium mb-2">Order Notes (Optional)</label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none"
                      placeholder="Any special instructions or requirements..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>

                {/* CTA Section */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full bg-gradient-to-r from-primary to-tangerine-light text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-tight"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order Request"}
                  </button>
                  <div className="text-center space-y-1">
                    <p className="text-gray-300 text-xs font-medium">We will contact you within 2 hours to confirm your order</p>
                    <p className="text-gray-500 text-xs">OEM verified products • Installation scheduled after confirmation • GST invoice provided</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
