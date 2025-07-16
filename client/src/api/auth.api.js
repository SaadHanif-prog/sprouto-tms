import API_PATHS from "../url";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Signup
export const signup = async (userData) => {
  const res = await fetch(API_PATHS.SIGNUP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

// Login
export const login = async (userData) => {
  const res = await fetch(API_PATHS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

// Logout
export const logout = async () => {
  const res = await fetch(API_PATHS.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
};
