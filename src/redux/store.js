import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { loadingOverlaySlice } from "./loadingOverlaySlice";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
applyMiddleware(sagaMiddleware);

const store = configureStore({
  reducer: {
    [loadingOverlaySlice.name]: loadingOverlaySlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
