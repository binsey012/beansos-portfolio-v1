import { ArrowUpRight, Award, Briefcase, Cog, Cpu, ShieldCheck, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: LucideIcon
  accent: string
  items: string[]
}

interface CertGroup {
  title: string
  subtitle: string
  priority: 'Highest Impact' | 'Priority' | 'Recommended'
  items: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Leadership and Management Skills',
    icon: Users,
    accent: '#6C8EFF',
    items: [
      'Team Leadership',
      'People Management',
      'Coaching and Mentoring',
      'Performance Management',
      'Stakeholder Management',
      'Cross-Functional Collaboration',
      'Escalation Management',
      'Strategic Problem Solving',
      'Decision Making',
      'Change Management',
    ],
  },
  {
    title: 'Technical Support and Operations Skills',
    icon: Cog,
    accent: '#22d3ee',
    items: [
      'Technical Troubleshooting',
      'Customer Experience (CX)',
      'Service Delivery',
      'Incident Management',
      'Root Cause Analysis (RCA)',
      'SLA / KPI Management',
      'Quality Assurance (QA)',
      'Process Improvement',
      'SOP Development',
      'Knowledge Base Management',
    ],
  },
  {
    title: 'Web and Infrastructure Skills',
    icon: ShieldCheck,
    accent: '#34d399',
    items: [
      'WordPress Administration',
      'Web Hosting Support',
      'Domain and DNS Management',
      'SSL/TLS Configuration',
      'cPanel / WHM',
      'Linux Fundamentals',
      'Website Migration',
      'Email Configuration',
      'Cloudflare CDN',
      'Website Security',
    ],
  },
  {
    title: 'AI and Development Skills',
    icon: Cpu,
    accent: '#a78bfa',
    items: [
      'Prompt Engineering',
      'AI Integration',
      'Workflow Automation',
      'API Integration',
      'Full Stack Web Development',
      'Frontend Development',
      'Backend Development',
      'Version Control (Git/GitHub)',
      'Debugging',
      'SEO Optimization',
    ],
  },
]

const CERTIFICATIONS: CertGroup[] = [
  {
    title: 'AI and Modern Tech',
    subtitle: 'Put strongest and newest front-and-center for immediate market impact.',
    priority: 'Highest Impact',
    items: [
      'Microsoft and LinkedIn — Career Essentials in Generative AI (2025)',
      'Microsoft Copilot and Business Chat',
      'Google Gemini Productivity',
      'Prompt Engineering Certification (if available)',
    ],
  },
  {
    title: 'Recommended Next — AI and Modern Tech',
    subtitle: 'High-ROI additions for practical AI implementation credibility.',
    priority: 'Priority',
    items: [
      'DeepLearning.AI Prompt Engineering for Developers',
      'Google AI Essentials',
    ],
  },
  {
    title: 'Technical and Infrastructure',
    subtitle: 'Supports technical operations authority in Team Lead and Solutions roles.',
    priority: 'Priority',
    items: [
      'cPanel Professional Certification',
      'The Linux Foundation Cybersecurity Essentials',
      'DNS / Networking Fundamentals (if completed)',
    ],
  },
  {
    title: 'Recommended Next — Infrastructure',
    subtitle: 'Strong support stack upgrades for platform-level confidence.',
    priority: 'Recommended',
    items: ['Cloudflare Learning Center', 'CompTIA Network+'],
  },
  {
    title: 'Support and Service Management',
    subtitle: 'Excellent credentials for Team Lead and quality-centered support tracks.',
    priority: 'Priority',
    items: ['ITIL 4 Foundation', 'COPC Certification', 'Zendesk Support Administrator'],
  },
  {
    title: 'Web Development and Cloud',
    subtitle: 'Recommended portfolio credibility boosters for modern product teams.',
    priority: 'Recommended',
    items: ['Meta Front-End Developer Certificate', 'AWS Cloud Practitioner', 'Vercel Academy'],
  },
]

