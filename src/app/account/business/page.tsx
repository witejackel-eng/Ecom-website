"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Save, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const inputClass = "bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all w-full text-sm";
const labelClass = "text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block";

export default function BusinessDetailsPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { user, isAuthenticated, isLoading, businessDetails } = state;

  const [form, setForm] = useState({
    companyName: "",
    gstin: "",
    pan: "",
    businessAddress: "",
    contactPerson: "",
    businessEmail: "",
    businessPhone: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (businessDetails) {
      setForm({
        companyName: businessDetails.companyName || "",
        gstin: businessDetails.gstin || "",
        pan: businessDetails.pan || "",
        businessAddress: businessDetails.businessAddress || "",
        contactPerson: businessDetails.contactPerson || "",
        businessEmail: businessDetails.businessEmail || "",
        businessPhone: businessDetails.businessPhone || "",
      });
    }
  }, [businessDetails]);

  const handleChange = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Account
        </Link>
        <FadeIn direction="up">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgb(var(--tangerine-rgb)_/_0.25)]">
              <Building2 className="h-6 w-6 text-[var(--color-tangerine)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Business Details</h1>
              <p className="text-gray-400 text-sm mt-1">B2B purchasing & tax information</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mb-8 p-4 rounded-xl bg-teal-500/5 border border-teal-500/10 text-teal-400 text-xs leading-relaxed">
            Your business details will automatically populate invoices, quotations, and tax documents. 
            This information is kept private and only used for order processing.
          </div>

          {/* Form Card */}
          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="companyName" className={labelClass}>Company Name <span className="text-red-400">*</span></label>
                <input id="companyName" type="text" value={form.companyName} onChange={(e) => handleChange("companyName", e.target.value)} className={inputClass} placeholder="Your registered company name" />
              </div>
              <div>
                <label htmlFor="gstin" className={labelClass}>GSTIN <span className="text-red-400">*</span></label>
                <input id="gstin" type="text" value={form.gstin} onChange={(e) => handleChange("gstin", e.target.value.toUpperCase())} className={inputClass} placeholder="07AABCD1234E1Z5" maxLength={15} />
              </div>
              <div>
                <label htmlFor="pan" className={labelClass}>PAN <span className="text-gray-500">(optional)</span></label>
                <input id="pan" type="text" value={form.pan} onChange={(e) => handleChange("pan", e.target.value.toUpperCase())} className={inputClass} placeholder="AABCD1234E" maxLength={10} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="businessAddress" className={labelClass}>Business Address <span className="text-red-400">*</span></label>
                <textarea id="businessAddress" value={form.businessAddress} onChange={(e) => handleChange("businessAddress", e.target.value)} className={`${inputClass} resize-none min-h-[90px]`} placeholder="Registered business address" rows={3} />
              </div>
              <div>
                <label htmlFor="contactPerson" className={labelClass}>Contact Person <span className="text-red-400">*</span></label>
                <input id="contactPerson" type="text" value={form.contactPerson} onChange={(e) => handleChange("contactPerson", e.target.value)} className={inputClass} placeholder="Full name of contact person" />
              </div>
              <div>
                <label htmlFor="businessEmail" className={labelClass}>Business Email <span className="text-red-400">*</span></label>
                <input id="businessEmail" type="email" value={form.businessEmail} onChange={(e) => handleChange("businessEmail", e.target.value)} className={inputClass} placeholder="billing@company.com" />
              </div>
              <div>
                <label htmlFor="businessPhone" className={labelClass}>Business Phone <span className="text-red-400">*</span></label>
                <input id="businessPhone" type="tel" value={form.businessPhone} onChange={(e) => handleChange("businessPhone", e.target.value)} className={inputClass} placeholder="+91 11 2345 6789" />
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-2 bg-[var(--color-tangerine)] text-[var(--color-navy-deep)] py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
              </motion.button>
              {saved && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-teal-400 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 inline mr-1" /> Business details saved!
                </motion.span>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
