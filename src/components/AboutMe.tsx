import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Code2, Brain, Rocket, MapPin, Calendar } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const BADGES = [
  { label: 'Team Lead', icon: Briefcase, color: '#6C8EFF' },
  { label: 'Full Stack Dev', icon: Code2, color: '#22d3ee' },
  { label: 'AI Integration', icon: Brain, color: '#a78bfa' },
  { label: 'WordPress Expert', icon: Rocket, color: '#34d399' },
]

const EXPERIENCE = [
  {
    role: 'Technical Support Team Lead',
    company: 'SupportNinja Inc.',
    period: 'Mar 2022 – Present',
    accent: '#6C8EFF',
    bullets: [
      'Led AI adoption integrating Generative AI and Prompt Engineering into support operations.',
      'Built automation workflows using n8n and AI-powered tools to reduce manual tasks.',
      'Supported troubleshooting involving APIs, web apps, hosting, and custom deployments.',
      'Partnered cross-functionally to implement AI-integrated technical solutions.',
    ],
  },
  {
    role: 'Freelance Full Stack Web Developer',
    company: 'Self-Employed',
    period: '2020 – Present',
    accent: '#22d3ee',
    bullets: [
      'Design, develop, and deploy responsive websites for clients across industries.',
      'Build custom sites using HTML, CSS, JavaScript, WordPress, and modern web tech.',
      'Manage hosting, DNS, SSL setup, and website migrations.',
      'Optimize websites for SEO, performance, and user experience.',
      'Implement AI-powered tools and automation for business workflows.',
    ],
  },
]

export default function AboutMe() {
  const [imageSrc, setImageSrc] = useState('/prof-pic.webp')

  return (
    <div className="h-full overflow-y-auto p-5 sm:p-7">
      <div className="mx-auto w-full max-w-4xl space-y-5">

        {/* ── Hero card ── */}
        <motion.section
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-2xl border border-white/10 p-5 sm:p-6"
          style={{
            background:
              'radial-gradient(ellipse 100% 140% at 0% 110%, rgba(108,142,255,0.22) 0%, transparent 58%), radial-gradient(ellipse 80% 100% at 100% 0%, rgba(167,139,250,0.18) 0%, transparent 56%), rgba(255,255,255,0.04)',
          }}
        >
          {/* animated top-border glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #6C8EFF, #a78bfa, transparent)',
              opacity: 0.7,
            }}
          />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {/* Profile photo */}
            <div className="relative mx-auto shrink-0 sm:mx-0">
              <div
                className="absolute -inset-1 rounded-2xl opacity-60 blur-md"
                style={{ background: 'linear-gradient(135deg, #6C8EFF, #a78bfa)' }}
              />
              <motion.img
                src={imageSrc}
                alt="Professional portrait"
                onError={() => setImageSrc('/favicon.svg')}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[148px] w-[148px] rounded-2xl object-cover ring-1 ring-white/20"
              />
              {/* online indicator */}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0d0d1a] bg-emerald-400">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-300 opacity-75" />
              </span>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <MapPin size={11} className="text-white/40" />
                <span className="text-[11px] text-white/40">Philippines</span>
                <span className="text-white/20">·</span>
                <span className="text-[11px] font-semibold text-emerald-400">Open to opportunities</span>
              </div>

              <h2 className="text-[19px] font-bold leading-snug text-white sm:text-[21px]">
                Technical Support Team Lead <span className="text-white/40">/</span> Full Stack Dev <span className="text-white/40">/</span> AI Integration Specialist
              </h2>

              <div className="flex flex-wrap gap-2 pt-1">
                {BADGES.map((b, i) => {
                  const Ic = b.icon
                  return (
                    <motion.span
                      key={b.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.3 }}
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        borderColor: `${b.color}44`,
                        background: `${b.color}15`,
                        color: b.color,
                      }}
                    >
                      <Ic size={10} />
                      {b.label}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Professional Summary ── */}
        <motion.section {...fadeUp(0.08)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fb6ff]">
            Professional Summary
          </p>
          <div className="space-y-3 text-[13.5px] leading-relaxed text-white/72">
            <p>
              Results-driven Technical Support Team Lead and Freelance Full Stack Web Developer
              with 8+ years of experience in technical support, customer operations, web hosting,
              web development, and AI-driven workflow automation. Strong expertise in WordPress
              development, domain/DNS management, SSL implementation, and full stack web technologies.
            </p>
            <p>
              Proven success leading technical support teams, optimizing SLAs, and implementing
              scalable solutions using Prompt Engineering, Generative AI, workflow automation (n8n),
              and modern development tools. Passionate about building intelligent systems that improve
              operational efficiency and accelerate digital transformation.
            </p>
          </div>
        </motion.section>

        {/* ── Experience timeline ── */}
        <motion.section {...fadeUp(0.14)} className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fb6ff]">
            Experience
          </p>

          {EXPERIENCE.map((exp, idx) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 + idx * 0.1, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
              style={{
                boxShadow: `inset 3px 0 0 ${exp.accent}55`,
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[14px] font-semibold text-white/90">{exp.role}</p>
                  <p className="mt-0.5 text-[12px] text-white/55">{exp.company}</p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium"
                  style={{ borderColor: `${exp.accent}44`, background: `${exp.accent}12`, color: exp.accent }}
                >
                  <Calendar size={9} />
                  {exp.period}
                </span>
              </div>

              <ul className="mt-3 space-y-1.5 pl-4 text-[13px] leading-relaxed text-white/68">
                {exp.bullets.map((b) => (
                  <li key={b} className="relative before:absolute before:-left-3 before:top-[7px] before:h-1 before:w-1 before:rounded-full" style={{ '--tw-before-bg': exp.accent } as React.CSSProperties}>
                    <span
                      className="absolute -left-3.5 top-[7px] h-1.5 w-1.5 rounded-full"
                      style={{ background: exp.accent, opacity: 0.7 }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.section>
      </div>
    </div>
  )
}
