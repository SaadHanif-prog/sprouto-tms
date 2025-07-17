const BASE_URL = "/api/v1";

const API_PATHS = {
  // Task routes
  GET_TASKS: `${BASE_URL}/tasks`,
  CREATE_TASK: `${BASE_URL}/tasks`,
  UPDATE_TASK: (id) => `${BASE_URL}/tasks/${id}`,
  UPDATE_TASK_STATUS: (id) => `${BASE_URL}/tasks/${id}/status`,
  DELETE_TASK: (id) => `${BASE_URL}/tasks/${id}`,
  GET_TASK_BY_ID: (id) => `${BASE_URL}/tasks/${id}`,

  // Auth routes
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  CHECK_AUTH: `${BASE_URL}/auth/check-auth`,
};

export default API_PATHS;
