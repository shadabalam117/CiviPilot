"use client";

import { useState } from "react";

export default function BrickCalculator() {
  // Inputs (defaults are typical values)
  const [wallLength, setWallLength] = useState<number | "">(3); // meters
  const [wallHeight, setWallHeight] = useState<number | "">(2.5); // meters
  const [wallThickness, setWallThickness] = useState<number | "">(0.23); // m (230mm common)
  const [brickLength, setBrickLength] = useState<number | "">(0.19); // m (190mm)
  const [brickHeight, setBrickHeight] = useState<number | "">(0.09); // m (90mm)
  const [brickWidth, setBrickWidth] = useState<number | "">(0.09); // m (90mm)
  const [wastage, setWastage] = useState<number | "">(5); // percent
  const [mixCementPart, setMixCementPart] = useState<number | "">(1);
  const [mixSandPart, setMixSandPart] = useState<number | "">(6); // 1:6 mortar default

  // Outputs
  const [results, setResults] = useState<{
    masonryVolume: number;
    brickVolume: number;
    bricksRequired: number;
    mortarVolume: number;
    cementKg: number;
    cementBags: number;
    sandVolume: number;
    sandKg: number;
  } | null>(null);

  const toNum = (v: number | "") => (v === "" ? NaN : Number(v));

  const calculate = () => {
    // basic validation
    const L = toNum(wallLength);
    const H = toNum(wallHeight);
    const T = toNum(wallThickness);
    const bl = toNum(brickLength);
    const bh = toNum(brickHeight);
    const bw = toNum(brickWidth);
    const w = toNum(wastage);
    const cp = toNum(mixCementPart);
    const sp = toNum(mixSandPart);

    if ([L, H, T, bl, bh, bw, w, cp, sp].some((x) => isNaN(x) || x <= 0)) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }

    // 1) Masonry volume (gross) = L * H * T (m^3)
    const masonryVolume = L * H * T;

    // 2) Brick volume (single brick) = l * h * w (m^3)
    const singleBrickVol = bl * bh * bw;

    // 3) Number of bricks (without wastage) = masonryVolume / singleBrickVol
    const bricksNoWastage = masonryVolume / singleBrickVol;

    // 4) Apply wastage %
    const bricksRequired = Math.ceil(bricksNoWastage * (1 + w / 100));

    // 5) Total volume of bricks used
    const totalBrickVolume = bricksRequired * singleBrickVol;

    // 6) Mortar volume (approximately) = masonryVolume - volume of bricks
    //    (If result negative due to unrealistic inputs, floor to small positive)
    let mortarVolume = masonryVolume - totalBrickVolume;
    if (mortarVolume < 0) mortarVolume = Math.abs(mortarVolume) * 0.05; // fallback tiny mortar

    // 7) Split mortar by mix ratio cp:sp
    const totalParts = cp + sp;
    const cementVolume = (mortarVolume * cp) / totalParts;
    const sandVolume = (mortarVolume * sp) / totalParts;

    // 8) Convert volumes to masses using densities (approx)
    const cementDensity = 1440; // kg/m^3 (typical)
    const sandDensity = 1600; // kg/m^3 (typical)

    const cementKg = cementVolume * cementDensity;
    const cementBags = Math.ceil(cementKg / 50); // 50 kg bag

    const sandKg = sandVolume * sandDensity;

    setResults({
      masonryVolume: Number(masonryVolume.toFixed(3)),
      brickVolume: Number(singleBrickVol.toFixed(6)),
      bricksRequired,
      mortarVolume: Number(mortarVolume.toFixed(3)),
      cementKg: Number(cementKg.toFixed(2)),
      cementBags,
      sandVolume: Number(sandVolume.toFixed(3)),
      sandKg: Number(sandKg.toFixed(2)),
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Brick Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wall inputs */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Wall Dimensions</h2>
          <label className="block mb-2">
            Length (m)
            <input
              type="number"
              step="0.01"
              value={wallLength}
              onChange={(e) => setWallLength(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Height (m)
            <input
              type="number"
              step="0.01"
              value={wallHeight}
              onChange={(e) => setWallHeight(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Thickness (m)
            <input
              type="number"
              step="0.01"
              value={wallThickness}
              onChange={(e) => setWallThickness(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
        </div>

        {/* Brick & mortar inputs */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Brick & Mortar</h2>

          <label className="block mb-2">
            Brick Length (m)
            <input
              type="number"
              step="0.001"
              value={brickLength}
              onChange={(e) => setBrickLength(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Brick Height (m)
            <input
              type="number"
              step="0.001"
              value={brickHeight}
              onChange={(e) => setBrickHeight(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Brick Width (m)
            <input
              type="number"
              step="0.001"
              value={brickWidth}
              onChange={(e) => setBrickWidth(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            Wastage (%)
            <input
              type="number"
              step="0.1"
              value={wastage}
              onChange={(e) => setWastage(Number(e.target.value))}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            Mortar Mix (Cement : Sand) — enter parts
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                step="1"
                value={mixCementPart}
                onChange={(e) => setMixCementPart(Number(e.target.value))}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                step="1"
                value={mixSandPart}
                onChange={(e) => setMixSandPart(Number(e.target.value))}
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <small className="text-gray-500">Default 1:6 (cement:sand)</small>
          </label>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={calculate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>
        <button
          onClick={() => {
            // reset
            setWallLength(3);
            setWallHeight(2.5);
            setWallThickness(0.23);
            setBrickLength(0.19);
            setBrickHeight(0.09);
            setBrickWidth(0.09);
            setWastage(5);
            setMixCementPart(1);
            setMixSandPart(6);
            setResults(null);
          }}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p>Masonry Volume: <b>{results.masonryVolume} m³</b></p>
          <p>Single Brick Volume: <b>{results.brickVolume} m³</b></p>
          <p>Bricks Required (incl. wastage): <b>{results.bricksRequired}</b></p>
          <p>Mortar Volume: <b>{results.mortarVolume} m³</b></p>
          <p>Cement: <b>{results.cementKg} kg</b> (~ <b>{results.cementBags}</b> bags of 50 kg)</p>
          <p>Sand: <b>{results.sandKg} kg</b> (~ <b>{results.sandVolume} m³</b>)</p>

          <div className="mt-3 text-sm text-gray-600">
            <p><b>Notes:</b></p>
            <ul className="list-disc ml-5">
              <li>Calculations are approximate — adjust brick dims, densities or mix ratio if you use different standards.</li>
              <li>Mortar volume = masonry volume − brick volume (approx). Densities used: cement 1440 kg/m³, sand 1600 kg/m³.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
      }
