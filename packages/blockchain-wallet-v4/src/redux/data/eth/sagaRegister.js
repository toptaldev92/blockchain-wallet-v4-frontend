import { fork, takeLatest } from 'redux-saga/effects'
import * as AT from './actionTypes'
import sagas from './sagas'

export default ({ api }) => {
  const dataEthSagas = sagas({ api })

  return function * coreDataEthSaga () {
    yield takeLatest(AT.FETCH_ETH_DATA, dataEthSagas.fetchData)
    yield takeLatest(AT.FETCH_ETH_RATES, dataEthSagas.fetchRates)
    yield takeLatest(AT.FETCH_ERC20_RATES, dataEthSagas.fetchErc20Rates)
    yield takeLatest(AT.FETCH_ERC20_TOKEN_DATA, dataEthSagas.fetchErc20Data)
    yield fork(dataEthSagas.watchTransactions)
    yield fork(dataEthSagas.watchErc20Transactions)
    yield takeLatest(
      AT.FETCH_ETH_LEGACY_BALANCE,
      dataEthSagas.fetchLegacyBalance
    )
    yield takeLatest(AT.FETCH_ETH_LATEST_BLOCK, dataEthSagas.fetchLatestBlock)
    yield takeLatest(
      AT.CHECK_LOW_ETH_BALANCE,
      dataEthSagas.checkForLowEthBalance
    )
  }
}
