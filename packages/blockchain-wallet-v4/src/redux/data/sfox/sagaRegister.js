import * as actionTypes from '../../actionTypes'
import * as AT from './actionTypes'
import { takeLatest } from 'redux-saga/effects'
import sagas from './sagas'

export default ({ api, options }) => {
  const dataSfoxSagas = sagas({ api, options })

  return function * coreDataSfoxSaga () {
    yield takeLatest(
      actionTypes.kvStore.buySell.FETCH_METADATA_BUYSELL_SUCCESS,
      dataSfoxSagas.init
    )
    yield takeLatest(AT.FETCH_SFOX_ACCOUNTS, dataSfoxSagas.fetchSfoxAccounts)
    yield takeLatest(AT.FETCH_PROFILE, dataSfoxSagas.fetchProfile)
    yield takeLatest(AT.FETCH_TRADES, dataSfoxSagas.fetchTrades)
    yield takeLatest(AT.RESET_PROFILE, dataSfoxSagas.resetProfile)
    yield takeLatest(AT.REFETCH_PROFILE, dataSfoxSagas.refetchProfile)
  }
}
