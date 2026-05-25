import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Code2,
  Github,
  GitPullRequest,
  Rocket,
  Star,
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
  'React + TypeScript interfaces',
  'Automation workflows (n8n / API)',
  'WordPress and hosting operations',
  'Technical support engineering systems',
  'Performance and maintainability first',
]

export default function GithubPage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-4xl space-y-5">
        <section
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 120% at 0% 100%, rgba(108,142,255,0.18) 0%, transparent 62%), radial-gradient(ellipse 85% 110% at 100% 0%, rgba(56,189,248,0.12) 0%, transparent 62%), rgba(255,255,255,0.04)',
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]">
              <BadgeCheck size={12} />
              Official GitHub Profile
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Build credibility. Verify the work.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              Explore my GitHub to review real repositories, project quality, coding style,
              and execution speed across full stack development and AI-enabled systems.
            </p>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C8EFF] to-[#22d3ee] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(108,142,255,0.35)] transition-transform duration-150 hover:scale-[1.02]"
            >
              <Github size={15} />
              Visit github.com/binsey012
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item) => {
            const IconGlyph = item.icon
            return (
              <article
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <span
                  className="mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15"
                  style={{ background: `${item.accent}22`, color: item.accent }}
                >
                  <IconGlyph size={15} />
                </span>
                <p className="text-[13px] font-semibold text-white/88">{item.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/65">{item.detail}</p>
              </article>
            )
          })}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-[#9fb6ff]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              What You Will See in My GitHub
            </p>
          </div>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-white/74 marker:text-[#9fb6ff]">
            {FOCUS_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <p className="text-[12px] text-white/65">
              Looking for a dependable collaborator who can lead, ship, and optimize? My repositories
              reflect how I think, build, and deliver under real-world constraints.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#9fb6ff] hover:text-[#bfd0ff]"
            >
              Open GitHub Profile
              <ArrowUpRight size={13} />
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Profile URL
              </p>
              <p className="mt-1 text-[14px] font-medium text-white/85">https://github.com/binsey012</p>
            </div>
            <Star size={16} className="text-[#f5d06a]" />
          </div>
        </section>
      </div>
    </div>
  )
}
