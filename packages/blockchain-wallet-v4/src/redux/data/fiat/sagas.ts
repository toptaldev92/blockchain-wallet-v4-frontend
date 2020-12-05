import { call, put, select, take } from 'redux-saga/effects'
import { last } from 'ramda'

import { APIType } from 'core/network/api'
import Remote from '../../../remote'

import * as A from './actions'
import * as AT from './actionTypes'
import * as S from './selectors'
import { errorHandler } from 'blockchain-wallet-v4/src/utils'

export default ({ api }: { api: APIType }) => {
  const watchTransactions = function * () {
    while (true) {
      const action = yield take(AT.FETCH_FIAT_TRANSACTIONS)
      yield call(fetchTransactions, action)
    }
  }

  const fetchTransactions = function * (
    action: ReturnType<typeof A.fetchTransactions>
  ) {
    try {
      const { payload } = action
      const { reset } = payload
      const data = S.getFiatData(action.payload.currency, yield select())
      if (data && Remote.Loading.is(last(data.transactions))) return
      const next = data && data.next.getOrElse(null)
      if (!next && !reset && data?.transactions.length) return
      yield put(A.fetchTransactionsLoading(action.payload.currency, !!reset))
      const response: ReturnType<typeof api.getSBTransactions> = yield call(
        api.getSBTransactions,
        action.payload.currency,
        reset ? undefined : next
      )
      // Here's the api call to get sell orders. Now we have to flatten the two responses to one array, and then sort by time created.
      // sell orders use 'createdAt' while SB transactions use 'insertedAt'
      // const sellOrders: ReturnType<typeof api.getUnifiedSellTrades> = yield call(api.getUnifiedSellTrades, action.payload.currency)

      yield put(
        A.fetchTransactionsSuccess(action.payload.currency, response, reset)
      )
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchTransactionsFailure(action.payload.currency, error))
    }
  }

  return {
    fetchTransactions,
    watchTransactions
  }
}
