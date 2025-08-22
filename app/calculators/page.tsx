"use client";

import { useState } from "react";

export default function ConcreteCalculator() {
  const [grade, setGrade] = useState("M20");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState<{
    cement: number;
    sand: number;
    aggregate: number;
    water: number;
  } | null>(null);

  const mixRatios: Record<string, { cement: number; sand: number; agg: number; water: number }> = {
    M20: { cement: 1, sand: 1.5, agg: 3, water: 0.5 },
    M25: { cement: 1, sand: 1, agg: 2, water: 0.5 },
    M30: { cement: 1, sand: 0.75, agg: 1.5, water: 0.45 },
  };

  const calculate = () => {
    if (!volume) return;

    const v = parseFloat(volume);
    const ratio = mixRatios[grade];
    const totalParts = ratio.cement + ratio.sand + ratio.agg;

    // Approx density of cementitious mix = 1440 kg/m³ (simplified assumption)
    const cementQty = (v * ratio.cement * 1440) / totalParts;
    const sandQty = (v * ratio.sand * 1600) / totalParts;
    const aggQty = (v * ratio.agg * 1550) / totalParts;
    const waterQty = cementQty * ratio.water;

    setResult({
      cement: cementQty,
      sand: sandQty,
      aggregate: aggQty,
      water: waterQty,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Concrete Mix Calculator</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Grade</label>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="M20">M20</option>
          <option value="M25">M25</option>
          <option value="M30">M30</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Volume of Concrete (m³)</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder="Enter volume in cubic meters"
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={calculate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p><b>Cement:</b> {result.cement.toFixed(2)} kg</p>
          <p><b>Sand:</b> {result.sand.toFixed(2)} kg</p>
          <p><b>Aggregate:</b> {result.aggregate.toFixed(2)} kg</p>
          <p><b>Water:</b> {result.water.toFixed(2)} liters</p>
        </div>
      )}
    </div>
  );
}
