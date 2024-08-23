export const errorHandler = (error) => {
  if (error.response) {
    return Promise.reject(error.response.data.Messages?.[0] || "Beklenmedik bir hata alındı.");
  } else {
    return Promise.reject("Beklenmedik bir hata oluştu.");
  }
};
