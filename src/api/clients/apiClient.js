import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appSettings from "../../../settings";

const exemptedEndpoints = ['/login', '/register', '/forgot-password', '/check-approve-code', '/reset-password'];

const apiClient = axios.create({
  baseURL:`${appSettings.CurrencyExchangeWalletApiUrl}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!exemptedEndpoints.some(endpoint => config.url.includes(endpoint))) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
