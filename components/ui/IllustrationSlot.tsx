/**
 * Слот под присланные иллюстрации (§11).
 * Файлы ещё не положены в public/illustrations — рисуем честную заглушку,
 * а не битый <img>. Как только появится WebP, подставить src/width/height
 * и loading="lazy".
 *
 * Правило: иллюстрации идут полноширинной вставкой или боковой панелью,
 * никогда не подкладываются под текст.
 */

type Props = {
  /** имя файла без расширения, для подписи заглушки */
  name: string;
  /** соотношение сторон блока */
  ratio?: "wide" | "square";
  className?: string;
};

export default function IllustrationSlot({
  name,
  ratio = "wide",
  className = "",
}: Props) {
  return (
    <div
      className={`w-full border border-border/40 bg-surface-2/30 ${
        ratio === "wide" ? "aspect-[16/5]" : "aspect-square"
      } flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* TODO: replace with /illustrations/{name}.webp once the assets land */}
      <span className="mono text-muted">[ illustration: {name} ]</span>
    </div>
  );
}
