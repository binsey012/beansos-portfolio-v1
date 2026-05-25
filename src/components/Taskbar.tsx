import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Monitor, Palette, Rocket, ShieldCheck, UserCheck } from 'lucide-react'
import { useOSStore } from '../store/useOSStore'
import type { WallpaperId } from '../store/useOSStore'

/* ─── Types ─────────────────────────────────────────── */
export interface TaskbarAppEntry {
  id: string
  label: string
  isActive: boolean
}

interface TaskbarProps {
  openApps?: TaskbarAppEntry[]
  onAppClick?: (id: string) => void
  onMinimizeClick?: (id: string) => void
  onLaunchApp?: (id: string) => void
  onCloseAllApps?: () => void
  onStartClick?: () => void
}

type RecruiterMode = 'hiring-manager' | 'tech-lead' | 'client'

const RECRUITER_MODES: Array<{ id: RecruiterMode; label: string }> = [
  { id: 'hiring-manager', label: 'Hiring Manager' },
  { id: 'tech-lead', label: 'Tech Lead' },
  { id: 'client', label: 'Client' },
]

const RECRUITER_SUMMARY: Record<RecruiterMode, { title: string; focus: string }> = {
  'hiring-manager': {
    title: 'Leadership + Outcome Lens',
    focus: 'Highlights execution ownership, KPI impact, and cross-functional delivery confidence.',
  },
  'tech-lead': {
    title: 'Technical + Coaching Lens',
    focus: 'Focuses on architecture quality, AIDLC discipline, and C-SMART/GROW coaching practices.',
  },
  client: {
    title: 'Business + Trust Lens',
    focus: 'Prioritizes clear communication, NDA-safe reporting, and measurable service improvements.',
  },
}

/* ─── Clock ─────────────────────────────────────────── */
function Clock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hours = time.getHours()
  const mins = time.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h12 = hours % 12 || 12

  const day = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col items-end leading-none select-none">
      <span className="text-[13px] font-semibold text-white/90 tracking-wide font-mono tabular-nums">
        {h12}:{mins}
        <span className="ml-1 text-[10px] font-medium text-white/50 uppercase">{ampm}</span>
      </span>
      <span className="mt-0.5 text-[10px] text-white/40 font-medium">{day}</span>
    </div>
  )
}

