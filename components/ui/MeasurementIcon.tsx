export default function MeasurementIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className ?? "h-6 w-6"} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M 10 33 A 14 14 0 0 1 38 33" />
      <path d="M 24 33 L 34 17" />
    </svg>
  );
}
