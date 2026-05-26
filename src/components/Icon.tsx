import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

// Phase 5: launch animation + framer-motion
export interface IconProps {
  id: string
  label: string
  icon?: LucideIcon
  imageSrc?: string
  /** accent colour applied to the icon glyph */
  color?: string
  isSelected: boolean
  onSelect: (id: string) => void
  onOpen: (id: string) => void
}

export default function Icon({
  id,
  label,
  icon: IconGlyph,
  imageSrc,
  color = '#a5b4fc',
  isSelected,
  onSelect,
  onOpen,
}: IconProps) {
  const launchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [launching, setLaunching] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Single-click select + open for faster desktop interaction.
    onSelect(id)
    setLaunching(true)
    if (launchTimer.current) clearTimeout(launchTimer.current)
    launchTimer.current = setTimeout(() => {
      setLaunching(false)
      launchTimer.current = null
    }, 620)

    onOpen(id)
  }

  return (
    <motion.button
      animate={
        launching
          ? { scale: [1, 1.22, 0.88, 1.06, 1], y: [0, -5, 1, -2, 0] }
          : { scale: 1,  y: 0 }
      }
      transition={
        launching
          ? { duration: 0.55, times: [0, 0.22, 0.5, 0.75, 1], ease: 'easeOut' }
          : { duration: 0.12 }
      }
      onClick={handleClick}
      aria-label={`Open ${label}`}
      aria-pressed={isSelected}
      className={[
        // base layout
        'group relative flex flex-col items-center justify-center gap-2',
        'w-[72px] h-[88px] rounded-xl px-1 pt-3 pb-2',
        'transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C8EFF]/70',
        // default / hover glass surface
        isSelected
          ? 'bg-white/10 shadow-[0_0_0_1.5px_rgba(108,142,255,0.75),0_4px_20px_rgba(108,142,255,0.22)]'
          : 'bg-transparent hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]',
        'no-select',
      ].join(' ')}
    >
      {/* frosted icon container */}
      <span
        className={[
          'flex items-center justify-center w-11 h-11 rounded-[14px]',
          'transition-all duration-150',
          isSelected
            ? 'bg-white/[0.13] shadow-inner'
            : 'bg-white/[0.07] group-hover:bg-white/[0.11]',
          'backdrop-blur-[8px]',
          'border border-white/10',
        ].join(' ')}
        style={{
          boxShadow: isSelected
            ? `0 2px 12px ${color}44, inset 0 1px 0 rgba(255,255,255,0.15)`
            : 'inset 0 1px 0 rgba(255,255,255,0.10)',
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            width={36}
            height={36}
            className="w-9 h-9 rounded-lg object-cover drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          />
        ) : IconGlyph ? (
          <IconGlyph
            size={22}
            strokeWidth={1.6}
            style={{ color }}
            className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          />
        ) : null}
      </span>

      {/* label */}
      <span
        className={[
          'text-[11px] font-medium leading-tight text-center w-full px-0.5',
          'line-clamp-2 break-words',
          'text-shadow-sm',
          isSelected ? 'text-white' : 'text-white/80 group-hover:text-white/95',
        ].join(' ')}
      >
        {label}
      </span>

      {/* selection underline pip */}
      {isSelected && (
        <span
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full"
          style={{ background: color }}
        />
      )}
    </motion.button>
  )
}
