import { configureStore } from "@reduxjs/toolkit";
import loadingOverlayReducer from "./loadingOverlaySlice";

const store = configureStore({
  reducer: {
    loading: loadingOverlayReducer,
  },
});

export default store;
