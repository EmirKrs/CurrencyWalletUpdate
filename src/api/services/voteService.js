import apiClient from "../clients/apiClient";

export const postVoteService = async (body) => {
    try {
      const response = await apiClient.post("/vote/use", body);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Oyalama sırasında bir hata oluştu.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };

  export const fetchVoteService = async (currencyId) => {
    try {
      const response = await apiClient.get(`/vote/${currencyId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
      } else {
        return Promise.reject("Beklenmedik bir hata oluştu.");
      }
    }
  };