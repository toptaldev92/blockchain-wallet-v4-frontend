import * as AT from './actionTypes'
import { CurrenciesType, RemoteDataType } from 'core/types'

// Types
export type LimitAmountType = {
  amount: string
  fiat: boolean
  symbol: string
}

export type AmountType = {
  available: string
  limit: string
  used: string
}

export type LimitDurationType = {
  amount: AmountType
  fiat: boolean
  symbol: string
}

export type MempoolFeeType = 'regular' | 'priority'
export type VerifyEmailType = 'home' | 'verify-email'

export type SourceFeeType =
  | {
      isSourceErc20: boolean
      mempoolFees: {
        limits: {
          max: number
          min: number
        }
        priority: number
        regular: number
      }
      source: number | string
      sourceFiat: string
      target: number | string
    }
  | {
      source: number
      target: number
    }

export type SwapLimitsType = {
  annual: LimitDurationType
  balanceMax: LimitAmountType
  daily: LimitDurationType
  maxFiatLimit: LimitAmountType
  maxOrder: LimitAmountType
  maxPossibleOrder: LimitAmountType
  minOrder: LimitAmountType
  weekly: LimitDurationType
}

// State
export interface ExchangeState {
  limits: RemoteDataType<
    string,
    { [key in keyof CurrenciesType]?: SwapLimitsType }
  >
  max: null | LimitAmountType
  min: null | LimitAmountType
  showError: boolean
  sourceFee: SourceFeeType
  txError: string | null
}

// Actions
// Keep these sorted alphabetically

interface FetchLimitsError {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_LIMITS_ERROR
}

interface FetchLimitsLoading {
  type: typeof AT.FETCH_LIMITS_LOADING
}

interface FetchLimitsSuccess {
  payload: {
    limits: { [key in keyof CurrenciesType]?: SwapLimitsType }
  }
  type: typeof AT.FETCH_LIMITS_SUCCESS
}

interface SetMinMax {
  payload: {
    max: LimitAmountType | null
    min: LimitAmountType | null
  }
  type: typeof AT.SET_MIN_MAX
}
interface SetShowError {
  payload: {
    showError: boolean
  }
  type: typeof AT.SET_SHOW_ERROR
}

interface SetSourceFee {
  payload: {
    fee: SourceFeeType
  }
  type: typeof AT.SET_SOURCE_FEE
}
interface SetTxError {
  payload: {
    error: string | null
  }
  type: typeof AT.SET_TX_ERROR
}

interface ShowConfirmation {
  type: typeof AT.SHOW_CONFIRMATION
}

export type ExchangeActionTypes =
  | FetchLimitsError
  | FetchLimitsLoading
  | FetchLimitsSuccess
  | SetMinMax
  | SetShowError
  | SetSourceFee
  | SetTxError
  | ShowConfirmation
