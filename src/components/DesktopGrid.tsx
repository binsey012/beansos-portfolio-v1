import {
  Folder,
  User,
  Briefcase,
  Code2,
  Mail,
  Github,
  FileText,
  Sparkles,
  Layers,
  Terminal,
  Ghost,
} from 'lucide-react'
import Icon from './Icon'
import type { LucideIcon } from 'lucide-react'

export interface DesktopIconDef {
  id: string
  label: string
  icon?: LucideIcon
  imageSrc?: string
  color: string
}

export const DESKTOP_ICONS: DesktopIconDef[] = [
  { id: 'about',     label: 'About Me',    icon: User,      color: '#93c5fd' },
  { id: 'projects',  label: 'Projects',    icon: Briefcase, color: '#86efac' },
  { id: 'skills',    label: 'Skills',      icon: Code2,     color: '#f9a8d4' },
  { id: 'terminal',  label: 'Terminal',    icon: Terminal,  color: '#6ee7b7' },
  { id: 'contact',   label: 'Contact',     icon: Mail,      color: '#fcd34d' },
  { id: 'github',    label: 'GitHub',      icon: Github,    color: '#c4b5fd' },
  { id: 'resume',    label: 'Resume',      icon: FileText,  color: '#fed7aa' },
  { id: 'showcase',  label: 'Showcase',    icon: Sparkles,  color: '#a5f3fc' },
  { id: 'stack',     label: 'Tech Stack',  icon: Layers,    color: '#ddd6fe' },
  { id: 'assets',    label: 'Assets',      icon: Folder,    color: '#fde68a' },
  { id: 'vicecity',  label: 'Vice City',   imageSrc: '/gta-vice-city.webp', color: '#ff60d4' },
  { id: 'pacman',    label: 'PAC-MAN',     icon: Ghost, color: '#ffd700' },
]

interface DesktopGridProps {
  selectedId: string | null
  onSelect: (id: string) => void
  onOpen: (id: string) => void
}

export default function DesktopGrid({ selectedId, onSelect, onOpen }: DesktopGridProps) {
  return (
    /**
     * grid-flow-col: items fill top→bottom then wrap into next column.
     * grid-rows uses auto-fill with a fixed row height so the grid
     * adapts to available vertical space without breaking boundaries.
     */
    <div
      className={[
        'grid grid-flow-col',
        // Each row is exactly 96 px tall. We let the browser auto-fill
        // as many rows as fit within the container's height.
        'grid-rows-[repeat(auto-fill,96px)]',
        // Gap between cells
        'gap-x-1 gap-y-0.5',
        // Align grid to the top-left of the desktop
        'content-start justify-start',
        // Padding: top accounts for a title bar, bottom for the taskbar
        'pt-6 pl-4',
        // Fill the parent height so grid-rows auto-fill works correctly
        'h-full',
        'animate-fade-in',
      ].join(' ')}
    >
      {DESKTOP_ICONS.map((def) => (
        <Icon
          key={def.id}
          id={def.id}
          label={def.label}
          icon={def.icon}
          imageSrc={def.imageSrc}
          color={def.color}
          isSelected={selectedId === def.id}
          onSelect={onSelect}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}
