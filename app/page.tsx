'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Code2,
  FileCode2,
  GitBranch,
  History,
  LayoutDashboard,
  Play,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TerminalSquare,
  Upload,
  WandSparkles,
} from 'lucide-react'

const candidates = [
  { id: 'C-041', file: 'payment_service.py', line: 84, strategy: 'GA + PSO', fitness: 0.94, status: 'Validated', color: 'emerald' },
  { id: 'C-037', file: 'cart_validator.py', line: 126, strategy: 'PSO guided', fitness: 0.88, status: 'Validated', color: 'emerald' },
  { id: 'C-052', file: 'auth_middleware.py', line: 52, strategy: 'GA mutation', fitness: 0.81, status: 'Review', color: 'amber' },
]

const chartValues = [42, 48, 44, 57, 54, 66, 63, 74, 71, 82, 78, 91]

export default function Page() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [isRunning, setIsRunning] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [budget, setBudget] = useState(50)

  const efficiency = useMemo(() => Math.min(97, 62 + Math.round(budget * 0.45)), [budget])

  function runRepair() {
    setIsRunning(true)
    window.setTimeout(() => setIsRunning(false), 1800)
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#17202a]">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[250px] border-r border-[#e8ebef] bg-white lg:flex lg:flex-col">
        <div className="flex h-[86px] items-center gap-3 border-b border-[#edf0f2] px-7">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#2257d9] text-white shadow-[0_6px_18px_rgba(34,87,217,0.25)]"><WandSparkles size={19} /></div>
          <div><p className="text-[15px] font-bold tracking-[-0.02em]">RepairLab</p><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a94a3]">Research console</p></div>
        </div>
        <div className="flex flex-1 flex-col px-4 py-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a3acb8]">Workspace</p>
          <nav className="mt-3 flex flex-col gap-1">
            {[['Overview', LayoutDashboard], ['Experiments', Activity], ['Patch archive', History], ['Benchmarks', BarChart3]].map(([label, Icon]) => (
              <button key={label as string} onClick={() => setActiveNav(label as string)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold transition ${activeNav === label ? 'bg-[#edf3ff] text-[#2257d9]' : 'text-[#687486] hover:bg-[#f5f7fa]'}`}><Icon size={17} />{label as string}</button>
            ))}
          </nav>
          <p className="mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a3acb8]">System</p>
          <nav className="mt-3 flex flex-col gap-1"><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[#687486] hover:bg-[#f5f7fa]"><Settings2 size={17} />Configuration</button></nav>
        </div>
        <div className="m-4 rounded-xl bg-[#f7f9fc] p-4"><div className="flex items-center gap-2 text-[11px] font-bold text-[#566273]"><span className="size-2 rounded-full bg-[#27b47e]" /> Engine online</div><p className="mt-2 text-[11px] leading-5 text-[#8b96a5]">GA-PSO v1.0 is ready for your next experiment.</p></div>
      </aside>

      <section className="lg:pl-[250px]">
        <header className="flex h-[86px] items-center justify-between border-b border-[#e8ebef] bg-white px-5 sm:px-9"><div className="lg:hidden flex items-center gap-2 font-bold"><div className="flex size-8 items-center justify-center rounded-lg bg-[#2257d9] text-white"><WandSparkles size={16} /></div>RepairLab</div><div className="hidden text-[13px] font-medium text-[#8b96a5] lg:block">Monday, 14 October 2024 <span className="mx-3 text-[#d4d9df]">/</span> Project workspace</div><div className="flex items-center gap-4"><div className="hidden items-center gap-2 text-[12px] font-semibold text-[#6f7a89] sm:flex"><span className="size-2 rounded-full bg-[#27b47e]" /> All systems operational</div><div className="flex size-9 items-center justify-center rounded-full bg-[#e5ecff] text-[12px] font-bold text-[#2257d9]">AS</div><ChevronDown size={15} className="text-[#9ba4af]" /></div></header>
        <div className="mx-auto max-w-[1380px] p-5 sm:p-9">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2257d9]">Multi-objective optimization</p><h1 className="text-[28px] font-bold tracking-[-0.04em] sm:text-[34px]">Automated repair overview</h1><p className="mt-2 text-[13px] text-[#7b8796]">A lightweight hybrid approach for finding reliable software patches.</p></div><button onClick={runRepair} className="flex items-center justify-center gap-2 rounded-lg bg-[#2257d9] px-5 py-3 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(34,87,217,0.2)] transition hover:bg-[#1748c5] disabled:opacity-70"><Play size={15} fill="currentColor" />{isRunning ? 'Running search...' : 'Run new experiment'}</button></div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Target} label="Patches discovered" value="128" delta="+18.4%" /><Metric icon={CheckCircle2} label="Validated patches" value="96" delta="+12.8%" /><Metric icon={ShieldCheck} label="Avg. fitness score" value="0.87" delta="+6.2%" /><Metric icon={Activity} label="Search efficiency" value={`${efficiency}%`} delta="+9.1%" /></div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]"><section className="rounded-xl border border-[#e8ebef] bg-white p-5 sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-[15px] font-bold">Optimization progress</h2><p className="mt-1 text-[12px] text-[#8a94a3]">Fitness convergence across generations</p></div><div className="flex items-center gap-2 rounded-md bg-[#f5f7fa] px-2.5 py-1.5 text-[11px] font-semibold text-[#6d7887]"><span className="size-2 rounded-full bg-[#2257d9]" /> Fitness score</div></div><div className="mt-8 flex h-[205px] items-end gap-2 border-b border-l border-[#edf0f2] px-3 pb-0 pt-4 sm:gap-4 sm:px-5">{chartValues.map((value, index) => <div key={index} className="flex h-full flex-1 items-end"><div className="group relative w-full rounded-t-md bg-[#dce7ff] transition hover:bg-[#2257d9]" style={{ height: `${value}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-[10px] font-bold text-[#2257d9] group-hover:block">{value}</span></div></div>)}</div><div className="mt-3 flex justify-between px-2 text-[10px] font-semibold text-[#a1aab5]"><span>Gen 01</span><span>Gen 06</span><span>Gen 12</span></div></section>
            <section className="rounded-xl border border-[#e8ebef] bg-white p-5 sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-[15px] font-bold">Objective balance</h2><p className="mt-1 text-[12px] text-[#8a94a3]">Current weighting strategy</p></div><CircleDot size={18} className="text-[#2257d9]" /></div><div className="mt-8 flex items-center justify-center"><div className="relative flex items-center justify-center" style={{ width: 154, height: 154 }}><div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#2257d9 0 42%, #43b58a 42% 76%, #f2b84b 76% 100%)' }} /><div className="absolute inset-[13px] flex flex-col items-center justify-center rounded-full bg-white"><span className="text-[25px] font-bold">3</span><span className="text-[10px] font-semibold text-[#8a94a3]">objectives</span></div></div></div><div className="mt-7 flex justify-center gap-5 text-[11px] font-semibold text-[#6e7988]"><span><i className="mr-1.5 inline-block size-2 rounded-full bg-[#2257d9]" />Correctness</span><span><i className="mr-1.5 inline-block size-2 rounded-full bg-[#43b58a]" />Complexity</span><span><i className="mr-1.5 inline-block size-2 rounded-full bg-[#f2b84b]" />Diff size</span></div></section></div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]"><section className="rounded-xl border border-[#e8ebef] bg-white p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-[15px] font-bold">Latest candidate patches</h2><p className="mt-1 text-[12px] text-[#8a94a3]">Top-ranked results from Experiment #24</p></div><button className="flex items-center gap-2 text-[12px] font-bold text-[#2257d9]">View archive <ArrowUpRight size={14} /></button></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[570px] text-left text-[12px]"><thead className="border-b border-[#edf0f2] text-[10px] font-bold uppercase tracking-[0.1em] text-[#a1aab5]"><tr><th className="pb-3">Candidate</th><th className="pb-3">Location</th><th className="pb-3">Strategy</th><th className="pb-3">Fitness</th><th className="pb-3">Status</th></tr></thead><tbody>{candidates.map((candidate) => <tr key={candidate.id} className="border-b border-[#f1f3f5] last:border-0"><td className="py-4 font-bold text-[#3e4a59]">{candidate.id}</td><td className="py-4"><div className="flex items-center gap-2 font-semibold"><FileCode2 size={15} className="text-[#7b8796]" />{candidate.file}</div><span className="ml-5 text-[10px] text-[#a1aab5]">line {candidate.line}</span></td><td className="py-4 text-[#687486]">{candidate.strategy}</td><td className="py-4 font-bold text-[#2257d9]">{candidate.fitness}</td><td className="py-4"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${candidate.color === 'emerald' ? 'bg-[#e8f8f1] text-[#18845a]' : 'bg-[#fff5dd] text-[#aa7412]'}`}>{candidate.status}</span></td></tr>)}</tbody></table></div></section>
            <section className="rounded-xl border border-[#e8ebef] bg-white p-5 sm:p-7"><div className="flex items-center justify-between"><div><h2 className="text-[15px] font-bold">Start an experiment</h2><p className="mt-1 text-[12px] text-[#8a94a3]">Configure your repair input</p></div><Code2 size={19} className="text-[#2257d9]" /></div><button onClick={() => setUploaded(!uploaded)} className={`mt-6 flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-6 transition ${uploaded ? 'border-[#43b58a] bg-[#effaf5]' : 'border-[#cfd6df] bg-[#fafbfc] hover:border-[#2257d9] hover:bg-[#f5f8ff]'}`}><Upload size={20} className={uploaded ? 'text-[#43b58a]' : 'text-[#8b96a5'} /><span className="mt-2 text-[12px] font-bold">{uploaded ? 'project.zip attached' : 'Upload source project'}</span><span className="mt-1 text-[10px] text-[#9aa4b0]">ZIP, TAR.GZ up to 50 MB</span></button><div className="mt-5 flex items-center justify-between text-[11px] font-semibold text-[#6e7988]"><span>Generation budget</span><span className="font-bold text-[#2257d9]">{budget} generations</span></div><input aria-label="Generation budget" type="range" min="10" max="100" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className="mt-3 w-full accent-[#2257d9]" /><button onClick={runRepair} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#d9e0e8] py-2.5 text-[12px] font-bold text-[#4e5b6b] hover:bg-[#f7f9fc]"><TerminalSquare size={15} /> Configure advanced settings</button></section></div>
        </div>
      </section>
    </main>
  )
}

function Metric({ icon: Icon, label, value, delta }: { icon: typeof Activity; label: string; value: string; delta: string }) { return <div className="rounded-xl border border-[#e8ebef] bg-white p-5"><div className="flex items-center justify-between"><div className="flex size-9 items-center justify-center rounded-lg bg-[#edf3ff] text-[#2257d9]"><Icon size={17} /></div><span className="rounded-full bg-[#e8f8f1] px-2 py-1 text-[10px] font-bold text-[#18845a]">{delta}</span></div><p className="mt-5 text-[12px] font-semibold text-[#8a94a3]">{label}</p><p className="mt-1 text-[25px] font-bold tracking-[-0.04em]">{value}</p></div> }

