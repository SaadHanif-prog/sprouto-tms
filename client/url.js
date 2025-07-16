const BASE_URL = "http://localhost:5000";

const API_PATHS = {
  // Task routes
  GET_TASKS: `${BASE_URL}/api/v1/tasks`,
  CREATE_TASK: `${BASE_URL}/api/v1/tasks`,
  UPDATE_TASK: (id) => `${BASE_URL}/api/v1/tasks/${id}`,
  UPDATE_TASK_STATUS: (id) => `${BASE_URL}/tasks/${id}/status`,
  DELETE_TASK: (id) => `${BASE_URL}/api/v1/tasks/${id}`,
  GET_TASK_BY_ID: (id) => `${BASE_URL}/api/v1/tasks/${id}`,

  // Auth routes
  SIGNUP: `${BASE_URL}/api/v1/auth/signup`,
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
  CHECK_AUTH: `${BASE_URL}/api/v1/auth/check-auth`,
};

export default API_PATHS;
