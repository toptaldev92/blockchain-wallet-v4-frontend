import { ExtractSuccess, FiatType } from 'core/types'
import { lift } from 'ramda'
import { selectors } from 'data'

export const getData = state => {
  const balancesR = selectors.components.simpleBuy.getSBBalances(state)
  const bankTransferAccountsR = selectors.components.simpleBuy.getBankTransferAccounts(
    state
  )
  const cardsR = selectors.components.simpleBuy.getSBCards(state)
  const eligibilityR = selectors.components.simpleBuy.getSBFiatEligible(state)
  const fastLinkR = selectors.components.simpleBuy.getFastLink(state)
  const pairsR = selectors.components.simpleBuy.getSBPairs(state)
  const paymentMethodsR = selectors.components.simpleBuy.getSBPaymentMethods(
    state
  )
  const supportedCoinsR = selectors.core.walletOptions.getSupportedCoins(state)
  const walletCurrencyR = selectors.core.settings.getCurrency(state)

  return lift(
    (
      balances: ExtractSuccess<typeof balancesR>,
      bankTransferAccounts: ExtractSuccess<typeof bankTransferAccountsR>,
      cards: ExtractSuccess<typeof cardsR>,
      eligibility: ExtractSuccess<typeof eligibilityR>,
      fastLink: ExtractSuccess<typeof fastLinkR>,
      pairs: ExtractSuccess<typeof pairsR>,
      paymentMethods: ExtractSuccess<typeof paymentMethodsR>,
      supportedCoins: ExtractSuccess<typeof supportedCoinsR>,
      walletCurrency: FiatType
    ) => ({
      balances,
      bankTransferAccounts,
      cards,
      eligibility,
      fastLink,
      pairs,
      paymentMethods,
      supportedCoins,
      walletCurrency
    })
  )(
    balancesR,
    bankTransferAccountsR,
    cardsR,
    eligibilityR,
    fastLinkR,
    pairsR,
    paymentMethodsR,
    supportedCoinsR,
    walletCurrencyR
  )
}
