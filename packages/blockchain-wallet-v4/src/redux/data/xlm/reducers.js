import {
  assoc,
  assocPath,
  lensProp,
  over,
  append,
  prepend,
  compose,
  dropLast
} from 'ramda'
import * as AT from './actionTypes'
import Remote from '../../../remote'

const INITIAL_STATE = {
  ledgerDetails: Remote.NotAsked,
  data: {},
  rates: Remote.NotAsked,
  transactions: [],
  transactions_at_bound: false
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case AT.SET_LEDGER_DETAILS_LOADING: {
      return assoc('ledgerDetails', Remote.Loading, state)
    }
    case AT.SET_LEDGER_DETAILS_SUCCESS: {
      return assoc('ledgerDetails', Remote.Success(payload.ledger), state)
    }
    case AT.SET_LEDGER_DETAILS_FAILURE: {
      return assoc('ledgerDetails', Remote.Failure(payload.e), state)
    }
    case AT.FETCH_ACCOUNT_SUCCESS: {
      return assocPath(
        ['data', payload.id],
        Remote.Success(payload.account),
        state
      )
    }
    case AT.FETCH_ACCOUNT_FAILURE: {
      return assocPath(
        ['data', payload.id],
        Remote.Failure(payload.error),
        state
      )
    }
    case AT.FETCH_ACCOUNT_LOADING: {
      return assocPath(['data', payload.id], Remote.Loading, state)
    }
    case AT.SET_RATES_LOADING: {
      return assoc('rates', Remote.Loading, state)
    }
    case AT.SET_RATES_SUCCESS: {
      return assoc('rates', Remote.Success(payload.rates), state)
    }
    case AT.SET_RATES_FAILURE: {
      return assoc('rates', Remote.Failure(payload.e), state)
    }
    case AT.FETCH_TRANSACTIONS_LOADING: {
      const { reset } = payload
      return reset
        ? assoc('transactions', [Remote.Loading], state)
        : over(lensProp('transactions'), append(Remote.Loading), state)
    }
    case AT.FETCH_TRANSACTIONS_SUCCESS: {
      const { txs, reset } = payload
      return reset
        ? assoc('transactions', [Remote.Success(txs)], state)
        : over(
            lensProp('transactions'),
            compose(
              append(Remote.Success(txs)),
              dropLast(1)
            ),
            state
          )
    }
    case AT.FETCH_TRANSACTIONS_FAILURE: {
      return assoc('transactions', [Remote.Failure(payload)], state)
    }
    case AT.ADD_NEW_TRANSACTIONS: {
      const { txs } = payload
      return over(lensProp('transactions'), prepend(Remote.Success(txs)), state)
    }
    case AT.TRANSACTIONS_AT_BOUND: {
      return assoc('transactions_at_bound', payload.atBound, state)
    }
    default:
      return state
  }
}
