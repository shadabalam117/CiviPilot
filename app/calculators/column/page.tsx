"use client";

import { useState } from "react";

export default function ColumnCalculator() {
  const [area, setArea] = useState("");
  const [fck, setFck] = useState("");
  const [fy, setFy] = useState("");
  const [result, setResult] = useState<string | null>(null);

  // Axial load capacity formula (simplified):
  // Pu = 0.4 * fck * Ac + 0.67 * fy * Asc
  const calculate = () => {
    const Ac = parseFloat(area); // Cross-sectional area (mm²)
    const fckVal = parseFloat(fck); // Grade of concrete (N/mm²)
    const fyVal = parseFloat(fy); // Grade of steel (N/mm²)

    if (isNaN(Ac) || isNaN(fckVal) || isNaN(fyVal)) {
      setResult("Please enter valid numbers.");
      return;
    }

    const Pu = 0.4 * fckVal * Ac + 0.67 * fyVal * (0.04 * Ac); 
    setResult(`Axial Load Capacity = ${Pu.toFixed(2)} N`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Column Load Calculator</h1>
      
      <div className="space-y-3">
        <input
          type="number"
          placeholder="Cross-sectional area (mm²)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Grade of Concrete fck (N/mm²)"
          value={fck}
          onChange={(e) => setFck(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Grade of Steel fy (N/mm²)"
          value={fy}
          onChange={(e) => setFy(e.target.value)}
          className="border rounded p-2 w-full"
        />

        <button
          onClick={calculate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4 p-3 bg-gray-100 border rounded">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
