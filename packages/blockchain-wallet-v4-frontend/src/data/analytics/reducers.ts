import * as AT from './actionTypes'
import { AB_TESTS } from './model'
import { AnalyticsActionTypes, AnalyticsStateType } from './types'
import { Remote } from 'blockchain-wallet-v4/src'

const INITIAL_STATE: AnalyticsStateType = {
  ab_tests: {
    [AB_TESTS.VERIFY_EMAIL]: Remote.NotAsked
  }
}

export const analyticsReducer = (
  state = INITIAL_STATE,
  action: AnalyticsActionTypes
): AnalyticsStateType => {
  switch (action.type) {
    case AT.CREATE_AB_TEST: {
      return {
        ...state,
        ab_tests: {
          ...state.ab_tests,
          [action.payload.test]: Remote.Loading
        }
      }
    }
    case AT.CREATE_AB_TEST_SUCCESS: {
      return {
        ...state,
        ab_tests: {
          ...state.ab_tests,
          [action.payload.test]: Remote.Success(action.payload.result)
        }
      }
    }
    default: {
      return state
    }
  }
}

export default analyticsReducer
