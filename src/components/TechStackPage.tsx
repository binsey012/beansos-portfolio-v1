import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Briefcase,
  Cloud,
  Code2,
  Database,
  Gauge,
  LifeBuoy,
  Network,
  ServerCog,
  Sparkles,
  Wrench,
} from 'lucide-react'

type TrackMode = 'support' | 'developer' | 'both'

interface StackCategory {
  title: string
  icon: LucideIcon
  accent: string
  items: string[]
}

const SUPPORT_STACK: StackCategory[] = [
  {
    title: 'Leadership and Support Platforms',
    icon: LifeBuoy,
    accent: '#60a5fa',
    items: [
      'Zendesk',
      'Jira',
      'Confluence',
      'Slack',
      'Microsoft Teams',
      'Google Workspace',
      'Microsoft 365',
    ],
  },
  {
    title: 'AI / Automation / Productivity',
    icon: Bot,
    accent: '#a78bfa',
    items: [
      'ChatGPT',
      'GitHub Copilot',
      'Google Gemini',
      'Claude',
      'Prompt Engineering',
      'AI Workflow Design',
      'n8n Automation',
      'Zapier',
      'API Automation',
      'LLM Integration',
    ],
  },
  {
    title: 'Technical Operations',
    icon: Briefcase,
    accent: '#22d3ee',
    items: [
      'Incident Management',
      'Root Cause Analysis',
      'SLA / KPI Management',
      'QA Coaching',
      'Knowledge Base Management',
      'SOP Documentation',
      'Change Management',
    ],
  },
  {
    title: 'Hosting / Infrastructure',
    icon: ServerCog,
    accent: '#34d399',
    items: [
      'cPanel / WHM',
      'DNS Management',
      'SSL/TLS',
      'Linux CLI',
      'FTP/SFTP',
      'Email Hosting',
      'CDN',
      'Cloudflare',
    ],
  },
]

const DEV_STACK: StackCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    accent: '#60a5fa',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'Responsive Design',
      'Tailwind CSS',
      'Bootstrap',
      'React.js',
      'Next.js',
    ],
  },
  {
    title: 'Backend',
    icon: Network,
    accent: '#22d3ee',
    items: [
      'Node.js',
      'Express.js',
      'PHP',
      'REST APIs',
      'JSON',
      'Authentication / OAuth',
      'API Integration',
    ],
  },
  {
    title: 'CMS / Website Builders',
    icon: Wrench,
    accent: '#a78bfa',
    items: ['WordPress', 'Elementor', 'WooCommerce', 'Wix', 'Shopify'],
  },
  {
    title: 'Database',
    icon: Database,
    accent: '#34d399',
    items: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Firebase',
      'Supabase',
      'Clerk.com',
      'Convex Dev',
    ],
  },
  {
    title: 'Dev Tools',
    icon: Wrench,
    accent: '#f59e0b',
    items: ['Visual Studio Code', 'GitHub', 'Git', 'Postman', 'Docker', 'npm', 'CLI'],
  },
  {
    title: 'Cloud / Deployment',
    icon: Cloud,
    accent: '#38bdf8',
    items: [
      'Vercel',
      'Netlify',
      'Shared Hosting',
      'VPS Hosting',
      'Domain Management',
      'SSL Deployment',
    ],
  },
  {
    title: 'SEO / Performance',
    icon: Gauge,
    accent: '#f472b6',
    items: [
      'Technical SEO',
      'On-page SEO',
      'Core Web Vitals',
      'Google Search Console',
      'Google Analytics',
    ],
  },
]

