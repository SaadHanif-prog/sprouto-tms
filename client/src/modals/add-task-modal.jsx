import { useState } from "react";
import { createTask } from "../api/task.api";

export default function AddTaskModal({ onClose, setTasks }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  // Add Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await createTask({ title, description: desc });

      if (!response || !response.data || !response.data._id) {
        throw new Error("Invalid response from server");
      }

      setTasks((prev) => [response.data, ...prev]);
      setTitle("");
      setDesc("");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 rounded-md shadow-lg w-[90%] md:max-w-md">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">Add Task</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-2 rounded h-30"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-md md:text-lg px-4 py-2 bg-gray-300 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-md md:text-lg px-4 py-2 bg-green-400 text-white rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
