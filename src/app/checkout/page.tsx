"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import FadeIn from "@/components/ui/FadeIn";

export default function CheckoutPage() {
  const { clearCart, subtotal } = useCart();
  const [step, setStep] = useState<"info" | "success">("info");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <main className="flex-1 py-24 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="bg-surface p-8 sm:p-12 rounded-2xl border border-border shadow-sm text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h1 className="font-heading text-3xl text-foreground mb-4">
                Order Received Successfully
              </h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for your purchase. Our team will review your order and contact you shortly to confirm the details and arrange delivery.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-medium text-white hover:bg-primary-hover transition-all duration-300 group"
              >
                Continue Shopping
                <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-16 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Cart
          </Link>

          <div className="bg-surface p-8 sm:p-10 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h1 className="font-heading text-3xl text-foreground">Customer Information</h1>
            </div>
            <p className="text-gray-600 mb-8">Please provide your details to complete the purchase securely.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  required
                  rows={4}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Enter your complete delivery address including city and PIN code"
                />
              </div>

              <div className="pt-6 border-t border-border">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-medium text-white hover:bg-primary-hover transition-all duration-300 group"
                >
                  Continue to Payment
                  <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Your information is secured and encrypted.
                </p>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
