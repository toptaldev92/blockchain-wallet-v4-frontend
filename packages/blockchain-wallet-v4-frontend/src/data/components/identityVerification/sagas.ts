import * as A from './actions'
import * as AT from './actionTypes'
import * as C from 'services/AlertService'
import * as S from './selectors'
import { actions, actionTypes, model, selectors } from 'data'
import {
  BAD_CODE_ERROR,
  EMAIL_STEPS,
  FLOW_TYPES,
  ID_VERIFICATION_SUBMITTED_FORM,
  KYC_MODAL,
  PERSONAL_FORM,
  PHONE_EXISTS_ERROR,
  SMS_NUMBER_FORM,
  SMS_STEPS,
  UPDATE_FAILURE
} from './model'
import { call, delay, put, select, take } from 'redux-saga/effects'
import { computeSteps } from './services'
import { getStateNameFromAbbreviation } from 'services/LocalesService'
import { isEmpty, mapObjIndexed, prop, sort, toUpper } from 'ramda'
import { StateType, StepsType } from './types'
import { Types } from 'blockchain-wallet-v4'
import profileSagas from '../../modules/profile/sagas'

export const logLocation = 'components/identityVerification/sagas'
export const invalidNumberError = 'Failed to update mobile number'
export const mobileVerifiedError = 'Failed to verify mobile number'
export const failedResendError = 'Failed to resend the code'
export const emailExistsError = 'User with this email already exists'
export const wrongFlowTypeError = 'Wrong flow type'
export const noCampaignDataError = 'User did not come from campaign'

