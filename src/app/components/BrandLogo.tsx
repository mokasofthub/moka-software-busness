export default function BrandLogo() {
  return (
    <a href="#hero" className="flex flex-col leading-none gap-1 font-heading font-semibold text-[var(--text-primary)]">
      <span className="flex items-center gap-2.5">
        <span className="text-cyan-400 text-xl leading-none">⬡</span>
        <span>MokaSoftware<strong className="text-cyan-400">Busness</strong></span>
      </span>
      <span className="flex items-center gap-1 w-full">
        <span className="flex-1 h-px bg-cyan-400/40" />
        <span className="text-[11px] text-cyan-400/70 leading-none select-none">∞</span>
        <span className="flex-1 h-px bg-cyan-400/40" />
      </span>
    </a>
  );
}
