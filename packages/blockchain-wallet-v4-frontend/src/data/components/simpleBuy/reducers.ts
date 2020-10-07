import * as AT from './actionTypes'
import { getCoinFromPair, getFiatFromPair } from './model'
import { SimpleBuyActionTypes, SimpleBuyState } from './types'
import Remote from 'blockchain-wallet-v4/src/remote/remote'

const INITIAL_STATE: SimpleBuyState = {
  account: Remote.NotAsked,
  balances: Remote.NotAsked,
  card: Remote.NotAsked,
  cardId: undefined,
  cards: Remote.NotAsked,
  cryptoCurrency: undefined,
  displayBack: false,
  everypay3DS: Remote.NotAsked,
  fiatCurrency: undefined,
  fiatEligible: Remote.NotAsked,
  method: undefined,
  methods: Remote.NotAsked,
  order: undefined,
  orders: Remote.NotAsked,
  orderType: undefined,
  pair: undefined,
  pairs: Remote.NotAsked,
  providerDetails: Remote.NotAsked,
  quote: Remote.NotAsked,
  step: 'CURRENCY_SELECTION'
}

export function simpleBuyReducer (
  state = INITIAL_STATE,
  action: SimpleBuyActionTypes
): SimpleBuyState {
  switch (action.type) {
    case AT.ACTIVATE_SB_CARD_FAILURE: {
      return {
        ...state,
        providerDetails: Remote.Failure(action.payload.error)
      }
    }
    case AT.ACTIVATE_SB_CARD_LOADING:
      return {
        ...state,
        providerDetails: Remote.Loading
      }
    case AT.ACTIVATE_SB_CARD_SUCCESS:
      return {
        ...state,
        providerDetails: Remote.Success(action.payload.providerDetails)
      }
    case AT.ADD_CARD_DETAILS_FAILURE: {
      return {
        ...state,
        everypay3DS: Remote.Failure(action.payload.error)
      }
    }
    case AT.ADD_CARD_DETAILS_LOADING:
      return {
        ...state,
        everypay3DS: Remote.Loading
      }
    case AT.ADD_CARD_DETAILS_SUCCESS:
      return {
        ...state,
        everypay3DS: Remote.Success(action.payload.everypay3DS)
      }
    case AT.DESTROY_CHECKOUT:
      return {
        ...state,
        account: Remote.NotAsked,
        cardId: undefined,
        fiatCurrency: undefined,
        order: undefined,
        pairs: Remote.NotAsked,
        quote: Remote.NotAsked,
        step: 'CURRENCY_SELECTION'
      }
    case AT.FETCH_SB_BALANCES_FAILURE: {
      return {
        ...state,
        balances: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_BALANCES_LOADING:
      return {
        ...state,
        balances: Remote.Loading
      }
    case AT.FETCH_SB_BALANCES_SUCCESS:
      return {
        ...state,
        balances: Remote.Success(action.payload.balances)
      }
    case AT.FETCH_SB_CARD_FAILURE: {
      return {
        ...state,
        card: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_CARD_LOADING:
      return {
        ...state,
        card: Remote.Loading
      }
    case AT.FETCH_SB_CARD_SUCCESS:
      return {
        ...state,
        card: Remote.Success(action.payload.card)
      }
    // cards fetch fails so often in staging that this is a temp fix
    case AT.FETCH_SB_CARDS_FAILURE: {
      return {
        ...state,
        cards: Remote.Success([])
      }
    }
    case AT.FETCH_SB_CARDS_LOADING:
      return {
        ...state,
        cards: Remote.Loading
      }
    case AT.FETCH_SB_CARDS_SUCCESS:
      return {
        ...state,
        cards: Remote.Success(action.payload.cards)
      }
    case AT.FETCH_SB_FIAT_ELIGIBLE_FAILURE: {
      return {
        ...state,
        fiatEligible: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_FIAT_ELIGIBLE_LOADING:
      return {
        ...state,
        fiatEligible: Remote.Loading
      }
    case AT.FETCH_SB_FIAT_ELIGIBLE_SUCCESS:
      return {
        ...state,
        fiatEligible: Remote.Success(action.payload.fiatEligible)
      }
    case AT.FETCH_SB_ORDERS_FAILURE: {
      return {
        ...state,
        orders: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_ORDERS_LOADING:
      return {
        ...state,
        orders: Remote.Loading
      }
    case AT.FETCH_SB_ORDERS_SUCCESS:
      return {
        ...state,
        orders: Remote.Success(action.payload.orders)
      }
    case AT.FETCH_SB_PAIRS_FAILURE: {
      return {
        ...state,
        pairs: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_PAIRS_LOADING:
      return {
        ...state,
        pairs: Remote.Loading
      }
    case AT.FETCH_SB_PAIRS_SUCCESS:
      return {
        ...state,
        pairs: Remote.Success(action.payload.pairs),
        pair: action.payload.coin
          ? action.payload.pairs.find(
              pair =>
                getCoinFromPair(pair.pair) === action.payload.coin &&
                getFiatFromPair(pair.pair) === state.fiatCurrency
            )
          : state.pair
      }
    case AT.FETCH_SB_PAYMENT_ACCOUNT_FAILURE: {
      return {
        ...state,
        account: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_PAYMENT_ACCOUNT_LOADING:
      return {
        ...state,
        account: Remote.Loading
      }
    case AT.FETCH_SB_PAYMENT_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: Remote.Success(action.payload.account)
      }
    case AT.FETCH_SB_PAYMENT_METHODS_FAILURE: {
      return {
        ...state,
        methods: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_PAYMENT_METHODS_LOADING:
      return {
        ...state,
        methods: Remote.Loading
      }
    case AT.FETCH_SB_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        methods: Remote.Success(action.payload.methods)
      }
    case AT.FETCH_SB_QUOTE_FAILURE: {
      return {
        ...state,
        quote: Remote.Failure(action.payload.error)
      }
    }
    case AT.FETCH_SB_QUOTE_LOADING:
      return {
        ...state,
        quote: Remote.Loading
      }
    case AT.FETCH_SB_QUOTE_SUCCESS:
      return {
        ...state,
        quote: Remote.Success(action.payload.quote)
      }
    case AT.INITIALIZE_CHECKOUT:
      return {
        ...state,
        pair:
          action.pair ||
          action.pairs.find(
            pair =>
              getCoinFromPair(pair.pair) === state.cryptoCurrency &&
              getFiatFromPair(pair.pair) === state.fiatCurrency
          )
      }
    case AT.SET_STEP:
      switch (action.payload.step) {
        case 'ENTER_AMOUNT':
          return {
            ...state,
            orderType: action.payload.orderType,
            cryptoCurrency: action.payload.cryptoCurrency,
            fiatCurrency: action.payload.fiatCurrency,
            step: action.payload.step,
            pair: action.payload.pair,
            method: action.payload.method,
            order: undefined
          }
        case 'CRYPTO_SELECTION':
          return {
            ...state,
            cryptoCurrency: action.payload.cryptoCurrency,
            fiatCurrency: action.payload.fiatCurrency,
            step: action.payload.step
          }
        case 'PAYMENT_METHODS':
          return {
            ...state,
            cryptoCurrency: action.payload.cryptoCurrency,
            fiatCurrency: action.payload.fiatCurrency,
            step: action.payload.step,
            order: action.payload.order
          }
        case '3DS_HANDLER':
        case 'CHECKOUT_CONFIRM':
        case 'ORDER_SUMMARY':
        case 'CANCEL_ORDER':
          return {
            ...state,
            order: action.payload.order,
            step: action.payload.step
          }
        case 'TRANSFER_DETAILS':
          return {
            ...state,
            step: action.payload.step,
            fiatCurrency: action.payload.fiatCurrency,
            displayBack: action.payload.displayBack
          }
        default: {
          return {
            ...state,
            step: action.payload.step
          }
        }
      }
    default:
      return state
  }
}
