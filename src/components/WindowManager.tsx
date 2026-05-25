import { AnimatePresence } from 'framer-motion'
import { useOSStore } from '../store/useOSStore'
import WindowFrame from './WindowFrame'

/**
 * WindowManager
 *
 * Sits above the desktop grid, below the taskbar (z-index-wise).
 * Renders every window that is currently open. Minimized windows are
 * kept mounted so their state (scroll position, data) is preserved,
 * but they are hidden via AnimatePresence + a `hidden` variant.
 *
 * AnimatePresence `mode="sync"` lets multiple windows enter/exit
 * simultaneously without waiting for each other.
 */
export default function WindowManager() {
  const windows = useOSStore((s) => s.windows)

  const visibleWindows = Object.values(windows).filter((w) => w.isOpen)

  return (
    // Fixed layer that covers the full desktop workspace (above grid, below taskbar chrome)
    <div className="fixed inset-0 bottom-14 pointer-events-none" style={{ zIndex: 99 }}>
      <AnimatePresence mode="sync">
        {visibleWindows.map((win) =>
          win.isMinimized ? null : (
            <WindowFrame key={win.id} win={win} />
          ),
        )}
      </AnimatePresence>
    </div>
  )
}
