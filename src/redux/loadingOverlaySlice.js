import { createSlice } from "@reduxjs/toolkit";

const loadingOverlaySlice = createSlice({
  name: "loading",
  initialState: {
    isVisible: false,
  },
  reducers: {
    setLoadingOverlay: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setLoadingOverlay } = loadingOverlaySlice.actions;

export default loadingOverlaySlice.reducer;
