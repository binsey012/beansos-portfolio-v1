import { useState, useRef, useEffect, useCallback } from 'react'

// ─── Command Registry ─────────────────────────────────────────────────────────

interface CommandDef {
  name: string
  description: string
  handler: () => OutputLine[]
}

type OutputLine =
  | { type: 'text';  content: string; className?: string }
  | { type: 'blank' }
  | { type: 'table'; rows: { cmd: string; desc: string }[] }

const ASCII_BIO: string[] = [
  '  ██████╗ ███████╗ █████╗ ███╗   ██╗███████╗',
  '  ██╔══██╗██╔════╝██╔══██╗████╗  ██║██╔════╝',
  '  ██████╔╝█████╗  ███████║██╔██╗ ██║███████╗',
  '  ██╔══██╗██╔══╝  ██╔══██║██║╚██╗██║╚════██║',
  '  ██████╔╝███████╗██║  ██║██║ ╚████║███████║',
  '  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝',
]

const SENSITIVE_PATTERNS = [
  'password',
  'passwd',
  'secret',
  'token',
  'api key',
  'apikey',
  'credential',
  'private key',
  '.env',
  'confidential',
  'ssn',
  'credit card',
]

function isSensitiveInput(value: string): boolean {
  const normalized = value.toLowerCase()
  return SENSITIVE_PATTERNS.some((pattern) => normalized.includes(pattern))
}

function buildAbout(): OutputLine[] {
  return [
    { type: 'blank' },
    ...ASCII_BIO.map<OutputLine>((l) => ({ type: 'text', content: l, className: 'text-[#6C8EFF] font-bold tracking-tight' })),
    { type: 'blank' },
    { type: 'text', content: '  .BeansOS Portfolio Terminal', className: 'text-white/90 font-semibold' },
    { type: 'text', content: '  AI-enabled support, leadership, and engineering showcase.', className: 'text-white/45' },
    { type: 'blank' },
    { type: 'text', content: '  ┌─ Profile ────────────────────────────────────────────┐', className: 'text-white/20' },
    { type: 'text', content: '  │  Role     Team Lead · Technical Operations · AI Delivery│', className: 'text-white/50' },
    { type: 'text', content: '  │  Focus    Support Excellence · Automation · AIDLC       │', className: 'text-white/50' },
    { type: 'text', content: '  │  Stack    React · TypeScript · API Integrations · AI   │', className: 'text-white/50' },
    { type: 'text', content: '  │  Value    Measurable business outcomes and safe rollout │', className: 'text-white/50' },
    { type: 'text', content: '  └─────────────────────────────────────────────────────┘', className: 'text-white/20' },
    { type: 'blank' },
    { type: 'text', content: '  ┌─ Confidentiality Mode ────────────────────────────────┐', className: 'text-white/20' },
    { type: 'text', content: '  │  This terminal is portfolio-scoped and sanitized.      │', className: 'text-white/50' },
    { type: 'text', content: '  │  Client-sensitive and private operational details are  │', className: 'text-white/50' },
    { type: 'text', content: '  │  intentionally excluded across all displayed outputs.  │', className: 'text-white/50' },
    { type: 'text', content: '  └─────────────────────────────────────────────────────┘', className: 'text-white/20' },
    { type: 'blank' },
    { type: 'text', content: '  Open Contact, Resume, GitHub, and Showcase windows for official public links.', className: 'text-[#6C8EFF]/80 text-[11px]' },
    { type: 'blank' },
  ]
}

function buildHelp(): OutputLine[] {
  return [
    { type: 'blank' },
    { type: 'text', content: '  BEANS/OS v1.2.0 — Portfolio Safe Mode commands:', className: 'text-white/60 text-[11px]' },
    { type: 'blank' },
    {
      type: 'table',
      rows: [
        { cmd: 'about',    desc: 'Display developer profile and bio' },
        { cmd: 'projects', desc: 'Show project categories and highlights' },
        { cmd: 'skills',   desc: 'Show leadership + technical capability summary' },
        { cmd: 'contact',  desc: 'Show approved public contact channels' },
        { cmd: 'showcase', desc: 'Show AIDLC and impact summary' },
        { cmd: 'policy',   desc: 'Show confidentiality and guardrail policy' },
        { cmd: 'clear',    desc: 'Clear the terminal output buffer' },
        { cmd: 'help',     desc: 'Show this command reference' },
      ],
    },
    { type: 'blank' },
    { type: 'text', content: '  Guardrail: only approved portfolio content is rendered here.', className: 'text-white/25 text-[11px] italic' },
    { type: 'blank' },
  ]
}

