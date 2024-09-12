import { createSlice } from "@reduxjs/toolkit";

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    fetchPortfolioData: (state, action) => { },
    setData: (state, action) => {
      /* 
        buraya gelen state objesi, bu reducer'ın state'inin şu anki hali.
        action da PayloadAction tipinde bir obje.
        portfolioSlice.actions.setData('myData') şeklinde bi action dispatch edildiğini varsayarsak action şöyle gelir:
        {type: 'setData', payload: 'myData' }
      */
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