const AIDLC_PHASES = [
  {
    phase: '1. Discovery and Problem Framing',
    focus: 'Define business goals, constraints, risk tolerance, and success metrics before model work begins.',
  },
  {
    phase: '2. Data and Workflow Design',
    focus: 'Map data sources, prompt strategy, automation paths, and integration touchpoints across systems.',
  },
  {
    phase: '3. Build and Integration',
    focus: 'Implement prompts, API orchestration, guardrails, and UI/workflow integration for production use.',
  },
  {
    phase: '4. Validation and QA',
    focus: 'Test response quality, failure modes, security concerns, and edge-case behavior with measurable checks.',
  },
  {
    phase: '5. Deployment and Adoption',
    focus: 'Roll out in controlled phases with enablement, SOP alignment, and stakeholder communication.',
  },
  {
    phase: '6. Monitoring and Optimization',
    focus: 'Track performance, drift, and business impact; refine prompts and automations continuously.',
  },
] as const

function priorityStyle(priority: CertGroup['priority']) {
  if (priority === 'Highest Impact') return 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10'
  if (priority === 'Priority') return 'text-[#9fb6ff] border-[#6C8EFF]/35 bg-[#6C8EFF]/12'
  return 'text-white/70 border-white/20 bg-white/[0.06]'
}

export default function SkillsPage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-6xl space-y-5">
        <section
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 100%, rgba(108,142,255,0.20) 0%, transparent 64%), radial-gradient(ellipse 90% 100% at 100% 0%, rgba(168,85,247,0.16) 0%, transparent 60%), rgba(255,255,255,0.04)',
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]">
              <Briefcase size={12} />
              Skills Matrix and Certification Strategy
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Built for leadership impact and technical execution.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              This skills architecture is structured for Team Lead, Solutions, and modern
              cross-functional technical roles. It highlights operational leadership, infrastructure
              depth, and AI-enabled delivery capabilities.
            </p>

            <a
              href="https://www.linkedin.com/in/vince-eleazar-domingo-ccp-24ba78115/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#9fb6ff] hover:text-[#bfd0ff]"
            >
              For additional skills, view LinkedIn profile
              <ArrowUpRight size={13} />
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {SKILL_CATEGORIES.map((group) => {
            const Icon = group.icon
            return (
              <article
                key={group.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15"
                    style={{ background: `${group.accent}22`, color: group.accent }}
                  >
                    <Icon size={15} />
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/12 bg-white/[0.045] px-2.5 py-1 text-[11.5px] font-medium text-white/75"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <Cpu size={15} className="text-[#c7a6ff]" />
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85">
              AIDLC — AI Development Lifecycle
            </h3>
          </div>

          <p className="mb-3 text-[12.5px] leading-relaxed text-white/62">
            Delivery framework used to move AI initiatives from concept to measurable production outcomes.
            This lifecycle keeps AI adoption practical, governed, and aligned with business KPIs.
          </p>

          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            {AIDLC_PHASES.map((step) => (
              <article
                key={step.phase}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
              >
                <p className="text-[12px] font-semibold text-[#c7a6ff]">{step.phase}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/68">{step.focus}</p>
              </article>
            ))}
          </div>

          <article className="mt-3 rounded-xl border border-[#86efac]/30 bg-[#86efac]/[0.08] p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b8f7da]">
              AIDLC in Practice
            </p>
            <p className="mt-1 text-[12px] font-semibold text-white/88">
              Mini Case: Support Automation Rollout (Phase 1 to 6)
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/72">
              Framed the support bottlenecks, designed prompt and workflow pathways, deployed staged
              AI-assisted triage, and continuously optimized through QA and KPI monitoring. Result:
              faster response cycles, more consistent outputs, and stronger SLA performance.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <Award size={15} className="text-[#9fb6ff]" />
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85">
              Certifications to Add and Prioritize
            </h3>
          </div>

          <div className="space-y-3.5">
            {CERTIFICATIONS.map((group) => (
              <article
                key={group.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-[12.5px] font-semibold text-white/88">{group.title}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${priorityStyle(group.priority)}`}>
                    {group.priority}
                  </span>
                </div>
                <p className="mb-2 text-[11.5px] text-white/55">{group.subtitle}</p>

                <ul className="list-disc space-y-1.5 pl-5 text-[12.5px] text-white/72 marker:text-[#9fb6ff]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
