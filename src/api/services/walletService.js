import apiClient from "../clients/apiClient";
import { errorHandler } from "../utils/errorHandler";

// Buy Balance
export const buyBalance = async (body) => {
  try {
    const response = await apiClient.post("/wallet/buy-balance", body);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Wallet Information
export const wallet = async () => {
  try {
    const response = await apiClient.get("/wallet");
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Wallet Is Exist
export const walletIsExist = async () => {
  try {
    const response = await apiClient.get("/wallet/is-exist");
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Sell Currency
export const sellCurrency = async (body) => {
  try {
    const response = await apiClient.post("/wallet/sell-currency", body);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

// Buy Currency
export const buyCurrency = async (body) => {
  try {
    const response = await apiClient.post("/wallet/buy-currency", body);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};
