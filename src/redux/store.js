import { configureStore } from "@reduxjs/toolkit";
import { loadingOverlaySlice } from "./loadingOverlaySlice";

const store = configureStore({
  reducer: {
    [loadingOverlaySlice.name]: loadingOverlaySlice.reducer,
  },
});

export default store;
