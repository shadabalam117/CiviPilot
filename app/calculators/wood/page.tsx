"use client";

import { useState } from "react";

export default function WoodCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [costPerCubicMeter, setCostPerCubicMeter] = useState("");
  const [wastagePercent, setWastagePercent] = useState("5"); // default 5%
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const cost = parseFloat(costPerCubicMeter);
    const wastage = parseFloat(wastagePercent);

    if ([l, w, h, cost, wastage].some((v) => isNaN(v) || v <= 0)) {
      alert("Please enter valid numbers");
      return;
    }

    // Volume in cubic meters
    const volume = l * w * h;

    // Include wastage
    const totalVolume = volume * (1 + wastage / 100);

    // Total cost
    const totalCost = totalVolume * cost;

    setResult({
      volume: volume.toFixed(3),
      totalVolume: totalVolume.toFixed(3),
      totalCost: totalCost.toFixed(2),
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Wood Calculator 🪵</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Length (m)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Width (m)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Height/Thickness (m)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Cost per m³"
          value={costPerCubicMeter}
          onChange={(e) => setCostPerCubicMeter(e.target.value)}
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
          onClick={calculate}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>Volume: {result.volume} m³</p>
          <p>Total Volume (with wastage): {result.totalVolume} m³</p>
          <p>Total Cost: ₹{result.totalCost}</p>
        </div>
      )}
    </div>
  );
}
