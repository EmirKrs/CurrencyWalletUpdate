import apiClient from "../clients/apiClient";

// Login
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject( error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject( error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject( error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı." );
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};
