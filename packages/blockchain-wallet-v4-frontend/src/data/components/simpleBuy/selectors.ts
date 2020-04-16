import { RootState } from 'data/rootReducer'

export const getSBAccount = (state: RootState) =>
  state.components.simpleBuy.account

export const getSBBalances = (state: RootState) =>
  state.components.simpleBuy.balances

export const getSBCard = (state: RootState) => state.components.simpleBuy.card

export const getSBCardId = (state: RootState) =>
  state.components.simpleBuy.cardId

export const getSBCards = (state: RootState) => state.components.simpleBuy.cards

export const getCryptoCurrency = (state: RootState) =>
  state.components.simpleBuy.cryptoCurrency

export const getFiatCurrency = (state: RootState) =>
  state.components.simpleBuy.fiatCurrency || state.preferences.sbFiatCurrency

export const getSBFiatEligible = (state: RootState) =>
  state.components.simpleBuy.fiatEligible

export const getSBQuote = (state: RootState) => state.components.simpleBuy.quote

export const getSBPairs = (state: RootState) => state.components.simpleBuy.pairs

export const getSBPaymentMethods = (state: RootState) =>
  state.components.simpleBuy.methods

export const getSBProviderDetails = (state: RootState) =>
  state.components.simpleBuy.providerDetails

export const getSBOrder = (state: RootState) => state.components.simpleBuy.order

export const getSBOrders = (state: RootState) =>
  state.components.simpleBuy.orders

export const getSBSuggestedAmounts = (state: RootState) =>
  state.components.simpleBuy.suggestedAmounts

export const getStep = (state: RootState) => state.components.simpleBuy.step
