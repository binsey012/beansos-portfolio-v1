import { Mail, MessageCircle, Send, PhoneCall, Rocket, Sparkles } from 'lucide-react'

const CONTACT_CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    value: 'domingo14vincemb@gmail.com',
    href: 'mailto:domingo14vincemb@gmail.com',
    icon: Mail,
    accent: '#6C8EFF',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '(+63)-9167610830',
    href: 'https://wa.me/639167610830',
    icon: MessageCircle,
    accent: '#22c55e',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '(+63)-9167610830',
    href: 'https://t.me/+639167610830',
    icon: Send,
    accent: '#38bdf8',
  },
  {
    id: 'viber',
    label: 'Viber',
    value: '(+63)-9167310830',
    href: 'viber://chat?number=%2B639167310830',
    icon: PhoneCall,
    accent: '#a78bfa',
  },
] as const

export default function ContactPage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-4xl space-y-5">
        <section
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 120% at 0% 100%, rgba(108,142,255,0.20) 0%, transparent 60%), radial-gradient(ellipse 85% 100% at 100% 0%, rgba(168,85,247,0.16) 0%, transparent 58%), rgba(255,255,255,0.04)',
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]">
              <Sparkles size={12} />
              Open for Freelance and Leadership Roles
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Let us build something exceptional together.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              Need a reliable Technical Support Lead, Full Stack Web Developer, or AI integration
              partner who can execute fast and ship clean? I help teams turn ideas into scalable,
              business-ready systems.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href="mailto:domingo14vincemb@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C8EFF] to-[#8f7dff] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(108,142,255,0.35)] transition-transform duration-150 hover:scale-[1.02]"
              >
                <Rocket size={14} />
                Hire Me
              </a>
              <a
                href="https://wa.me/639167610830"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-[13px] font-semibold text-white/90 transition-colors duration-150 hover:bg-white/[0.10]"
              >
                Quick Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Direct Contact Channels
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACT_CHANNELS.map((item) => {
              const IconGlyph = item.icon
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith('mailto:') || item.href.startsWith('viber://') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') || item.href.startsWith('viber://') ? undefined : 'noreferrer'}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-150 hover:bg-white/[0.08]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[14px] font-medium text-white/85">{item.value}</p>
                    </div>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15"
                      style={{
                        background: `${item.accent}22`,
                        color: item.accent,
                      }}
                    >
                      <IconGlyph size={16} />
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Why Teams Hire Me
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-white/74 marker:text-[#9fb6ff]">
            <li>Technical support leadership with operational impact and SLA ownership.</li>
            <li>Full-stack delivery from concept to deployment with clean developer workflows.</li>
            <li>AI-driven automation and prompt systems that reduce manual overhead.</li>
            <li>Strong hosting and WordPress expertise for reliable production websites.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
