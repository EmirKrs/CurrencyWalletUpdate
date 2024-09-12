import { all } from 'redux-saga/effects';
import { portfolioSagas } from './PortfolioSagas';

export default function* rootSaga() {
  yield all([
    ...portfolioSagas,
    //...authSagas,
    //...profileSagas,
    /* 
      Buraya sırayla bütün sagalar gelecek
    */
  ])
}