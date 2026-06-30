"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import SectionLabel from "@/components/SectionLabel";
import { Check } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
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
    const body = `NEW ORDER REQUEST\n\nCUSTOMER DETAILS:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\nNotes: ${formData.notes}\n\nORDER ITEMS:\n${cartItems.map(item => `${item.name} (${item.model}) x${item.quantity} = ₹${item.mrp * item.quantity}`).join('\n')}\n\nTOTAL: ₹${cartTotal}`;
    
    window.location.href = `mailto:sales@insight-solutions.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen pt-40 pb-32 flex items-center justify-center">
        <div className="glass p-16 rounded-[2rem] text-center max-w-lg">
          <Check size={48} className="text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Order Request Sent!</h2>
          <p className="text-gray-300 mb-8">We have received your order request and will call you at {formData.phone} within 2 hours to confirm.</p>
          <Link href="/products" className="bg-primary text-white py-4 px-8 rounded-full font-bold">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Checkout</SectionLabel>
        <h1 className="text-white text-4xl font-extrabold mb-8">Complete Your Order</h1>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-2 glass p-8 rounded-[1rem]">
            <h2 className="text-2xl font-bold text-white mb-6">Your Order</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-400">No items in your cart. <Link href="/products" className="text-primary">Browse Products</Link></p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs">{item.model} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-primary font-semibold">₹{item.mrp * item.quantity}</p>
                  </div>
                ))}
                <div className="flex justify-between pt-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-bold">₹{cartTotal}</span>
                </div>
                <p className="text-gray-500 text-xs mt-4">Installation charges will be confirmed separately based on your location.</p>
              </div>
            )}
          </div>

          {/* Form */}
          <form className="lg:col-span-3 glass p-8 rounded-[1rem]" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-white mb-6">Your Details</h2>
            {['name', 'phone', 'email', 'address', 'city', 'pincode'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-300 text-sm mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input 
                  type={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                  placeholder={field === 'phone' ? '+91 XXXXX XXXXX' : `Your ${field}`}
                  onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-1">Additional Notes (Optional)</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                rows={2}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            <button 
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full bg-primary text-white py-4 rounded-full font-bold mt-4"
            >
              {isSubmitting ? "Placing Order..." : "Place Order Request"}
            </button>
            <p className="text-gray-400 text-xs text-center mt-4">We will call you within 2 hours to confirm your order and discuss installation.</p>
          </form>
        </div>
      </div>
    </main>
  );
}
