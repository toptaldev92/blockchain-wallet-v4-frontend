import { takeLatest } from 'redux-saga/effects'
import * as AT from './actionTypes'
import sagas from './sagas'

export default ({ api, coreSagas }) => {
  const lockboxSagas = sagas({ api, coreSagas })

  return function*() {
    yield takeLatest(AT.INSTALL_APPLICATION, lockboxSagas.installApplication)
    yield takeLatest(
      AT.INITIALIZE_NEW_DEVICE_SETUP,
      lockboxSagas.initializeNewDeviceSetup
    )
    yield takeLatest(
      AT.UPDATE_DEVICE_FIRMWARE,
      lockboxSagas.updateDeviceFirmware
    )
    yield takeLatest(
      AT.UPDATE_TRANSACTION_LIST,
      lockboxSagas.updateTransactionList
    )
    yield takeLatest(
      AT.DETERMINE_LOCKBOX_ROUTE,
      lockboxSagas.determineLockboxRoute
    )
    yield takeLatest(
      AT.SAVE_NEW_DEVICE_KVSTORE,
      lockboxSagas.saveNewDeviceKvStore
    )
    yield takeLatest(AT.DELETE_DEVICE, lockboxSagas.deleteDevice)
    yield takeLatest(AT.POLL_FOR_DEVICE_APP, lockboxSagas.pollForDeviceApp)
    yield takeLatest(
      AT.CHECK_DEVICE_AUTHENTICITY,
      lockboxSagas.checkDeviceAuthenticity
    )
    yield takeLatest(
      AT.UNINSTALL_APPLICATION,
      lockboxSagas.uninstallApplication
    )
    yield takeLatest(
      AT.INITIALIZE_APP_MANAGER,
      lockboxSagas.initializeAppManager
    )
    yield takeLatest(AT.INITIALIZE_DASHBOARD, lockboxSagas.initializeDashboard)
    yield takeLatest(AT.SAVE_COIN_MD, lockboxSagas.saveCoinMD)
  }
}
