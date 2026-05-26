import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send, PhoneCall, Rocket, Sparkles, ArrowUpRight } from 'lucide-react'

const CONTACT_CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    value: 'domingo14vincemb@gmail.com',
    href: 'mailto:domingo14vincemb@gmail.com',
    icon: Mail,
    accent: '#6C8EFF',
    desc: 'Best for formal inquiries and project briefs.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '(+63) 916-761-0830',
    href: 'https://wa.me/639167610830',
    icon: MessageCircle,
    accent: '#22c55e',
    desc: 'Quick questions and real-time chat.',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '(+63) 916-761-0830',
    href: 'https://t.me/+639167610830',
    icon: Send,
    accent: '#38bdf8',
    desc: 'Async messages and file sharing.',
  },
  {
    id: 'viber',
    label: 'Viber',
    value: '(+63) 916-731-0830',
    href: 'viber://chat?number=%2B639167310830',
    icon: PhoneCall,
    accent: '#a78bfa',
    desc: 'Voice or text on Viber.',
  },
] as const

const WHY_ME = [
  'Technical support leadership with SLA ownership and operational impact.',
  'Full-stack delivery from concept to deployment with clean developer workflows.',
  'AI-driven automation and prompt systems that reduce manual overhead.',
  'Strong hosting and WordPress expertise for reliable production websites.',
]

export default function ContactPage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-4xl space-y-5">

        {/* ── Hero CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 120% at 0% 100%, rgba(108,142,255,0.22) 0%, transparent 60%), radial-gradient(ellipse 85% 100% at 100% 0%, rgba(168,85,247,0.18) 0%, transparent 58%), rgba(255,255,255,0.04)',
          }}
        >
          {/* animated glow line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #6C8EFF, #a78bfa, transparent)',
              opacity: 0.75,
            }}
          />

          <div className="relative z-10 max-w-2xl">
            {/* status pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <Sparkles size={11} />
              Open for Freelance and Leadership Roles
            </motion.div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Let&apos;s build something exceptional together.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              Need a reliable Technical Support Lead, Full Stack Web Developer, or AI integration
              partner who can execute fast and ship clean? I help teams turn ideas into scalable,
              business-ready systems.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href="mailto:domingo14vincemb@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C8EFF] to-[#8f7dff] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_28px_rgba(108,142,255,0.45)]"
              >
                <Rocket size={14} />
                Hire Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/639167610830"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-[13px] font-semibold text-white/90 hover:bg-white/[0.12]"
              >
                Quick Chat on WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* ── Contact channels ── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Direct Contact Channels
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACT_CHANNELS.map((item, i) => {
              const IconGlyph = item.icon
              return (
                <motion.a
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.38 }}
                  whileHover={{ scale: 1.015, y: -2, boxShadow: `0 8px 32px ${item.accent}20` }}
                  href={item.href}
                  target={item.href.startsWith('mailto:') || item.href.startsWith('viber://') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') || item.href.startsWith('viber://') ? undefined : 'noreferrer'}
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-150 hover:bg-white/[0.08]"
                >
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15"
                    style={{ background: `${item.accent}22`, color: item.accent }}
                  >
                    <IconGlyph size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[13.5px] font-medium text-white/88">{item.value}</p>
                    <p className="mt-0.5 text-[11.5px] text-white/48">{item.desc}</p>
                  </div>
                  <ArrowUpRight size={13} className="mt-0.5 shrink-0 text-white/25 transition-colors group-hover:text-white/60" />
                </motion.a>
              )
            })}
          </div>
        </motion.section>

        {/* ── Why teams hire me ── */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Why Teams Hire Me
          </p>
          <ul className="space-y-2.5">
            {WHY_ME.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/72"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9fb6ff]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  )
}
