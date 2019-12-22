import * as AT from './actionTypes'
import { takeLatest } from 'redux-saga/effects'
import sagas from './sagas'

export default ({ api, coreSagas, networks }) => {
  const {
    clearSession,
    fetchUser,
    fetchUserCampaigns,
    linkFromExchangeAccount,
    linkToExchangeAccount,
    shareWalletAddressesWithExchange,
    signIn
  } = sagas({
    api,
    coreSagas,
    networks
  })

  return function * profileSaga () {
    yield takeLatest(AT.SIGN_IN, signIn)
    yield takeLatest(AT.CLEAR_SESSION, clearSession)
    yield takeLatest(AT.FETCH_USER, fetchUser)
    yield takeLatest(AT.FETCH_USER_CAMPAIGNS, fetchUserCampaigns)
    yield takeLatest(AT.LINK_FROM_EXCHANGE_ACCOUNT, linkFromExchangeAccount)
    yield takeLatest(AT.LINK_TO_EXCHANGE_ACCOUNT, linkToExchangeAccount)
    yield takeLatest(
      AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE,
      shareWalletAddressesWithExchange
    )
  }
}
