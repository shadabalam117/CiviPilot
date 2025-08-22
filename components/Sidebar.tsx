"use client";

import Link from "next/link";

export default function Sidebar() {
  const mainMenu = [
    { name: "Dashboard", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: "Diary", path: "/diary" },
    { name: "Tasks", path: "/tasks" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Civil Eng App</h2>
      <ul className="space-y-2">
        {mainMenu.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="block p-2 rounded hover:bg-gray-700 transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
