import { Camera } from "lucide-react";

export default function ProductPlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#2A2A2A] text-[#F28C38] ${className}`}>
      <Camera className="h-12 w-12 mb-4 opacity-50" />
      <p className="text-xs font-bold uppercase tracking-widest text-[#F5F0E8] opacity-70">
        Official Product Image
      </p>
      <p className="text-[10px] uppercase text-[#888]">Coming Soon</p>
    </div>
  );
}
