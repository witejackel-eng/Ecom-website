"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Check, X, Filter, Eye, Shield, HardDrive, Fingerprint, Lock, ChevronDown, RotateCcw, Camera, ScanLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

// ─── Constants ───────────────────────────────────────────────────────────
const SESSION_KEY = "filter-sidebar-sections";
const MAX_PRICE = 20000;
const PRICE_STEP = 500;

const categoryIcons: Record<string, typeof Eye> = {
  "Dome Cameras": Eye,
  "Bullet Cameras": Shield,
  "Color Dome Cameras": Camera,
  "Color Bullet Cameras": ScanLine,
  "NVR Systems": HardDrive,
  "Biometric Devices": Fingerprint,
  "Access Control Systems": Lock,
};

const defaultIcon = Eye;

// ─── Helpers ──────────────────────────────────────────────────────────────
function loadSectionState(): Record<string, boolean> {
  if (typeof window === "undefined") return { categories: true, price: true, brand: true, availability: true };
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) return { ...{ categories: true, price: true, brand: true, availability: true }, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return { categories: true, price: true, brand: true, availability: true };
}

function saveSectionState(state: Record<string, boolean>) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Sub-components ───────────────────────────────────────────────────────
function SectionHeader({ label, isOpen, onToggle }: { label: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="group flex w-full items-center justify-between py-1 cursor-pointer">
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-tangerine)]">{label}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] text-gray-500 transition-colors group-hover:border-white/10 group-hover:text-gray-300"
      >
        <ChevronDown size={14} />
      </motion.span>
    </button>
  );
}

