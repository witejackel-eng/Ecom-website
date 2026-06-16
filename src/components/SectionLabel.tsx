export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
      <div className="h-[1px] w-8 bg-primary/40" />
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
        {children}
      </span>
      <div className="h-[1px] w-8 bg-primary/40 md:hidden" />
    </div>
  );
}
