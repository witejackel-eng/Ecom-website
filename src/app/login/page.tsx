"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/account");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <FadeIn direction="up">
          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgb(var(--tangerine-rgb)_/_0.25)]">
                <LogIn className="h-7 w-7 text-[var(--color-tangerine)]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm">
                Sign in to access your account
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[var(--color-tangerine)]"
                  />
                  <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-[var(--color-tangerine)] text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--color-tangerine)] text-[var(--color-navy-deep)] py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Social Login - Future Ready */}
            <div className="space-y-3">
              <button
                type="button"
                disabled
                className="w-full py-3 flex items-center justify-center gap-3 rounded-xl border border-white/10 text-gray-400 text-sm font-medium cursor-not-allowed opacity-60"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
                <span className="text-[10px] text-gray-500">(coming soon)</span>
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[var(--color-tangerine)] font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

