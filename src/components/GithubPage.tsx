import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Code2,
  Github,
  GitPullRequest,
  Rocket,
  Star,
  GitCommit,
  GitBranch,
} from 'lucide-react'

const GITHUB_URL = 'https://github.com/binsey012'

const HIGHLIGHTS = [
  {
    title: 'Production-Focused Engineering',
    detail:
      'Clean architecture, practical automation, and developer-first workflows designed for reliability.',
    icon: Rocket,
    accent: '#6C8EFF',
  },
  {
    title: 'Full Stack + AI Integration',
    detail:
      'From UI systems to backend APIs, with AI-powered automations and prompt-driven productivity layers.',
    icon: Code2,
    accent: '#22d3ee',
  },
  {
    title: 'Open Collaboration Style',
    detail:
      'Clear commits, structured pull requests, and documentation habits that help teams move faster.',
    icon: GitPullRequest,
    accent: '#a78bfa',
  },
] as const

const FOCUS_AREAS = [
  { text: 'React + TypeScript interfaces', icon: Code2, accent: '#6C8EFF' },
  { text: 'Automation workflows (n8n / API)', icon: GitBranch, accent: '#22d3ee' },
  { text: 'WordPress and hosting operations', icon: Rocket, accent: '#34d399' },
  { text: 'Technical support engineering systems', icon: GitPullRequest, accent: '#a78bfa' },
  { text: 'Performance and maintainability first', icon: Star, accent: '#f5d06a' },
]

// Decorative contribution-grid squares
const COMMIT_GRID = Array.from({ length: 52 * 7 }, (_) => {
  const rand = Math.random()
  if (rand < 0.55) return 0
  if (rand < 0.75) return 1
  if (rand < 0.88) return 2
  if (rand < 0.95) return 3
  return 4
})

const LEVEL_COLORS = [
  'rgba(255,255,255,0.05)',
  '#6C8EFF44',
  '#6C8EFF88',
  '#6C8EFFCC',
  '#6C8EFF',
]

export default function GithubPage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-4xl space-y-5">

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 120% at 0% 100%, rgba(108,142,255,0.20) 0%, transparent 62%), radial-gradient(ellipse 85% 110% at 100% 0%, rgba(56,189,248,0.14) 0%, transparent 62%), rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #6C8EFF, #38bdf8, transparent)',
              opacity: 0.75,
            }}
          />
          <div className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]"
            >
              <BadgeCheck size={12} />
              Official GitHub Profile
            </motion.div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Build credibility. Verify the work.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              Explore my GitHub to review real repositories, project quality, coding style,
              and execution speed across full stack development and AI-enabled systems.
            </p>

            <motion.a
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 36px rgba(108,142,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C8EFF] to-[#22d3ee] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(108,142,255,0.35)]"
            >
              <Github size={15} />
              Visit github.com/binsey012
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.section>

        {/* Decorative contribution grid */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 overflow-hidden"
        >
          <div className="mb-3 flex items-center gap-2">
            <GitCommit size={13} className="text-[#9fb6ff]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              Contribution Activity
            </p>
          </div>
          <div
            className="flex gap-[3px] overflow-hidden"
            style={{ maxHeight: 80 }}
          >
            {Array.from({ length: 52 }).map((_, week) => (
              <div key={week} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, day) => {
                  const level = COMMIT_GRID[week * 7 + day] ?? 0
                  return (
                    <div
                      key={day}
                      className="h-[9px] w-[9px] rounded-[2px]"
                      style={{ background: LEVEL_COLORS[level] }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10.5px] text-white/30">Decorative — visit profile for live data</p>
        </motion.section>

        {/* Highlight cards */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {HIGHLIGHTS.map((item, i) => {
            const IconGlyph = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + i * 0.07 }}
                whileHover={{ y: -3, boxShadow: `0 12px 32px ${item.accent}22` }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-shadow duration-200"
              >
                <span
                  className="mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15"
                  style={{ background: `${item.accent}22`, color: item.accent }}
                >
                  <IconGlyph size={15} />
                </span>
                <p className="text-[13px] font-semibold text-white/88">{item.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">{item.detail}</p>
              </motion.article>
            )
          })}
        </motion.section>

        {/* Focus areas */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-[#9fb6ff]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              What You Will See in My GitHub
            </p>
          </div>

          <div className="space-y-2">
            {FOCUS_AREAS.map((area, i) => {
              const Ic = area.icon
              return (
                <motion.div
                  key={area.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 + i * 0.05 }}
                  className="flex items-center gap-2.5 text-[13.5px] text-white/72"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: `${area.accent}22`, color: area.accent }}>
                    <Ic size={11} />
                  </span>
                  {area.text}
                </motion.div>
              )
            })}
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <p className="text-[12px] text-white/60">
              Looking for a dependable collaborator who can lead, ship, and optimize? My repositories
              reflect how I think, build, and deliver under real-world constraints.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#9fb6ff] hover:text-[#bfd0ff]"
            >
              Open GitHub Profile
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.section>

        {/* URL card */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Profile URL
              </p>
              <p className="mt-1 text-[14px] font-medium text-white/85">https://github.com/binsey012</p>
            </div>
            <Star size={16} className="text-[#f5d06a]" />
          </div>
        </motion.section>
      </div>
    </div>
  )
}
