import {
  CoinType,
  Everypay3DSResponseType,
  FiatEligibleType,
  FiatType,
  NabuAddressType,
  PaymentValue,
  RemoteDataType,
  SBAccountType,
  SBBalancesType,
  SBCardType,
  SBOrderActionType,
  SBOrderType,
  SBPairType,
  SBPaymentMethodsType,
  SBPaymentMethodType,
  SBProviderDetailsType,
  SBQuoteType,
  SDDEligibleType,
  SDDVerifiedType,
  SwapOrderType,
  SwapQuoteType
} from 'core/types'

import * as AT from './actionTypes'
import { CountryType } from './../identityVerification/types'
import { SwapAccountType } from '../swap/types'

// Types
export type SBAddCardFormValuesType = {
  billingaddress?: SBBillingAddressFormValuesType
  'card-number': string
  cvc: string
  'expiry-date': string
  'name-on-card': string
  sameAsBillingAddress?: boolean
}
export type SBAddCardErrorType =
  | 'PENDING_CARD_AFTER_POLL'
  | 'LINK_CARD_FAILED'
  | 'CARD_ACTIVATION_FAILED'
  | 'CARD_CREATION_FAILED'
  | 'CARD_ALREADY_SAVED'
export type SBBillingAddressFormValuesType = NabuAddressType
export type SBBillingAddressFormSDDType = {
  country: CountryType
} & NabuAddressType['country']

export type SBVerifyEmailFormValuesType = {
  email: string
}

export type SBCheckoutFormValuesType =
  | undefined
  | {
      amount: string
      cryptoAmount: string
      fix: SBFixType
      orderType: SBOrderActionType
    }
export type SBCurrencySelectFormType = {
  search: string
}
export type SBFixType = 'CRYPTO' | 'FIAT'
export enum SimpleBuyStepType {
  '3DS_HANDLER',
  'ADD_CARD',
  'CANCEL_ORDER',
  'CC_BILLING_ADDRESS',
  'CHECKOUT_CONFIRM',
  'CRYPTO_SELECTION',
  'ENTER_AMOUNT',
  'KYC_REQUIRED',
  'PAYMENT_METHODS',
  'PREVIEW_SELL',
  'ORDER_SUMMARY',
  'SELL_ORDER_SUMMARY',
  'TRANSFER_DETAILS',
  'UPGRADE_TO_GOLD',
  'VERIFY_EMAIL',
  'LINK_BANK',
  'LINK_BANK_HANDLER',
  'BANK_WIRE_DETAILS',
}
export type SBShowModalOriginType =
  | 'EmptyFeed'
  | 'PendingOrder'
  | 'PriceChart'
  | 'InterestPage'
  | 'SellEmpty'
  | 'SettingsGeneral'
  | 'SettingsProfile'
  | 'SideNav'
  | 'SimpleBuyLink'
  | 'TransactionList'
  | 'WelcomeModal'
  | 'WithdrawModal'

export type FastLinkType = {
  attributes: {
    fastlinkParams: {
      configName: 'Verification'
    }
    fastlinkUrl: string
    token: string
    tokenExpiresAt: string
  },
  id: string
  partner: 'YODLEE'
}

// State
export type SimpleBuyState = {
  account: RemoteDataType<string, SBAccountType>
  addBank: boolean | undefined
  balances: RemoteDataType<string, SBBalancesType>
  card: RemoteDataType<string, SBCardType>
  cardId: undefined | string
  cards: RemoteDataType<string, Array<SBCardType>>
  cryptoCurrency: undefined | CoinType
  displayBack: boolean
  everypay3DS: RemoteDataType<string, Everypay3DSResponseType>
  fastLink: RemoteDataType<string, FastLinkType>
  fiatCurrency: undefined | FiatType
  fiatEligible: RemoteDataType<string, FiatEligibleType>
  method: undefined | SBPaymentMethodType
  methods: RemoteDataType<string, SBPaymentMethodsType>
  order: undefined | SBOrderType
  orderType?: SBOrderActionType
  orders: RemoteDataType<string, Array<SBOrderType>>
  pair: undefined | SBPairType
  pairs: RemoteDataType<string, Array<SBPairType>>
  payment: RemoteDataType<string, undefined | PaymentValue>
  providerDetails: RemoteDataType<string, SBProviderDetailsType>
  quote: RemoteDataType<string, SBQuoteType>
  sddEligible: RemoteDataType<string, SDDEligibleType>
  sddUpdateEligible: RemoteDataType<string, SDDVerifiedType>
  sellOrder: undefined | SwapOrderType
  sellQuote: RemoteDataType<string, { quote: SwapQuoteType; rate: number }>
  step: keyof typeof SimpleBuyStepType
  swapAccount: undefined | SwapAccountType
}

// Actions
interface AddCardDetailsFailure {
  payload: {
    error: string
  }
  type: typeof AT.ADD_CARD_DETAILS_FAILURE
}
interface AddCardDetailsLoading {
  type: typeof AT.ADD_CARD_DETAILS_LOADING
}
interface AddCardDetailsSuccess {
  payload: {
    everypay3DS: Everypay3DSResponseType
  }
  type: typeof AT.ADD_CARD_DETAILS_SUCCESS
}

interface ActivateSBCardFailure {
  payload: {
    error: string
  }
  type: typeof AT.ACTIVATE_SB_CARD_FAILURE
}
interface ActivateSBCardLoading {
  type: typeof AT.ACTIVATE_SB_CARD_LOADING
}

interface ActivateSBCardSuccess {
  payload: {
    providerDetails: SBProviderDetailsType
  }
  type: typeof AT.ACTIVATE_SB_CARD_SUCCESS
}

interface DestroyCheckout {
  type: typeof AT.DESTROY_CHECKOUT
}
interface FetchSBBalancesFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_BALANCES_FAILURE
}

interface FetchSBBalancesLoading {
  type: typeof AT.FETCH_SB_BALANCES_LOADING
}

interface FetchSBBalancesSuccess {
  payload: {
    balances: SBBalancesType
  }
  type: typeof AT.FETCH_SB_BALANCES_SUCCESS
}
interface FetchSBCardFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_CARD_FAILURE
}
interface FetchSBCardLoading {
  type: typeof AT.FETCH_SB_CARD_LOADING
}

interface FetchSBCardSuccess {
  payload: {
    card: SBCardType
  }
  type: typeof AT.FETCH_SB_CARD_SUCCESS
}
interface FetchSBCardsFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_CARDS_FAILURE
}

interface FetchSBCardsLoading {
  type: typeof AT.FETCH_SB_CARDS_LOADING
}
interface FetchSBCardsSuccess {
  payload: {
    cards: Array<SBCardType>
  }
  type: typeof AT.FETCH_SB_CARDS_SUCCESS
}

interface FetchSBFiatEligibleFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_FIAT_ELIGIBLE_FAILURE
}
interface FetchSBFiatEligibleLoading {
  type: typeof AT.FETCH_SB_FIAT_ELIGIBLE_LOADING
}
interface FetchSBFiatEligibleSuccess {
  payload: {
    fiatEligible: FiatEligibleType
  }
  type: typeof AT.FETCH_SB_FIAT_ELIGIBLE_SUCCESS
}
interface FetchSDDEligibleFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SDD_ELIGIBILITY_FAILURE
}
interface FetchSDDEligibleLoading {
  type: typeof AT.FETCH_SDD_ELIGIBILITY_LOADING
}
interface FetchSDDEligibleSuccess {
  payload: {
    sddEligible: SDDEligibleType
  }
  type: typeof AT.FETCH_SDD_ELIGIBILITY_SUCCESS
}
interface UpdateSDDEligibleFailure {
  payload: {
    error: string
  }
  type: typeof AT.UPDATE_SDD_ELIGIBILITY_FAILURE
}
interface UpdateSDDEligibleLoading {
  type: typeof AT.UPDATE_SDD_ELIGIBILITY_LOADING
}
interface UpdateSDDEligibleSuccess {
  payload: {
    sddUpdateEligible: SDDVerifiedType
  }
  type: typeof AT.UPDATE_SDD_ELIGIBILITY_SUCCESS
}
interface FetchSBOrdersFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_ORDERS_FAILURE
}
interface FetchSBOrdersLoading {
  type: typeof AT.FETCH_SB_ORDERS_LOADING
}
interface FetchSBOrdersSuccess {
  payload: {
    orders: Array<SBOrderType>
  }
  type: typeof AT.FETCH_SB_ORDERS_SUCCESS
}

interface FetchSBPairsFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_PAIRS_FAILURE
}
interface FetchSBPairsLoading {
  type: typeof AT.FETCH_SB_PAIRS_LOADING
}
interface FetchSBPairsSuccess {
  payload: {
    coin?: CoinType
    pairs: Array<SBPairType>
  }
  type: typeof AT.FETCH_SB_PAIRS_SUCCESS
}

interface FetchSBPaymentAccountFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_PAYMENT_ACCOUNT_FAILURE
}
interface FetchSBPaymentAccountLoading {
  type: typeof AT.FETCH_SB_PAYMENT_ACCOUNT_LOADING
}
interface FetchSBPaymentAccountSuccess {
  payload: {
    account: SBAccountType
  }
  type: typeof AT.FETCH_SB_PAYMENT_ACCOUNT_SUCCESS
}

interface FetchSBPaymentMethodsFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_PAYMENT_METHODS_FAILURE
}
interface FetchSBPaymentMethodsLoading {
  type: typeof AT.FETCH_SB_PAYMENT_METHODS_LOADING
}
interface FetchSBPaymentMethodsSuccess {
  payload: {
    methods: SBPaymentMethodsType
  }
  type: typeof AT.FETCH_SB_PAYMENT_METHODS_SUCCESS
}
interface FetchSBQuoteFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SB_QUOTE_FAILURE
}
interface FetchSBQuoteLoading {
  type: typeof AT.FETCH_SB_QUOTE_LOADING
}
interface FetchSBQuoteSuccess {
  payload: {
    quote: SBQuoteType
  }
  type: typeof AT.FETCH_SB_QUOTE_SUCCESS
}
interface FetchSellQuoteFailure {
  payload: {
    error: string
  }
  type: typeof AT.FETCH_SELL_QUOTE_FAILURE
}
interface FetchSellQuoteLoading {
  type: typeof AT.FETCH_SELL_QUOTE_LOADING
}
interface FetchSellQuoteSuccess {
  payload: {
    quote: SwapQuoteType
    rate: number
  }
  type: typeof AT.FETCH_SELL_QUOTE_SUCCESS
}

interface InitializeCheckout {
  account?: SwapAccountType
  amount: string
  cryptoAmount?: string
  orderType: SBOrderActionType
  pair?: SBPairType
  pairs: Array<SBPairType>
  type: typeof AT.INITIALIZE_CHECKOUT
}

export type StepActionsPayload =
  | {
      order: SBOrderType
      step: 'CHECKOUT_CONFIRM' | 'ORDER_SUMMARY' | 'CANCEL_ORDER'
    }
  | {
      sellOrder: SwapOrderType
      step: 'SELL_ORDER_SUMMARY'
    }
  | {
      cryptoCurrency: CoinType
      fiatCurrency: FiatType
      method?: SBPaymentMethodType
      order?: SBOrderType
      orderType?: SBOrderActionType
      pair: SBPairType
      step: 'ENTER_AMOUNT' | 'VERIFY_EMAIL'
      swapAccount?: SwapAccountType
    }
  | {
      cryptoCurrency?: CoinType
      fiatCurrency: FiatType
      orderType?: SBOrderActionType
      step: 'CRYPTO_SELECTION'
    }
  | {
      addBank?: boolean
      displayBack: boolean
      fiatCurrency: FiatType
      step: 'BANK_WIRE_DETAILS'
    }
  | {
      fastLink: FastLinkType
      step: 'LINK_BANK'
    }
  | {
      cryptoCurrency: CoinType
      fiatCurrency: FiatType
      order?: SBOrderType
      pair: SBPairType
      step: 'PAYMENT_METHODS'
    }
  | { order?: SBOrderType; step: '3DS_HANDLER' }
  | {
      step:
        | 'ADD_CARD'
        | 'CC_BILLING_ADDRESS'
        | 'KYC_REQUIRED'
        | 'PREVIEW_SELL'
        | 'UPGRADE_TO_GOLD'
        | 'LINK_BANK'
        | 'LINK_BANK_HANDLER' // TODO: need to create new step type and pass partner data?
    }

interface SetStepAction {
  payload: StepActionsPayload
  type: typeof AT.SET_STEP
}

interface ShowModalAction {
  payload: {
    cryptoCurrency?: CoinType
    orderType?: SBOrderActionType
    origin: SBShowModalOriginType
  }
  type: typeof AT.SHOW_MODAL
}

interface UpdatePaymentFailureAction {
  payload: {
    error: string
  }
  type: typeof AT.UPDATE_PAYMENT_FAILURE
}
interface UpdatePaymentLoadingAction {
  type: typeof AT.UPDATE_PAYMENT_LOADING
}
interface UpdatePaymentSuccessAction {
  payload: {
    payment: undefined | PaymentValue
  }
  type: typeof AT.UPDATE_PAYMENT_SUCCESS
}

export type SimpleBuyActionTypes =
  | ActivateSBCardFailure
  | ActivateSBCardLoading
  | ActivateSBCardSuccess
  | AddCardDetailsFailure
  | AddCardDetailsLoading
  | AddCardDetailsSuccess
  | DestroyCheckout
  | FetchSBBalancesFailure
  | FetchSBBalancesLoading
  | FetchSBBalancesSuccess
  | FetchSBCardFailure
  | FetchSBCardLoading
  | FetchSBCardSuccess
  | FetchSBCardsFailure
  | FetchSBCardsLoading
  | FetchSBCardsSuccess
  | FetchSBFiatEligibleFailure
  | FetchSBFiatEligibleLoading
  | FetchSBFiatEligibleSuccess
  | FetchSBOrdersFailure
  | FetchSBOrdersLoading
  | FetchSBOrdersSuccess
  | FetchSBPairsFailure
  | FetchSBPairsLoading
  | FetchSBPairsSuccess
  | FetchSBPaymentAccountFailure
  | FetchSBPaymentAccountLoading
  | FetchSBPaymentAccountSuccess
  | FetchSBPaymentMethodsFailure
  | FetchSBPaymentMethodsLoading
  | FetchSBPaymentMethodsSuccess
  | FetchSBQuoteFailure
  | FetchSBQuoteLoading
  | FetchSBQuoteSuccess
  | FetchSDDEligibleLoading
  | FetchSDDEligibleFailure
  | FetchSDDEligibleSuccess
  | FetchSellQuoteFailure
  | FetchSellQuoteLoading
  | FetchSellQuoteSuccess
  | InitializeCheckout
  | SetStepAction
  | ShowModalAction
  | UpdateSDDEligibleFailure
  | UpdateSDDEligibleLoading
  | UpdateSDDEligibleSuccess
  | UpdatePaymentFailureAction
  | UpdatePaymentLoadingAction
  | UpdatePaymentSuccessAction
