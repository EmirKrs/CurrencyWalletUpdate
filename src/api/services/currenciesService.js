import apiClient from "../clients/apiClient";

// Currency chart 
export const currencyChart = async (currencyCode) => {
    try {
      const response = await apiClient.get(`/charts/daily-currency-data?currencyCode=${currencyCode}&buySellType=1&day=10`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

    // Currencies details
    export const currencyDaily = async (currencyId) => {
      try {
        const response = await apiClient.get(`/currencies/${currencyId}?day=15`);
        return response.data;
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
        } else {
          return Promise.reject("Beklenmedik bir hata oluştu.");
        }
      }
    };

  // All currencies
  export const allCurrencies = async () => {
    try {
      const response = await apiClient.get(`/currencies`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