function buildProjects(): OutputLine[] {
  const rows = [
    { name: 'Featured Portfolio Builds', type: 'Public Case Studies', status: 'Visible' },
    { name: 'NDA-safe Delivery Stories', type: 'Impact Narratives', status: 'Visible' },
    { name: 'AI + Automation Work', type: 'AIDLC Initiatives', status: 'Visible' },
    { name: 'Support Transformation', type: 'Ops Excellence', status: 'Visible' },
    { name: 'Web and Infra Projects', type: 'Technical Portfolio', status: 'Visible' },
    { name: 'Learning and Labs', type: 'Continuous Growth', status: 'Visible' },
  ]
  return [
    { type: 'blank' },
    { type: 'text', content: '  NAME                      TYPE                   STATUS', className: 'text-white/30 text-[10px] font-semibold tracking-widest uppercase' },
    { type: 'text', content: '  ────────────────────────  ─────────────────────  ────────────', className: 'text-white/15' },
    ...rows.map<OutputLine>((r) => ({
      type: 'text',
      content: `  ${r.name.padEnd(26)}${r.type.padEnd(23)}${r.status}`,
      className: 'text-[12px] font-mono text-emerald-400/80',
    })),
    { type: 'blank' },
    { type: 'text', content: `  ${rows.length} entries · Open the Projects window for complete public details.`, className: 'text-white/30 text-[11px]' },
    { type: 'blank' },
  ]
}

function buildSkills(): OutputLine[] {
  const groups: { label: string; items: string[] }[] = [
    { label: 'Leadership', items: ['Team Leadership', 'Coaching and Mentoring', 'Stakeholder Management', 'Decision Making'] },
    { label: 'Operations', items: ['Incident Management', 'RCA', 'SLA/KPI Management', 'Process Improvement'] },
    { label: 'Web + Infra', items: ['WordPress', 'DNS Management', 'SSL/TLS', 'Linux Fundamentals'] },
    { label: 'AI Delivery', items: ['Prompt Engineering', 'AI Integration', 'Workflow Automation', 'AIDLC Framework'] },
    { label: 'Coaching', items: ['C-SMART Coaching', 'GROW Method', 'Performance Coaching Sessions'] },
    { label: 'Execution', items: ['Cross-functional Collaboration', 'Change Management', 'Quality Assurance'] },
  ]
  return [
    { type: 'blank' },
    { type: 'text', content: '  Tech Stack Matrix', className: 'text-white/70 font-semibold' },
    { type: 'blank' },
    ...groups.flatMap<OutputLine>((g) => [
      { type: 'text', content: `  ▸ ${g.label}`, className: 'text-[#6C8EFF] text-[11px] font-semibold uppercase tracking-widest' },
      { type: 'text', content: `    ${g.items.join('  ·  ')}`, className: 'text-white/55 text-[12px]' },
      { type: 'blank' },
    ]),
  ]
}

function buildContact(): OutputLine[] {
  return [
    { type: 'blank' },
    { type: 'text', content: '  Public Contact Channels', className: 'text-white/80 font-semibold' },
    { type: 'blank' },
    { type: 'text', content: '  Open the Contact app for official channels and response workflow.', className: 'text-[#6C8EFF]' },
    { type: 'text', content: '  Open Resume for LinkedIn and open GitHub for repository profile.', className: 'text-white/55' },
    { type: 'blank' },
    { type: 'text', content: '  Note: Personal and private communication details are intentionally sanitized.', className: 'text-white/30 text-[11px] italic' },
    { type: 'blank' },
  ]
}

