'use client'
import Link from 'next/link'
export default function CalculatorsPage(){
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Calculators</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/calculators/concrete" className="p-4 bg-white rounded shadow">Concrete Volume</Link>
        <Link href="/calculators/rebar" className="p-4 bg-white rounded shadow">Rebar Weight</Link>
        <Link href="/calculators/masonry" className="p-4 bg-white rounded shadow">Masonry</Link>
      </div>
    </div>
  )
}
