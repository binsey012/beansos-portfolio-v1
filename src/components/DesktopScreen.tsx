import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WallpaperId } from '../store/useOSStore'
import DesktopGrid from './DesktopGrid'
import Taskbar from './Taskbar'
import WindowManager from './WindowManager'
import { useOSStore } from '../store/useOSStore'

/**
 * DesktopScreen — root layout component.
 *
 * Responsibilities:
 *  - Lock the viewport to 100vw × 100vh
 *  - Render the wallpaper + overlay
 *  - Own the "selected icon" state and deselect on backdrop click
 *  - Render DesktopGrid (top-left) and Taskbar (bottom)
 */
export default function DesktopScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  const openWindow = useOSStore((s) => s.openWindow)
  const closeWindow = useOSStore((s) => s.closeWindow)
  const focusWindow = useOSStore((s) => s.focusWindow)
  const minimizeWindow = useOSStore((s) => s.minimizeWindow)
  // Subscribe to the windows map (stable object ref until an action fires).
  // Derive the open-apps list via useMemo so no new array is created on idle renders.
  const windows = useOSStore((s) => s.windows)
  const subTextColor = useOSStore((s) => s.subTextColor)
  const includeHeaderLabels = useOSStore((s) => s.includeHeaderLabels)
  const openApps = useMemo(
    () => Object.values(windows).filter((w) => w.isOpen),
    [windows],
  )

  const handleOpen = useCallback((id: string) => {
    openWindow(id)
  }, [openWindow])

  const handleDesktopClick = useCallback(() => {
    setSelectedId(null)
  }, [])

  const handleCloseAllApps = useCallback(() => {
    Object.values(windows)
      .filter((w) => w.isOpen)
      .forEach((w) => closeWindow(w.id))
  }, [windows, closeWindow])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden no-select"
      style={{ ['--beans-subtext-color' as string]: subTextColor } as React.CSSProperties}
      data-include-header-labels={includeHeaderLabels ? 'on' : 'off'}
      onClick={handleDesktopClick}
      role="main"
      aria-label="BeansOS Desktop"
    >
      {/* ── Wallpaper ────────────────────────────────────── */}
      <Wallpaper />

      {/* ── Desktop content area (above taskbar) ─────────── */}
      <div
        className="absolute inset-0 bottom-14"
        /* Prevent desktop clicks from bubbling up while still
           letting icon clicks propagate to handleDesktopClick
           for deselection — icons call e.stopPropagation()     */
      >
        <DesktopGrid
          selectedId={selectedId}
          onSelect={handleSelect}
          onOpen={handleOpen}
        />
      </div>
      {/* ── Window layer ───────────────────────────────── */}
      <WindowManager />
      {/* ── Global watermark / licensing overlay ───────── */}
      <BrandWatermark />
      {/* ── Taskbar ──────────────────────────────────────── */}
      <Taskbar
        openApps={openApps.map((w) => ({
          id: w.id,
          label: w.title,
          isActive: !w.isMinimized,
        }))}
        onAppClick={(id) => focusWindow(id)}
        onMinimizeClick={(id) => minimizeWindow(id)}
        onLaunchApp={handleOpen}
        onCloseAllApps={handleCloseAllApps}
      />
    </div>
  )
}

function BrandWatermark() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[160] flex items-center justify-center"
      >
        <span
          className="select-none text-[clamp(40px,9vw,130px)] font-extrabold tracking-[0.16em] uppercase text-white/[0.055]"
          style={{ transform: 'rotate(-17deg)' }}
        >
          .BeansWebDev Licensed Build
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed bottom-[62px] right-3 z-[170] rounded-lg border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-white/80">
          License: Public Portfolio | Version: BeansOS v1.2.0
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-white/65">
          Created by .BeansWebDev · Copyright 2026
        </p>
      </div>
    </>
  )
}

/* ─── Shared noise data URL ─────────────────────────────────────────────── */
const NOISE_BG =
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E` +
  `%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' ` +
  `stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E` +
  `%3C/svg%3E")`

/* ─── Wallpaper: Cyberpunk Dark ──────────────────────────────────────────── */
function WallpaperCyberpunkDark() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 15% 85%, rgba(30,20,80,0.95) 0%, transparent 55%),
            radial-gradient(ellipse 90%  70% at 85% 15%, rgba(10,35,65,0.90) 0%, transparent 55%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(5,8,20,1) 40%, rgba(8,12,30,1) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 70%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 80% 25%, rgba(168,85,247,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 60% 80%, rgba(59,130,246,0.12) 0%, transparent 55%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: NOISE_BG, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, transparent 1px, transparent 32px)',
          backgroundSize: '100% 32px',
        }}
      />
    </>
  )
}

/* ─── Wallpaper: Minimal Abstract ───────────────────────────────────────── */
function WallpaperMinimalAbstract() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 90% at 12% 88%, rgba(110,55,15,0.32) 0%, transparent 52%),
            radial-gradient(ellipse 80%  65% at 88% 12%, rgba(75,30,45,0.28) 0%, transparent 52%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(14,11,8,1) 40%, rgba(9,7,5,1) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 38% at 28% 62%, rgba(190,100,35,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 45% 32% at 72% 38%, rgba(130,50,65,0.06) 0%, transparent 56%),
            radial-gradient(ellipse 35% 28% at 50% 85%, rgba(160,80,25,0.05) 0%, transparent 55%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: NOISE_BG, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 48%, rgba(0,0,0,0.62) 100%)' }}
      />
    </>
  )
}

/* ─── Wallpaper: Neo-Retro Blue ─────────────────────────────────────────── */
function WallpaperNeoRetroBlue() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 65% at 18% 82%, rgba(0,145,155,0.28) 0%, transparent 54%),
            radial-gradient(ellipse 75% 55% at 82% 18%, rgba(0,75,195,0.22) 0%, transparent 54%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(3,8,18,1) 40%, rgba(2,5,15,1) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 42% 32% at 16% 72%, rgba(0,229,255,0.11) 0%, transparent 55%),
            radial-gradient(ellipse 35% 28% at 84% 28%, rgba(0,100,255,0.09) 0%, transparent 50%),
            radial-gradient(ellipse 30% 25% at 50% 90%, rgba(0,200,220,0.07) 0%, transparent 55%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: NOISE_BG, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.68) 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,229,255,0.5) 0px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 4px',
        }}
      />
    </>
  )
}

/* ─── Wallpaper (cross-fading wrapper) ──────────────────────────────────── */
function Wallpaper() {
  const wallpaperId = useOSStore((s) => s.wallpaperId) as WallpaperId

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={wallpaperId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {wallpaperId === 'cyberpunk-dark'   && <WallpaperCyberpunkDark />}
        {wallpaperId === 'minimal-abstract' && <WallpaperMinimalAbstract />}
        {wallpaperId === 'neo-retro-blue'   && <WallpaperNeoRetroBlue />}
      </motion.div>
    </AnimatePresence>
  )
}
