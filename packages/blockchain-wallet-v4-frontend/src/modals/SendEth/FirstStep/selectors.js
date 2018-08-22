import React from 'react'
import { FormattedMessage } from 'react-intl'
import { prop, propOr, path, isEmpty } from 'ramda'
import { selectors } from 'data'
import { createDeepEqualSelector } from 'services/ReselectHelper'

export const getData = createDeepEqualSelector(
  [
    selectors.components.sendEth.getPayment,
    selectors.components.sendEth.getToToggled,
    selectors.components.sendEth.getFeeToggled,
    selectors.core.data.ethereum.getLegacyBalance,
    selectors.core.kvStore.lockbox.getDevices,
    selectors.form.getFormValues('sendEth')
  ],
  (paymentR, toToggled, feeToggled, balanceR, lockboxDevicesR, formValues) => {
    const enableToggle = !isEmpty(lockboxDevicesR.getOrElse({}))

    const transform = payment => {
      const effectiveBalance = propOr('0', 'effectiveBalance', payment)
      const unconfirmedTx = prop('unconfirmedTx', payment)
      const isContract = prop('isContract', payment)
      const fee = propOr('0', 'fee', payment)
      const destination = prop('to', formValues)
      const from = prop('from', formValues)
      const regularFee = path(['fees', 'regular'], payment)
      const priorityFee = path(['fees', 'priority'], payment)
      const minFee = path(['fees', 'limits', 'min'], payment)
      const maxFee = path(['fees', 'limits', 'max'], payment)
      const feeElements = [
        {
          group: '',
          items: [
            {
              text: (
                <FormattedMessage
                  id='modals.sendeth.firststep.fee.regular'
                  defaultMessage='Regular'
                />
              ),
              value: regularFee
            },
            {
              text: (
                <FormattedMessage
                  id='modals.sendeth.firststep.fee.priority'
                  defaultMessage='Priority'
                />
              ),
              value: priorityFee
            }
          ]
        }
      ]

      return {
        effectiveBalance,
        unconfirmedTx,
        isContract,
        fee,
        toToggled,
        feeToggled,
        enableToggle,
        destination,
        from,
        regularFee,
        priorityFee,
        minFee,
        maxFee,
        feeElements,
        balanceStatus: balanceR
      }
    }
    return paymentR.map(transform)
  }
)
