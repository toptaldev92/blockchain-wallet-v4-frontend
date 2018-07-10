import { expectSaga, testSaga } from 'redux-saga-test-plan'

import * as actions from '../../actions.js'
import * as C from 'services/AlertService'
import sagas from './sagas.js'

const requestBtcSagas = sagas()

describe('requestBtc sagas', () => {
  const mockMath = Object.create(global.Math)
  mockMath.random = () => 0.5
  global.Math = mockMath

  describe('firstStepSubmitClicked', () => {
    const accountIdx = 0
    const addressIdx = 13
    const message = 'laundry'

    const action = { payload: { accountIdx, addressIdx, message } }

    it('should update setHdAddressLabel', () => {
      return expectSaga(requestBtcSagas.firstStepSubmitClicked, action)
        .put(actions.core.wallet.setHdAddressLabel(accountIdx, addressIdx, message))
        .run()
    })

    describe('error handling', () => {
      const error = {}
      const logLocation = requestBtcSagas.logLocation
      it('should log errors', () => {
        const saga = testSaga(requestBtcSagas.firstStepSubmitClicked, action)

        saga
          .next()
          .throw(error)
          .put(actions.logs.logErrorMessage(logLocation, 'firstStepSubmitClicked', error))
          .next()
          .isDone()
      })
    })
  })

  describe('btcPaymentReceived', () => {
    const action = { payload: {} }

    it('should display success alert', () => {
      return expectSaga(requestBtcSagas.btcPaymentReceived, action)
        .put(actions.alerts.displaySuccess(C.RECEIVE_BTC_SUCCESS))
        .run()
    })
  })
})
