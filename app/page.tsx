import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">CiviPilot Pro</h1>
      <p className="text-gray-600 mb-6">
        Field-first toolkit — calculators, BOQ, diary, tasks, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/calculators" className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
          <h2 className="font-semibold">Calculators</h2>
          <p className="text-sm text-gray-600">Concrete, Rebar, Masonry, BBS</p>
        </Link>

        <Link href="/estimator" className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
          <h2 className="font-semibold">Estimator</h2>
          <p className="text-sm text-gray-600">BOQ builder, export CSV/PDF</p>
        </Link>

        <Link href="/diary" className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
          <h2 className="font-semibold">Site Diary</h2>
          <p className="text-sm text-gray-600">Daily logs with photo & export</p>
        </Link>

        <Link href="/tasks" className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
          <h2 className="font-semibold">Tasks</h2>
          <p className="text-sm text-gray-600">Manage project tasks</p>
        </Link>
      </div>
    </main>
  )
}
