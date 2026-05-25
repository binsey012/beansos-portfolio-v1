import { useState } from 'react'
import { ArrowLeft, ExternalLink, Folder, FolderOpen, ShieldCheck, Sparkles } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string
  name: string
  type: string
  modified: string
  color: string
  featured: boolean
  summary: string
  description: string
  tags: string[]
  stack: string[]
  url: string | null
  repo: string | null
  status: 'Live' | 'In Progress' | 'Archived'
}

const PROJECTS: Project[] = [
  {
    id: 'beanos',
    name: '.BeansOS',
    type: 'Immersive UI',
    modified: 'May 2026',
    color: '#6C8EFF',
    featured: true,
    summary: 'A browser-based desktop OS portfolio experience with modular apps, animation-rich UX, and window orchestration.',
    description:
      'Built as an interactive portfolio operating system that demonstrates full-stack UI architecture and polished interaction design. Includes Zustand state orchestration, multi-window lifecycle logic, taskbar management, animated transitions, and specialized app modules for projects, terminal, profile, contact, and stack visualization.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Zustand', 'Tailwind CSS', 'Vite'],
    stack: ['React 18', 'TypeScript 5', 'Framer Motion', 'Zustand 5', 'Tailwind CSS 3', 'Vite 5'],
    url: null,
    repo: null,
    status: 'In Progress',
  },
  {
    id: 'advjuansiksty',
    name: 'ADV Juansiksty Nation RT',
    type: 'Community Portal',
    modified: '2026',
    color: '#34d399',
    featured: true,
    summary: 'Official digital platform for a Philippine motorcycle riding team, built around community trust and visibility.',
    description:
      'Designed as a brand-forward organization website featuring news and event publishing, partner highlights, social integrations, and member onboarding pathways. The project focuses on identity consistency, content discoverability, and rider-community engagement.',
    tags: ['Community', 'Events', 'Partner Pages', 'Brand System', 'Social Integration'],
    stack: ['React', 'Vercel', 'CMS-style Content', 'Responsive UI'],
    url: 'https://www.advjuansikstynation.com/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'scoottechgarage',
    name: 'Scoot Tech Garage',
    type: 'Performance Garage Website',
    modified: '2026',
    color: '#f472b6',
    featured: true,
    summary: 'A premium, conversion-focused digital front door for a motorcycle performance and tuning garage.',
    description:
      'Structured around clear service storytelling for engine builds, ECU remapping, CVT tuning, suspension setup, and preventive maintenance. The UX emphasizes trust markers, service clarity, and fast action paths for riders.',
    tags: ['Automotive', 'Service Funnels', 'Brand Positioning', 'Lead Conversion'],
    stack: ['Next.js', 'Modern UI', 'Responsive Layout', 'Performance-first Build'],
    url: 'https://www.scoottechgarage.com/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'growersrealestate',
    name: 'Growers Real Estate FL',
    type: 'Real Estate Utility Tool',
    modified: '2026',
    color: '#fbbf24',
    featured: false,
    summary: 'Professional closing-cost and title-fee quote interface for real estate transaction estimation.',
    description:
      'Created to simplify buyer/seller projections with structured transaction inputs, title and escrow calculations, and transparent quote generation. The focus is speed, clarity, and practical utility for real estate workflows.',
    tags: ['Estimator Tool', 'Real Estate', 'Closing Cost UX', 'Form Design'],
    stack: ['Web App UI', 'Calculation Logic', 'Responsive Forms'],
    url: 'https://www.growersrealestatefl.com/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'beans-assessment',
    name: 'BEANS Secure Assessment',
    type: 'Assessment Security Platform',
    modified: '2026',
    color: '#a78bfa',
    featured: true,
    summary: 'Biometric and electronic assessment platform aimed at integrity-first, AI-resistant evaluation workflows.',
    description:
      'Designed around exam security architecture, including AI-content detection, focus/tab monitoring, device-level constraints, and controlled portal access for examinees and administrators. The product direction centers on trust, traceability, and assessment validity.',
    tags: ['EdTech', 'Integrity Systems', 'Admin Portal', 'Security UX'],
    stack: ['Web Platform', 'Secure Access Flows', 'Monitoring Controls'],
    url: 'https://www.notsopowerfulsystem.xyz/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'arrowgamesmedia',
    name: 'Arrow Games Media',
    type: 'Digital Marketing Agency Site',
    modified: '2026',
    color: '#38bdf8',
    featured: false,
    summary: 'Performance-marketing agency website focused on media buying, digital strategy, and affiliate growth.',
    description:
      'Built as a startup-ready agency presence with offer architecture, proof-style metrics, service segmentation, and clear consultation CTAs. Messaging emphasizes measurable growth and lean execution for ambitious brands.',
    tags: ['Agency Website', 'Lead Generation', 'Service Packaging', 'Marketing UX'],
    stack: ['React', 'Vercel', 'Landing Architecture', 'CRO-friendly UI'],
    url: 'https://arrowgamesmedia.vercel.app/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'inventory-system',
    name: 'S/N Variety Inventory Management',
    type: 'Business Operations App',
    modified: '2026',
    color: '#22d3ee',
    featured: false,
    summary: 'Inventory management application with account-based access for operational workflows.',
    description:
      'Developed as a practical management system with authenticated entry points and user-account flows to support day-to-day stock and inventory operations. Prioritizes straightforward access patterns and process-oriented structure.',
    tags: ['Inventory', 'Auth Flow', 'Operations Tool', 'Business App'],
    stack: ['Web App', 'Form/Auth UX', 'CRUD-oriented Workflow'],
    url: 'https://inventory-management-system-five-blue.vercel.app/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'epicdigital',
    name: 'Epic Digital',
    type: 'SEO and Growth Agency Website',
    modified: '2024',
    color: '#60a5fa',
    featured: false,
    summary: 'Growth-focused agency site centered on SEO, social amplification, and strategic link-building services.',
    description:
      'Positioned around startup growth pain points with a structured four-step process, tool credibility, and consultation funnel. The design supports trust-building through transparent process framing and service-specific outcomes.',
    tags: ['SEO', 'Social Growth', 'Lead Funnel', 'Agency Positioning'],
    stack: ['Web Marketing Site', 'Conversion Copy', 'Responsive UI'],
    url: 'https://epicdigital.vercel.app/',
    repo: null,
    status: 'Live',
  },
  {
    id: 'puppy-paw-battle',
    name: 'Puppy Paw Battle',
    type: 'Interactive Browser Card Game',
    modified: '2026',
    color: '#f59e0b',
    featured: false,
    summary: 'Playful tactical card game with turn-based mechanics, energy economy, and AI opponent battles.',
    description:
      'A browser game concept featuring card abilities, location effects, and four-turn match pacing. Includes onboarding, gameplay legend, and keyboard-assisted controls to keep interaction fast and engaging.',
    tags: ['Game UI', 'Turn-based Logic', 'Interactive UX', 'Browser Game'],
    stack: ['Front-end Game Mechanics', 'State-driven UI', 'Responsive Layout'],
    url: 'https://pawwslife-card-game-v1.vercel.app/',
    repo: null,
    status: 'Live',
  },
]

