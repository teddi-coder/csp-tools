export function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-4">
      <span className="text-5xl">🚧</span>
      <h3 className="font-display text-2xl text-hh-black">{label}</h3>
      <p className="text-hh-black/60 font-body max-w-xs">
        This module is coming soon. Check back after the next update.
      </p>
    </div>
  );
}
