import { useState } from 'react'

export default function AboutMe() {
  const [imageSrc, setImageSrc] = useState('/prof-pic.webp')

  return (
    <div className="h-full overflow-y-auto p-5 sm:p-7">
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <section className="grid grid-cols-1 gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:grid-cols-[178px,1fr] sm:p-5">
          <div className="mx-auto w-[168px] sm:mx-0">
            <img
              src={imageSrc}
              alt="Professional portrait"
              onError={() => setImageSrc('/favicon.svg')}
              className="h-[168px] w-[168px] rounded-2xl object-cover ring-1 ring-white/20"
            />
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9fb6ff]">
              Professional Headline
            </p>
            <h2 className="text-[20px] font-semibold leading-snug text-white/92 sm:text-[22px]">
              Technical Support Team Lead | Full Stack Web Developer | AI Integration & Prompt
              Engineering Specialist | Web Hosting & WordPress Expert
            </h2>

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Current Role (SupportNinja)
            </p>
            <p className="text-[14px] font-medium text-white/80">
              Technical Support Team Lead | SupportNinja Inc.
            </p>
            <p className="text-[13px] text-white/55">Mar 2022 - Present</p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fb6ff]">
            Professional Summary
          </p>
          <div className="space-y-3 text-[14px] leading-relaxed text-white/74">
            <p>
              Results-driven Technical Support Team Lead and Freelance Full Stack Web Developer
              with 8+ years of experience in technical support, customer operations, web hosting,
              web development, and AI-driven workflow automation. Strong expertise in WordPress
              development, domain/DNS management, SSL implementation, Visual Studio Code
              development workflows, full stack web technologies, and AI integration for business
              productivity.
            </p>
            <p>
              Proven success leading technical support teams, optimizing SLAs, improving customer
              experience, and implementing scalable solutions using Prompt Engineering, Generative
              AI, workflow automation (n8n), and modern development tools. Passionate about
              building intelligent systems that improve operational efficiency and accelerate digital
              transformation.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fb6ff]">
            Current Role (SupportNinja)
          </p>
          <p className="text-[14px] font-medium text-white/82">
            Technical Support Team Lead | SupportNinja Inc.
          </p>
          <p className="mt-1 text-[12px] text-white/52">Mar 2022 - Present</p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-white/72 marker:text-[#9fb6ff]">
            <li>
              Led AI adoption initiatives by integrating Generative AI and Prompt Engineering
              workflows into daily support operations to improve efficiency and knowledge retrieval.
            </li>
            <li>
              Built and optimized automation workflows using n8n and AI-powered tools to reduce
              repetitive manual tasks.
            </li>
            <li>
              Supported technical troubleshooting involving APIs, web applications, hosting
              environments, and custom website deployments.
            </li>
            <li>
              Partnered with teams to implement scalable technical solutions involving AI integration
              and modern support tooling.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fb6ff]">
            Freelance Experience
          </p>
          <p className="text-[14px] font-medium text-white/82">
            Freelance Full Stack Web Developer | Self-Employed
          </p>
          <p className="mt-1 text-[12px] text-white/52">2020 - Present</p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-white/72 marker:text-[#9fb6ff]">
            <li>
              Design, develop, and deploy responsive websites and web applications for clients
              across multiple industries.
            </li>
            <li>
              Build custom websites using HTML, CSS, JavaScript, WordPress, and modern web
              technologies.
            </li>
            <li>
              Manage hosting environments, domain configurations, SSL setup, and website
              migrations.
            </li>
            <li>Optimize websites for SEO, performance, and user experience.</li>
            <li>
              Implement AI-powered tools and automation solutions to improve business workflows
              and website functionality.
            </li>
            <li>
              Use Visual Studio Code as primary IDE for full-stack development and deployment
              workflows.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
