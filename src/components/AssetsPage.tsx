import { ArrowUpRight, BookOpen, Layers3, Sparkles } from 'lucide-react'
import * as si from 'simple-icons'

type IconData = { title: string; path: string; hex: string }
const ICONS = si as unknown as Record<string, IconData | undefined>

interface AssetLink {
  name: string
  url: string
  logoKey?: string
  note: string
}

interface AssetGroup {
  title: string
  subtitle: string
  items: AssetLink[]
}

const STACK_GROUPS: AssetGroup[] = [
  {
    title: 'Domain, Hosting, and Email Infrastructure',
    subtitle: 'Operational backbone for production websites and client reliability.',
    items: [
      { name: 'Name.com', url: 'https://name.com', note: 'Domain procurement and management workflows.' },
      { name: 'Namecheap', url: 'https://namecheap.com', logoKey: 'siNamecheap', note: 'Domain and DNS operations used across client rollouts.' },
      { name: 'Private Email', url: 'https://privateemail.com/', note: 'Business email service provisioning and mailbox operations.' },
      { name: 'Titan Email', url: 'https://titan.email/', note: 'Professional inbox setup and branded communication stack.' },
      { name: 'cPanel Docs', url: 'https://docs.cpanel.net/cpanel/', logoKey: 'siCpanel', note: 'Reference standard for hosting administration and support.' },
    ],
  },
  {
    title: 'Development and Delivery Platforms',
    subtitle: 'Core engineering environments powering builds, shipping, and collaboration.',
    items: [
      { name: 'Vercel', url: 'https://vercel.com', logoKey: 'siVercel', note: 'Deployment pipeline for frontend and full-stack applications.' },
      { name: 'GitHub', url: 'https://github.com', logoKey: 'siGithub', note: 'Repository management, version control, and collaborative delivery.' },
      { name: 'Visual Studio Code', url: 'https://code.visualstudio.com', note: 'Primary IDE for implementation, debugging, and deployment workflows.' },
      { name: 'Convex', url: 'https://www.convex.dev/', logoKey: 'siConvex', note: 'Backend/data workflow experimentation for modern web apps.' },
    ],
  },
  {
    title: 'Identity, Data, and Product Services',
    subtitle: 'Trusted services used to accelerate secure and scalable product development.',
    items: [
      { name: 'Clerk', url: 'https://clerk.com/', logoKey: 'siClerk', note: 'Authentication and identity management integration.' },
      { name: 'Firebase', url: 'https://firebase.google.com/', logoKey: 'siFirebase', note: 'Rapid application services, auth, and realtime capabilities.' },
      { name: 'Supabase', url: 'https://supabase.com/', logoKey: 'siSupabase', note: 'Postgres-native backend workflows and developer tooling.' },
    ],
  },
  {
    title: 'AI, Automation, and Productivity Partners',
    subtitle: 'Tooling that supports AI workflow design, prompt systems, and automation delivery.',
    items: [
      { name: 'Anthropic Skilljar', url: 'https://anthropic.skilljar.com/', logoKey: 'siAnthropic', note: 'Applied Claude learning and implementation pathways.' },
      { name: 'OpenClaw AI', url: 'https://openclaw.ai/', note: 'AI-focused experimentation and solution research.' },
      { name: 'n8n', url: 'https://n8n.io/', logoKey: 'siN8n', note: 'Automation orchestration for repetitive technical operations.' },
    ],
  },
  {
    title: 'Community and Knowledge Channels',
    subtitle: 'Open knowledge ecosystems used for continuous technical growth and troubleshooting.',
    items: [
      { name: 'Reddit', url: 'https://www.reddit.com/', logoKey: 'siReddit', note: 'Community-led discovery for emerging tooling and practices.' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com/', logoKey: 'siStackoverflow', note: 'Engineering problem-solving and implementation references.' },
    ],
  },
]

const COURSES: AssetLink[] = [
  {
    name: 'Hugging Face Agents Course',
    url: 'https://huggingface.co/learn/agents-course/en/unit0/introduction',
    logoKey: 'siHuggingface',
    note: 'Agentic AI foundations, tooling, and practical implementation patterns.',
  },
  {
    name: 'Claude Code 101',
    url: 'https://anthropic.skilljar.com/claude-code-101',
    logoKey: 'siAnthropic',
    note: 'Hands-on Claude usage patterns for developer workflows.',
  },
  {
    name: 'Simplilearn SkillUp',
    url: 'https://www.simplilearn.com/skillup-free-online-courses',
    note: 'Free upskilling tracks across cloud, software, and digital competencies.',
  },
  {
    name: 'cPanel Documentation Learning Path',
    url: 'https://docs.cpanel.net/cpanel/',
    logoKey: 'siCpanel',
    note: 'Operational reference for hosting administration and troubleshooting.',
  },
  {
    name: 'Skool Learning Communities',
    url: 'https://www.skool.com/',
    note: 'Peer-led cohorts and creator-driven technical learning ecosystems.',
  },
]

const OPEN_SOURCE_AI_FEED: AssetLink[] = [
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog',
    logoKey: 'siHuggingface',
    note: 'Model releases, evaluation patterns, and practical LLM implementation write-ups.',
  },
  {
    name: 'vLLM Blog',
    url: 'https://blog.vllm.ai/',
    note: 'High-performance LLM inference engineering, serving patterns, and scalability insights.',
  },
  {
    name: 'LangChain Blog',
    url: 'https://blog.langchain.com/',
    note: 'Agent architecture ideas, tooling updates, and real-world AI app patterns.',
  },
  {
    name: 'Ollama Blog',
    url: 'https://ollama.com/blog',
    note: 'Local LLM deployment workflows and model runtime updates for applied learning.',
  },
  {
    name: 'Llama.cpp Discussions',
    url: 'https://github.com/ggerganov/llama.cpp/discussions',
    logoKey: 'siGithub',
    note: 'Active community problem-solving around efficient open-weight model execution.',
  },
  {
    name: 'n8n Blog (AI + Automation)',
    url: 'https://blog.n8n.io/',
    logoKey: 'siN8n',
    note: 'Automation-first AI workflows for practical business and ops deployments.',
  },
]

function initials(name: string) {
  const cleaned = name.replace(/[^a-zA-Z0-9 ]/g, '')
  const parts = cleaned.split(' ').filter(Boolean)
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || name.slice(0, 2).toUpperCase()
}

function BrandBadge({ name, logoKey }: { name: string; logoKey?: string }) {
  const icon = logoKey ? ICONS[logoKey] : undefined

  if (!icon) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.07] text-[10px] font-bold text-white/70">
        {initials(name)}
      </span>
    )
  }

  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15"
      style={{ background: `${icon.hex}22`, color: `#${icon.hex}` }}
      aria-label={icon.title}
      title={icon.title}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d={icon.path} />
      </svg>
    </span>
  )
}

function LinkRow({ item }: { item: AssetLink }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors duration-150 hover:bg-white/[0.07]"
    >
      <BrandBadge name={item.name} logoKey={item.logoKey} />
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-semibold text-white/88 truncate">{item.name}</p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/60">{item.note}</p>
      </div>
      <ArrowUpRight size={13} className="mt-0.5 shrink-0 text-white/35 group-hover:text-white/70" />
    </a>
  )
}

export default function AssetsPage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-6xl space-y-5">
        <section
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 90% 120% at 0% 100%, rgba(108,142,255,0.20) 0%, transparent 62%), radial-gradient(ellipse 90% 110% at 100% 0%, rgba(34,211,238,0.14) 0%, transparent 62%), rgba(255,255,255,0.04)',
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]">
              <Sparkles size={12} />
              Trusted Stack Assets
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Vouched platforms, delivery tools, and learning engines.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              This library reflects the official platforms and ecosystems consistently used across
              projects over the years, classified by operational role for clarity and credibility.
            </p>
          </div>
        </section>

        {STACK_GROUPS.map((group) => (
          <section key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
            <div className="mb-3">
              <p className="text-[13px] font-semibold text-white/88">{group.title}</p>
              <p className="mt-0.5 text-[11.5px] text-white/52">{group.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
              {group.items.map((item) => (
                <LinkRow key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen size={14} className="text-[#9fb6ff]" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/52">
              Courses and Learning Tracks
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            {COURSES.map((course) => (
              <LinkRow key={course.name} item={course} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Layers3 size={14} className="text-[#9fb6ff]" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/52">
              Open Source AI/LLM Learning Feed (2026-ready)
            </p>
          </div>
          <p className="mb-3 text-[12px] text-white/58">
            Curated sources for staying current on practical LLM engineering, open-weight model
            deployment, inference optimization, and agent workflow architecture.
          </p>
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            {OPEN_SOURCE_AI_FEED.map((post) => (
              <LinkRow key={post.name} item={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
