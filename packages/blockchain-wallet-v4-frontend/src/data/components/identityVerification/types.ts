import * as AT from './actionTypes'
import { RemoteData } from 'blockchain-wallet-v4/src/remote/types'
import { STEPS } from './model'

export type UserCampaignState =
  | 'FAILED'
  | 'REWARD_RECEIVED'
  | 'TASK_FINISHED'
  | 'REWARD_SEND'
  | 'REGISTERED'
  | 'NONE'

export type CampaignState = 'NONE' | 'STARTED' | 'ENDED'

export type TagsType = {
  [key in CampaignsType]: {
    'x-campaign-address': string
  }
}

export type CampaignTransaction = {
  fiatCurrency: string
  fiatValue: number
  withdrawalCurrency: string
  withdrawalQuantity: number
}

export interface CampaignType {
  attributes: {
    'x-campaign-reject-reason': string
  }
  campaignName: CampaignsType
  campaignState: CampaignState
  updatedAt?: string
  userCampaignState: UserCampaignState
  userCampaignTransactionResponseList: Array<CampaignTransaction>
}

export type EmailSmsStepTypes = { edit: 'edit'; verify: 'verify' }

export type StepsType = typeof STEPS

export type KycStatesType =
  | 'NONE'
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'REJECTED'
  | 'VERIFIED'
  | 'EXPIRED'

export type DocumentType =
  | 'PASSPORT'
  | 'DRIVING_LICENCE'
  | 'NATIONAL_IDENTITY_CARD'
  | 'RESIDENCE_PERMIT'

export type PreIdvDataType = {
  sessionId: string
  userId: string
}

export type ScopesType = Array<'KYC' | 'Mercury'>

export type CampaignsType = 'BLOCKSTACK' | 'POWER_PAX' | 'SUNRIVER'

export type StateType = {
  name: string
  scopes: ScopesType
}

export type CountryType = {
  code: string
  name: string
  regions: Array<string>
  scopes: ScopesType
  states: Array<string>
}

// State
export interface IdentityVerificationState {
  addressRefetchVisible: boolean
  emailStep: keyof EmailSmsStepTypes
  flowConfig: RemoteData<string, any>
  preIdvData: RemoteData<string, PreIdvDataType>
  smsStep: RemoteData<string, keyof EmailSmsStepTypes>
  states: RemoteData<string, StateType>
  steps: RemoteData<string, any>
  supportedCountries: RemoteData<string, Array<CountryType>>
  supportedDocuments: RemoteData<string, Array<DocumentType>>
  verificationStep: keyof StepsType | null
}

// Actions
// Keep these sorted alphabetically
interface FetchSupportedDocumentAction {
  payload: {
    countryCode: string
  }
  type: typeof AT.FETCH_SUPPORTED_DOCUMENTS
}

interface SetEmailStepAction {
  payload: {
    step: keyof EmailSmsStepTypes
  }
  type: typeof AT.SET_EMAIL_STEP
}

interface SetKycFlowFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    e: string
  }
  type: typeof AT.SET_KYC_FLOW_FAILURE
}

interface SetKycFlowLoadingAction {
  type: typeof AT.SET_KYC_FLOW_LOADING
}

interface SetKycFlowSuccessAction {
  // FIXME: TypeScript flowConfig: ?
  payload: {
    flowConfig: any
  }
  type: typeof AT.SET_KYC_FLOW_SUCCESS
}

interface SetPreIdvFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    e: string
  }
  type: typeof AT.SET_PRE_IDV_DATA_FAILURE
}

interface SetPreIdvLoadingAction {
  type: typeof AT.SET_PRE_IDV_DATA_LOADING
}

interface SetPreIdvSuccessAction {
  payload: {
    preIdvData: PreIdvDataType
  }
  type: typeof AT.SET_PRE_IDV_DATA_SUCCESS
}

interface SetSmsStepAction {
  payload: {
    step: keyof EmailSmsStepTypes
  }
  type: typeof AT.SET_SMS_STEP
}

interface SetStepsFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    e: string
  }
  type: typeof AT.SET_STEPS_FAILURE
}

interface SetStepsLoadingAction {
  type: typeof AT.SET_STEPS_LOADING
}

interface SetStepsSuccessAction {
  payload: {
    steps: StepsType
  }
  type: typeof AT.SET_STEPS_SUCCESS
}

interface SetSupportedCountriesFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    e: string
  }
  type: typeof AT.SET_SUPPORTED_COUNTRIES_FAILURE
}

interface SetSupportedCountriesLoadingAction {
  type: typeof AT.SET_SUPPORTED_COUNTRIES_LOADING
}

interface SetStatesFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    e: string
  }
  type: typeof AT.SET_STATES_FAILURE
}

interface SetStatesLoadingAction {
  type: typeof AT.SET_STATES_LOADING
}

interface SetStatesSuccessAction {
  payload: {
    states: StateType
  }
  type: typeof AT.SET_STATES_SUCCESS
}

interface SetSupportedCountriesSuccessAction {
  payload: {
    countries: Array<CountryType>
  }
  type: typeof AT.SET_SUPPORTED_COUNTRIES_SUCCESS
}

interface SetSupportedDocumentFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    e: string
  }
  type: typeof AT.SET_SUPPORTED_DOCUMENTS_FAILURE
}
interface SetSupportedDocumentLoadingAction {
  type: typeof AT.SET_SUPPORTED_DOCUMENTS_LOADING
}

interface SetSupportedDocumentSuccessAction {
  payload: {
    documentTypes: Array<DocumentType>
  }
  type: typeof AT.SET_SUPPORTED_DOCUMENTS_SUCCESS
}

interface SetVerificationStepAction {
  payload: {
    step: keyof StepsType
  }
  type: typeof AT.SET_VERIFICATION_STEP
}

interface VerifyIdentityAction {
  payload: {
    isCoinify?: boolean
    needMoreInfo?: boolean
    tier: number
  }
  type: typeof AT.VERIFY_IDENTITY
}

export type IdentityVerificationActionTypes =
  | FetchSupportedDocumentAction
  | SetEmailStepAction
  | SetKycFlowFailureAction
  | SetKycFlowLoadingAction
  | SetKycFlowSuccessAction
  | SetPreIdvFailureAction
  | SetPreIdvLoadingAction
  | SetPreIdvSuccessAction
  | SetStepsFailureAction
  | SetStepsLoadingAction
  | SetStepsSuccessAction
  | SetSmsStepAction
  | SetStatesFailureAction
  | SetStatesLoadingAction
  | SetStatesSuccessAction
  | SetSupportedCountriesFailureAction
  | SetSupportedCountriesLoadingAction
  | SetSupportedCountriesSuccessAction
  | SetSupportedDocumentFailureAction
  | SetSupportedDocumentLoadingAction
  | SetSupportedDocumentSuccessAction
  | SetVerificationStepAction
  | VerifyIdentityAction