function StackPanel({
  title,
  subtitle,
  stacks,
  animKey,
}: {
  title: string
  subtitle: string
  stacks: StackCategory[]
  animKey: string
}) {
  return (
    <motion.section
      key={animKey}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
    >
      <div className="mb-4">
        <h3 className="text-[14.5px] font-semibold text-white/90">{title}</h3>
        <p className="mt-1 text-[12px] text-white/48">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {stacks.map((group, gi) => {
          const Icon = group.icon
          return (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: gi * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15"
                  style={{ background: `${group.accent}22`, color: group.accent }}
                >
                  <Icon size={14} />
                </span>
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/65">
                  {group.title}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{
                      scale: 1.06,
                      boxShadow: `0 0 10px ${group.accent}44`,
                      borderColor: `${group.accent}66`,
                      color: '#fff',
                    }}
                    className="cursor-default rounded-lg border border-white/12 bg-white/[0.045] px-2 py-1 text-[11.5px] font-medium text-white/72 transition-colors duration-100"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>
    </motion.section>
  )
}

export default function TechStackPage() {
  const [mode, setMode] = useState<TrackMode>('both')

  const supportTotal = useMemo(
    () => SUPPORT_STACK.reduce((sum, section) => sum + section.items.length, 0),
    [],
  )
  const devTotal = useMemo(
    () => DEV_STACK.reduce((sum, section) => sum + section.items.length, 0),
    [],
  )

  const TABS: { id: TrackMode; label: string; color: string }[] = [
    { id: 'support', label: 'AI Ops + Support Lead', color: '#6C8EFF' },
    { id: 'developer', label: 'Full Stack Developer', color: '#22d3ee' },
    { id: 'both', label: 'Compare Both', color: '#ffffff' },
  ]

  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6"
          style={{
            background:
              'radial-gradient(ellipse 95% 110% at 0% 100%, rgba(108,142,255,0.18) 0%, transparent 62%), radial-gradient(ellipse 90% 100% at 100% 0%, rgba(34,211,238,0.15) 0%, transparent 60%), rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #6C8EFF, #22d3ee, transparent)',
              opacity: 0.75,
            }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9fb6ff]">
              <Sparkles size={12} />
              Dual-Track Capability Matrix
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Two power stacks. One operator.
            </h2>

            <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              A split-stack profile designed for hybrid roles: technical support leadership,
              AI operations, and full-stack development. Switch views or compare both side by side.
            </p>

            {/* Animated tab buttons */}
            <div className="mt-5 flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setMode(tab.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative rounded-xl px-3.5 py-2 text-[12px] font-semibold transition-colors duration-150"
                  style={
                    mode === tab.id
                      ? { background: `${tab.color}22`, color: tab.color, borderColor: `${tab.color}55`, border: '1px solid' }
                      : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }
                  }
                >
                  {mode === tab.id && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: `${tab.color}18`, boxShadow: `0 0 16px ${tab.color}30` }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60">
                AI Ops Stack: {supportTotal} capabilities
              </span>
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60">
                Dev Stack: {devTotal} capabilities
              </span>
            </div>
          </div>
        </motion.section>

        {/* Panels with AnimatePresence */}
        <AnimatePresence mode="wait">
          {mode === 'both' ? (
            <motion.div
              key="both"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-4 xl:grid-cols-2"
            >
              <StackPanel
                animKey="support-panel"
                title="Tech Stack — AI Ops + Support Lead"
                subtitle="Optimized for Team Lead, Support Manager, Solutions Engineer roles"
                stacks={SUPPORT_STACK}
              />
              <StackPanel
                animKey="dev-panel"
                title="Tech Stack — Full Stack Web Developer"
                subtitle="Optimized for Web Dev, Solutions, and Freelance roles"
                stacks={DEV_STACK}
              />
            </motion.div>
          ) : mode === 'support' ? (
            <StackPanel
              key="support-only"
              animKey="support-only"
              title="Tech Stack — Technical Support Team Lead / AI Operations"
              subtitle="Optimized for Team Lead, Support Manager, Solutions Engineer roles"
              stacks={SUPPORT_STACK}
            />
          ) : (
            <StackPanel
              key="dev-only"
              animKey="dev-only"
              title="Tech Stack — Full Stack Web Developer"
              subtitle="Optimized for Web Dev, Solutions, and Freelance roles"
              stacks={DEV_STACK}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
