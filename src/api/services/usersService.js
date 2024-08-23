import apiClient from "../clients/apiClient";

// Users Info
export const userData = async () => {
    try {
      const response = await apiClient.get("/users/info");
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  // User Info Update
  export const userUpdate = async (body) => {
    try {
      const response = await apiClient.put("/users/update-info", body);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

// Forgot Password
export const forgotPassword = async (encodedEmail) => {
  try {
    const response = await apiClient.get(`/users/forgot-password?mailAddress=${encodedEmail}`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Approve Password
export const approveCode = async (approveCode, email) => {
  try {
    const response = await apiClient.get(`/users/check-approve-code?approveCode=${approveCode}&mailAddress=${email}`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Reset Password
export const resetPassword = async (body) => {
  try {
    const response = await apiClient.post(`/users/reset-password`,body);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};