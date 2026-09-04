export default function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
