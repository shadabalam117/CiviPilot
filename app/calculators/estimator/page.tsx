"use client";

import { useState } from "react";

export default function ConstructionEstimator() {
  const [area, setArea] = useState("");
  const [costPerSqM, setCostPerSqM] = useState("");
  const [plasterCost, setPlasterCost] = useState("0");
  const [flooringCost, setFlooringCost] = useState("0");
  const [paintCost, setPaintCost] = useState("0");
  const [contingencyPercent, setContingencyPercent] = useState("5"); // default 5%
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const calculateTotalCost = () => {
    const A = parseFloat(area);
    const C = parseFloat(costPerSqM);
    const plaster = parseFloat(plasterCost);
    const flooring = parseFloat(flooringCost);
    const paint = parseFloat(paintCost);
    const contingency = parseFloat(contingencyPercent);

    if ([A, C, plaster, flooring, paint, contingency].some((v) => isNaN(v) || v < 0)) {
      alert("Please enter valid numbers");
      return;
    }

    // Base cost
    const baseCost = A * C;

    // Add optional costs
    const subtotal = baseCost + plaster + flooring + paint;

    // Add contingency
    const total = subtotal * (1 + contingency / 100);

    setTotalCost(parseFloat(total.toFixed(2)));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">General Construction Estimator 🏗️💰</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Built-up Area (m²)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Cost per m² (₹)"
          value={costPerSqM}
          onChange={(e) => setCostPerSqM(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Plaster Cost (optional ₹)"
          value={plasterCost}
          onChange={(e) => setPlasterCost(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Flooring Cost (optional ₹)"
          value={flooringCost}
          onChange={(e) => setFlooringCost(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Paint Cost (optional ₹)"
          value={paintCost}
          onChange={(e) => setPaintCost(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Contingency (%)"
          value={contingencyPercent}
          onChange={(e) => setContingencyPercent(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={calculateTotalCost}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Calculate Total Cost
        </button>
      </div>

      {totalCost !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>
            <strong>Total Estimated Cost:</strong> ₹{totalCost}
          </p>
        </div>
      )}
    </div>
  );
}
