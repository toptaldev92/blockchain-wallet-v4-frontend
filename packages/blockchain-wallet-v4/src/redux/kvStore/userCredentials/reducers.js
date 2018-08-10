import { over, mapped } from 'ramda-lens'
import { compose, assoc } from 'ramda'
import { KVStoreEntry } from '../../../types'
import * as AT from './actionTypes'
import Remote from '../../../remote'

// initial state should be a kvstore object
const INITIAL_STATE = Remote.NotAsked

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case AT.FETCH_METADATA_USER_CREDENTIALS_LOADING: {
      return Remote.Loading
    }
    case AT.CREATE_METADATA_USER_CREDENTIALS:
    case AT.FETCH_METADATA_USER_CREDENTIALS_SUCCESS: {
      return Remote.Success(payload)
    }
    case AT.FETCH_METADATA_USER_CREDENTIALS_FAILURE: {
      return Remote.Failure(payload)
    }
    case AT.SET_USER_ID: {
      const { userId } = payload
      return over(
        compose(
          mapped,
          KVStoreEntry.value
        ),
        assoc('userId', userId),
        state
      )
    }
    case AT.SET_USER_TOKEN: {
      const { token } = payload
      return over(
        compose(
          mapped,
          KVStoreEntry.value
        ),
        assoc('token', token),
        state
      )
    }
    default:
      return state
  }
}
