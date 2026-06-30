"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Eye, EyeOff, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const inputClass = "bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all w-full text-sm";
const labelClass = "text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block";

function getStrength(password: string): { label: string; score: number; color: string; width: string } {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (score <= 1) return { label: "Weak", score, color: "bg-red-500", width: "w-[16%]" };
  if (score <= 3) return { label: "Fair", score, color: "bg-yellow-500", width: "w-[33%]" };
  if (score <= 4) return { label: "Good", score, color: "bg-blue-500", width: "w-[66%]" };
  if (score <= 5) return { label: "Strong", score, color: "bg-teal-400", width: "w-[83%]" };
  return { label: "Very Strong", score, color: "bg-teal-400", width: "w-full" };
}
export default function ChangePasswordPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated, isLoading } = state;


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword;
  const passwordsDirty = confirmPassword.length > 0;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-28">
        <div className="h-10 w-10 border-4 border-[var(--color-tangerine)] border-t-transparent rounded-full animate-spin mx-auto" />
      </main>
    );
  }

  if (!isAuthenticated || !user) return null;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
      <div className="max-w-2xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Account
        </Link>
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.25)]">
              <Lock className="h-6 w-6 text-[var(--color-tangerine)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Change Password</h1>
              <p className="text-gray-400 text-sm mt-1">Update your account password</p>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Current Password</label>
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className={`${inputClass} pr-12`} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors" tabIndex={-1}>
                    {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className={labelClass}>New Password</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className={`${inputClass} pr-12`} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors" tabIndex={-1}>
                    {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {newPassword.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: strength.width }} className={`h-full ${strength.color} rounded-full transition-all duration-500`} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${strength.score <= 3 ? "text-red-400" : "text-teal-400"}`}>{strength.label}</span>
                    </div>
                    <ul className="space-y-1">
                      {[{check: newPassword.length >= 6, text: "At least 6 characters"},{check: /[A-Z]/.test(newPassword), text: "One uppercase letter"},{check: /[a-z]/.test(newPassword), text: "One lowercase letter"},{check: /[0-9]/.test(newPassword), text: "One number"},{check: /[^A-Za-z0-9]/.test(newPassword), text: "One special character"}].map((item, i) => (
                        <li key={i} className={`flex items-center gap-2 text-[11px] ${item.check ? "text-teal-400" : "text-gray-500"}`}><span className={`h-1 w-1 rounded-full ${item.check ? "bg-teal-400" : "bg-gray-500"}`} />{item.text}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className={labelClass}>Confirm New Password</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={`${inputClass} pr-12 ${passwordsDirty && !passwordsMatch ? "border-red-500/50" : passwordsDirty && passwordsMatch ? "border-teal-500/50" : ""}`} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors" tabIndex={-1}>
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordsDirty && !passwordsMatch && <p className="text-red-400 text-[11px] mt-1.5">Passwords do not match</p>}
                {passwordsDirty && passwordsMatch && <p className="text-teal-400 text-[11px] mt-1.5 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Passwords match</p>}
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-2">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={saving || !passwordsMatch || !newPassword}
                  className="inline-flex items-center gap-2 bg-[var(--color-tangerine)] text-white py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : <><ShieldCheck className="h-4 w-4" /> Update Password</>}
                </motion.button>
                {saved && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-teal-400 text-sm font-medium"><CheckCircle className="h-4 w-4 inline mr-1" /> Password updated!</motion.span>}
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}