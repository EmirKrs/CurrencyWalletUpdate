import apiClient from "../clients/apiClient";

// Portfolios
export const portfolios = async () => {
    try {
      const response = await apiClient.get("/portfolios");
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  // Add Currency
  export const addCurrency = async (currencyId) => {
    try {
      const response = await apiClient.post(`/portfolios/${currencyId}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  // Delete Currency
  export const deleteCurrency = async (currencyId) => {
    try {
      const response = await apiClient.delete(`/portfolios/${currencyId}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };