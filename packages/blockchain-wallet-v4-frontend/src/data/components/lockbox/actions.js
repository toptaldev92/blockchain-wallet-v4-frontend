import * as AT from './actionTypes'

export const setConnectStep = step => ({
  type: AT.SET_CONNECT_STEP,
  payload: { step }
})

export const initializeConnect = () => ({ type: AT.INITIALIZE_CONNECT })
export const deviceInfoLoading = () => ({ type: AT.DEVICE_INFO_LOADING })
export const deviceInfoSuccess = payload => ({
  type: AT.DEVICE_INFO_SUCCESS,
  payload
})
export const deviceInfoFailure = payload => ({
  type: AT.DEVICE_INFO_FAILURE,
  payload
})

export const addDevice = payload => ({
  type: AT.ADD_DEVICE,
  payload
})
export const addDeviceLoading = () => ({ type: AT.ADD_DEVICE_LOADING })
export const addDeviceSuccess = () => ({ type: AT.ADD_DEVICE_SUCCESS })
export const addDeviceFailure = payload => ({
  type: AT.ADD_DEVICE_FAILURE,
  payload
})

export const saveDevice = payload => ({
  type: AT.SAVE_DEVICE,
  payload
})
export const saveDeviceLoading = () => ({ type: AT.SAVE_DEVICE_LOADING })
export const saveDeviceSuccess = () => ({ type: AT.SAVE_DEVICE_SUCCESS })
export const saveDeviceFailure = payload => ({
  type: AT.SAVE_DEVICE_FAILURE,
  payload
})
