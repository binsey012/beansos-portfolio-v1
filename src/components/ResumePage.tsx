import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, FileText, Linkedin, Rocket, ExternalLink, Star, Award } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/vince-eleazar-domingo-ccp-24ba78115'

const HIGHLIGHTS = [
  { label: '8+ Years Experience', icon: Star, color: '#f5d06a' },
  { label: 'Full Stack Dev', icon: FileText, color: '#6C8EFF' },
  { label: 'AI Integration', icon: Award, color: '#a78bfa' },
  { label: 'Team Lead', icon: Rocket, color: '#22d3ee' },
]

const RESUME_SECTIONS = [
  {
    title: 'Current Role',
    body: 'Technical Support Team Lead — SupportNinja Inc. (Mar 2022 – Present)',
    accent: '#6C8EFF',
  },
  {
    title: 'Freelance',
    body: 'Full Stack Web Developer — Self-Employed (2020 – Present)',
    accent: '#22d3ee',
  },
  {
    title: 'Specializations',
    body: 'AI Integration, Prompt Engineering, WordPress, Web Hosting, n8n Automation',
    accent: '#a78bfa',
  },
  {
    title: 'Certifications',
    body: 'Microsoft & LinkedIn Career Essentials in Generative AI (2025) + more on LinkedIn',
    accent: '#34d399',
  },
]

export default function ResumePage() {
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
              'radial-gradient(ellipse 95% 120% at 0% 100%, rgba(10,102,194,0.22) 0%, transparent 62%), radial-gradient(ellipse 90% 110% at 100% 0%, rgba(108,142,255,0.18) 0%, transparent 60%), rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #0A66C2, #6C8EFF, transparent)',
              opacity: 0.8,
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
              Professional Resume Access
            </motion.div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              View my full professional profile on LinkedIn.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              For the latest experience timeline, certifications, achievements, and recommendations,
              use the direct profile link below.
            </p>

            {/* Highlight badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {HIGHLIGHTS.map((h, i) => {
                const Ic = h.icon
                return (
                  <motion.span
                    key={h.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                    style={{ borderColor: `${h.color}44`, background: `${h.color}12`, color: h.color }}
                  >
                    <Ic size={10} />
                    {h.label}
                  </motion.span>
                )
              })}
            </div>

            <motion.a
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 36px rgba(10,102,194,0.5)' }}
              whileTap={{ scale: 0.97 }}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#6C8EFF] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(10,102,194,0.35)]"
            >
              <Linkedin size={15} />
              Open LinkedIn Resume
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.section>

        {/* Resume snapshot cards */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {RESUME_SECTIONS.map((sec, i) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + i * 0.07 }}
              whileHover={{ y: -2, boxShadow: `0 8px 28px ${sec.accent}20` }}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-shadow duration-200"
              style={{ boxShadow: `inset 2px 0 0 ${sec.accent}44` }}
            >
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/40">{sec.title}</p>
              <p className="mt-1.5 text-[13px] font-medium leading-snug text-white/80">{sec.body}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* URL card */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.38 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-[#9fb6ff]">
              <FileText size={16} />
            </span>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/42">
                Direct Profile URL
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-[13.5px] font-medium text-[#bfd0ff] hover:text-white transition-colors"
              >
                {LINKEDIN_URL}
              </a>
              <p className="mt-2 text-[12px] text-white/55">
                Primary source for my most current resume-level professional details.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 text-white/78">
            <Rocket size={14} className="text-[#9fb6ff]" />
            <p className="text-[12.5px] font-semibold">Ready for your next role or project inquiry.</p>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#6C8EFF]/40 bg-[#6C8EFF]/15 px-3 py-1.5 text-[11.5px] font-semibold text-[#9fb6ff] hover:bg-[#6C8EFF]/25 transition-colors"
          >
            <ExternalLink size={12} />
            View Profile
          </a>
        </motion.section>
      </div>
    </div>
  )
}
