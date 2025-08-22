"use client";

import { useState } from "react";

export default function CementCalculator() {
  const [volume, setVolume] = useState<number>(0);
  const [mixRatio, setMixRatio] = useState<string>("1:2:4"); // Default ratio
  const [result, setResult] = useState<string>("");

  const calculateCement = () => {
    if (!volume || volume <= 0) {
      setResult("Please enter a valid volume.");
      return;
    }

    // Extract ratio parts
    const [cement, sand, aggregate] = mixRatio.split(":").map(Number);
    const totalParts = cement + sand + aggregate;

    // Dry volume factor ~ 1.54
    const dryVolume = volume * 1.54;

    // Cement part
    const cementVolume = (cement / totalParts) * dryVolume;

    // 1 bag = 0.035 m³
    const cementBags = cementVolume / 0.035;

    setResult(
      `For ${volume} m³ with mix ratio ${mixRatio}, you need approx. ${cementBags.toFixed(
        2
      )} bags of cement.`
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Cement Calculator</h1>

      <label className="block mb-2">Volume (m³):</label>
      <input
        type="number"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="border rounded p-2 w-full mb-4"
        placeholder="Enter volume in cubic meters"
      />

      <label className="block mb-2">Mix Ratio (Cement:Sand:Aggregate):</label>
      <input
        type="text"
        value={mixRatio}
        onChange={(e) => setMixRatio(e.target.value)}
        className="border rounded p-2 w-full mb-4"
        placeholder="e.g. 1:2:4"
      />

      <button
        onClick={calculateCement}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {result && <p className="mt-4 text-lg font-medium text-gray-700">{result}</p>}
    </div>
  );
}
