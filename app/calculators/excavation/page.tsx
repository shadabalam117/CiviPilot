"use client";

import { useState } from "react";

export default function ExcavationCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [wastagePercent, setWastagePercent] = useState("5"); // default 5%
  const [volume, setVolume] = useState<number | null>(null);

  const calculateVolume = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const D = parseFloat(depth);
    const wastage = parseFloat(wastagePercent);

    if ([L, W, D, wastage].some((v) => isNaN(v) || v <= 0)) {
      alert("Please enter valid numbers");
      return;
    }

    // Volume in cubic meters
    let vol = L * W * D;

    // Include wastage
    vol *= 1 + wastage / 100;

    setVolume(parseFloat(vol.toFixed(3)));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Excavation/Earthwork Calculator ⛏️</h1>

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
          placeholder="Depth (m)"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
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
          onClick={calculateVolume}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {volume !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>Excavation Volume: {volume} m³</p>
        </div>
      )}
    </div>
  );
}
