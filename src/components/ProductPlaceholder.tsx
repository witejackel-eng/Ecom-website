import { Camera } from "lucide-react";

export default function ProductPlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-[#FAFAFA] border border-[#E5E5E5] text-[#F28C38] ${className}`}>
      <Camera className="h-12 w-12 mb-4 opacity-30" />
      <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] opacity-60">
        Official Product Image
      </p>
      <p className="text-[10px] uppercase text-[#666666]">Coming Soon</p>
    </div>
  );
}
