/**
 * useOSStore.ts — BeansOS Window Management Store
 *
 * Central Zustand store governing all window lifecycle and stacking-layer
 * logic for the .BeansOS desktop environment.
 *
 * Z-Index strategy
 * ────────────────
 * Every open window holds a numeric `zIndex`. Rather than scanning all windows
 * each time we need to promote a window, the store maintains a single
 * monotonically-increasing `maxZIndex` counter. Promoting any window simply
 * does `++maxZIndex` and assigns that value to the target window. This
 * guarantees:
 *   • No two windows ever share the same z-index after a focus event.
 *   • The calculation is O(1) — no array scan, no sort, no reduce.
 *   • Stale z-indices on other windows are still valid relative values;
 *     they just sit lower in the stack until they are themselves focused.
 * The base z-index (BASE_Z) is set to 100 so that fixed UI chrome
 * (taskbar, overlays) can safely occupy 0–99 without conflicts.
 */

import { create } from 'zustand'

// ─── Wallpaper ────────────────────────────────────────────────────────────────

export type WallpaperId = 'cyberpunk-dark' | 'minimal-abstract' | 'neo-retro-blue'

// ─── Constants ────────────────────────────────────────────────────────────────

/** Lowest z-index a window can occupy. Values 0–99 are reserved for chrome. */
const BASE_Z = 100

// ─── Types ────────────────────────────────────────────────────────────────────

/** Complete runtime state of a single desktop window. */
export interface WindowState {
  /** Stable unique identifier — matches the icon `id` in DesktopGrid. */
  id: string

  /** Human-readable title shown in the window's title-bar. */
  title: string

  /**
   * Whether the window is currently rendered on the desktop.
   * Closed windows are NOT destroyed; they are hidden so state is preserved
   * when re-opened (e.g. scroll position, form data).
   */
  isOpen: boolean

  /**
   * Whether the window is collapsed to the taskbar.
   * A minimized window is still `isOpen: true`; it simply has no visible
   * surface on the desktop canvas.
   */
  isMinimized: boolean

  /**
   * Whether the window occupies the full available desktop viewport.
   * Toggling this does not affect z-index.
   */
  isMaximized: boolean

  /**
   * Stacking layer for CSS `z-index`. Assigned by the `maxZIndex` counter
   * each time the window is opened or focused. See module-level doc for the
   * allocation strategy.
   */
  zIndex: number
}

/**
 * Lookup map of all registered windows keyed by their `id`.
 * Using a Record (object map) rather than an array gives O(1) access
 * for all actions that target a specific window by id.
 */
export type WindowRegistry = Record<string, WindowState>

/** Full store shape exposed to consumers. */
export interface OSStore {
  // ── State ────────────────────────────────────────────────────────────────

  /** All windows known to the OS, keyed by id. */
  windows: WindowRegistry

  /**
   * The highest z-index currently issued to any window.
   * Always incremented *before* assignment so the first issued value is
   * BASE_Z + 1, the second BASE_Z + 2, etc. — no window ever holds BASE_Z
   * itself, keeping the base value available as a "floor" sentinel.
   */
  maxZIndex: number

  // ── Wallpaper ────────────────────────────────────────────────────────────

  /** Currently active wallpaper theme. */
  wallpaperId: WallpaperId

  /** Swap to a different wallpaper theme. */
  setWallpaper: (id: WallpaperId) => void

  /** Global sub-text color used by content areas. */
  subTextColor: string

  /** Update global sub-text color. */
  setSubTextColor: (color: string) => void

  /** Whether uppercase/semibold header labels should also follow page text color. */
  includeHeaderLabels: boolean

  /** Toggle theming for header labels. */
  setIncludeHeaderLabels: (value: boolean) => void

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * Open (or re-open) a window and bring it immediately to the front.
   *
   * If the window is already open and not minimized, this still promotes
   * its z-index — equivalent to the user re-clicking an already-visible app.
   */
  openWindow: (id: string) => void

  /**
   * Close a window. The window object is NOT removed from the registry;
   * `isOpen` is set to false so state is preserved for when it is re-opened.
   */
  closeWindow: (id: string) => void

  /**
   * Collapse the window to the taskbar without closing it.
   * Sets `isMinimized: true`; `isOpen` remains true.
   */
  minimizeWindow: (id: string) => void

  /**
   * Bring a window to the top of the stacking order.
   *
   * Guard: If the window already holds the highest z-index (`zIndex ===
   * maxZIndex`) it is already the topmost layer — the counter is NOT
   * incremented, preventing needless counter drift on every single click.
   */
  focusWindow: (id: string) => void

  /**
   * Flip the `isMaximized` flag for a window.
   * Maximizing also implicitly focuses the window (brings to front).
   */
  toggleMaximize: (id: string) => void
}

// ─── Default Window Definitions ───────────────────────────────────────────────

/**
 * Seed registry entries for the core apps.
 * Windows start closed; they are opened by user interaction.
 * Initial z-indices are all BASE_Z — they will be promoted on first open.
 */