// ─── Tag Chip ─────────────────────────────────────────────────────────────────

function Chip({ label, variant = 'default' }: { label: string; variant?: 'default' | 'stack' }) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide select-none',
        variant === 'stack'
          ? 'bg-white/[0.06] text-white/50 border border-white/[0.09]'
          : 'bg-white/[0.10] text-white/70 border border-white/[0.14]',
      ].join(' ')}
    >
      {label}
    </span>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Live:        { dot: 'bg-emerald-400',  text: 'text-emerald-400',  label: 'Live'        },
  'In Progress': { dot: 'bg-amber-400',   text: 'text-amber-400',    label: 'In Progress' },
  Archived:    { dot: 'bg-white/30',     text: 'text-white/40',     label: 'Archived'    },
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === 'Live' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  )
}

// ─── Folder Item ──────────────────────────────────────────────────────────────

function FolderItem({
  project,
  isSelected,
  onClick,
}: {
  project: Project
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'group flex flex-col items-start gap-2 p-3 rounded-xl text-left',
        'transition-all duration-150 outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#6C8EFF]/60',
        isSelected
          ? 'bg-white/[0.12] border border-white/[0.18] shadow-[0_0_0_1.5px_rgba(108,142,255,0.5)]'
          : 'bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.13]',
      ].join(' ')}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-150 group-hover:scale-105"
        style={{ background: `${project.color}1A`, border: `1px solid ${project.color}33` }}
      >
        {isSelected
          ? <FolderOpen size={20} style={{ color: project.color }} strokeWidth={1.6} />
          : <Folder size={20} style={{ color: project.color }} strokeWidth={1.6} />
        }
      </div>

      {/* Label */}
      <div className="w-full min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[12px] font-semibold text-white/85 truncate leading-tight">{project.name}</p>
          {project.featured && (
            <span className="shrink-0 text-[9px] px-1.5 py-[1px] rounded bg-[#6C8EFF]/25 text-[#b7c6ff] border border-[#6C8EFF]/35">
              Featured
            </span>
          )}
        </div>
        <p className="text-[10px] text-white/40 mt-0.5 truncate">{project.type}</p>
      </div>
    </button>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Back bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.07] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white/80 transition-colors duration-150 focus:outline-none"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          <span>All Projects</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-5 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
              style={{ background: `${project.color}1A`, border: `1px solid ${project.color}33` }}
            >
              <FolderOpen size={22} style={{ color: project.color }} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-white leading-tight">{project.name}</h2>
              <p className="text-[12px] text-white/45 mt-0.5">{project.type} · {project.modified}</p>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Summary */}
        <p className="text-[13px] text-white/65 leading-relaxed font-medium">
          {project.summary}
        </p>

        {/* Tags */}
        <div>
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => <Chip key={t} label={t} />)}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.07]" />

        {/* Description */}
        <div>
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
            Overview
          </p>
          <p className="text-[12.5px] text-white/55 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Stack chips */}
        <div>
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
            Full Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => <Chip key={s} label={s} variant="stack" />)}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1 pb-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold',
                'transition-all duration-150 focus:outline-none',
                'text-[#0a0a0a]',
              ].join(' ')}
              style={{ background: project.color, boxShadow: `0 4px 20px ${project.color}55` }}
            >
              <ExternalLink size={12} strokeWidth={2.5} />
              Launch Project
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo.startsWith('http') ? project.repo : `https://${project.repo}`}
              target="_blank"
              rel="noreferrer"
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold',
                'bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.11]',
                'text-white/70 hover:text-white',
                'transition-all duration-150 focus:outline-none',
              ].join(' ')}
            >
              View Source
            </a>
          )}
          {!project.url && !project.repo && (
            <span className="text-[11px] text-white/25 italic">No external links available</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ProjectsExplorer ─────────────────────────────────────────────────────────

export default function ProjectsExplorer() {
  const [selected, setSelected] = useState<Project | null>(null)
  const featured = PROJECTS.filter((p) => p.featured)
  const standard = PROJECTS.filter((p) => !p.featured)

  if (selected) {
    return <DetailPanel project={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07] shrink-0">
        <div className="flex items-center gap-2">
          <Folder size={13} className="text-white/40" strokeWidth={1.8} />
          <span className="text-[12px] text-white/40 font-medium">~/projects</span>
        </div>
        <span className="text-[11px] text-white/25">{PROJECTS.length} items</span>
      </div>

      {/* NDA and lifecycle notice */}
      <div className="mx-4 mt-4 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={14} className="text-[#9fb6ff] mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9fb6ff]">
              Portfolio Disclosure
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-white/62">
              A number of client projects are delivered under confidentiality or internal-use agreements,
              so only approved public work is shown here. Several older marketing websites may also be
              offline today when clients pause operations or choose not to renew domain and hosting services.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4">
        <div className="space-y-5">
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <Sparkles size={13} className="text-[#9fb6ff]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Featured Projects
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {featured.map((p) => (
                <FolderItem
                  key={p.id}
                  project={p}
                  isSelected={false}
                  onClick={() => setSelected(p)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <Folder size={13} className="text-white/45" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Additional Public Projects
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {standard.map((p) => (
                <FolderItem
                  key={p.id}
                  project={p}
                  isSelected={false}
                  onClick={() => setSelected(p)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 px-5 py-2 border-t border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25 font-medium select-none">
          {PROJECTS.filter(p => p.status === 'Live').length} live ·{' '}
          {PROJECTS.filter(p => p.status === 'In Progress').length} in progress ·{' '}
          {PROJECTS.filter(p => p.status === 'Archived').length} archived
        </span>
      </div>
    </div>
  )
}