function AccordionContent({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 pb-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function FilterSidebar({
  onFilterChange,
}: {
  onFilterChange: (categories: string[], priceRange: [number, number]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [readyToShip, setReadyToShip] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(loadSectionState);

  // Persist section state to sessionStorage
  useEffect(() => { saveSectionState(openSections); }, [openSections]);

  // Derived data from products
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), []);
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), []);
  const hasReadyToShip = useMemo(() => products.some((p) => (p as any).readyToShip), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, []);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
    return counts;
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────────────
  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];
      onFilterChange(next, priceRange);
      return next;
    });
  }, [priceRange, onFilterChange]);

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  }, []);

  const handlePriceChange = useCallback((val: number[]) => {
    const range: [number, number] = [val[0], val[1]];
    setPriceRange(range);
    onFilterChange(selectedCategories, range);
  }, [selectedCategories, onFilterChange]);

  const handleApply = useCallback(() => {
    onFilterChange(selectedCategories, priceRange);
  }, [selectedCategories, priceRange, onFilterChange]);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setReadyToShip(false);
    setPriceRange([0, MAX_PRICE]);
    onFilterChange([], [0, MAX_PRICE]);
  }, [onFilterChange]);

  const activeFilterCount = selectedCategories.length + selectedBrands.length + (inStockOnly ? 1 : 0) + (readyToShip ? 1 : 0);

  // ─── Sidebar inner content ─────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex h-full flex-col overflow-y-auto text-white" style={{ scrollbarWidth: "none" }}>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .filter-slider [data-orientation="horizontal"] { height: 6px !important; }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        {/* Mobile close */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)]">REFINE PRODUCTS</p>
            <h2 className="text-2xl font-black tracking-tighter text-white">Filters</h2>
          </div>
          <button onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.04] text-gray-400 transition-colors hover:border-white/20 hover:text-white">
            <X size={18} />
          </button>
        </div>
        {/* Desktop header */}
        <div className="hidden md:block">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-tangerine)]">REFINE PRODUCTS</p>
          <h2 className="text-[28px] font-black leading-none tracking-tighter text-white">Filters</h2>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-white/40">Find the right security solution.</p>
        </div>
      </div>

      {/* ── Filter body ─────────────────────────────────────────────────── */}
      <div className="flex-1 space-y-1 px-6 py-5 lg:px-8">

        {/* ── Category Section ──────────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] pb-5">
          <SectionHeader label="Category" isOpen={openSections.categories} onToggle={() => toggleSection("categories")} />
          <AccordionContent isOpen={openSections.categories}>
            <div className="space-y-2">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat] || defaultIcon;
                const isActive = selectedCategories.includes(cat);
                return (
                  <motion.button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
                      isActive
                        ? "border-[var(--color-tangerine)]/50 bg-[var(--color-tangerine)]/[0.07] shadow-[0_0_20px_-4px_rgba(255,138,0,0.15)]"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05] hover:shadow-sm"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeCategoryGlow"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-tangerine)]/5 to-transparent"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={cn(
                      "absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-200",
                      isActive ? "bg-[var(--color-tangerine)] shadow-[0_0_12px_rgba(255,138,0,0.4)]" : "bg-transparent"
                    )} />
                    <Icon size={16} className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive ? "text-[var(--color-tangerine)]" : "text-gray-400 group-hover:text-gray-200"
                    )} />
                    <span className={cn(
                      "relative z-10 flex-1 text-sm font-semibold transition-colors duration-200",
                      isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                    )}>{cat}</span>
                    <span className={cn(
                      "relative z-10 text-[11px] font-medium tabular-nums transition-colors duration-200",
                      isActive ? "text-[var(--color-tangerine)]/70" : "text-gray-500"
                    )}>{categoryCounts[cat]}</span>
                  </motion.button>
                );
              })}
            </div>
          </AccordionContent>
        </div>

        {/* ── Price / Investment Range Section ──────────────────────────── */}
        <div className="border-b border-white/[0.06] pb-5">
          <SectionHeader label="Investment Range" isOpen={openSections.price} onToggle={() => toggleSection("price")} />
          <AccordionContent isOpen={openSections.price}>
            <div className="px-1">
              <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                <span className="font-bold text-white tabular-nums">₹{priceRange[0].toLocaleString("en-IN")}</span>
                <span className="text-[11px] font-semibold text-gray-500">to</span>
                <span className="font-bold text-white tabular-nums">₹{priceRange[1].toLocaleString("en-IN")}</span>
              </div>
              <Slider.Root
                className="filter-slider relative flex h-8 w-full touch-none select-none items-center"
                value={[priceRange[0], priceRange[1]]}
                max={MAX_PRICE}
                step={PRICE_STEP}
                onValueChange={handlePriceChange}
              >
                <Slider.Track className="relative h-[5px] grow rounded-full bg-white/10">
                  <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)]" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-full border-2 border-white/40 bg-[var(--color-tangerine)] shadow-lg shadow-[var(--color-tangerine)]/25 outline-none transition-transform duration-150 hover:scale-110 active:cursor-grabbing active:scale-95 focus:ring-2 focus:ring-[var(--color-tangerine)]/40" />
                <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-full border-2 border-white/40 bg-[var(--color-tangerine)] shadow-lg shadow-[var(--color-tangerine)]/25 outline-none transition-transform duration-150 hover:scale-110 active:cursor-grabbing active:scale-95 focus:ring-2 focus:ring-[var(--color-tangerine)]/40" />
              </Slider.Root>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">₹0</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">₹{MAX_PRICE.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </AccordionContent>
        </div>

        {/* ── Brand Section ─────────────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] pb-5">
          <SectionHeader label="Brand" isOpen={openSections.brand} onToggle={() => toggleSection("brand")} />
          <AccordionContent isOpen={openSections.brand}>
            <div className="space-y-2.5">
              {brands.map((brand) => (
                <motion.div
                  key={brand}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.04]"
                  onClick={() => handleBrandChange(brand)}
                >
                  <Checkbox.Root
                    className={cn(
                      "flex h-[18px] w-[18px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-200",
                      selectedBrands.includes(brand) && "border-[var(--color-tangerine)] bg-[var(--color-tangerine)]"
                    )}
                    checked={selectedBrands.includes(brand)}
                  >
                    <Checkbox.Indicator className="flex items-center justify-center">
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                        <Check className="h-3 w-3 text-white" />
                      </motion.span>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="flex-1 text-sm font-medium text-gray-300 transition-colors group-hover:text-white">{brand}</span>
                  <span className="text-[11px] font-medium tabular-nums text-gray-500">{brandCounts[brand]}</span>
                </motion.div>
              ))}
            </div>
          </AccordionContent>
        </div>

        {/* ── Availability Section ──────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] pb-5">
          <SectionHeader label="Availability" isOpen={openSections.availability} onToggle={() => toggleSection("availability")} />
          <AccordionContent isOpen={openSections.availability}>
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.04]"
                onClick={() => setInStockOnly((prev) => !prev)}
              >
                <Checkbox.Root
                  className={cn(
                    "flex h-[18px] w-[18px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-200",
                    inStockOnly && "border-[var(--color-tangerine)] bg-[var(--color-tangerine)]"
                  )}
                  checked={inStockOnly}
                >
                  <Checkbox.Indicator className="flex items-center justify-center">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                      <Check className="h-3 w-3 text-white" />
                    </motion.span>
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm font-medium text-gray-300">In Stock</span>
              </motion.div>
              {hasReadyToShip ? (
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.04]"
                  onClick={() => setReadyToShip((prev) => !prev)}
                >
                  <Checkbox.Root
                    className={cn(
                      "flex h-[18px] w-[18px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-200",
                      readyToShip && "border-[var(--color-tangerine)] bg-[var(--color-tangerine)]"
                    )}
                    checked={readyToShip}
                  >
                    <Checkbox.Indicator className="flex items-center justify-center">
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                        <Check className="h-3 w-3 text-white" />
                      </motion.span>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm font-medium text-gray-300">Ready to Ship</span>
                </motion.div>
              ) : (
                <p className="px-2 text-[11px] italic leading-relaxed text-gray-500">
                  Availability filters will appear once backend data is available.
                </p>
              )}
            </div>
          </AccordionContent>
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06] px-6 pb-6 pt-5 lg:px-8 lg:pb-8">
        <div className="space-y-3">
          <motion.button
            onClick={handleApply}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--color-tangerine)]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-tangerine)]/30"
          >
            Apply Filters
          </motion.button>
          <motion.button
            onClick={clearFilters}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] px-5 py-3 text-sm font-semibold text-gray-400 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.03] hover:text-white"
          >
            <RotateCcw size={14} />
            Clear Filters
          </motion.button>
        </div>
      </div>
    </div>
  );

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* Mobile trigger button */}
      <div className="px-6 pt-6 md:hidden">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.97 }}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 font-bold text-white backdrop-blur-xl transition-all hover:border-white/[0.16] hover:bg-white/[0.08]"
        >
          <Filter size={16} className="text-[var(--color-tangerine)]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--color-tangerine)] px-1.5 text-[10px] font-bold text-white tabular-nums shadow-sm shadow-[var(--color-tangerine)]/30"
            >
              {activeFilterCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-32 ml-4 hidden h-[calc(100vh-10rem)] w-[320px] flex-shrink-0 self-start lg:ml-8 md:block">
        <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-[rgba(10,30,40,0.75)] shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_80px_rgba(0,0,0,0.2)]" />
          <div className="pointer-events-none absolute -inset-x-20 -top-40 h-80 w-[500px] rounded-full bg-[var(--color-tangerine)]/3 blur-[120px]" />
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed inset-y-0 left-0 z-[70] w-full max-w-sm md:hidden"
            >
              <div className="h-full overflow-hidden rounded-r-[2rem] border-r border-white/[0.06] bg-[rgba(10,30,40,0.88)] shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