function buildShowcase(): OutputLine[] {
  return [
    { type: 'blank' },
    { type: 'text', content: '  Showcase Summary (Public View)', className: 'text-white/80 font-semibold' },
    { type: 'blank' },
    { type: 'text', content: '  • AIDLC execution from discovery to optimization', className: 'text-white/65' },
    { type: 'text', content: '  • Recruiter modes: Hiring Manager, Tech Lead, Client Focused', className: 'text-white/65' },
    { type: 'text', content: '  • Coaching strategy: C-SMART and GROW method in delivery coaching', className: 'text-white/65' },
    { type: 'text', content: '  • KPI-led outcomes: faster response cycles and stronger SLA performance', className: 'text-white/65' },
    { type: 'blank' },
    { type: 'text', content: '  Open the Showcase window for full interactive details.', className: 'text-[#6C8EFF]/85 text-[11px]' },
    { type: 'blank' },
  ]
}

function buildPolicy(): OutputLine[] {
  return [
    { type: 'blank' },
    { type: 'text', content: '  Portfolio Guardrail Policy', className: 'text-white/80 font-semibold' },
    { type: 'blank' },
    { type: 'text', content: '  1) Terminal commands are whitelist-only.', className: 'text-white/65' },
    { type: 'text', content: '  2) Sensitive keywords are blocked from output generation.', className: 'text-white/65' },
    { type: 'text', content: '  3) Outputs remain portfolio-scoped and NDA-safe.', className: 'text-white/65' },
    { type: 'text', content: '  4) Confidential client/private credentials are never shown.', className: 'text-white/65' },
    { type: 'blank' },
    { type: 'text', content: '  Status: SAFE MODE ACTIVE', className: 'text-emerald-300/90 text-[11px] font-semibold tracking-wider' },
    { type: 'blank' },
  ]
}

const COMMANDS: CommandDef[] = [
  { name: 'help',     description: 'Show available commands',      handler: buildHelp },
  { name: 'about',    description: 'Developer bio',                handler: buildAbout },
  { name: 'projects', description: 'List projects',               handler: buildProjects },
  { name: 'skills',   description: 'Tech stack matrix',           handler: buildSkills },
  { name: 'contact',  description: 'Contact links',               handler: buildContact },
  { name: 'showcase', description: 'Showcase summary',            handler: buildShowcase },
  { name: 'policy',   description: 'Guardrail policy',            handler: buildPolicy },
]

// ─── History Entry ────────────────────────────────────────────────────────────

interface HistoryEntry {
  id: number
  input: string
  output: OutputLine[]
}

// ─── Boot sequence ────────────────────────────────────────────────────────────

const BOOT_OUTPUT: OutputLine[] = [
  { type: 'blank' },
  { type: 'text', content: '  BEANS/OS Terminal v1.2.0', className: 'text-[#6C8EFF] font-bold text-[13px]' },
  { type: 'text', content: '  Public Portfolio Runtime · Confidentiality Guardrails Enabled', className: 'text-white/30 text-[11px]' },
  { type: 'text', content: '  Copyright © 2026 .BeansWebDev. All rights reserved.', className: 'text-white/30 text-[11px]' },
  { type: 'blank' },
  { type: 'text', content: "  Type 'help' to see approved commands or 'policy' for guardrails.", className: 'text-white/45 text-[12px]' },
  { type: 'blank' },
]

// ─── Renderer helpers ─────────────────────────────────────────────────────────

