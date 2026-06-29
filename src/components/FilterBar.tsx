"use client";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
}: FilterBarProps) {
  const priceOptions = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹3,500", value: "under-3500" },
    { label: "₹3,500 – ₹5,000", value: "3500-5000" },
    { label: "₹5,000 – ₹10,000", value: "5000-10000" },
    { label: "Above ₹10,000", value: "above-10000" },
  ];

  const getPriceValue = (): string => {
    const [min, max] = priceRange;
    if (min === 0 && max >= 20000) return "all";
    if (max < 3500) return "under-3500";
    if (min >= 3500 && max <= 5000) return "3500-5000";
    if (min >= 5000 && max <= 10000) return "5000-10000";
    if (min > 10000) return "above-10000";
    return "all";
  };

  const handlePriceSelect = (val: string) => {
    switch (val) {
      case "under-3500":
        onPriceChange([0, 3500]);
        break;
      case "3500-5000":
        onPriceChange([3500, 5000]);
        break;
      case "5000-10000":
        onPriceChange([5000, 10000]);
        break;
      case "above-10000":
        onPriceChange([10000, maxPrice]);
        break;
      default:
        onPriceChange([0, maxPrice]);
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center sm:justify-between">
      {/* Category chips row */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        <button
          onClick={() => onCategoryChange("All")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer border ${
            activeCategory === "All"
              ? "bg-tangerine border-tangerine text-white"
              : "border-white/15 bg-white/5 text-white/70 hover:border-tangerine hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer border ${
              activeCategory === cat
                ? "bg-tangerine border-tangerine text-white"
                : "border-white/15 bg-white/5 text-white/70 hover:border-tangerine hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price range dropdown */}
      <select
        value={getPriceValue()}
        onChange={(e) => handlePriceSelect(e.target.value)}
        className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-white/15 bg-[#0d1117] text-white/70 cursor-pointer appearance-none"
      >
        {priceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
