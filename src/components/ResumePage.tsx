import { ArrowUpRight, BadgeCheck, FileText, Linkedin, Rocket } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/vince-eleazar-domingo-ccp-24ba78115'

export default function ResumePage() {
  return (
    <div className="h-full overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
      <div className="mx-auto max-w-4xl space-y-5">
        <section
          className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-7"
          style={{
            background:
              'radial-gradient(ellipse 95% 120% at 0% 100%, rgba(108,142,255,0.20) 0%, transparent 62%), radial-gradient(ellipse 90% 110% at 100% 0%, rgba(34,211,238,0.14) 0%, transparent 60%), rgba(255,255,255,0.04)',
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb6ff]">
              <BadgeCheck size={12} />
              Professional Resume Access
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
              View my full professional profile on LinkedIn.
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-white/72 sm:text-[15px]">
              For the latest experience timeline, certifications, achievements, and recommendations,
              use the direct profile link below.
            </p>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#6C8EFF] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(10,102,194,0.35)] transition-transform duration-150 hover:scale-[1.02]"
            >
              <Linkedin size={15} />
              Open LinkedIn Resume
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-[#9fb6ff]">
              <FileText size={16} />
            </span>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/48">
                Direct Profile URL
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-[14px] font-medium text-[#bfd0ff] hover:text-white"
              >
                {LINKEDIN_URL}
              </a>
              <p className="mt-2 text-[12px] text-white/60">
                This link is the primary source for my most current resume-level professional details.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-white/80">
            <Rocket size={14} className="text-[#9fb6ff]" />
            <p className="text-[12.5px] font-semibold">Ready for your next role or project inquiry.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
