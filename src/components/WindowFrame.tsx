import { useState } from 'react'
import {
  motion,
  useDragControls,
  type PanInfo,
} from 'framer-motion'
import { useOSStore } from '../store/useOSStore'
import type { WindowState } from '../store/useOSStore'
import ProjectsExplorer from './ProjectsExplorer'
import InteractiveTerminal from './InteractiveTerminal'
import AboutMe from './AboutMe'
import ContactPage from './ContactPage'
import TechStackPage from './TechStackPage'
import GithubPage from './GithubPage'
import AssetsPage from './AssetsPage'
import SkillsPage from './SkillsPage'
import ResumePage from './ResumePage'
import ShowcasePage from './ShowcasePage'
import ViceCityPage from './ViceCityPage'
import PacManPage from './PacManPage'

// ─── Constants ────────────────────────────────────────────────────────────────

/** Height of the bottom taskbar in px — windows cannot overlap it. */
const TASKBAR_H = 56

/** Default window dimensions. */
const DEFAULT_W = 680
const DEFAULT_H = 440
const MIN_W = 520
const MIN_H = 320

// ─── Control Button ───────────────────────────────────────────────────────────

interface ControlProps {
  color: string
  hoverIcon: string
  label: string
  onClick: (e: React.MouseEvent) => void
}

function ControlButton({ color, hoverIcon, label, onClick }: ControlProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={[
        'group relative flex items-center justify-center',
        'w-3 h-3 rounded-full transition-all duration-100',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
      ].join(' ')}
      style={{ background: color }}
    >
      {/* icon appears on hover */}
      <span
        aria-hidden
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-black/60 font-bold leading-none select-none"
        style={{ fontSize: 7, marginTop: -0.5 }}
      >
        {hoverIcon}
      </span>
    </button>
  )
}

// ─── WindowFrame ──────────────────────────────────────────────────────────────

interface WindowFrameProps {
  win: WindowState
  children?: React.ReactNode
}

