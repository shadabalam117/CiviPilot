"use client";

import { useState } from "react";

export default function PlasterCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [cementRatio, setCementRatio] = useState("1");
  const [sandRatio, setSandRatio] = useState("4");
  const [result, setResult] = useState<any>(null);

  const calculatePlaster = () => {
    const l = parseFloat(length);
    const h = parseFloat(height);
    const t = parseFloat(thickness) / 100; // cm → m
    const cRatio = parseFloat(cementRatio);
    const sRatio = parseFloat(sandRatio);

    if (isNaN(l) || isNaN(h) || isNaN(t) || isNaN(cRatio) || isNaN(sRatio)) {
      alert("Please enter valid numbers");
      return;
    }

    // Surface area
    const area = l * h;

    // Wet volume of plaster
    const wetVolume = area * t;

    // Dry volume = 1.33 * wet volume (33% extra for shrinkage)
    const dryVolume = 1.33 * wetVolume;

    // Total proportion
    const totalRatio = cRatio + sRatio;

    // Cement volume
    const cementVol = (cRatio / totalRatio) * dryVolume;

    // Sand volume
    const sandVol = (sRatio / totalRatio) * dryVolume;

    // 1 bag cement = 0.0347 m³
    const cementBags = cementVol / 0.0347;

    setResult({
      area: area.toFixed(2),
      wetVolume: wetVolume.toFixed(3),
      dryVolume: dryVolume.toFixed(3),
      cementBags: cementBags.toFixed(2),
      sandVol: sandVol.toFixed(3),
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Plaster Calculator</h1>

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
          placeholder="Height (m)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Thickness (cm)"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Cement Ratio"
            value={cementRatio}
            onChange={(e) => setCementRatio(e.target.value)}
            className="border p-2 w-1/2 rounded"
          />
          <input
            type="number"
            placeholder="Sand Ratio"
            value={sandRatio}
            onChange={(e) => setSandRatio(e.target.value)}
            className="border p-2 w-1/2 rounded"
          />
        </div>

        <button
          onClick={calculatePlaster}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p>Surface Area: {result.area} m²</p>
          <p>Wet Volume: {result.wetVolume} m³</p>
          <p>Dry Volume: {result.dryVolume} m³</p>
          <p>Cement: {result.cementBags} bags</p>
          <p>Sand: {result.sandVol} m³</p>
        </div>
      )}
    </div>
  );
    }