const DEFAULT_WINDOWS: WindowRegistry = {
  about: {
    id: 'about',
    title: 'About Me',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  projects: {
    id: 'projects',
    title: 'Projects — File Explorer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  contact: {
    id: 'contact',
    title: 'Contact — Hire Me',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  stack: {
    id: 'stack',
    title: 'Tech Stack — Dual Engine',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  github: {
    id: 'github',
    title: 'GitHub — Portfolio Profile',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  assets: {
    id: 'assets',
    title: 'Assets — Trusted Stack Library',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  skills: {
    id: 'skills',
    title: 'Skills — Leadership + Technical Matrix',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  resume: {
    id: 'resume',
    title: 'Resume — LinkedIn Profile',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
  showcase: {
    id: 'showcase',
    title: 'Showcase — AI + Delivery Impact',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: BASE_Z,
  },
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useOSStore = create<OSStore>((set, get) => ({
  // ── Initial state ──────────────────────────────────────────────────────────

  windows: DEFAULT_WINDOWS,
  maxZIndex: BASE_Z,
  wallpaperId: 'cyberpunk-dark',
  setWallpaper: (id) => set({ wallpaperId: id }),
  subTextColor: '#9fb6ff',
  setSubTextColor: (color) => set({ subTextColor: color }),
  includeHeaderLabels: false,
  setIncludeHeaderLabels: (value) => set({ includeHeaderLabels: value }),

  // ── openWindow ─────────────────────────────────────────────────────────────

  openWindow: (id: string) => {
    const { windows, maxZIndex } = get()

    // Guard: unknown id — do nothing rather than creating orphan state.
    if (!windows[id]) return

    // Allocate a fresh z-index layer for this window.
    const nextZ = maxZIndex + 1

    set({
      maxZIndex: nextZ,
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      },
    })
  },

  // ── closeWindow ────────────────────────────────────────────────────────────

  closeWindow: (id: string) => {
    const { windows } = get()
    if (!windows[id]) return

    // Preserve all other state so the window restores cleanly on re-open.
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: false,
          // Reset maximized state on close so re-opening feels fresh.
          isMaximized: false,
        },
      },
    })
  },

  // ── minimizeWindow ─────────────────────────────────────────────────────────

  minimizeWindow: (id: string) => {
    const { windows } = get()
    if (!windows[id]) return

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: true,
        },
      },
    })
  },

  // ── focusWindow ────────────────────────────────────────────────────────────

  focusWindow: (id: string) => {
    const { windows, maxZIndex } = get()
    if (!windows[id]) return

    const target = windows[id]

    /**
     * Early exit guard — already the topmost visible window.
     *
     * Only skip the update when the window is both on top AND not minimized.
     * If it is minimized, we must still proceed to set isMinimized: false
     * even if it already holds the highest z-index (e.g. the user minimized
     * the only open window and then clicks its taskbar entry).
     */
    if (target.zIndex === maxZIndex && !target.isMinimized) return

    const nextZ = maxZIndex + 1

    set({
      maxZIndex: nextZ,
      windows: {
        ...windows,
        [id]: {
          ...target,
          // Un-minimize if user clicked on a minimized taskbar entry.
          isMinimized: false,
          zIndex: nextZ,
        },
      },
    })
  },

  // ── toggleMaximize ─────────────────────────────────────────────────────────

  toggleMaximize: (id: string) => {
    const { windows, maxZIndex } = get()
    if (!windows[id]) return

    const target = windows[id]
    const nextMaximized = !target.isMaximized

    // Maximizing always promotes the window to the front.
    const nextZ = nextMaximized ? maxZIndex + 1 : target.zIndex
    const nextMax = nextMaximized ? maxZIndex + 1 : maxZIndex

    set({
      maxZIndex: nextMax,
      windows: {
        ...windows,
        [id]: {
          ...target,
          isMaximized: nextMaximized,
          zIndex: nextZ,
        },
      },
    })
  },
}))

// ─── Selector Helpers ─────────────────────────────────────────────────────────
// Fine-grained selectors prevent components from re-rendering when unrelated
// window state changes. Import and use these instead of selecting the full
// `windows` map wherever possible.

/** Returns a single window's state, or undefined if the id is not registered. */
export const selectWindow = (id: string) => (state: OSStore) =>
  state.windows[id] as WindowState | undefined

/** Returns every window that is currently open and not minimized (visible on desktop). */
export const selectVisibleWindows = (state: OSStore): WindowState[] =>
  Object.values(state.windows).filter((w) => w.isOpen && !w.isMinimized)

/** Returns every window that is open (used by the Taskbar to render app entries). */
export const selectOpenWindows = (state: OSStore): WindowState[] =>
  Object.values(state.windows).filter((w) => w.isOpen)

/** Returns the id of the window currently sitting at the top of the stack, or null. */
export const selectFocusedWindowId = (state: OSStore): string | null => {
  const { windows, maxZIndex } = state
  const top = Object.values(windows).find((w) => w.zIndex === maxZIndex && w.isOpen)
  return top?.id ?? null
}
