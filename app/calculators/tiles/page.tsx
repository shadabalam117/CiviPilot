"use client";

import { useState } from "react";

export default function TilesCalculator() {
  const [floorLength, setFloorLength] = useState("");
  const [floorWidth, setFloorWidth] = useState("");
  const [tileLength, setTileLength] = useState("");
  const [tileWidth, setTileWidth] = useState("");
  const [wastagePercent, setWastagePercent] = useState("5"); // default 5%
  const [result, setResult] = useState<number | null>(null);

  const calculateTiles = () => {
    const lFloor = parseFloat(floorLength);
    const wFloor = parseFloat(floorWidth);
    const lTile = parseFloat(tileLength);
    const wTile = parseFloat(tileWidth);
    const wastage = parseFloat(wastagePercent);

    if ([lFloor, wFloor, lTile, wTile, wastage].some((v) => isNaN(v) || v <= 0)) {
      alert("Please enter valid numbers");
      return;
    }

    // Floor area
    const floorArea = lFloor * wFloor;

    // Tile area
    const tileArea = lTile * wTile;

    // Number of tiles without wastage
    let tilesNeeded = floorArea / tileArea;

    // Include wastage
    tilesNeeded *= 1 + wastage / 100;

    setResult(Math.ceil(tilesNeeded));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tiles/Flooring Calculator 🧱</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Floor/Wall Length (m)"
          value={floorLength}
          onChange={(e) => setFloorLength(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Floor/Wall Width (m)"
          value={floorWidth}
          onChange={(e) => setFloorWidth(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Tile Length (m)"
          value={tileLength}
          onChange={(e) => setTileLength(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Tile Width (m)"
          value={tileWidth}
          onChange={(e) => setTileWidth(e.target.value)}
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
          onClick={calculateTiles}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>Total Tiles Required: {result}</p>
        </div>
      )}
    </div>
  );
}