export default ({ api, coreSagas }) => {
  const { TIERS } = model.profile
  const {
    getCampaignData,
    fetchUser,
    createUser,
    updateUser,
    updateUserAddress,
    syncUserWithWallet
  } = profileSagas({
    api,
    coreSagas
  })

  const registerUserCampaign = function * (payload) {
    const { newUser = false } = payload
    const campaign = yield select(selectors.modules.profile.getCampaign)
    try {
      if (!campaign || isEmpty(campaign)) throw new Error(noCampaignDataError)
      const campaignData = yield call(getCampaignData, campaign)
      yield call(api.registerUserCampaign, campaign.name, campaignData, newUser)
    } catch (e) {
      yield put(
        actions.logs.logErrorMessage(
          logLocation,
          'registerUserCampaign',
          e.message
        )
      )
    }
  }

  const createRegisterUserCampaign = function * () {
    try {
      yield call(verifyIdentity, { payload: { tier: TIERS[2] } })
    } catch (e) {
      yield put(
        actions.logs.logErrorMessage(
          logLocation,
          'createRegisterUserCampaign',
          e
        )
      )
    }
  }

  const claimCampaignClicked = function * ({ payload }) {
    const { campaign } = payload
    try {
      yield put(actions.form.startSubmit(ID_VERIFICATION_SUBMITTED_FORM))
      yield put(actions.modules.profile.setCampaign({ name: campaign }))
      yield put(A.registerUserCampaign(false))
      // Buffer for tagging user
      const wallet = yield select(selectors.core.wallet.getWallet)
      if (Types.Wallet.isDoubleEncrypted(wallet)) {
        yield take([
          actionTypes.wallet.SUBMIT_SECOND_PASSWORD,
          actionTypes.modals.CLOSE_MODAL
        ])
      }
      yield delay(3000)
      yield put(actions.modules.profile.fetchUser())
      yield take(actionTypes.modules.profile.FETCH_USER_DATA_SUCCESS)
      const tags = (yield select(selectors.modules.profile.getTags)).getOrElse({
        [campaign]: false
      })
      const isCampaignTagged = prop(campaign, tags)
      if (!isCampaignTagged) {
        throw new Error(`${campaign} not tagged.`)
      }
      yield put(actions.form.stopSubmit(ID_VERIFICATION_SUBMITTED_FORM))
    } catch (error) {
      yield put(
        actions.form.stopSubmit(ID_VERIFICATION_SUBMITTED_FORM, {
          _error: error
        })
      )
      yield put(
        actions.logs.logErrorMessage(
          logLocation,
          'claimCampaignClicked',
          `Error claim campaign, ${error}`
        )
      )
    }
  }

  const selectTier = function * (tier = 2) {
    const { selected } = yield select(selectors.modules.profile.getUserTiers)
    if (selected === tier) return
    yield call(api.selectTier, tier)
    yield call(fetchUser)
  }

  const verifyIdentity = function * ({ payload }) {
    const { tier, isCoinify, needMoreInfo } = payload
    yield put(
      actions.modals.showModal(KYC_MODAL, { tier, isCoinify, needMoreInfo })
    )
  }

  const defineSteps = function * (tier, isCoinify, needMoreInfo) {
    yield put(A.setStepsLoading())
    try {
      yield call(createUser)
      yield call(selectTier, tier)
      yield call(registerUserCampaign, { newUser: true })
    } catch (e) {
      return yield put(A.setStepsFailure(e))
    }
    const tiers = (yield select(
      selectors.modules.profile.getUserTiers
    )).getOrElse({
      next: 0,
      selected: 2
    })
    const mobileVerified = (yield select(selectors.modules.profile.getUserData))
      .map(prop('mobileVerified'))
      .getOrElse(false)
    const smsVerified = (yield select(
      selectors.core.settings.getSmsVerified
    )).getOrElse(0)
    const currentStep = yield select(S.getVerificationStep)
    const coinifyUser = (yield select(
      selectors.core.kvStore.buySell.getCoinifyUser
    )).getOrElse(false)
    const steps = computeSteps({
      coinifyUser,
      currentStep,
      isCoinify,
      mobileVerified,
      needMoreInfo,
      smsVerified,
      tiers
    })

    yield put(A.setStepsSuccess(steps))
  }

  const initializeVerification = function * ({ payload }) {
    const { tier = TIERS[2], isCoinify = false, needMoreInfo = false } = payload
    yield put(A.setEmailStep(EMAIL_STEPS.edit))
    yield call(defineSteps, tier, isCoinify, needMoreInfo)
    yield call(initializeStep)
  }

  const initializeStep = function * () {
    const steps: Array<StepsType> = (yield select(S.getSteps)).getOrElse([])
    return yield put(A.setVerificationStep(steps[0]))
  }

  const goToPrevStep = function * () {
    const steps = (yield select(S.getSteps)).getOrElse([])
    const currentStep = yield select(S.getVerificationStep)
    const currentStepIndex = steps.indexOf(currentStep)
    const step = steps[currentStepIndex - 1]

    if (step) return yield put(A.setVerificationStep(step))

    yield put(actions.modals.closeAllModals())
  }

  const goToNextStep = function * () {
    const steps = (yield select(S.getSteps)).getOrElse([])
    const currentStep = yield select(S.getVerificationStep)
    const currentStepIndex = steps.indexOf(currentStep)
    const step = steps[currentStepIndex + 1]

    if (step) return yield put(A.setVerificationStep(step))

    yield put(actions.modals.closeAllModals())
  }

  const updateSmsStep = ({ smsNumber, smsVerified }) => {
    if (smsNumber && !smsVerified) return SMS_STEPS.verify
    return SMS_STEPS.edit
  }

  const updateSmsNumber = function * () {
    try {
      const { smsNumber } = yield select(
        selectors.form.getFormValues(SMS_NUMBER_FORM)
      )
      yield put(actions.form.startSubmit(SMS_NUMBER_FORM))
      yield call(coreSagas.settings.setMobile, { mobile: smsNumber })
      yield put(A.setSmsStep(SMS_STEPS.verify))
      yield put(actions.form.stopSubmit(SMS_NUMBER_FORM))
    } catch (e) {
      yield put(
        actions.form.stopSubmit(SMS_NUMBER_FORM, {
          smsNumber: invalidNumberError
        })
      )
    }
  }

  const verifySmsNumber = function * () {
    try {
      yield put(actions.form.startSubmit(SMS_NUMBER_FORM))
      const { code } = yield select(
        selectors.form.getFormValues(SMS_NUMBER_FORM)
      )
      yield call(coreSagas.settings.setMobileVerified, { code })
      yield call(syncUserWithWallet)
      yield put(actions.form.stopSubmit(SMS_NUMBER_FORM))
      yield call(goToNextStep)
    } catch (e) {
      const description = prop('description', e)

      let error
      if (description === PHONE_EXISTS_ERROR) error = PHONE_EXISTS_ERROR
      else if (e === BAD_CODE_ERROR) error = BAD_CODE_ERROR
      else error = UPDATE_FAILURE
      yield put(actions.form.stopSubmit(SMS_NUMBER_FORM, { _error: error }))
    }
  }

  const resendSmsCode = function * () {
    try {
      yield put(actions.form.startSubmit(SMS_NUMBER_FORM))
      const smsNumber = (yield select(
        selectors.core.settings.getSmsNumber
      )).getOrFail()
      yield call(coreSagas.settings.setMobile, { mobile: smsNumber })
      yield put(actions.form.stopSubmit(SMS_NUMBER_FORM))
      yield put(actions.alerts.displaySuccess(C.SMS_RESEND_SUCCESS))
    } catch (e) {
      yield put(
        actions.form.stopSubmit(SMS_NUMBER_FORM, {
          code: failedResendError
        })
      )
    }
  }

  const savePersonalData = function * () {
    try {
      yield put(actions.form.startSubmit(PERSONAL_FORM))
      yield call(syncUserWithWallet)
      const {
        firstName,
        lastName,
        dob,
        line1,
        line2,
        city,
        country,
        state,
        postCode
      } = yield select(selectors.form.getFormValues(PERSONAL_FORM))
      const personalData = { firstName, lastName, dob }
      const address = {
        line1,
        line2,
        city,
        country: country.code,
        state,
        postCode
      }
      if (address.country === 'US') address.state = address.state.code
      yield call(updateUser, { payload: { data: personalData } })
      yield call(updateUserAddress, {
        payload: { address }
      })

      yield put(actions.form.stopSubmit(PERSONAL_FORM))
      yield call(goToNextStep)
    } catch (e) {
      yield put(actions.form.stopSubmit(PERSONAL_FORM, { _error: e }))
      yield put(
        actions.logs.logErrorMessage(
          logLocation,
          'savePersonalData',
          `Error saving personal data: ${e}`
        )
      )
    }
  }

  const fetchSupportedCountries = function * () {
    try {
      yield put(A.setSupportedCountriesLoading())
      const countries = yield call(api.getSupportedCountries)
      yield put(A.setSupportedCountriesSuccess(countries))
    } catch (e) {
      yield put(A.setSupportedCountriesFailure(e))
      actions.logs.logErrorMessage(
        logLocation,
        'fetchSupportedCountries',
        `Error fetching supported countries: ${e}`
      )
    }
  }

  const fetchSupportedDocuments = function * () {
    try {
      yield put(A.setSupportedDocumentsLoading())
      const countryCode = (yield select(
        selectors.modules.profile.getUserCountryCode
      )).getOrElse('US')
      const { documentTypes } = yield call(
        api.getSupportedDocuments,
        countryCode
      )
      yield put(A.setSupportedDocumentsSuccess(documentTypes))
    } catch (e) {
      yield put(A.setSupportedDocumentsFailure(e))
      actions.logs.logErrorMessage(
        logLocation,
        'fetchSupportedDocuments',
        `Error fetching supported documents: ${e}`
      )
    }
  }

  const fetchStates = function * ({ payload }) {
    const { isCoinify } = payload
    try {
      let stateList: Array<StateType> = []
      yield put(A.setStatesLoading())
      if (isCoinify) {
        const coinifySupportList = yield call(api.getCoinifyStates)
        // hack to create similar state list model as Nabu
        mapObjIndexed((s, key) => {
          stateList.push({
            name: getStateNameFromAbbreviation(key),
            // @ts-ignore
            scopes: s.supported ? ['KYC'] : []
          })
        }, coinifySupportList.US.states)
        yield put(
          A.setStatesSuccess(
            sort((a, b) => a.name.localeCompare(b.name), stateList)
          )
        )
      } else {
        stateList = yield call(api.getStates)
        yield put(A.setStatesSuccess(stateList))
      }
    } catch (e) {
      yield put(A.setStatesFailure(e))
      actions.logs.logErrorMessage(
        logLocation,
        'fetchStates',
        `Error fetching supported ${isCoinify ? 'states' : 'countries'}:  ${e}`
      )
    }
  }

  const checkKycFlow = function * () {
    try {
      yield put(A.setKycFlowLoading())
      try {
        const preIdvData = yield call(api.fetchPreIdvData)
        yield put(A.setPreIdvDataSuccess(preIdvData))
        yield take(AT.PRE_IDV_CHECK_FINISHED)
      } catch (e) {
        yield put(A.setPreIdvDataFailure(e))
      }
      const { flowType } = yield call(api.fetchKycConfig)
      const type = FLOW_TYPES[toUpper(flowType)]
      if (!type) throw wrongFlowTypeError

      yield put(A.setKycFlowSuccess({ flowType }))
    } catch (e) {
      yield put(A.setKycFlowFailure(e))
    }
  }

  const sendDeeplink = function * () {
    try {
      yield call(api.sendDeeplink)
    } catch (e) {
      yield put(actions.logs.logErrorMessage(logLocation, 'sendDeeplink', e))
    }
  }

  const sendEmailVerification = function * ({ payload }) {
    try {
      yield put(actions.form.startAsyncValidation(PERSONAL_FORM))
      const { email } = payload
      yield call(coreSagas.settings.resendVerifyEmail, { email })
      yield put(actions.alerts.displayInfo(C.VERIFY_EMAIL_SENT))
    } catch (e) {
      yield put(actions.alerts.displayError(C.VERIFY_EMAIL_SENT_ERROR))
      yield put(
        actions.logs.logErrorMessage(logLocation, 'resendVerifyEmail', e)
      )
    } finally {
      yield put(actions.form.stopAsyncValidation(PERSONAL_FORM))
    }
  }

  const updateEmail = function * ({ payload }) {
    try {
      yield put(actions.form.startAsyncValidation(PERSONAL_FORM))
      const prevEmail = (yield select(
        selectors.core.settings.getEmail
      )).getOrElse('')
      const { email } = payload
      if (prevEmail === email)
        yield call(coreSagas.settings.resendVerifyEmail, { email })
      else yield call(coreSagas.settings.setEmail, { email })
      yield put(actions.form.stopAsyncValidation(PERSONAL_FORM))
      yield put(A.setEmailStep(EMAIL_STEPS.verify))
    } catch (e) {
      yield put(
        actions.form.stopAsyncValidation(PERSONAL_FORM, {
          email: emailExistsError
        })
      )
    }
  }

  return {
    claimCampaignClicked,
    defineSteps,
    verifyIdentity,
    initializeVerification,
    initializeStep,
    fetchStates,
    fetchSupportedCountries,
    fetchSupportedDocuments,
    goToNextStep,
    goToPrevStep,
    resendSmsCode,
    registerUserCampaign,
    createUser,
    createRegisterUserCampaign,
    savePersonalData,
    updateSmsStep,
    updateSmsNumber,
    verifySmsNumber,
    checkKycFlow,
    sendDeeplink,
    sendEmailVerification,
    selectTier,
    updateEmail
  }
}
