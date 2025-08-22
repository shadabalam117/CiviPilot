"use client";

import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: "Pending" | "In Progress" | "Completed";
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // Load saved tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks automatically
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (!title || !deadline) return alert("Please fill all fields");

    const newTask: Task = {
      id: Date.now(),
      title,
      deadline,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDeadline("");
  };

  // Update status
  const updateStatus = (id: number, status: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Project Tasks</h1>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task name (e.g., Concrete pour)"
            className="flex-1 p-2 border rounded-lg"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">No tasks yet.</p>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-xl"
            >
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600">
                  Deadline: {task.deadline}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      task.status === "Completed"
                        ? "text-green-600"
                        : task.status === "In Progress"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {task.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task.id, e.target.value as Task["status"])
                  }
                  className="p-1 border rounded-lg"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
              }
