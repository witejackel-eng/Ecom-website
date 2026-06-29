"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await signup({ firstName, lastName, email, password, phone });
      router.push("/account");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[40%] h-[40%] bg-teal-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[30%] h-[30%] bg-[var(--color-tangerine)]/5 rounded-full blur-[100px] -z-10" />
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <FadeIn direction="up">
          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine">
            <div className="text-center mb-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.25)]">
                <UserPlus className="h-7 w-7 text-[var(--color-tangerine)]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Create Account</h1>
              <p className="text-gray-400 text-sm">Join DeviceDestination today</p>
            </div>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all" autoComplete="given-name" />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all" autoComplete="family-name" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all" autoComplete="email" />
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all" autoComplete="tel" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all pr-12" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all pr-12" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors" tabIndex={-1}>
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* Submit */}
              <button type="submit" disabled={isLoading} className="w-full bg-[var(--color-tangerine)] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            {/* Login link */}
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--color-tangerine)] font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
