import apiClient from "../clients/apiClient";

// Buy Balance
export const buyBalance = async (body) => {
  try {
    const response = await apiClient.post("/wallet/buy-balance", body);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.Messages?.[0] || "Ödeme sırasında bir hata oluştu.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};

// Wallet Information
export const wallet = async () => {
  try {
    const response = await apiClient.get("/wallet");
    return response.data;
  } catch (error) {
    throw new Error("Beklenmedik bir hata oluştu.");
  }
};

// Wallet Is Exist
export const walletIsExist = async () => {
  try {
    const response = await apiClient.get("/wallet/is-exist");
    return response.data;
  } catch (error) {
    return Promise.reject("Beklenmedik bir hata oluştu.");
  }
};

// Sell Currency
export const sellCurrency = async (body) => {
  try {
    const response = await apiClient.post("/wallet/sell-currency", body);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.Messages?.[0] ||"Döviz satma sırasında bir hata oluştu.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};

// Buy Currency
export const buyCurrency = async (body) => {
  try {
    const response = await apiClient.post("/wallet/buy-currency", body);
    return response.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject( error.response.data.Messages?.[0] ||"Döviz alma sırasında bir hata oluştu.");
    } else {
      return Promise.reject("Beklenmedik bir hata oluştu.");
    }
  }
};
