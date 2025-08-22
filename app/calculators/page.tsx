"use client";

import { useState } from "react";

export default function CalculatorsPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value: string) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      // ⚠️ eval is used here for simplicity, but replace with a safe parser later
      const res = eval(input);
      setResult(res.toString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Calculator</h1>

        <div className="mb-2 p-2 bg-gray-200 rounded">
          <p className="text-right">{input || "0"}</p>
          <p className="text-right font-bold text-xl">{result}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((btn) => (
            <button
              key={btn}
              className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600"
              onClick={() => (btn === "=" ? handleCalculate() : handleClick(btn))}
            >
              {btn}
            </button>
          ))}
          <button
            className="col-span-4 bg-red-500 text-white p-3 rounded-xl hover:bg-red-600"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