export default function WindowFrame({ win, children }: WindowFrameProps) {
  const focusWindow    = useOSStore((s) => s.focusWindow)
  const closeWindow    = useOSStore((s) => s.closeWindow)
  const minimizeWindow = useOSStore((s) => s.minimizeWindow)
  const toggleMaximize = useOSStore((s) => s.toggleMaximize)

  const dragControls = useDragControls()
  const [windowSize, setWindowSize] = useState({ width: DEFAULT_W, height: DEFAULT_H })

  const startResize = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (win.isMaximized) return
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY
    const startW = windowSize.width
    const startH = windowSize.height

    const onMove = (moveEvent: PointerEvent) => {
      const nextWidth = Math.min(
        window.innerWidth,
        Math.max(MIN_W, startW + (moveEvent.clientX - startX)),
      )
      const nextHeight = Math.min(
        window.innerHeight - TASKBAR_H,
        Math.max(MIN_H, startH + (moveEvent.clientY - startY)),
      )

      setWindowSize({ width: nextWidth, height: nextHeight })
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const startResizeWidth = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (win.isMaximized) return
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startW = windowSize.width

    const onMove = (moveEvent: PointerEvent) => {
      const nextWidth = Math.min(
        window.innerWidth,
        Math.max(MIN_W, startW + (moveEvent.clientX - startX)),
      )
      setWindowSize((prev) => ({ ...prev, width: nextWidth }))
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const startResizeHeight = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (win.isMaximized) return
    e.preventDefault()
    e.stopPropagation()

    const startY = e.clientY
    const startH = windowSize.height

    const onMove = (moveEvent: PointerEvent) => {
      const nextHeight = Math.min(
        window.innerHeight - TASKBAR_H,
        Math.max(MIN_H, startH + (moveEvent.clientY - startY)),
      )
      setWindowSize((prev) => ({ ...prev, height: nextHeight }))
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

      // ── Drag boundary ──────────────────────────────────────────────────────────
  // Windows can be freely dragged anywhere on the screen; only the top edge
  // is clamped to keep the title bar reachable (y >= 0).

  // ── Animation variants ─────────────────────────────────────────────────────
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      y: 24,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.88,
      y: 16,
      transition: { duration: 0.14, ease: [0.4, 0, 1, 1] as const },
    },
  }

  // ── Maximized layout ───────────────────────────────────────────────────────
  // When maximized, override position/size to fill the workspace above the taskbar.
  return (
    <motion.div
      key={win.id}
      // ── Presence animation
      variants={variants}
      initial="hidden"
      // When maximized, also force x/y back to 0 to clear any drag offset
      animate={
        win.isMaximized
          ? { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } }
          : 'visible'
      }
      exit="exit"

      // ── Drag — freely across the entire screen (only title bar initiates)
      drag={!win.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {}}

      // ── Focus on any pointer interaction
      onPointerDown={() => focusWindow(win.id)}

      className="flex flex-col will-change-transform pointer-events-auto"
      style={{
        position: 'absolute',
        zIndex: win.zIndex,
        ...(win.isMaximized
          ? { top: 0, left: 0, right: 0, bottom: 0 }
          : { top: 0, left: 0, width: windowSize.width, height: windowSize.height }),
      }}
    >
      {/* ── Window shell */}
      <div
        className={[
          'group relative flex flex-col w-full h-full',
          'rounded-xl overflow-hidden',
          // Frosted glass
          'bg-white/[0.07] backdrop-blur-[28px]',
          'border border-white/[0.14]',
          'shadow-[0_24px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.10)]',
          win.isMaximized ? 'rounded-none' : 'rounded-xl',
        ].join(' ')}
      >
        {/* ── Title bar ──────────────────────────────────────────────────── */}
        <div
          onPointerDown={(e) => {
            if (win.isMaximized) return
            dragControls.start(e)
          }}
          onDoubleClick={() => toggleMaximize(win.id)}
          className={[
            'relative flex items-center justify-between',
            'h-11 px-4 shrink-0',
            'select-none',
            win.isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
            // Subtle header tint
            'bg-white/[0.04] border-b border-white/[0.08]',
          ].join(' ')}
        >
          {/* Left: traffic-light controls */}
          <div className="flex items-center gap-1.5">
            <ControlButton
              color="#FF5F57"
              hoverIcon="✕"
              label={`Close ${win.title}`}
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id) }}
            />
            <ControlButton
              color="#FEBC2E"
              hoverIcon="–"
              label={`Minimize ${win.title}`}
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id) }}
            />
            <ControlButton
              color="#28C840"
              hoverIcon={win.isMaximized ? '⤡' : '⤢'}
              label={`${win.isMaximized ? 'Restore' : 'Maximize'} ${win.title}`}
              onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id) }}
            />
          </div>

          {/* Centre: title */}
          <span
            className="absolute left-1/2 -translate-x-1/2 text-[12.5px] font-semibold text-white/70 tracking-wide max-w-[55%] truncate pointer-events-none"
          >
            {win.title}
          </span>

          {/* Right: explicit controls when maximized */}
          {win.isMaximized ? (
            <div className="flex items-center gap-2">
              <button
                className="h-6 px-2 rounded-md text-[11px] font-medium text-white/75 hover:text-white hover:bg-white/10"
                onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id) }}
              >
                Minimize
              </button>
              <button
                className="h-6 px-2 rounded-md text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/12 border border-white/15"
                onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id) }}
              >
                Exit Full Screen
              </button>
              <button
                className="h-6 px-2 rounded-md text-[11px] font-medium text-[#ffb3b3] hover:text-[#ffd0d0] hover:bg-[#ff5f57]/15 border border-[#ff5f57]/40"
                onClick={(e) => { e.stopPropagation(); closeWindow(win.id) }}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="w-[54px]" />
          )}
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="content-subtext-theme flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          {children ?? <AppContent win={win} />}
        </div>

        {/* Resize handle (bottom-right) */}
        {!win.isMaximized && (
          <>
            <button
              aria-label={`Resize ${win.title} width`}
              onPointerDown={startResizeWidth}
              className="absolute right-0 top-12 bottom-10 w-2 cursor-e-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-150 bg-gradient-to-l from-white/[0.12] to-transparent"
            />

            <button
              aria-label={`Resize ${win.title} height`}
              onPointerDown={startResizeHeight}
              className="absolute left-8 right-8 bottom-0 h-2 cursor-s-resize opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-150 bg-gradient-to-t from-white/[0.12] to-transparent"
            />

            <button
              aria-label={`Resize ${win.title}`}
              onPointerDown={startResize}
              className="absolute right-1 bottom-7 w-5 h-5 flex items-end justify-end pr-[3px] pb-[3px] cursor-se-resize text-white/18 group-hover:text-white/30 hover:text-white/55 transition-colors duration-150"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 10L10 1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 10L10 4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 10L10 7" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}

// ─── App content router ───────────────────────────────────────────────────────

function AppContent({ win }: { win: WindowState }) {
  if (win.id === 'about') return <AboutMe />
  if (win.id === 'projects') return <ProjectsExplorer />
  if (win.id === 'showcase') return <ShowcasePage />
  if (win.id === 'terminal') return <InteractiveTerminal />
  if (win.id === 'contact') return <ContactPage />
  if (win.id === 'skills') return <SkillsPage />
  if (win.id === 'resume') return <ResumePage />
  if (win.id === 'stack') return <TechStackPage />
  if (win.id === 'github') return <GithubPage />
  if (win.id === 'assets') return <AssetsPage />
  if (win.id === 'vicecity') return <ViceCityPage />
  if (win.id === 'pacman') return <PacManPage />
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
      <span className="text-4xl select-none">🪟</span>
      <p className="text-white/60 text-sm font-medium">{win.title}</p>
      <p className="text-white/30 text-xs max-w-xs">
        Content for this window will be added in a future phase.
      </p>
    </div>
  )
}
