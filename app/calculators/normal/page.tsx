"use client";
import { useState } from "react";

export default function NormalCalculator() {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80">
        <h1 className="text-xl font-bold text-center mb-4">Normal Calculator</h1>
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-2 mb-4 text-right border rounded-lg bg-gray-100"
        />
        <div className="grid grid-cols-4 gap-2">
          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                btn === "=" ? handleCalculate() : handleClick(btn)
              }
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="col-span-4 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
