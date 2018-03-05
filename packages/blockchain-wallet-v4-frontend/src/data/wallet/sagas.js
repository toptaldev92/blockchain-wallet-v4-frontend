import { takeEvery, call, put } from 'redux-saga/effects'
import * as AT from './actionTypes'
import * as actions from '../actions.js'
import * as sagas from '../sagas.js'
import { askSecondPasswordEnhancer, promptForInput } from 'services/SagaService'

export const createLegacyAddress = function * (action) {
  const saga = askSecondPasswordEnhancer(sagas.core.wallet.createLegacyAddress)
  try {
    yield call(saga, action.payload)
    yield put(actions.alerts.displaySuccess('Address added succesfully.'))
  } catch (error) {
    yield put(actions.alerts.displayError('Error adding address.'))
  }
}

export const updatePbkdf2Iterations = function * (action) {
  const saga = askSecondPasswordEnhancer(sagas.core.wallet.updatePbkdf2Iterations)
  try {
    yield call(saga, action.payload)
    yield put(actions.alerts.displaySuccess('PBKDF2 iterations changed successfully.'))
  } catch (error) {
    yield put(actions.alerts.displayError('Error changing PBKDF2 iterations.'))
  }
}

export const toggleSecondPassword = function * (action) {
  const { password } = action.payload
  try {
    yield call(sagas.core.wallet.toggleSecondPassword, { password })
    yield put(actions.alerts.displaySuccess('Second password toggle successful.'))
  } catch (error) {
    yield put(actions.alerts.displayError('Error toggling second password.'))
  }
}

export const verifyMmenonic = function * (action) {
  yield put(actions.core.wallet.verifyMnemonic())
  console.log('frontend saga')
  yield put(actions.alerts.displaySuccess('Your mnemonic has been verified !'))
}

export const editHdLabel = function * (action) {
  try {
    let { accountIdx, addressIdx } = action.payload
    let newLabel = yield call(promptForInput, { title: 'Rename Address Label' })
    yield put(actions.core.wallet.setHdAddressLabel(accountIdx, addressIdx, newLabel))
    yield put(actions.alerts.displaySuccess('Address label updated.'))
  } catch (e) {
    console.log('error in editHdLabel generator')
  }
}

export const editAccountLabel = function * (action) {
  try {
    let { index, label } = action.payload
    let newLabel = yield call(promptForInput, { title: 'Rename Wallet', initial: label })
    yield put(actions.core.wallet.setAccountLabel(index, newLabel))
    yield put(actions.alerts.displaySuccess('Wallet name updated.'))
  } catch (e) {
    console.log('error in editAccountLabel generator')
  }
}

export default function * () {
  yield takeEvery(AT.TOGGLE_SECOND_PASSWORD, toggleSecondPassword)
  yield takeEvery(AT.UPDATE_PBKDF2_ITERATIONS, updatePbkdf2Iterations)
  yield takeEvery(AT.CREATE_LEGACY_ADDRESS, createLegacyAddress)
  yield takeEvery(AT.VERIFY_MNEMONIC, verifyMmenonic)
  yield takeEvery(AT.EDIT_HD_LABEL, editHdLabel)
  yield takeEvery(AT.EDIT_ACCOUNT_LABEL, editAccountLabel)
}
