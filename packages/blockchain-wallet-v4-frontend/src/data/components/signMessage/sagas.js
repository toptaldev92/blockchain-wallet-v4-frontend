import * as A from './actions.js'
import * as C from 'services/AlertService'
import * as signer from 'blockchain-wallet-v4/src/signer'
import { actions, selectors } from 'data'
import { call, put, select } from 'redux-saga/effects'
import { promptForSecondPassword } from 'services/SagaService'
import { Types } from 'blockchain-wallet-v4/src'

const taskToPromise = t =>
  new Promise((resolve, reject) => t.fork(reject, resolve))

export default ({ coreSagas }) => {
  const logLocation = 'components/signMessage/sagas'

  const signMessage = function * (action) {
    try {
      const { addr, message } = action.payload
      const password = yield call(promptForSecondPassword)
      const wallet = yield select(selectors.core.wallet.getWallet)
      const signedT = Types.Wallet.getPrivateKeyForAddress(
        wallet,
        password,
        addr
      ).map(priv => signer.btc.signMessage(priv, addr, message))
      const signed = yield call(() => taskToPromise(signedT))
      yield put(A.messageSigned(signed))
    } catch (e) {
      yield put(actions.logs.logErrorMessage(logLocation, 'signMessage', e))
      yield put(actions.alerts.displayError(C.MESSAGE_SIGN_ERROR))
    }
  }

  return {
    signMessage
  }
}
