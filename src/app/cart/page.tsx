"use client";

import Link from "next/link";
import { ArrowRight, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const tax = cartTotal * 0.18;
  const total = cartTotal + tax;

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 py-24 bg-background">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <FadeIn direction="up">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-heading text-3xl text-foreground mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Looks like you haven't added any security equipment to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-medium text-white hover:bg-primary-hover transition-all duration-300 group"
            >
              Browse Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <h1 className="font-heading text-4xl text-foreground mb-8">Shopping Cart</h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <StaggerContainer className="space-y-4">
              {cartItems.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="flex gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative h-24 w-24 flex-shrink-0 rounded-lg bg-surface-hover overflow-hidden border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading text-lg text-foreground">{item.name}</h3>
                        <p className="text-sm text-gray-500">Model: {item.model}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1 bg-surface-hover rounded-lg border border-border p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-surface hover:text-primary transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-surface hover:text-primary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="font-semibold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeIn direction="left">
              <div className="bg-surface p-6 rounded-xl border border-border shadow-sm sticky top-24">
                <h2 className="font-heading text-xl text-foreground mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground text-base">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-medium text-white hover:bg-primary-hover transition-all duration-300 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-gray-700 hover:bg-surface-hover hover:border-primary/50 transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
