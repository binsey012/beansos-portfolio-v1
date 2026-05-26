export default function PacManPage() {
  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden">
      {/* Header bar */}
      <div
        className="shrink-0 flex items-center justify-between px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,220,0,0.18) 0%, rgba(0,0,0,0.12) 100%)',
          borderBottom: '1px solid rgba(255,220,0,0.35)',
          color: '#ffd700',
          textShadow: '0 0 10px #ffd700aa',
        }}
      >
        <span>🕹️ PAC-MAN — Arcade Classic</span>
        <span className="text-[10px] text-white/40 font-normal normal-case tracking-normal">
          Use arrow keys to play
        </span>
      </div>

      {/* Game iframe */}
      <iframe
        src="https://www.google.com/logos/2010/pacman10-i.html"
        title="PAC-MAN"
        allow="autoplay"
        className="flex-1 w-full border-0 bg-black"
        style={{ minHeight: 0 }}
      />

      {/* CRT scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 top-[36px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
          zIndex: 2,
        }}
      />
    </div>
  )
}
