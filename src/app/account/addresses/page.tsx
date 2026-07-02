"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Plus, Edit3, Trash2, Home, Briefcase, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FadeIn from "@/components/ui/FadeIn";

const ic = "bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-[var(--color-tangerine)] outline-none transition-all w-full text-sm";
const lc = "text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block";
const ats = [
  { v: "home", l: "Home", i: Home, c: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  { v: "office", l: "Office", i: Briefcase, c: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { v: "billing", l: "Billing", i: MapPin, c: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { v: "shipping", l: "Shipping", i: MapPin, c: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
];
const ef = { type: "home", fullName: "", phone: "", addressLine1: "", city: "", state: "", pincode: "", country: "India", isDefault: false };

export default function AddrPage() {
  const r = useRouter();
  const { state: s } = useAuth();
  const { user: u, isAuthenticated: ia, isLoading: il, addresses: ca } = s;
  const [ad, setAd] = useState(ca);
  const [sf, setSf] = useState(false);
  const [ei, setEi] = useState(null);
  const [f, setF] = useState(ef);
  const [sv, setSv] = useState(false);
  const [pe, setPe] = useState("");
  useEffect(() => { setAd(ca); }, [ca]);
  useEffect(() => { if (!il && !ia) r.push("/login"); }, [il, ia, r]);
  if (il) return <main className="min-h-screen flex items-center justify-center pt-28"><div className="h-10 w-10 border-4 border-[var(--color-tangerine)] border-t-transparent rounded-full animate-spin mx-auto" /></main>;
  if (!ia || !u) return null;
  const U = v => v.charAt(0).toUpperCase() + v.slice(1);
  const gt = (t, k) => { const x = ats.find(a => a.v === t); return x ? x[k] : k === 'c' ? "bg-white/5 text-gray-400 border-white/10" : MapPin; };
  const hc = (fd, vl) => { setF(p => ({ ...p, [fd]: vl })); if (fd === "pincode") setPe(vl.length > 6 ? "Max 6 digits" : ""); };
  const oa = () => { setF(ef); setEi(null); setSf(true); setPe(""); };
  const oe = a => { setF({ type: a.type, fullName: a.fullName, phone: a.phone, addressLine1: a.addressLine1, city: a.city, state: a.state, pincode: a.pincode, country: a.country || "India", isDefault: a.isDefault }); setEi(a.id); setSf(true); setPe(""); };
  const hs = async () => { if (!f.fullName || !f.phone || !f.addressLine1 || !f.city || !f.state || !f.pincode) return; if (f.pincode.length !== 6) { setPe("Enter 6-digit pincode"); return; } setSv(true); await new Promise(r => setTimeout(r, 400)); setSv(false); const addr = { ...f, id: ei || `addr_${Date.now()}` }; if (ei) setAd(p => p.map(a => a.id === ei ? { ...a, ...addr } : a)); else setAd(p => [...p, addr]); setSf(false); setEi(null); };
  const hd = id => setAd(p => p.filter(a => a.id !== id));
  const sd = id => setAd(p => p.map(a => ({ ...a, isDefault: a.id === id })));

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--color-tangerine)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-tangerine)] text-sm transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Account
        </Link>
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-tangerine)]/10 border border-[rgba(255,138,0,0.25)]">
              <MapPin className="h-6 w-6 text-[var(--color-tangerine)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">My Addresses</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your shipping and billing addresses</p>
            </div>
          </div>
          <div className="glass rounded-[2rem] p-8 md:p-10 glow-tangerine">
            {ad.length === 0 && !sf ? (
              <div className="text-center py-12">
                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No saved addresses</h3>
                <p className="text-gray-400 text-sm mb-8">Add an address to get started with faster checkout.</p>
                <button onClick={oa} className="inline-flex items-center gap-2 bg-[var(--color-tangerine)] text-white py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all">
                  <Plus className="h-4 w-4" /> Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {ad.map((a, i) => {
                    const TI = gt(a.type, 'i');
                    return (
                      <motion.div key={a.id} layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: 0.03 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="glass rounded-2xl p-6 glow-tangerine relative group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${gt(a.type, 'c')}`}>
                                <TI className="h-3 w-3" /> {U(a.type)}
                              </span>
                              {a.isDefault && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full">
                                  <Star className="h-3 w-3 fill-yellow-400" /> Default
                                </span>
                              )}
                            </div>
                            <p className="text-white font-bold text-[15px]">{a.fullName}</p>
                            <p className="text-gray-400 text-sm mt-0.5">{a.phone}</p>
                            <p className="text-gray-400 text-sm mt-1 leading-relaxed">{a.addressLine1}, {a.city}, {a.state} - {a.pincode}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{a.country}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {!a.isDefault && <button onClick={() => sd(a.id)} className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all" title="Set default"><Star className="h-4 w-4 text-gray-500 hover:text-yellow-400 transition-colors" /></button>}
                            <button onClick={() => oe(a)} className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/30 transition-all" title="Edit"><Edit3 className="h-4 w-4 text-gray-500 hover:text-blue-400 transition-colors" /></button>
                            <button onClick={() => hd(a.id)} className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all" title="Delete"><Trash2 className="h-4 w-4 text-gray-500 hover:text-red-400 transition-colors" /></button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            <AnimatePresence>{sf && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                <div className="border-t border-white/10 pt-8 mt-8">
                  <h3 className="text-lg font-bold text-white mb-6">{ei ? "Edit Address" : "Add New Address"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className={lc}>Type</label><select value={f.type} onChange={e => hc("type", e.target.value)} className={ic}>{ats.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}</select></div>
                    <div><label className={lc}>Full Name</label><input type="text" value={f.fullName} onChange={e => hc("fullName", e.target.value)} className={ic} placeholder="Full name" /></div>
                    <div><label className={lc}>Phone</label><input type="tel" value={f.phone} onChange={e => hc("phone", e.target.value)} className={ic} placeholder="Phone number" /></div>
                    <div className="md:col-span-2"><label className={lc}>Address</label><input type="text" value={f.addressLine1} onChange={e => hc("addressLine1", e.target.value)} className={ic} placeholder="Street address, area" /></div>
                    <div><label className={lc}>City</label><input type="text" value={f.city} onChange={e => hc("city", e.target.value)} className={ic} placeholder="City" /></div>
                    <div><label className={lc}>State</label><input type="text" value={f.state} onChange={e => hc("state", e.target.value)} className={ic} placeholder="State" /></div>
                    <div><label className={lc}>Pincode</label><input type="text" value={f.pincode} onChange={e => hc("pincode", e.target.value.replace(/\D/g,"").slice(0,6))} className={`${ic} ${pe ? "border-red-500/50" : ""}`} placeholder="6-digit" maxLength={6} />{pe && <p className="text-red-400 text-xs mt-1">{pe}</p>}</div>
                    <div><label className={lc}>Country</label><input type="text" value={f.country} onChange={e => hc("country", e.target.value)} className={ic} placeholder="Country" /></div>
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={f.isDefault} onChange={e => hc("isDefault", e.target.checked)} className="h-4 w-4 rounded border-white/10 bg-white/5 accent-[var(--color-tangerine)]" />
                        <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Set as default</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-8">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={hs} disabled={sv} className="inline-flex items-center gap-2 bg-[var(--color-tangerine)] text-white py-3 px-8 rounded-full font-bold text-[14px] shadow-lg shadow-tangerine/20 hover:shadow-tangerine/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                      {sv ? "Saving..." : ei ? "Update" : "Save"}
                    </motion.button>
                    <button onClick={() => { setSf(false); setEi(null); setPe(""); }} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Cancel</button>
                  </div>
                </div>
              </motion.div>
            )}</AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
