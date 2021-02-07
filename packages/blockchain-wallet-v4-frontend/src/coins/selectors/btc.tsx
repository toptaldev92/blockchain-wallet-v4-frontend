import { FormattedMessage } from 'react-intl'
import { lift, prop, propEq } from 'ramda'
import React from 'react'

import { ADDRESS_TYPES } from 'blockchain-wallet-v4/src/redux/payment/btc/utils'
import { coreSelectors } from 'blockchain-wallet-v4/src'
import { createDeepEqualSelector } from 'services/misc'
import { ExtractSuccess } from 'blockchain-wallet-v4/src/remote/types'
import { generateCustodyAccount } from 'coins/utils'
import { SBBalanceType } from 'core/network/api/simpleBuy/types'

import { getCustodialBalance } from './'

// retrieves introduction text for coin on its transaction page
export const getTransactionPageHeaderText = () => (
  <FormattedMessage
    id='coins.btc.intro'
    defaultMessage='Bitcoin (BTC) is the original crypto and the internet’s premier digital currency.'
  />
)

// main selector for all BTC account types
// accepts a CoinAccountSelectorType config object
export const getAccounts = createDeepEqualSelector(
  [
    coreSelectors.wallet.getHDAccounts, // non-custodial accounts
    coreSelectors.data.btc.getAddresses, // non-custodial xpub info
    coreSelectors.common.btc.getActiveAddresses, // imported addresses
    (state, { coin }) => getCustodialBalance(coin, state), // custodial accounts
    (state, ownProps) => ownProps // selector config
  ],
  (btcAccounts, btcDataR, importedAddressesR, sbBalanceR, ownProps) => {
    const transform = (
      btcData,
      importedAddresses,
      sbBalance: ExtractSuccess<typeof sbBalanceR>
    ) => {
      const { coin } = ownProps
      let accounts = []

      // add non-custodial accounts if requested
      if (ownProps?.nonCustodialAccounts) {
        accounts = accounts.concat(btcAccounts
          .map(acc => ({
            accountIndex: prop('index', acc),
            address: prop('index', acc),
            archived: prop('archived', acc),
            // @ts-ignore
            balance: prop('final_balance', prop(prop('xpub', acc), btcData)),
            baseCoin: coin,
            coin,
            label: prop('label', acc) || prop('xpub', acc),
            type: ADDRESS_TYPES.ACCOUNT
          }))
          .filter(propEq('archived', false)))
      }

      // add imported addresses if requested
      if (ownProps?.importedAddresses) {
        accounts = accounts.concat(importedAddresses.map(importedAcc =>({
          address: importedAcc.addr,
          balance: importedAcc.final_balance,
          baseCoin: coin,
          coin,
          label: importedAcc.label,
          type: ADDRESS_TYPES.LEGACY
        })))
      }

      // add custodial accounts if requested
      if (ownProps?.custodialAccounts) {
        // @ts-ignore
        accounts = accounts.concat(generateCustodyAccount(coin, sbBalance as SBBalanceType))
      }

      return accounts
    }

    return lift(transform)(btcDataR, importedAddressesR, sbBalanceR)
  }
)
