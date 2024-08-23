import apiClient from "../clients/apiClient";
import { errorHandler } from "../utils/errorHandler";

// Login
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};
