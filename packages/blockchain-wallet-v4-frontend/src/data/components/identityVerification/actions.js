import * as AT from './actionTypes'

export const verifyIdentity = () => ({
  type: AT.VERIFY_IDENTITY
})

export const initializeVerification = (isCoinify, desiredTier) => ({
  type: AT.INITIALIZE_VERIFICATION,
  payload: { isCoinify, desiredTier }
})
export const goToPrevStep = () => ({
  type: AT.GO_TO_PREV_STEP
})
export const goToNextStep = () => ({
  type: AT.GO_TO_NEXT_STEP
})
export const setVerificationStep = step => ({
  type: AT.SET_VERIFICATION_STEP,
  payload: { step }
})

export const fetchSupportedCountries = () => ({
  type: AT.FETCH_SUPPORTED_COUNTRIES
})
export const setSupportedCountries = countries => ({
  type: AT.SET_SUPPORTED_COUNTRIES,
  payload: { countries }
})

export const fetchSupportedDocuments = countryCode => ({
  type: AT.FETCH_SUPPORTED_DOCUMENTS,
  payload: { countryCode }
})
export const setSupportedDocuments = documentTypes => ({
  type: AT.SET_SUPPORTED_DOCUMENTS,
  payload: { documentTypes }
})

export const fetchStates = () => ({
  type: AT.FETCH_STATES
})
export const setStates = states => ({
  type: AT.SET_STATES,
  payload: { states }
})

export const savePersonalData = () => ({ type: AT.SAVE_PERSONAL_DATA })

export const setSmsStep = step => ({ type: AT.SET_SMS_STEP, payload: { step } })

export const updateSmsStep = () => ({ type: AT.UPDATE_SMS_STEP })
export const updateSmsNumber = () => ({ type: AT.UPDATE_SMS_NUMBER })
export const verifySmsNumber = () => ({ type: AT.VERIFY_SMS_NUMBER })
export const resendSmsCode = () => ({ type: AT.RESEND_SMS_CODE })

export const createRegisterUserCampaign = (
  campaignName,
  needsIdVerification
) => ({
  type: AT.CREATE_REGISTER_USER_CAMPAIGN,
  payload: { campaignName, needsIdVerification }
})

export const checkKycFlow = () => ({
  type: AT.CHECK_KYC_FLOW
})
export const setKycFlow = flowType => ({
  type: AT.SET_KYCFLOW,
  payload: { flowType }
})
export const sendDeeplink = () => ({
  type: AT.SEND_DEEP_LINK
})

export const setCoinify = isCoinify => ({
  type: AT.SET_COINIFY,
  payload: { isCoinify }
})

export const setDesiredTier = tier => ({
  type: AT.SET_DESIRED_TIER,
  payload: { tier }
})
