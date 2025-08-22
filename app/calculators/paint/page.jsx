"use client";

import { useState } from "react";

export default function PaintCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [numWalls, setNumWalls] = useState("1");
  const [coveragePerLiter, setCoveragePerLiter] = useState("10"); // default 10 m²/liter
  const [coats, setCoats] = useState("1");
  const [wastagePercent, setWastagePercent] = useState("5"); // default 5%
  const [result, setResult] = useState<number | null>(null);

  const calculatePaint = () => {
    const l = parseFloat(length);
    const h = parseFloat(height);
    const walls = parseInt(numWalls);
    const coverage = parseFloat(coveragePerLiter);
    const coatNum = parseInt(coats);
    const wastage = parseFloat(wastagePercent);

    if ([l, h, walls, coverage, coatNum, wastage].some((v) => isNaN(v) || v <= 0)) {
      alert("Please enter valid numbers");
      return;
    }

    // Total area to paint
    const area = l * h * walls * coatNum;

    // Include wastage
    const totalArea = area * (1 + wastage / 100);

    // Paint required (liters)
    const paintLiters = totalArea / coverage;

    setResult(parseFloat(paintLiters.toFixed(2)));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Paint Calculator 🎨</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Length of wall/ceiling (m)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Height of wall/ceiling (m)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Number of walls/ceilings"
          value={numWalls}
          onChange={(e) => setNumWalls(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Coverage per liter (m²/liter)"
          value={coveragePerLiter}
          onChange={(e) => setCoveragePerLiter(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Number of coats"
          value={coats}
          onChange={(e) => setCoats(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Wastage (%)"
          value={wastagePercent}
          onChange={(e) => setWastagePercent(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={calculatePaint}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>Paint Required: {result} liters</p>
        </div>
      )}
    </div>
  );
}
