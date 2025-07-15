import { useState } from "react";

// Icons
import { Pencil, Trash2, Star, StarOff } from "lucide-react";

// Modals
import EditTaskModal from "../modals/update-task-modal";
import DeleteTaskModal from "../modals/delete-task-modal";

export default function TaskList() {
  const initialTasks = [
    {
      id: 1,
      title: "Buy groceries",
      description:
        "Complete the frontend and backend integration, write tests, and finalize documentation for the upcoming Monday release.",
      important: false,
      status: "pending",
    },
    {
      id: 2,
      title: "Finish project",
      description:
        "Complete the frontend and backend integration, write tests, and finalize documentation for the upcoming Monday release.",
      important: false,
      status: "completed",
    },
    {
      id: 3,
      title: "Call friend",
      description:
        "Don’t forget to call Alex and wish him a happy birthday. Ask about the trip and schedule a coffee meetup next week.",
      important: false,
      status: "pending",
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [editModalTask, setEditModalTask] = useState(null);
  const [deleteModalTask, setDeleteModalTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const getShortDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length <= 20) return desc;
    return words.slice(0, 20).join(" ") + "......";
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="max-w-5xl mx-1 md:mx-auto border border-primary p-3 rounded-md">
      {/* Filter and Search Bar */}
      <div className="mb-2 text-primary">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm w-60 h-10"
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <label htmlFor="filter" className="text-sm font-medium ">
            Filter by:
          </label>
          <select
            id="filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm text-white bg-blue-400"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`border border-gray-300 rounded-md p-4 shadow-sm flex flex-col gap-y-2 ${
              task.important ? "bg-yellow-100" : "bg-white"
            }`}
          >
            <div className="text-lg font-semibold flex justify-between items-center ">
              {task.title}
              <div className="flex gap-x-2">
                <button
                  className="text-yellow-500 hover:text-yellow-600"
                  onClick={() => toggleImportant(task.id)}
                >
                  {task.important ? (
                    <Star fill="currentColor" size={18} />
                  ) : (
                    <StarOff size={18} />
                  )}
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setEditModalTask(task)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setDeleteModalTask(task)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="text-sm border rounded px-1 py-0.5 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <p className="text-gray-600">
              {getShortDescription(task.description)}
            </p>
          </div>
        ))}
      </div>

      {/* Modals */}
      {editModalTask && (
        <EditTaskModal
          task={editModalTask}
          onClose={() => setEditModalTask(null)}
          onUpdate={updateTask}
        />
      )}
      {deleteModalTask && (
        <DeleteTaskModal
          task={deleteModalTask}
          onClose={() => setDeleteModalTask(null)}
          onConfirm={deleteTask}
        />
      )}
    </main>
  );
}
