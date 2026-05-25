import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BootScreenProps {
  /** Called exactly once when the 2.5-second sequence completes. */
  onComplete: () => void
}

// ─── Boot sequence data ───────────────────────────────────────────────────────

const BOOT_LINES: { text: string; delay: number }[] = [
  { text: 'Initializing .BeansOS Kernel v1.0.0',        delay: 260  },
  { text: 'Loading system modules ............ [12/12]', delay: 490  },
  { text: 'Mounting desktop filesystem',                 delay: 710  },
  { text: 'Starting window compositor',                  delay: 900  },
  { text: 'Initializing GPU render pipeline',            delay: 1080 },
  { text: 'Loading user profile: beans',                 delay: 1250 },
  { text: 'Configuring display subsystem',               delay: 1410 },
  { text: 'All subsystems nominal',                      delay: 1680 },
]

// ─── BootScreen ───────────────────────────────────────────────────────────────

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showReady,    setShowReady]    = useState(false)
  const [showWelcome,  setShowWelcome]  = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // Stagger each boot line
    BOOT_LINES.forEach(({ delay }, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), delay))
    })

    // Final status lines
    timers.push(setTimeout(() => setShowReady(true),   1860))
    timers.push(setTimeout(() => setShowWelcome(true), 2060))

    // Hand off to App — AnimatePresence handles the fade-out exit
    timers.push(setTimeout(onComplete, 2550))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      // exit is driven by AnimatePresence in App.tsx
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[99999] bg-[#050508] flex flex-col items-center justify-center font-mono overflow-hidden select-none"
    >
      {/* ── Ambient background glow ───────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(108,142,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* ── Logo ──────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72, y: 16 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        className="mb-10 flex flex-col items-center gap-3"
      >
        {/* Glowing monogram */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 22px rgba(108,142,255,0.45)',
              '0 0 55px rgba(108,142,255,0.85)',
              '0 0 22px rgba(108,142,255,0.45)',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-[18px] flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6C8EFF 0%, #a855f7 100%)' }}
        >
          <span className="text-2xl font-black text-white leading-none">B</span>
        </motion.div>

        {/* Wordmark */}
        <div className="text-center">
          <p className="text-[15px] font-bold text-white/90 tracking-[0.22em] uppercase">
            .BeansOS
          </p>
          <p className="text-[10px] text-white/28 tracking-[0.28em] uppercase mt-0.5">
            Portfolio OS · v1.0.0
          </p>
        </div>
      </motion.div>

      {/* ── Boot log ──────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[480px] px-6 mb-7 space-y-[5px]">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <span className="text-[11px] font-bold text-emerald-400 shrink-0 tracking-wide">
              [  OK  ]
            </span>
            <span className="text-[11px] text-white/40">{line.text}</span>
          </motion.div>
        ))}

        {showReady && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-3"
          >
            <span className="text-[11px] font-bold text-emerald-400 shrink-0 tracking-wide">
              [  OK  ]
            </span>
            <span className="text-[11px] text-emerald-300/65">System ready.</span>
          </motion.div>
        )}

        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="pt-2.5"
          >
            <span className="text-[13.5px] font-bold text-[#6C8EFF] tracking-[0.18em] uppercase">
              ▸ Welcome to .BeansOS
            </span>
          </motion.div>
        )}
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      <div className="w-full max-w-[480px] px-6">
        <div
          className="relative h-[3px] w-full rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.15, delay: 0.22, ease: [0.1, 0, 0.9, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #6C8EFF 0%, #a855f7 50%, #6C8EFF 100%)',
              boxShadow: '0 0 8px rgba(108,142,255,0.7)',
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[9px] text-white/18 tracking-widest uppercase">Booting</span>
          <span className="text-[9px] text-white/18 tracking-widest uppercase">beans/os</span>
        </div>
      </div>
    </motion.div>
  )
}
