"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Save, Upload, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const inputClass = "bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all w-full text-sm";
const labelClass = "text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block";

export default function ProfilePage() {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const { user, isAuthenticated, isLoading } = state;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    try {
      // Simulate API call (matching the app's existing async pattern from AuthContext)
      await new Promise((r) => setTimeout(r, 1000));
      dispatch({ type: "UPDATE_PROFILE", payload: { firstName, lastName, phone } });
      setSaved(true);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  }, [dispatch, firstName, lastName, phone]);



  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-28">
        <div className="h-10 w-10 border-4 border-[var(--color-tangerine)] border-t-transparent rounded-full animate-spin mx-auto" />
      </main>
    );
  }

  if (!isAuthenticated || !user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Account
        </Link>

        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.25)]">
              <User className="h-6 w-6 text-[var(--color-tangerine)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">My Profile</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your personal information</p>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine">
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative group cursor-pointer">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--color-tangerine)] text-white font-bold text-4xl shadow-lg shadow-tangerine/20">
                  {initials}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3">Click to upload photo</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} placeholder="First name" />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} placeholder="Last name" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <input type="email" value={user.email} readOnly className={`${inputClass} pr-16 opacity-60 cursor-not-allowed`} />
                  {user.emailVerified ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-teal-400 text-xs font-bold">
                      <CheckCircle className="h-4 w-4" /> Verified
                    </span>
                  ) : (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-yellow-400 text-xs font-bold">
                      Unverified
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass}>Mobile Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="Phone number" />
              </div>
            </div>

            {/* Save */}
            <div className="mt-10 flex items-center gap-4">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-2 bg-[var(--color-tangerine)] text-white py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
              </motion.button>
              {saved && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-teal-400 text-sm font-medium">
                  Profile updated!
                </motion.span>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
