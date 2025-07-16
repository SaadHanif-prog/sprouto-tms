export default function DeleteTaskModal({ task, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 rounded-md shadow-lg w-[90%] md:max-w-md">
        <h2 className="text-lg md:text-2xl font-semibold mb-4 text-red-600">
          Delete Task
        </h2>
        <p className="mb-4">
          Are you sure you want to delete <strong>{task.title}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(task._id);
              onClose();
            }}
            className="text-md md:text-lg px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
