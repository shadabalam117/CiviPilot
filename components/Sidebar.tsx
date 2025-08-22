"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/calculators" },
  { name: "Tasks", path: "/tasks" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Civil Engineer App</h1>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-3 rounded-lg hover:bg-gray-700 ${
              pathname === item.path ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
