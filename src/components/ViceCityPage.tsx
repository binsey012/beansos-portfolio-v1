/**
 * ViceCityPage — Embeds the browser-playable GTA Vice City at quenq.com
 * inside the .BeansOS window frame, giving a full desktop-game feel.
 */
export default function ViceCityPage() {
  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden">
      {/* Neon header strip */}
      <div
        className="shrink-0 flex items-center justify-between px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,0,180,0.18) 0%, rgba(0,220,255,0.12) 100%)',
          borderBottom: '1px solid rgba(255,0,180,0.35)',
          color: '#ff60d4',
          textShadow: '0 0 10px #ff60d4aa',
        }}
      >
        <span>🎮 GTA Vice City — Browser Edition</span>
        <span className="text-[10px] text-white/40 font-normal normal-case tracking-normal">
          Powered by quenq.com
        </span>
      </div>

      {/* Game iframe */}
      <iframe
        src="https://quenq.com/apps/vice-city/"
        title="GTA Vice City"
        allow="autoplay; fullscreen; gamepad"
        className="flex-1 w-full border-0"
        style={{ minHeight: 0 }}
      />

      {/* Scanline overlay for retro CRT feel */}
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
