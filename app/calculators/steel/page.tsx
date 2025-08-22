"use client";

import { useState } from "react";

export default function SteelCalculator() {
  const [diameter, setDiameter] = useState<number | "">("");
  const [length, setLength] = useState<number | "">("");
  const [bars, setBars] = useState<number | "">("");
  const [weight, setWeight] = useState<number | null>(null);

  const calculateWeight = () => {
    if (diameter && length && bars) {
      const singleBarWeight = (Math.pow(Number(diameter), 2) / 162) * Number(length);
      const totalWeight = singleBarWeight * Number(bars);
      setWeight(Number(totalWeight.toFixed(2)));
    } else {
      setWeight(null);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Steel Reinforcement Calculator</h1>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Diameter (mm)"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Length (m)"
          value={length}
          onChange={(e) => setLength(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Number of Bars"
          value={bars}
          onChange={(e) => setBars(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={calculateWeight}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        {weight !== null && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-lg font-semibold">Total Weight: {weight} kg</p>
          </div>
        )}
      </div>
    </div>
  );
}
