'use client'
import Link from 'next/link'
export default function Page() {
  return (
    <div className="space-y-6">
      <header className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold">CiviPilot Pro</h1>
        <p className="text-sm text-slate-500">Field-first toolkit — calculators, BOQ, diary, tasks, and more.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/calculators" className="p-4 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="font-semibold">Calculators</h3>
          <p className="text-sm text-slate-500">Concrete, Rebar, Masonry, BBS</p>
        </Link>
        <Link href="/estimator" className="p-4 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="font-semibold">Estimator</h3>
          <p className="text-sm text-slate-500">BOQ builder, export CSV/PDF</p>
        </Link>
        <Link href="/diary" className="p-4 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="font-semibold">Site Diary</h3>
          <p className="text-sm text-slate-500">Daily logs with photo & export</p>
        </Link>
      </section>
    </div>
  )
}
