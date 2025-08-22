"use client";

import Link from "next/link";

export default function CalculatorsPage() {
  const calculators = [
    { name: "Concrete", path: "/calculators/concrete" },
    { name: "Steel", path: "/calculators/steel" },
    { name: "Brick", path: "/calculators/brick" },
    { name: "Wood", path: "/calculators/wood" },
    { name: "Paint", path: "/calculators/paint" },
    { name: "Tiles/Flooring", path: "/calculators/tiles" },
    { name: "Beam Load", path: "/calculators/beam" },
    { name: "Column Load", path: "/calculators/column" },
    { name: "Slab Thickness/Load", path: "/calculators/slab" },
    { name: "General Estimator", path: "/calculators/estimator" },
    { name: "Plaster", path: "/calculators/plaster" },
    { name: "Excavation", path: "/calculators/excavation" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Calculators 🏗️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc) => (
          <Link
            key={calc.name}
            href={calc.path}
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg text-center font-medium transition"
          >
            {calc.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
