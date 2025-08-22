"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCubes, FaHammer, FaPaintRoller, FaTree, FaLayerGroup, FaChartLine, FaMoon, FaSun } from "react-icons/fa";
import { GiBrickWall, GiBeamMeUp } from "react-icons/gi";
import { MdOutlineCalculate } from "react-icons/md";

interface Calculator {
  name: string;
  path: string;
  icon: JSX.Element;
  desc: string;
  category: "Materials" | "Structural" | "Estimation";
  color: string;
}

export default function CalculatorsPage() {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>(["Materials", "Structural", "Estimation"]);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(savedTheme === "true");
  }, []);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const calculators: Calculator[] = [
    { name: "Concrete", path: "/calculators/concrete", icon: <FaCubes size={28} />, desc: "Mix & volume calculation", category: "Materials", color: "bg-red-100" },
    { name: "Steel", path: "/calculators/steel", icon: <FaHammer size={28} />, desc: "Reinforcement estimation", category: "Materials", color: "bg-red-100" },
    { name: "Brick", path: "/calculators/brick", icon: <GiBrickWall size={28} />, desc: "Quantity & cost", category: "Materials", color: "bg-red-100" },
    { name: "Wood", path: "/calculators/wood", icon: <FaTree size={28} />, desc: "Volume, cost & wastage", category: "Materials", color: "bg-red-100" },
    { name: "Paint", path: "/calculators/paint", icon: <FaPaintRoller size={28} />, desc: "Walls & ceiling coverage", category: "Materials", color: "bg-red-100" },
    { name: "Tiles/Flooring", path: "/calculators/tiles", icon: <FaLayerGroup size={28} />, desc: "Tile numbers + wastage", category: "Materials", color: "bg-red-100" },

    { name: "Beam Load", path: "/calculators/beam", icon: <GiBeamMeUp size={28} />, desc: "Bending & shear forces", category: "Structural", color: "bg-green-100" },
    { name: "Column Load", path: "/calculators/column", icon: <MdOutlineCalculate size={28} />, desc: "Axial load & reinforcement", category: "Structural", color: "bg-green-100" },
    { name: "Slab Thickness/Load", path: "/calculators/slab", icon: <FaLayerGroup size={28} />, desc: "Slab thickness & total load", category: "Structural", color: "bg-green-100" },

    { name: "General Estimator", path: "/calculators/estimator", icon: <FaChartLine size={28} />, desc: "Total project cost", category: "Estimation", color: "bg-blue-100" },
    { name: "Plaster", path: "/calculators/plaster", icon: <FaCubes size={28} />, desc: "Cement & sand quantities", category: "Estimation", color: "bg-blue-100" },
    { name: "Excavation", path: "/calculators/excavation", icon: <FaHammer size={28} />, desc: "Earthwork volume", category: "Estimation", color: "bg-blue-100" },
  ];

  const categories = ["Materials", "Structural", "Estimation"] as const;

  const badgeColors: Record<Calculator["category"], string> = {
    Materials: "bg-red-600 text-white",
    Structural: "bg-green-600 text-white",
    Estimation: "bg-blue-600 text-white",
  };

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filteredCalculators = calculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(search.toLowerCase()) &&
      activeCategories.includes(calc.category)
  );

  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={i} className="bg-yellow-300 rounded px-1">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={darkMode ? "p-6 max-w-6xl mx-auto space-y-8 bg-gray-900 text-gray-100 min-h-screen" : "p-6 max-w-6xl mx-auto space-y-8 bg-gray-50 text-gray-900 min-h-screen"}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center flex-1">All Calculators 🏗️</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search calculators..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex justify-center space-x-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold border transition ${
              activeCategories.includes(cat)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Calculator Grids / No Results */}
      {filteredCalculators.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-12">
          😕 No results found. Try a different search term or category.
        </p>
      ) : (
        categories.map((cat) => {
          const catCalcs = filteredCalculators.filter((c) => c.category === cat);
          if (catCalcs.length === 0) return null;

          return (
            <div key={cat}>
              <h2 className="text-2xl font-semibold mb-4">{cat} Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catCalcs.map((calc) => (
                  <Link
                    key={calc.name}
                    href={calc.path}
                    className={`p-6 rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 ${calc.color} dark:bg-gray-800 dark:text-gray-100`}
                  >
                    <div className="text-gray-700 dark:text-gray-200">{calc.icon}</div>
                    <h3 className="text-xl font-semibold">{highlightText(calc.name, search)}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{calc.desc}</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColors[calc.category]}`}>
                      {calc.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
