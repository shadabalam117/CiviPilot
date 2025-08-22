"use client";

import { useState } from "react";

export default function SlabCalculator() {
  const [length, setLength] = useState(""); // slab length in m
  const [width, setWidth] = useState(""); // slab width in m
  const [thickness, setThickness] = useState(""); // slab thickness in mm
  const [liveLoad, setLiveLoad] = useState(""); // kN/m²
  const [deadLoad, setDeadLoad] = useState(""); // kN/m²
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const t = parseFloat(thickness);
    const LL = parseFloat(liveLoad);
    const DL = parseFloat(deadLoad);

    if ([L, W, t, LL, DL].some((v) => isNaN(v) || v <= 0)) {
      alert("Please enter valid numbers");
      return;
    }

    // Slab area
    const area = L * W; // m²

    // Slab volume
    const volume = area * (t / 1000); // convert mm to m

    // Self weight of slab (concrete density ~25 kN/m³)
    const selfWeight = volume * 25; // kN

    // Total load
    const totalLoad = selfWeight + LL * area + DL * area; // kN

    setResult({
      area: area.toFixed(2),
      volume: volume.toFixed(3),
      selfWeight: selfWeight.toFixed(2),
      totalLoad: totalLoad.toFixed(2),
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Slab Thickness/Load Calculator 🏢</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Slab Length (m)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Slab Width (m)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Slab Thickness (mm)"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Live Load (kN/m²)"
          value={liveLoad}
          onChange={(e) => setLiveLoad(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Dead Load (kN/m²)"
          value={deadLoad}
          onChange={(e) => setDeadLoad(e.target.value)}
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
          <p>Slab Area: {result.area} m²</p>
          <p>Slab Volume: {result.volume} m³</p>
          <p>Self Weight: {result.selfWeight} kN</p>
          <p>Total Load: {result.totalLoad} kN</p>
        </div>
      )}
    </div>
  );
}