/* ─── Start Button ───────────────────────────────────── */
function StartButton({ onClick, isOpen }: { onClick?: () => void; isOpen?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open BeansOS start menu"
      aria-expanded={isOpen}
      className={[
        'group flex items-center gap-2.5 h-9 px-3.5 rounded-xl',
        isOpen ? 'bg-white/[0.15]' : 'bg-white/[0.07] hover:bg-white/[0.12] active:bg-white/[0.18]',
        'border border-white/[0.09] hover:border-white/[0.16]',
        'transition-all duration-150 ease-out',
        'text-white/80 hover:text-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C8EFF]/70',
        'shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      ].join(' ')}
    >
      {/* custom "beans" monogram */}
      <span
        className={[
          'flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold',
          'bg-gradient-to-br from-[#6C8EFF] to-[#a855f7]',
          'text-white shadow-[0_2px_8px_rgba(108,142,255,0.5)]',
          'group-hover:shadow-[0_2px_12px_rgba(108,142,255,0.65)]',
          'transition-shadow duration-150',
        ].join(' ')}
      >
        B
      </span>
      <span className="home-button-text text-[12px] font-medium tracking-wide">.BeansOS</span>
    </button>
  )
}

/* ─── Taskbar App Icon ───────────────────────────────── */
function TaskbarApp({ entry, onClick, onRightClick }: { entry: TaskbarAppEntry; onClick?: () => void; onRightClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => { e.preventDefault(); onRightClick?.() }}
      aria-label={entry.label}
      title={entry.label}
      className={[
        'relative flex flex-col items-center justify-center',
        'w-10 h-9 rounded-xl',
        'transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C8EFF]/70',
        entry.isActive
          ? 'bg-white/[0.12] border border-white/[0.15]'
          : 'bg-white/[0.05] hover:bg-white/[0.09] border border-transparent',
      ].join(' ')}
    >
      <Monitor size={16} strokeWidth={1.6} className="text-white/70" />
      {/* running indicator dot — springs in, ripple on appearance */}
      <AnimatePresence>
        {entry.isActive && (
          <motion.span
            key="dot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6C8EFF]"
          >
            {/* one-shot radial burst */}
            <motion.span
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-[#6C8EFF]"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ─── Wallpaper Picker ──────────────────────────────────── */
const WALLPAPER_OPTS: { id: WallpaperId; label: string; preview: string }[] = [
  {
    id: 'cyberpunk-dark',
    label: 'Cyberpunk Dark',
    preview: 'linear-gradient(135deg, #1e1450 0%, #0a2341 50%, #05081e 100%)',
  },
  {
    id: 'minimal-abstract',
    label: 'Minimal Abstract',
    preview: 'linear-gradient(135deg, #1a1610 0%, #0e0b08 50%, #120f0c 100%)',
  },
  {
    id: 'neo-retro-blue',
    label: 'Neo-Retro Blue',
    preview: 'linear-gradient(135deg, #051525 0%, #0a2035 50%, #030812 100%)',
  },
]

const SUBTEXT_PRESETS = ['#9fb6ff', '#ffffff', '#fcd34d', '#86efac', '#f9a8d4', '#fca5a5'] as const

function WallpaperPicker() {
  const [open, setOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const wallpaperId = useOSStore((s) => s.wallpaperId)
  const setWallpaper = useOSStore((s) => s.setWallpaper)
  const subTextColor = useOSStore((s) => s.subTextColor)
  const setSubTextColor = useOSStore((s) => s.setSubTextColor)
  const includeHeaderLabels = useOSStore((s) => s.includeHeaderLabels)
  const setIncludeHeaderLabels = useOSStore((s) => s.setIncludeHeaderLabels)

  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <div ref={pickerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change wallpaper"
        title="Change wallpaper"
        className={[
          'flex items-center justify-center w-7 h-7 rounded-lg',
          'transition-colors duration-150 focus:outline-none',
          open
            ? 'bg-white/[0.12] text-white/90'
            : 'hover:bg-white/[0.08] text-white/45 hover:text-white/75',
        ].join(' ')}
      >
        <Palette size={13} strokeWidth={1.8} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.14, ease: [0.34, 1.56, 0.64, 1] }}
            className={[
              'absolute bottom-full right-0 mb-2 w-48',
              'bg-[#0f0f18]/95 backdrop-blur-xl',
              'border border-white/[0.10]',
              'rounded-xl overflow-hidden',
              'shadow-[0_8px_40px_rgba(0,0,0,0.75)]',
              'z-[9999]',
            ].join(' ')}
          >
            <p className="px-3 pt-2.5 pb-1 text-[9px] font-semibold text-white/25 uppercase tracking-widest">
              Personalization
            </p>

            <div className="px-3 pb-2">
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-white/30">
                Page Text Color
              </p>
              <div className="flex items-center gap-2">
                <input
                  aria-label="Select page text color"
                  type="color"
                  value={subTextColor}
                  onChange={(event) => setSubTextColor(event.target.value)}
                  className="h-7 w-9 cursor-pointer rounded-md border border-white/20 bg-transparent p-0"
                />
                <div className="flex items-center gap-1">
                  {SUBTEXT_PRESETS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSubTextColor(color)}
                      aria-label={`Set page text color ${color}`}
                      className="h-5 w-5 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
                <p className="text-[10px] font-medium text-white/68">Include Header Labels</p>
                <button
                  type="button"
                  aria-label="Toggle include header labels"
                  aria-pressed={includeHeaderLabels}
                  onClick={() => setIncludeHeaderLabels(!includeHeaderLabels)}
                  className={[
                    'relative h-5 w-9 rounded-full border transition-colors duration-150',
                    includeHeaderLabels
                      ? 'border-[#86efac]/60 bg-[#86efac]/30'
                      : 'border-white/20 bg-white/[0.08]',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-all duration-150',
                      includeHeaderLabels ? 'left-[18px]' : 'left-[2px]',
                    ].join(' ')}
                  />
                </button>
              </div>
            </div>

            <p className="px-3 pb-1 text-[9px] font-semibold text-white/25 uppercase tracking-widest">
              Wallpaper
            </p>

            {WALLPAPER_OPTS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setWallpaper(opt.id); setOpen(false) }}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-[7px]',
                  'transition-colors duration-100 text-left',
                  wallpaperId === opt.id
                    ? 'bg-white/[0.08]'
                    : 'hover:bg-white/[0.05]',
                ].join(' ')}
              >
                <div
                  className="w-7 h-5 rounded-md shrink-0 border border-white/10"
                  style={{ background: opt.preview }}
                />
                <span
                  className={[
                    'text-[11.5px] font-medium',
                    wallpaperId === opt.id ? 'text-white' : 'text-white/50',
                  ].join(' ')}
                >
                  {opt.label}
                </span>
                {wallpaperId === opt.id && (
                  <span className="ml-auto text-[10px] text-[#6C8EFF]">&#10003;</span>
                )}
              </button>
            ))}

            <div className="h-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── System Tray Icons ──────────────────────────────────── */
function SystemTray() {
  return (
    <div className="flex items-center gap-1 mr-0.5">
      {/* Wallpaper picker */}
      <WallpaperPicker />
      <div className="group relative flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/[0.08] transition-colors duration-150 cursor-default">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60 group-hover:text-white/80 transition-colors"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* Volume indicator */}
      <div className="group relative flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/[0.08] transition-colors duration-150 cursor-default">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60 group-hover:text-white/80 transition-colors"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      </div>
    </div>
  )
}

function StartMenu({
  openApps,
  recruiterMode,
  setRecruiterMode,
  onLaunchApp,
  onCloseAllApps,
  onClose,
}: {
  openApps: TaskbarAppEntry[]
  recruiterMode: RecruiterMode
  setRecruiterMode: (mode: RecruiterMode) => void
  onLaunchApp?: (id: string) => void
  onCloseAllApps?: () => void
  onClose: () => void
}) {
  const summary = RECRUITER_SUMMARY[recruiterMode]
  const recentApps = openApps.slice(0, 4)

  const launch = (id: string) => {
    onLaunchApp?.(id)
    onClose()
  }

  const openExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-full left-0 mb-2 w-[440px] overflow-hidden rounded-2xl border border-white/15 bg-[#0c0f1d]/95 p-3 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
    >
      <section className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-white/65">.BeansOS Command Center</p>
            <p className="mt-0.5 text-[11px] text-white/45">License: Public Portfolio · Version v1.2.0</p>
          </div>
          <span className="rounded-md border border-emerald-300/35 bg-emerald-300/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200">
            Safe Mode
          </span>
        </div>
      </section>

      <section className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {RECRUITER_MODES.map((mode) => {
            const active = recruiterMode === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setRecruiterMode(mode.id)}
                className={[
                  'rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors duration-150',
                  active
                    ? 'border-[#9fe4ff]/45 bg-[#9fe4ff]/15 text-[#d4f6ff]'
                    : 'border-white/15 bg-white/[0.03] text-white/65 hover:bg-white/[0.08] hover:text-white/85',
                ].join(' ')}
              >
                {mode.label}
              </button>
            )
          })}
        </div>
        <p className="text-[12px] font-semibold text-[#c8f2ff]">{summary.title}</p>
        <p className="mt-1 text-[11.5px] text-white/62">{summary.focus}</p>
      </section>

      <section className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => launch('showcase')} className="rounded-lg border border-white/12 bg-white/[0.03] p-2.5 text-left hover:bg-white/[0.08]">
          <p className="text-[11px] font-semibold text-white/85">Open Showcase</p>
          <p className="mt-0.5 text-[10.5px] text-white/52">Impact board and AIDLC stories</p>
        </button>
        <button onClick={() => launch('projects')} className="rounded-lg border border-white/12 bg-white/[0.03] p-2.5 text-left hover:bg-white/[0.08]">
          <p className="text-[11px] font-semibold text-white/85">Open Projects</p>
          <p className="mt-0.5 text-[10.5px] text-white/52">Featured work and portfolio details</p>
        </button>
        <button onClick={() => launch('contact')} className="rounded-lg border border-white/12 bg-white/[0.03] p-2.5 text-left hover:bg-white/[0.08]">
          <p className="text-[11px] font-semibold text-white/85">Hire Me</p>
          <p className="mt-0.5 text-[10.5px] text-white/52">Public contact and availability</p>
        </button>
        <button onClick={() => launch('resume')} className="rounded-lg border border-white/12 bg-white/[0.03] p-2.5 text-left hover:bg-white/[0.08]">
          <p className="text-[11px] font-semibold text-white/85">Open Resume</p>
          <p className="mt-0.5 text-[10.5px] text-white/52">LinkedIn profile and credentials</p>
        </button>
      </section>

      <section className="mt-3 grid grid-cols-3 gap-2">
        <button
          onClick={() => openExternal('https://www.linkedin.com/in/vince-eleazar-domingo-ccp-24ba78115/')}
          className="rounded-md border border-white/12 bg-white/[0.03] px-2 py-2 text-[10.5px] font-semibold text-white/75 hover:bg-white/[0.08]"
        >
          <UserCheck size={12} className="mb-1 inline" /> LinkedIn
        </button>
        <button
          onClick={() => openExternal('https://github.com/binsey012')}
          className="rounded-md border border-white/12 bg-white/[0.03] px-2 py-2 text-[10.5px] font-semibold text-white/75 hover:bg-white/[0.08]"
        >
          <Rocket size={12} className="mb-1 inline" /> GitHub
        </button>
        <button
          onClick={() => { onCloseAllApps?.(); onClose() }}
          className="rounded-md border border-[#fca5a5]/30 bg-[#ef4444]/10 px-2 py-2 text-[10.5px] font-semibold text-[#fecaca] hover:bg-[#ef4444]/20"
        >
          <ShieldCheck size={12} className="mb-1 inline" /> Close All
        </button>
      </section>

      <section className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/78">
          <Briefcase size={12} />
          Recent Apps
        </div>
        {recentApps.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {recentApps.map((app) => (
              <button
                key={app.id}
                onClick={() => launch(app.id)}
                className="rounded-md border border-white/12 bg-white/[0.03] px-2 py-1 text-[10.5px] text-white/70 hover:bg-white/[0.08]"
              >
                {app.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[10.5px] text-white/45">No recent apps yet. Open Showcase or Contact to begin.</p>
        )}
      </section>
    </motion.div>
  )
}

/* ─── Taskbar ────────────────────────────────────────── */
export default function Taskbar({ openApps = [], onAppClick, onMinimizeClick, onLaunchApp, onCloseAllApps, onStartClick }: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState<RecruiterMode>('hiring-manager')
  const startRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOpen) return

    const handleOutside = (event: MouseEvent) => {
      if (!startRef.current?.contains(event.target as Node)) setStartOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setStartOpen(false)
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [startOpen])

  const toggleStart = () => {
    setStartOpen((prev) => !prev)
    onStartClick?.()
  }

  return (
    <div
      className={[
        'fixed bottom-0 left-0 right-0 z-[9999]',
        'h-14 px-3',
        'flex items-center justify-between',
        'glass-heavy',
        'shadow-[0_-1px_0_rgba(255,255,255,0.06),0_-8px_32px_rgba(0,0,0,0.5)]',
        'no-select',
      ].join(' ')}
    >
      {/* ── Left: Start Button ── */}
      <div ref={startRef} className="relative flex items-center">
        <StartButton onClick={toggleStart} isOpen={startOpen} />
        <AnimatePresence>
          {startOpen && (
            <StartMenu
              openApps={openApps}
              recruiterMode={recruiterMode}
              setRecruiterMode={setRecruiterMode}
              onLaunchApp={onLaunchApp}
              onCloseAllApps={onCloseAllApps}
              onClose={() => setStartOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Centre: Open App Icons ── */}
      <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
        {openApps.length > 0 ? (
          openApps.map((app) => (
            <TaskbarApp
              key={app.id}
              entry={app}
              onClick={() => onAppClick?.(app.id)}
              onRightClick={() => onMinimizeClick?.(app.id)}
            />
          ))
        ) : (
          /* placeholder when no apps are open */
          <span className="text-[11px] text-white/20 font-medium tracking-widest uppercase px-2">
            No open apps
          </span>
        )}
      </div>

      {/* ── Right: System Tray + Clock ── */}
      <div className="flex items-center gap-2">
        <SystemTray />
        {/* vertical divider */}
        <span className="w-px h-5 bg-white/10 rounded-full" />
        <div className="flex items-center justify-end w-[72px]">
          <Clock />
        </div>
      </div>
    </div>
  )
}
