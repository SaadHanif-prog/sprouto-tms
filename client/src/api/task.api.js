import API_PATHS from "../../url";

// Helper to handle response
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

// Create Task (requires auth)
export const createTask = async (taskData) => {
  const res = await fetch(API_PATHS.CREATE_TASK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

// Get All Tasks (public)
export const getAllTasks = async () => {
  const res = await fetch(API_PATHS.GET_TASKS);
  return handleResponse(res);
};

// Get Task by ID (public)
export const getTaskById = async (id) => {
  const res = await fetch(API_PATHS.GET_TASK_BY_ID(id));
  return handleResponse(res);
};

// Update Task (requires auth)
export const updateTask = async (id, updatedData) => {
  const res = await fetch(API_PATHS.UPDATE_TASK(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return handleResponse(res);
};

// Update Task Status (requires auth)

export const updateTaskStatus = async (id, status) => {
  const res = await fetch(API_PATHS.UPDATE_TASK_STATUS(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

// Delete Task (requires auth)
export const deleteTask = async (id) => {
  const res = await fetch(API_PATHS.DELETE_TASK(id), {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res);
};
