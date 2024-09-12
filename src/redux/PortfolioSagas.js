import { call, fork, put, takeEvery } from "redux-saga/effects";
import { portfolioSlice } from "./PortfolioRedux";
import { addCurrency, deleteCurrency, portfolios } from "../api/services/portfolioService";
import { ToastAndroid } from "react-native";

/* 
  saga için generator function'ları oluştururken isimlendirme için watch/worker convention'ı var.
  watchActionName (watcherActionName olarak da denk geldim nadir de olsa), workerActionName olarak isimlendirilirler.
  Burdaki ActionName de genel olarak reducer'daki action adıyla birebir aynı yapılıyo.
*/

function* watchFetchPortfolioData() {
  yield takeEvery(portfolioSlice.actions.fetchPortfolioData, workerFetchPortfolioData)
}

function* watchAddCurrency() {
  yield takeEvery(portfolioSlice.actions.addCurrency, workerAddCurrency)
}

function* watchDeleteCurrency() {
  yield takeEvery(portfolioSlice.actions.deleteCurrency, workerDeleteCurrency)
}

function* workerFetchPortfolioData(action) {
  yield put(portfolioSlice.actions.setLoading(true));
  try {
    const data = yield call(portfolios);
    yield put(portfolioSlice.actions.setData(data));
  } catch (error) {
    console.log('Fetch Portfolio Saga Catch', error);
  } finally {
    yield put(portfolioSlice.actions.setLoading(false));
  }
}

function* workerAddCurrency(action) {
  const { currencyId, currencyCode } = action.payload;
  try {
    yield call(addCurrency, currencyId);
    ToastAndroid.show(
      `${currencyCode} para birimi portföye eklendi`,
      ToastAndroid.SHORT
    );
  } catch (error) {
    console.error("Favorite POST Error:", error);
  }
}

function* workerDeleteCurrency(action) {
  const { currencyId, currencyCode } = action.payload;
  try {
    yield call(deleteCurrency, currencyId);
    ToastAndroid.show(
      `${currencyCode} para birimi portföyden kaldırıldı`,
      ToastAndroid.SHORT
    );
  } catch (error) {
    console.error("Favorite POST Error:", error);
  }
}

export const portfolioSagas = [
  fork(watchFetchPortfolioData),
  fork(watchAddCurrency),
  fork(watchDeleteCurrency),
]