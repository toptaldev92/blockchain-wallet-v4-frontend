import * as C from 'services/AlertService'
import * as selectors from './selectors'
import { actions } from 'data'
import { call, put, select } from 'redux-saga/effects'
import { promptForSecondPassword } from 'services/SagaService'

export const logLocation = 'modules/transferEth/sagas'

export default ({ coreSagas, networks }) => {
  const confirmTransferEth = function * (action) {
    try {
      const { to, effectiveBalance } = action.payload
      let p = yield select(selectors.getPayment)
      let payment = coreSagas.payment.eth.create({
        payment: p.getOrElse({}),
        network: networks.eth
      })
      payment = yield payment.to(to)
      const password = yield call(promptForSecondPassword)
      payment = yield payment.amount(effectiveBalance)
      payment = yield payment.build()
      payment = yield payment.signLegacy(password)
      yield payment.publish()
      yield put(actions.modals.closeAllModals())
      yield put(actions.router.push('/eth/transactions'))
      yield put(
        actions.alerts.displaySuccess(C.SEND_COIN_SUCCESS, {
          coinName: 'Ethereum'
        })
      )
    } catch (e) {
      yield put(
        actions.logs.logErrorMessage(logLocation, 'confirmTransferEth', e)
      )
      yield put(
        actions.alerts.displayError(C.SEND_COIN_ERROR, {
          coinName: 'Ethereum'
        })
      )
    }
  }

  return {
    confirmTransferEth
  }
}
