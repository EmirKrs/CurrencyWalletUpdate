import apiClient from "../clients/apiClient";

// Users Info
export const userData = async () => {
    try {
      const response = await apiClient.get("/users/info");
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Profil bilgileri alınırken bir hata oluştu.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

  // User Info Update
  export const userUpdate = async (body) => {
    try {
      const response = await apiClient.put("/users/update-info", body);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Profil verileri güncellenirken bir hata oluştu.");
      }  else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

// Forgot Password
export const forgotPassword = async (encodedEmail) => {
  try {
    const response = await apiClient.get(`/users/forgot-password?mailAddress=${encodedEmail}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.Messages?.[0] || "Email gönderme sırasında bir hata oluştu.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};

// Approve Password
export const approveCode = async (approveCode, email) => {
  try {
    const response = await apiClient.get(`/users/check-approve-code?approveCode=${approveCode}&mailAddress=${email}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.Messages?.[0] || "Onay kodu işlemi sırasında bir hata oluştu.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};

// Reset Password
export const resetPassword = async (body) => {
  try {
    const response = await apiClient.post(`/users/reset-password`,body);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.Messages?.[0] || "Şifre yenileme işleminde bir hata oluştu.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};