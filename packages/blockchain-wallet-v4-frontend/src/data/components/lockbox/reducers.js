import { assocPath, assoc } from 'ramda'
import { Remote } from 'blockchain-wallet-v4/src'
import * as AT from './actionTypes'

const INITIAL_STATE = {
  connection: {},
  firmware: {},
  appManager: {
    latestAppInfos: Remote.NotAsked,
    appChangeStatus: Remote.NotAsked,
    targetId: Remote.NotAsked
  },
  newDeviceSetup: {
    device: Remote.NotAsked,
    setupType: null
  },
  isAuthentic: Remote.NotAsked
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case AT.RESET_CONNECTION_STATUS: {
      return assoc('connection', {}, state)
    }
    case AT.SET_NEW_DEVICE_INFO: {
      return assocPath(
        ['newDeviceSetup', 'device'],
        Remote.Success(payload.deviceInfo),
        state
      )
    }
    case AT.SET_DEVICE_SETUP_TYPE: {
      return assocPath(['newDeviceSetup', 'setupType'], payload, state)
    }
    case AT.SET_NEW_DEVICE_SETUP_STEP: {
      const { done, error, step } = payload
      return assocPath(
        ['newDeviceSetup', 'currentStep'],
        { done, error, step },
        state
      )
    }
    case AT.CHECK_DEVICE_AUTHENTICITY_LOADING: {
      return assoc('isAuthentic', Remote.Loading, state)
    }
    case AT.CHECK_DEVICE_AUTHENTICITY_FAILURE: {
      return assoc('isAuthentic', Remote.Failure(payload), state)
    }
    case AT.CHECK_DEVICE_AUTHENTICITY_SUCCESS: {
      return assoc('isAuthentic', Remote.Success(payload), state)
    }
    case AT.RESET_DEVICE_AUTHENTICITY: {
      return assoc('isAuthentic', Remote.NotAsked, state)
    }
    case AT.SET_FIRMWARE_UPDATE_STEP: {
      return assoc('firmware', payload.step, state)
    }
    case AT.RESET_FIRMWARE_INFO: {
      return assoc('firmware', {}, state)
    }
    case AT.SET_DEVICE_TARGET_ID: {
      return assocPath(
        ['appManager', 'targetId'],
        Remote.Success(payload),
        state
      )
    }
    case AT.APP_CHANGE_LOADING: {
      return assocPath(['appManager', 'appChangeStatus'], Remote.Loading, state)
    }
    case AT.APP_CHANGE_FAILURE: {
      return assocPath(
        ['appManager', 'appChangeStatus'],
        Remote.Failure(payload),
        state
      )
    }
    case AT.APP_CHANGE_SUCCESS: {
      return assocPath(
        ['appManager', 'appChangeStatus'],
        Remote.Success(payload),
        state
      )
    }
    case AT.SET_LATEST_APP_INFOS_LOADING: {
      return assocPath(['appManager', 'latestAppInfos'], Remote.Loading, state)
    }
    case AT.SET_LATEST_APP_INFOS_SUCCESS: {
      return assocPath(
        ['appManager', 'latestAppInfos'],
        Remote.Success(payload),
        state
      )
    }
    case AT.RESET_APP_CHANGE_STATUS: {
      return assocPath(
        ['appManager', 'appChangeStatus'],
        Remote.NotAsked,
        state
      )
    }
    case AT.SET_CONNECTION_INFO: {
      return assoc('connection', payload, state)
    }
    case AT.SET_CONNECTION_ERROR: {
      return assocPath(['connection', 'error'], payload.error, state)
    }
    case AT.SET_CONNECTION_READY: {
      return assocPath(['connection', 'ready'], true, state)
    }
    case AT.SET_CONNECTION_SUCCESS: {
      return assocPath(['connection', 'success'], true, state)
    }
    default:
      return state
  }
}
