import {
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect
} from 'redux-saga/effects'

import { APIType } from 'blockchain-wallet-v4/src/network/api'
import { errorHandler } from 'blockchain-wallet-v4/src/utils'
import { SupportedWalletCurrenciesType } from 'core/types'
import { selectors } from 'data'

import coinSagas from '../../coins/sagas'
import profileSagas from '../../modules/profile/sagas'
import * as A from './actions'
import { RequestExtrasType } from './types'
import { generateKey } from './utils'

export default ({
  api,
  coreSagas,
  networks
}: {
  api: APIType
  coreSagas: any
  networks: any
}) => {
  // const logLocation = 'components/request/sagas'
  const { waitForUserData } = profileSagas({ api, coreSagas, networks })
  const { getNextReceiveAddressForCoin } = coinSagas({
    coreSagas,
    networks
  })

  const getNextAddress = function * (
    action: ReturnType<typeof A.getNextAddress>
  ): Generator<CallEffect | PutEffect | SelectEffect, void, any> {
    const key = generateKey(action.payload.account)
    const supportedCoins = selectors.core.walletOptions
      .getSupportedCoins(yield select())
      .getOrElse({} as SupportedWalletCurrenciesType)
    try {
      yield put(A.getNextAddressLoading(key))
      let address
      let extras: RequestExtrasType = {}
      const account = action.payload.account

      switch (account.type) {
        case 'ACCOUNT':
          const { accountIndex, coin } = account
          address = yield call(getNextReceiveAddressForCoin, coin, accountIndex)
          break
        case 'CUSTODIAL':
          waitForUserData()
          const custodial: ReturnType<typeof api.getSBPaymentAccount> = yield call(
            api.getSBPaymentAccount,
            account.coin
          )
          address = custodial.address
          if (supportedCoins[account.coin].isMemoBased) {
            extras.Memo = address.split(':')[1]
            address = address.split(':')[0]
          }
      }

      yield put(A.getNextAddressSuccess(key, address, extras))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.getNextAddressFailure(key, error))
    }
  }

  return {
    getNextAddress
  }
}
