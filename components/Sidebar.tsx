'use client'
import Link from 'next/link'
export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r p-4">
      <div className="mb-6">
        <div className="text-lg font-bold">CiviPilot</div>
        <div className="text-xs text-slate-500">Field Engineer Toolkit</div>
      </div>
      <nav className="space-y-2">
        <Link href="/" className="block p-2 rounded hover:bg-slate-50">Dashboard</Link>
        <Link href="/calculators" className="block p-2 rounded hover:bg-slate-50">Calculators</Link>
        <Link href="/estimator" className="block p-2 rounded hover:bg-slate-50">Estimator</Link>
        <Link href="/diary" className="block p-2 rounded hover:bg-slate-50">Site Diary</Link>
        <Link href="/tasks" className="block p-2 rounded hover:bg-slate-50">Tasks</Link>
        <Link href="/settings" className="block p-2 rounded hover:bg-slate-50">Settings</Link>
      </nav>
    </aside>
  )
}
