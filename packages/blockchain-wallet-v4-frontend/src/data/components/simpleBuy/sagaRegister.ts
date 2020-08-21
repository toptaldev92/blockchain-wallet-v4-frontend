import * as AT from './actionTypes'
import { actions, actionTypes } from 'data'
import { put, takeLatest } from 'redux-saga/effects'
import sagas from './sagas'

export default ({ api, coreSagas, networks }) => {
  const simpleBuySagas = sagas({ api, coreSagas, networks })

  return function * simpleBuySaga () {
    yield takeLatest(AT.ACTIVATE_SB_CARD, simpleBuySagas.activateSBCard)
    yield takeLatest(AT.ADD_CARD_DETAILS, simpleBuySagas.addCardDetails)
    yield takeLatest(AT.CANCEL_ORDER, simpleBuySagas.cancelSBOrder)
    yield takeLatest(AT.CREATE_ORDER, simpleBuySagas.createSBOrder)
    yield takeLatest(AT.CONFIRM_FUNDS_ORDER, simpleBuySagas.confirmSBFundsOrder)
    yield takeLatest(
      AT.CONFIRM_CREDIT_CARD_ORDER,
      simpleBuySagas.confirmSBCreditCardOrder
    )
    yield takeLatest(AT.FETCH_SB_BALANCES, simpleBuySagas.fetchSBBalances)
    yield takeLatest(AT.DELETE_SB_CARD, simpleBuySagas.deleteSBCard)
    yield takeLatest(AT.FETCH_SB_CARD, simpleBuySagas.fetchSBCard)
    yield takeLatest(AT.FETCH_SB_CARDS, simpleBuySagas.fetchSBCards)
    yield takeLatest(
      AT.FETCH_SB_FIAT_ELIGIBLE,
      simpleBuySagas.fetchSBFiatEligible
    )
    yield takeLatest(AT.FETCH_SB_ORDERS, simpleBuySagas.fetchSBOrders)
    yield takeLatest(AT.FETCH_SB_PAIRS, simpleBuySagas.fetchSBPairs)
    yield takeLatest(
      AT.FETCH_SB_PAYMENT_ACCOUNT,
      simpleBuySagas.fetchSBPaymentAccount
    )
    yield takeLatest(
      AT.FETCH_SB_PAYMENT_METHODS,
      simpleBuySagas.fetchSBPaymentMethods
    )
    yield takeLatest(AT.FETCH_SB_QUOTE, simpleBuySagas.fetchSBQuote)
    yield takeLatest(
      AT.HANDLE_SB_DEPOSIT_FIAT_CLICK,
      simpleBuySagas.handleSBDepositFiatClick
    )
    yield takeLatest(
      AT.HANDLE_SB_METHOD_CHANGE,
      simpleBuySagas.handleSBMethodChange
    )
    yield takeLatest(
      AT.HANDLE_SB_SUGGESTED_AMOUNT_CLICK,
      simpleBuySagas.handleSBSuggestedAmountClick
    )
    yield takeLatest(
      AT.INITIALIZE_BILLING_ADDRESS,
      simpleBuySagas.initializeBillingAddress
    )
    yield takeLatest(AT.INITIALIZE_CHECKOUT, simpleBuySagas.initializeCheckout)
    yield takeLatest(AT.POLL_SB_BALANCES, simpleBuySagas.pollSBBalances)
    yield takeLatest(AT.POLL_SB_CARD, simpleBuySagas.pollSBCard)
    yield takeLatest(AT.POLL_SB_ORDER, simpleBuySagas.pollSBOrder)
    yield takeLatest(AT.SHOW_MODAL, simpleBuySagas.showModal)
    // Fetch balances when profile/user is fetched
    yield takeLatest(
      [
        actionTypes.modules.profile.FETCH_USER_DATA_FAILURE,
        actionTypes.modules.profile.FETCH_USER_DATA_SUCCESS,
        actionTypes.modules.profile.SET_API_TOKEN_FAILURE
      ],
      simpleBuySagas.fetchSBBalances
    )
    // Fetch balances and orders when step changes to order summary
    yield takeLatest(AT.SET_STEP, simpleBuySagas.setStepChange)
    // Refresh coin tx lists
    yield takeLatest(AT.FETCH_SB_ORDERS, function * () {
      yield put(actions.core.data.bch.fetchTransactions('', true))
      yield put(actions.core.data.btc.fetchTransactions('', true))
      yield put(actions.core.data.eth.fetchTransactions('', true))
      yield put(actions.core.data.eth.fetchErc20Transactions('pax', true))
      yield put(actions.core.data.eth.fetchErc20Transactions('usdt', true))
      yield put(actions.core.data.xlm.fetchTransactions('', true))
    })
  }
}
