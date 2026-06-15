"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified validation
    const formData = new FormData(e.target as HTMLFormElement);
    const phone = formData.get("phone") as string;
    const pin = formData.get("pin") as string;
    
    const newErrors: any = {};
    if (phone.length !== 10) newErrors.phone = "Must be 10 digits";
    if (pin.length !== 6) newErrors.pin = "Must be 6 digits";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#111] p-10 rounded-2xl border border-[#2A2A2A] max-w-md">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-heading text-3xl text-[#F5F0E8] mb-4">Order Placed Successfully!</h2>
          <p className="text-[#888] mb-6">Your order number is #{Math.floor(100000 + Math.random() * 900000)}. Our team at DeviceDestination will contact you within 24 hours. For urgent queries call +91 83685 61919</p>
          <a href="/products" className="block w-full py-3 bg-[#F28C38] text-[#0A0A0A] font-bold rounded-lg">Continue Shopping</a>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
        {/* Left: Summary */}
        <div className="bg-[#111] p-8 rounded-2xl border border-[#2A2A2A] h-fit">
          <h2 className="font-heading text-2xl mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.quantity} × {item.name}</span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2A2A2A] mt-6 pt-6 flex justify-between text-xl font-bold text-[#F28C38]">
            <span>Total</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Right: Payment */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="font-heading text-2xl">Complete Your Order</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Full Name" required className="col-span-2 p-3 bg-[#111] border border-[#2A2A2A] rounded-lg focus:border-[#F28C38] outline-none" />
            <input name="email" type="email" placeholder="Email" required className="col-span-2 p-3 bg-[#111] border border-[#2A2A2A] rounded-lg focus:border-[#F28C38] outline-none" />
            <input name="phone" placeholder="Phone (10 digits)" required className="p-3 bg-[#111] border border-[#2A2A2A] rounded-lg focus:border-[#F28C38] outline-none" />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
            <input name="pin" placeholder="PIN Code (6 digits)" required className="p-3 bg-[#111] border border-[#2A2A2A] rounded-lg focus:border-[#F28C38] outline-none" />
            {errors.pin && <span className="text-red-500 text-xs">{errors.pin}</span>}
          </div>
          <button type="submit" className="w-full py-4 bg-[#F28C38] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#C96E1A]">Make Payment</button>
        </form>
      </div>
    </main>
  );
}
