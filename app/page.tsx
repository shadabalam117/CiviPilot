"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: "Pending" | "In Progress" | "Completed";
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState("light");
  const [unit, setUnit] = useState("metric");

  // Load tasks + settings from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);

    const savedUnit = localStorage.getItem("unit");
    if (savedUnit) setUnit(savedUnit);
  }, []);

  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Task Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-100 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{pending}</p>
          <p className="text-sm text-red-700">Pending Tasks</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{inProgress}</p>
          <p className="text-sm text-yellow-700">In Progress</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{completed}</p>
          <p className="text-sm text-green-700">Completed</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/calculators"
          className="bg-blue-500 text-white p-4 rounded-xl text-center hover:bg-blue-600"
        >
          Open Calculator
        </Link>
        <Link
          href="/tasks"
          className="bg-purple-500 text-white p-4 rounded-xl text-center hover:bg-purple-600"
        >
          Manage Tasks
        </Link>
      </div>

      {/* Settings Preview */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">Your Settings</h2>
        <p>🌙 Theme: <span className="font-semibold">{theme}</span></p>
        <p>📏 Units: <span className="font-semibold">{unit}</span></p>
        <Link
          href="/settings"
          className="inline-block mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Update Settings
        </Link>
      </div>
    </div>
  );
          }
