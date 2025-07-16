const BASE_URL = "http://localhost:5000";

const API_PATHS = {
  // Task routes
  GET_TASKS: `${BASE_URL}/api/v1/tasks`,
  CREATE_TASK: `${BASE_URL}/api/v1/tasks`,
  UPDATE_TASK: (id) => `${BASE_URL}/api/v1/tasks/${id}`,
  DELETE_TASK: (id) => `${BASE_URL}/api/v1/tasks/${id}`,
  GET_TASK_BY_ID: (id) => `${BASE_URL}/api/v1/tasks/${id}`,

  // Auth routes
  SIGNUP: `${BASE_URL}/api/v1/auth/signup`,
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
};

export default API_PATHS;
