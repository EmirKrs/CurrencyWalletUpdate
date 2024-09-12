import { call, fork, put, takeEvery } from "redux-saga/effects";
import { portfolioSlice } from "./PortfolioRedux";
import { portfolios } from "../api/services/portfolioService";

/* 
  saga için generator function'ları oluştururken isimlendirme için watch/worker convention'ı var.
  watchActionName (watcherActionName olarak da denk geldim nadir de olsa), workerActionName olarak isimlendirilirler.
  Burdaki ActionName de genel olarak reducer'daki action adıyla birebir aynı yapılıyo.
*/

function* watchFetchPortfolioData() {
  yield takeEvery(portfolioSlice.actions.fetchPortfolioData, workerFetchPortfolioData)
}

// Portfolio ile ilgili başka watcher gerekirse buraya

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

// Portfolio ile ilgili başka worker gerekirse buraya

export const portfolioSagas = [
  fork(watchFetchPortfolioData),
  // portfolio ile ilgili bütün wathcherlar buraya aynı şekilde eklenir.
  // fork(watchOtherAction),
  // fork(watchAnotherAction),
]