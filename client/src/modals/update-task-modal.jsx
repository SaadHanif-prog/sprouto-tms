import { useState, useEffect } from "react";
import { updateTask as updateTaskAPI } from "../api/task.api";

export default function EditTaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDesc(task.description);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTaskAPI(task._id, {
        title,
        description: desc,
      });

      if (response && response.data) {
        onUpdate(response.data);
      } else {
        console.error("No data returned from update API");
      }

      onClose();
    } catch (err) {
      console.error("Failed to update task:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 rounded-md shadow-lg w-[90%] md:max-w-md">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
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
              className="text-md md:text-lg px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
