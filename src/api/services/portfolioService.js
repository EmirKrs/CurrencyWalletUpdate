import apiClient from "../clients/apiClient";

// Portfolios
export const portfolios = async () => {
    try {
      const response = await apiClient.get("/portfolios");
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Portfolyo verisini alma sırasında bir hata oluştu.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

  // Add Currency
  export const addCurrency = async (currencyId) => {
    try {
      const response = await apiClient.post(`/portfolios/${currencyId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Döviz eklenirken bir hata oluştu.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

  // Delete Currency
  export const deleteCurrency = async (currencyId) => {
    try {
      const response = await apiClient.delete(`/portfolios/${currencyId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Döviz silinirken bir hata oluştu.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };