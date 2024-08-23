import apiClient from "../clients/apiClient";

export const postVoteService = async (body) => {
    try {
      const response = await apiClient.post("/vote/use", body);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  export const fetchVoteService = async (currencyId) => {
    try {
      const response = await apiClient.get(`/vote/${currencyId}`);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };