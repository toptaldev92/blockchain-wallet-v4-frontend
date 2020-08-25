import { CoinType, FiatType, NabuMoneyFloatType } from 'core/types'

export type InterestAccountBalanceType = {
  [key in CoinType]?: {
    balance: string
    fiatAmount: string | null
    locked: string
    pendingDeposit: string
    pendingInterest: string
    pendingWithdrawal: string
    totalInterest: string
  }
}

export type InterestEligibleType = {
  [key in CoinType]?: {
    eligible: boolean
    ineligibilityReason: 'KYC_TIER' | 'BLOCKED' | 'REGION' | null
  }
}

export type InterestInstrumentsType = Array<CoinType>

export type InterestLimitsType = {
  [key in CoinType]: {
    currency: FiatType
    lockUpDuration: number
    maxWithdrawalAmount: number
    minDepositAmount: number
  }
}

export type InterestAccountType = {
  accountRef: string // actually the btc deposit address
}

export type InterestRateType = {
  rates: {
    [key in CoinType]: number
  }
}

export type InterestTransactionType = {
  amount: {
    symbol: CoinType
    value: string
  }
  extraAttributes: {
    address: 'string'
    confirmations: number
    hash: string
    id: string
    txHash: string
  }
  id: string
  insertedAt: string
  state:
    | 'FAILED'
    | 'REJECTED'
    | 'PROCESSING'
    | 'COMPLETE'
    | 'PENDING'
    | 'MANUAL_REVIEW'
    | 'CLEARED'
    | 'REFUNDED'
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'INTEREST_OUTGOING'
}

export type InterestTransactionResponseType = {
  items: Array<InterestTransactionType>
  next: string | null
}

export type InterestWithdrawalResponseType = {
  amount: number
  id: string
  product: string
  state: string
  user: string
}

export type WithdrawalMinimumType = Array<NabuMoneyFloatType>
