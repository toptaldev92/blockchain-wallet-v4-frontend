import { lift } from 'ramda'

import { Remote } from 'blockchain-wallet-v4/src'
import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

export const getData = (state: RootState) => {
  const cardR = selectors.components.simpleBuy.getSBCard(state)
  const providerDetailsR = selectors.components.simpleBuy.getSBProviderDetails(
    state
  )
  const order = selectors.components.simpleBuy.getSBOrder(state)
  const threeDSDetailsR = selectors.components.simpleBuy.getEverypay3DSDetails(
    state
  )
  const domains = selectors.core.walletOptions.getDomains(state).getOrElse({
    walletHelper: 'https://wallet-helper.blockchain.com'
  })

  if (order && order.paymentMethodId) {
    return Remote.Success({
      type: 'ORDER',
      domains,
      order
    })
  }

  const transform = (card, providerDetails, threeDSDetails) => ({
    card,
    domains,
    order,
    providerDetails,
    threeDSDetails,
    type: 'CARD'
  })

  return lift(transform)(cardR, providerDetailsR, threeDSDetailsR)
}