function renderLine(line: OutputLine, idx: number) {
  if (line.type === 'blank') {
    return <div key={idx} className="h-2" />
  }
  if (line.type === 'table') {
    return (
      <div key={idx} className="pl-2">
        {line.rows.map((row) => (
          <div key={row.cmd} className="flex items-baseline gap-0 font-mono text-[12px] leading-7">
            <span className="w-[100px] text-[#6C8EFF] shrink-0 pl-3">{row.cmd}</span>
            <span className="text-white/35 shrink-0 pr-3">—</span>
            <span className="text-white/55">{row.desc}</span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div
      key={idx}
      className={`font-mono text-[12px] leading-[1.7] whitespace-pre ${line.className ?? 'text-white/55'}`}
    >
      {line.content}
    </div>
  )
}

// ─── InteractiveTerminal ──────────────────────────────────────────────────────

let idCounter = 0

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: idCounter++, input: '', output: BOOT_OUTPUT },
  ])
  const [input, setInput] = useState('')
  const [inputHistory, setInputHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleSubmit = useCallback(() => {
    const raw  = input.trim()
    const cmd  = raw.toLowerCase()

    if (cmd === 'clear') {
      setHistory([{ id: idCounter++, input: '', output: BOOT_OUTPUT }])
      setInput('')
      setInputHistory((prev) => (raw ? [raw, ...prev.slice(0, 49)] : prev))
      setHistoryIndex(-1)
      return
    }

    let output: OutputLine[]

    if (raw === '') {
      output = []
    } else if (isSensitiveInput(raw)) {
      output = [
        { type: 'blank' },
        {
          type: 'text',
          content: '  Access blocked: sensitive or confidential query detected.',
          className: 'text-red-400/80',
        },
        {
          type: 'text',
          content: "  This terminal only serves approved portfolio content. Run 'policy' for details.",
          className: 'text-white/35 text-[11px]',
        },
        { type: 'blank' },
      ]
    } else {
      const found = COMMANDS.find((c) => c.name === cmd)
      if (found) {
        output = found.handler()
      } else {
        output = [
          { type: 'blank' },
          {
            type: 'text',
            content: `  bash: ${raw}: command not found`,
            className: 'text-red-400/80',
          },
          {
            type: 'text',
            content: "  Type 'help' for approved commands. Non-portfolio queries are blocked.",
            className: 'text-white/30 text-[11px]',
          },
          { type: 'blank' },
        ]
      }
    }

    setHistory((prev) => [...prev, { id: idCounter++, input: raw, output }])
    if (raw) setInputHistory((prev) => [raw, ...prev.slice(0, 49)])
    setInput('')
    setHistoryIndex(-1)
  }, [input])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const next = Math.min(historyIndex + 1, inputHistory.length - 1)
        setHistoryIndex(next)
        setInput(inputHistory[next] ?? '')
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = historyIndex - 1
        if (next < 0) { setHistoryIndex(-1); setInput(''); return }
        setHistoryIndex(next)
        setInput(inputHistory[next] ?? '')
        return
      }
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setHistory([{ id: idCounter++, input: '', output: BOOT_OUTPUT }])
        setInput('')
        setHistoryIndex(-1)
      }
    },
    [handleSubmit, historyIndex, inputHistory],
  )

  return (
    <div
      className="flex flex-col h-full bg-[#0c0c0e] font-mono cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-y-auto min-h-0 px-2 pt-3 pb-2 space-y-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {history.map((entry) => (
          <div key={entry.id}>
            {/* Prompt line — only show if there was input */}
            {entry.input !== '' && (
              <div className="flex items-center gap-0 font-mono text-[12px] leading-[1.9] select-none">
                <span className="text-[#6C8EFF] font-semibold">beans</span>
                <span className="text-white/30">@</span>
                <span className="text-emerald-400/70 font-semibold">beanos</span>
                <span className="text-white/30"> % </span>
                <span className="text-white/85">{entry.input}</span>
              </div>
            )}
            {/* Command output */}
            <div>
              {entry.output.map((line, i) => renderLine(line, i))}
            </div>
          </div>
        ))}

        {/* Live prompt */}
        <div className="flex items-center gap-0 font-mono text-[12px] leading-[1.9]">
          <span className="text-[#6C8EFF] font-semibold select-none">beans</span>
          <span className="text-white/30 select-none">@</span>
          <span className="text-emerald-400/70 font-semibold select-none">beanos</span>
          <span className="text-white/30 select-none"> % </span>
          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
              className={[
                'w-full bg-transparent outline-none border-none caret-[#6C8EFF]',
                'text-white/85 text-[12px] font-mono',
              ].join(' ')}
            />
          </div>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
