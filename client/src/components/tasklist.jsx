import { useState, useEffect } from "react";

// Icons
import { Pencil, Trash2 } from "lucide-react";

// Modals
import EditTaskModal from "../modals/update-task-modal";
import DeleteTaskModal from "../modals/delete-task-modal";

// Fetch Functions
import { getAllTasks, deleteTask, updateTask } from "../api/task.api";

// Toastify
import { toast } from "react-toastify";

export default function TaskList({ tasks, setTasks }) {
  const [editModalTask, setEditModalTask] = useState(null);
  const [deleteModalTask, setDeleteModalTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch All Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err.message);
      }
    };

    fetchTasks();
  }, []);

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err.message);
      toast.error(err.message);
    }
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
        {filteredTasks.length === 0 ? (
          <p className="text-center text-primary col-span-2">
            No tasks found. You can add one now.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-300 rounded-md p-4 shadow-sm flex flex-col gap-y-2 bg-white"
            >
              <div className="text-lg font-semibold flex justify-between items-center">
                {task.title}
                <div className="flex gap-x-2">
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
          ))
        )}
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
          onConfirm={() => deleteTaskHandler(deleteModalTask._id)}
        />
      )}
    </main>
  );
}
