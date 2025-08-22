import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <h1 className="text-lg font-bold mb-6">CiviPilot</h1>
      <nav className="space-y-2">
        <Link href="/" className="block hover:text-blue-600">Dashboard</Link>
        <Link href="/calculators" className="block hover:text-blue-600">Calculators</Link>
        <Link href="/estimator" className="block hover:text-blue-600">Estimator</Link>
        <Link href="/diary" className="block hover:text-blue-600">Site Diary</Link>
        <Link href="/tasks" className="block hover:text-blue-600">Tasks</Link>
        <Link href="/settings" className="block hover:text-blue-600">Settings</Link>
      </nav>
    </aside>
  );
}
