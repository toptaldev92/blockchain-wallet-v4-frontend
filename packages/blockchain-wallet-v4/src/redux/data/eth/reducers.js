import {
  assoc,
  assocPath,
  mergeRight,
  reduce,
  lensPath,
  over,
  append,
  compose,
  dropLast,
  path,
  prop,
  prepend
} from 'ramda'
import * as AT from './actionTypes'
import Remote from '../../../remote'

// TODO: figure out how to pull ERC20 from walletOptions state
const buildStateWithTokens = defaultValue =>
  compose(
    reduce((acc, curr) => assoc(curr, defaultValue, acc), {}),
    prepend('eth')
  )(['pax'])

const INITIAL_STATE = {
  addresses: Remote.NotAsked,
  fee: Remote.NotAsked,
  info: buildStateWithTokens(Remote.NotAsked),
  latest_block: Remote.NotAsked,
  current_balance: buildStateWithTokens(Remote.NotAsked),
  legacy_balance: Remote.NotAsked,
  rates: buildStateWithTokens(Remote.NotAsked),
  transactions: buildStateWithTokens([]),
  transactions_at_bound: buildStateWithTokens(false),
  warn_low_eth_balance: false
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    // ETH
    case AT.FETCH_ETH_DATA_LOADING: {
      const newState = {
        addresses: Remote.Loading,
        info: {
          ...state.info,
          eth: Remote.Loading
        },
        latest_block: Remote.Loading
      }
      return mergeRight(state, newState)
    }
    case AT.FETCH_ETH_DATA_SUCCESS: {
      const newState = {
        addresses: Remote.Success(prop('addresses', payload)),
        info: {
          ...state.info,
          eth: Remote.Success(path(['info', 'eth'], payload))
        },
        latest_block: Remote.Success(prop('latest_block', payload))
      }
      return mergeRight(state, newState)
    }
    case AT.FETCH_ETH_DATA_FAILURE: {
      const newState = {
        addresses: Remote.Failure(prop('addresses', payload)),
        info: {
          ...state.info,
          eth: Remote.Failure(path('info', 'eth', payload))
        },
        latest_block: Remote.Failure(prop('latest_block', payload))
      }
      return mergeRight(state, newState)
    }
    case AT.FETCH_ETH_FEE_LOADING: {
      return assoc('fee', Remote.Loading, state)
    }
    case AT.FETCH_ETH_FEE_SUCCESS: {
      return assoc('fee', Remote.Success(payload), state)
    }
    case AT.FETCH_ETH_FEE_FAILURE: {
      return assoc('fee', Remote.Failure(payload), state)
    }
    case AT.FETCH_ETH_LATEST_BLOCK_LOADING: {
      return state
    }
    case AT.FETCH_ETH_LATEST_BLOCK_SUCCESS: {
      return assoc('latest_block', Remote.Success(payload), state)
    }
    case AT.FETCH_ETH_LATEST_BLOCK_FAILURE: {
      return assoc('latest_block', Remote.Failure(payload), state)
    }
    case AT.FETCH_ETH_LEGACY_BALANCE_LOADING: {
      return assoc('legacy_balance', Remote.Loading, state)
    }
    case AT.FETCH_ETH_LEGACY_BALANCE_SUCCESS: {
      const { balance } = payload
      return assoc('legacy_balance', Remote.Success(balance), state)
    }
    case AT.FETCH_ETH_LEGACY_BALANCE_FAILURE: {
      return assoc('legacy_balance', Remote.Failure(payload), state)
    }
    case AT.FETCH_ETH_CURRENT_BALANCE_LOADING: {
      return assocPath(['current_balance', 'eth'], Remote.Loading, state)
    }
    case AT.FETCH_ETH_CURRENT_BALANCE_SUCCESS: {
      const { balance } = payload
      return assocPath(
        ['current_balance', 'eth'],
        Remote.Success(balance),
        state
      )
    }
    case AT.FETCH_ETH_CURRENT_BALANCE_FAILURE: {
      return assocPath(
        ['current_balance', 'eth'],
        Remote.Failure(payload),
        state
      )
    }
    case AT.FETCH_ETH_RATES_LOADING: {
      return assocPath(['rates', 'eth'], Remote.Loading, state)
    }
    case AT.FETCH_ETH_RATES_SUCCESS: {
      return assocPath(['rates', 'eth'], Remote.Success(payload), state)
    }
    case AT.FETCH_ETH_RATES_FAILURE: {
      return assocPath(['rates', 'eth'], Remote.Failure(payload), state)
    }
    case AT.FETCH_ETH_TRANSACTIONS_LOADING: {
      const { reset } = payload
      return reset
        ? assocPath(['transactions', 'eth'], [Remote.Loading], state)
        : over(lensPath(['transactions', 'eth']), append(Remote.Loading), state)
    }
    case AT.FETCH_ETH_TRANSACTIONS_SUCCESS: {
      const { transactions, reset } = payload
      return reset
        ? assocPath(
            ['transactions', 'eth'],
            [Remote.Success(transactions)],
            state
          )
        : over(
            lensPath(['transactions', 'eth']),
            compose(
              append(Remote.Success(transactions)),
              dropLast(1)
            ),
            state
          )
    }
    case AT.FETCH_ETH_TRANSACTIONS_FAILURE: {
      return assocPath(
        ['transactions', 'eth'],
        [Remote.Failure(payload)],
        state
      )
    }
    case AT.ETH_TRANSACTIONS_AT_BOUND: {
      return assocPath(['transactions_at_bound', 'eth'], payload, state)
    }
    case AT.CHECK_LOW_ETH_BALANCE_SUCCESS: {
      return assoc('warn_low_eth_balance', payload, state)
    }
    // ERC20
    case AT.FETCH_ERC20_TOKEN_DATA_LOADING: {
      const { token } = payload
      return assocPath(['info', token], Remote.Loading, state)
    }
    case AT.FETCH_ERC20_TOKEN_DATA_SUCCESS: {
      const { token, data } = payload
      return assocPath(['info', token], Remote.Success(data), state)
    }
    case AT.FETCH_ERC20_TOKEN_DATA_FAILURE: {
      const { token, error } = payload
      return assocPath(['info', token], Remote.Failure(error), state)
    }
    case AT.FETCH_ERC20_RATES_LOADING: {
      const { token } = payload
      return assocPath(['rates', token], Remote.Loading, state)
    }
    case AT.FETCH_ERC20_RATES_SUCCESS: {
      const { token, data } = payload
      return assocPath(['rates', token], Remote.Success(data), state)
    }
    case AT.FETCH_ERC20_RATES_FAILURE: {
      const { token, error } = payload
      return assocPath(['rates', token], Remote.Failure(error), state)
    }
    case AT.FETCH_ERC20_TOKEN_BALANCE_LOADING: {
      const { token } = payload
      return assocPath(['current_balance', token], Remote.Loading, state)
    }
    case AT.FETCH_ERC20_TOKEN_BALANCE_SUCCESS: {
      const { token, balance } = payload
      return assocPath(
        ['current_balance', token],
        Remote.Success(balance),
        state
      )
    }
    case AT.FETCH_ERC20_TOKEN_BALANCE_FAILURE: {
      const { token, error } = payload
      return assocPath(['current_balance', token], Remote.Failure(error), state)
    }
    case AT.FETCH_ERC20_TOKEN_TRANSACTIONS_LOADING: {
      const { token, reset } = payload
      return reset
        ? assocPath(['transactions', token], [Remote.Loading], state)
        : over(lensPath(['transactions', token]), append(Remote.Loading), state)
    }
    case AT.FETCH_ERC20_TOKEN_TRANSACTIONS_SUCCESS: {
      const { token, transactions, reset } = payload
      return reset
        ? assocPath(
            ['transactions', token],
            [Remote.Success(transactions)],
            state
          )
        : over(
            lensPath(['transactions', token]),
            compose(
              append(Remote.Success(transactions)),
              dropLast(1)
            ),
            state
          )
    }
    case AT.FETCH_ERC20_TOKEN_TRANSACTIONS_FAILURE: {
      const { token, error } = payload
      return assocPath(['transactions', token], [Remote.Failure(error)], state)
    }
    case AT.ERC20_TOKEN_TX_AT_BOUND: {
      const { token, isAtBound } = payload
      return assocPath(['transactions_at_bound', token], isAtBound, state)
    }
    default:
      return state
  }
}
