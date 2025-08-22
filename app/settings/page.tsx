"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [unit, setUnit] = useState("metric");

  // Load saved settings
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedUnit = localStorage.getItem("unit");
    if (savedTheme) setTheme(savedTheme);
    if (savedUnit) setUnit(savedUnit);
  }, []);

  // Save settings
  const saveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("unit", unit);
    alert("Settings saved ✅");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>

        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        {/* Units Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Units</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="metric">Metric (m, kg)</option>
            <option value="imperial">Imperial (ft, lb)</option>
          </select>
        </div>

        <button
          onClick={saveSettings}
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
