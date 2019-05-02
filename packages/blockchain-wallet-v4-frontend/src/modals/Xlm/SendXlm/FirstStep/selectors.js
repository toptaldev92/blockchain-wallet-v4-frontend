import { prop, propOr, lift } from 'ramda'
import { model, selectors } from 'data'
import { createDeepEqualSelector } from 'services/ReselectHelper'
import { Remote } from 'blockchain-wallet-v4/src'

export const getData = createDeepEqualSelector(
  [
    selectors.components.sendXlm.getPayment,
    selectors.components.sendXlm.getCheckDestination,
    selectors.components.sendXlm.getIsDestinationExchange,
    selectors.core.data.xlm.getTotalBalance,
    selectors.core.kvStore.lockbox.getLockboxXlmAccounts,
    selectors.core.settings.getCurrency,
    selectors.core.data.xlm.getRates,
    selectors.form.getFormValues(model.components.sendXlm.FORM),
    selectors.form.getActiveField(model.components.sendXlm.FORM),
    selectors.components.sendXlm.showNoAccountForm,
    selectors.core.walletOptions.getCoinAvailability
  ],
  (
    paymentR,
    checkDestinationR,
    isDestinationExchangeR,
    balanceR,
    lockboxXlmAccountsR,
    currencyR,
    ratesR,
    formValues,
    activeField,
    noAccount,
    coinAvailabilityR
  ) => {
    const excludeLockbox = !prop(
      'lockbox',
      coinAvailabilityR('XLM').getOrElse({})
    )
    const isDestinationExchange = isDestinationExchangeR.getOrElse(false)
    const transform = (payment, currency, rates) => {
      const effectiveBalance = propOr('0', 'effectiveBalance', payment)
      const reserve = propOr('0', 'reserve', payment)
      const destinationAccountExists = propOr(
        false,
        'destinationAccountExists',
        payment
      )
      const fee = propOr('0', 'fee', payment)
      const destination = prop('to', formValues)
      const from = prop('from', formValues)
      const isDestinationChecked = Remote.Success.is(checkDestinationR)

      return {
        activeField,
        balanceStatus: balanceR,
        currency,
        destination,
        destinationAccountExists,
        effectiveBalance,
        excludeLockbox,
        fee,
        from,
        isDestinationChecked,
        isDestinationExchange,
        noAccount,
        rates,
        reserve
      }
    }
    return lift(transform)(paymentR, currencyR, ratesR)
  }
)
