"use client";

import { useState } from "react";

export default function BeamCalculator() {
  const [length, setLength] = useState(""); // Beam span (m)
  const [load, setLoad] = useState(""); // UDL in kN/m
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const w = parseFloat(load);

    if (isNaN(L) || isNaN(w) || L <= 0 || w <= 0) {
      alert("Please enter valid numbers");
      return;
    }

    // Shear force at supports: V = w*L/2
    const V = (w * L) / 2;

    // Maximum bending moment at midspan: M = w*L^2/8
    const M = (w * L * L) / 8;

    setResult({
      shearForce: V.toFixed(2),
      bendingMoment: M.toFixed(2),
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Beam Load Calculator 🏗️</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Beam Span (m)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Uniform Load (kN/m)"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
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
          <p>Shear Force at Supports: {result.shearForce} kN</p>
          <p>Maximum Bending Moment at Midspan: {result.bendingMoment} kNm</p>
        </div>
      )}
    </div>
  );
}
