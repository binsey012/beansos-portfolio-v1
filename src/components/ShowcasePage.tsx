import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Brain, Briefcase, Gauge, Sparkles, Workflow } from 'lucide-react'

type RecruiterViewId = 'hiring-manager' | 'tech-lead' | 'client-focused'

const RECRUITER_VIEWS: Array<{ id: RecruiterViewId; label: string }> = [
  { id: 'hiring-manager', label: 'Hiring Manager' },
  { id: 'tech-lead', label: 'Tech Lead' },
  { id: 'client-focused', label: 'Client Focused' },
]

const RECRUITER_SUMMARIES: Record<RecruiterViewId, { headline: string; points: string[] }> = {
  'hiring-manager': {
    headline: 'Cross-functional operator who turns ambiguity into measurable execution.',
    points: [
      'Aligns AI delivery with business KPIs, SLA goals, and stakeholder expectations.',
      'Builds repeatable rollout playbooks to scale adoption across teams.',
      'Balances speed and governance with practical risk controls.',
    ],
  },
  'tech-lead': {
    headline: 'Implementation-oriented leader with strong systems, quality discipline, and coaching rigor.',
    points: [
      'Designs prompt architecture, guardrails, workflow orchestration, and fallback paths.',
      'Validates edge cases, confidence thresholds, and reliability before release.',
      'Runs coaching sessions with C-SMART and GROW methods to improve agent capability and delivery consistency.',
      'Uses iterative optimization loops based on KPI telemetry, QA signals, and coaching outcomes.',
    ],
  },
  'client-focused': {
    headline: 'Outcome-driven partner focused on clear communication and business value.',
    points: [
      'Translates technical strategy into clear milestones and delivery updates.',
      'Prioritizes high-impact automations that improve service quality and turnaround.',
      'Maintains NDA-safe reporting while proving real operational gains.',
    ],
  },
}

const CASE_PHASES = [
  {
    phase: '1. Discovery',
    action: 'Audited ticket categories, escalation patterns, and SLA friction points.',
    impact: 'Defined top 5 automation opportunities tied to response-time reduction.',
  },
  {
    phase: '2. Data and Design',
    action: 'Mapped support knowledge sources and built prompt templates per issue family.',
    impact: 'Created consistent answer playbooks for agents and self-service.',
  },
  {
    phase: '3. Build and Integration',
    action: 'Integrated AI-assisted reply drafting into support workflow and triage actions.',
    impact: 'Reduced manual drafting effort and improved first-response quality.',
  },
  {
    phase: '4. Validation and QA',
    action: 'Tested hallucination controls, confidence thresholds, and escalation triggers.',
    impact: 'Improved reliability with clear fallback paths for high-risk scenarios.',
  },
  {
    phase: '5. Rollout',
    action: 'Released in stages by queue type with SOP updates and micro-training.',
    impact: 'Accelerated adoption without disrupting live operations.',
  },
  {
    phase: '6. Optimization',
    action: 'Tracked KPIs weekly and tuned prompts, routing rules, and edge-case logic.',
    impact: 'Sustained improvements in SLA adherence and customer satisfaction.',
  },
] as const

const METRICS = [
  { label: 'Faster First Response', value: '30-45%' },
  { label: 'Agent Productivity Lift', value: '20-35%' },
  { label: 'Escalation Noise Reduction', value: '15-25%' },
  { label: 'Knowledge Reuse Consistency', value: 'High' },
] as const

export default function ShowcasePage() {
  const [recruiterView, setRecruiterView] = useState<RecruiterViewId>('hiring-manager')
  const activeSummary = RECRUITER_SUMMARIES[recruiterView]

  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-6xl space-y-5">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 100%, rgba(14,165,233,0.20) 0%, transparent 64%), radial-gradient(ellipse 90% 100% at 100% 0%, rgba(34,197,94,0.18) 0%, transparent 60%), rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #0ea5e9, #22c55e, transparent)',
              opacity: 0.75,
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fe4ff]">
              <Sparkles size={12} />
              Showcase Command Center
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              AI-enabled delivery, grounded in measurable outcomes.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              This window highlights how I translate strategy into execution across support,
              operations, and product-facing workflows using a practical AIDLC approach.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85">
              Recruiter View
            </h3>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/45">
              Audience Lens
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {RECRUITER_VIEWS.map((view) => {
              const isActive = recruiterView === view.id
              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setRecruiterView(view.id)}
                  className={[
                    'rounded-lg border px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-150',
                    isActive
                      ? 'border-[#9fe4ff]/50 bg-[#9fe4ff]/15 text-[#caf2ff]'
                      : 'border-white/15 bg-white/[0.03] text-white/65 hover:bg-white/[0.06] hover:text-white/82',
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  {view.label}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={recruiterView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 rounded-xl border border-[#9fe4ff]/30 bg-[#9fe4ff]/[0.07] p-3.5"
            >
              <p className="text-[12.5px] font-semibold text-[#cbf3ff]">{activeSummary.headline}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[12px] text-white/76 marker:text-[#9fe4ff]">
                {activeSummary.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.38 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {METRICS.map((item, i) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(159,228,255,0.18)' }}
              className="rounded-xl border border-white/10 bg-white/[0.035] p-3.5"
            >
              <p className="text-[18px] font-bold text-[#9fe4ff]">{item.value}</p>
              <p className="mt-1 text-[11.5px] text-white/70">{item.label}</p>
            </motion.article>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.38 }}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <Workflow size={15} className="text-[#a7f3d0]" />
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85">
              AIDLC in Practice — Support Automation Rollout
            </h3>
          </div>

          <div className="space-y-2.5">
            {CASE_PHASES.map((row, i) => (
              <motion.article
                key={row.phase}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.26 + i * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
              >
                <p className="text-[12px] font-semibold text-[#a7f3d0]">{row.phase}</p>
                <p className="mt-1 text-[12px] text-white/75">
                  <span className="font-semibold text-white/82">Action:</span> {row.action}
                </p>
                <p className="mt-1 text-[12px] text-white/75">
                  <span className="font-semibold text-white/82">Outcome:</span> {row.impact}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          <motion.article whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(250,204,21,0.1)' }} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#facc15]">
              <Briefcase size={14} />
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em]">Client Lifecycle</p>
            </div>
            <p className="text-[12.5px] text-white/70">
              Discovery to handover model for stakeholder alignment, delivery cadence, and post-launch optimization.
            </p>
          </motion.article>

          <motion.article whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(196,181,253,0.1)' }} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#c4b5fd]">
              <Brain size={14} />
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em]">AI + Automation Lab</p>
            </div>
            <p className="text-[12.5px] text-white/70">
              Prompt systems, guardrails, and orchestration patterns designed for operational reliability, not hype.
            </p>
          </motion.article>

          <motion.article whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(134,239,172,0.1)' }} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#86efac]">
              <Gauge size={14} />
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em]">Proof of Impact</p>
            </div>
            <p className="text-[12.5px] text-white/70">
              Performance narratives anchored in throughput, quality, and customer experience indicators.
            </p>
          </motion.article>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
        >
          <div className="mb-2 flex items-center gap-2 text-[#9fb6ff]">
            <BadgeCheck size={14} />
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em]">NDA-safe Portfolio Note</p>
          </div>
          <p className="text-[12.5px] text-white/70">
            Specific client names and sensitive implementation details are omitted. Shared examples represent
            real delivery patterns and outcomes framed for confidentiality-safe review.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
