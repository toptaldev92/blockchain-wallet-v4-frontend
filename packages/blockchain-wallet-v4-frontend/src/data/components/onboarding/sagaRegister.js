import { takeLatest } from 'redux-saga/effects'
import * as AT from './actionTypes'
import sagas from './sagas'

export default () => {
  const onboardingSagas = sagas()

  return function * swapGetStartedSaga () {
    yield takeLatest(
      AT.AIRDROP_CLAIM_SUBMIT_CLICKED,
      onboardingSagas.airdropClaimSubmitClicked
    )
    yield takeLatest(
      AT.COINIFY_UPGRADE_SUBMIT_CLICKED,
      onboardingSagas.coinifyUpgradeSubmitClicked
    )
    yield takeLatest(
      AT.SKIP_WALLET_TOUR_CLICKED,
      onboardingSagas.skipWalletTourClicked
    )
    yield takeLatest(
      AT.SWAP_GET_STARTED_SUBMIT_CLICKED,
      onboardingSagas.swapGetStartedSubmitClicked
    )
    yield takeLatest(
      AT.TAKE_WALLET_TOUR_CLICKED,
      onboardingSagas.takeWalletTourClicked
    )
    yield takeLatest(
      AT.UPGRADE_FOR_AIRDROP_SUBMIT_CLICKED,
      onboardingSagas.upgradeForAirdropSubmitClicked
    )
  }
}
