import { createSelector } from 'reselect'
import { selectors } from 'data'
import {
  all,
  curry,
  isEmpty,
  propSatisfies,
  toUpper,
  prop,
  allPass,
  anyPass,
  compose,
  contains,
  map,
  filter,
  path,
  propOr
} from 'ramda'
import { hasAccount } from 'services/ExchangeService'

const filterTransactions = curry((status, criteria, transactions) => {
  const isOfType = curry((filter, tx) =>
    propSatisfies(
      x => filter === '' || toUpper(x) === toUpper(filter),
      'type',
      tx
    )
  )
  const search = curry((text, txPath, tx) =>
    compose(
      contains(toUpper(text || '')),
      toUpper,
      String,
      path(txPath)
    )(tx)
  )
  const searchPredicate = anyPass(
    map(search(criteria), [
      ['description'],
      ['from'],
      ['to'],
      ['hash'],
      ['outputs', 0, 'address'],
      ['inputs', 0, 'address']
    ])
  )
  const fullPredicate = allPass([isOfType(status), searchPredicate])
  return filter(fullPredicate, transactions)
})

const coinSelectorMap = {
  ETH: selectors.core.common.eth.getWalletTransactions,
  BTC: selectors.core.common.btc.getWalletTransactions,
  BCH: selectors.core.common.bch.getWalletTransactions,
  BSV: selectors.core.common.bsv.getWalletTransactions,
  XLM: selectors.core.common.xlm.getWalletTransactions
}

export const getData = (state, coin) =>
  createSelector(
    [
      selectors.form.getFormValues('transactions'),
      selectors.form.getFormValues('settingsAddresses'),
      coinSelectorMap[coin],
      selectors.core.kvStore.buySell.getMetadata,
      selectors.core.settings.getCurrency
    ],
    (txSearch, bsvSearch, pages, buySellMetadata, currencyR) => {
      const empty = page => isEmpty(page.data)
      let search, status
      // use different search form for BSV txs
      if (coin === 'BSV') {
        search = propOr('', 'search', bsvSearch)
        status = propOr('', 'status', bsvSearch)
      } else {
        search = propOr('', 'search', txSearch)
        status = propOr('', 'status', txSearch)
      }

      const filteredPages = !isEmpty(pages)
        ? pages.map(map(filterTransactions(status, search)))
        : []
      const partnerData = prop('value', buySellMetadata.getOrElse())
      const currency = currencyR.getOrElse('')

      return {
        currency: currency,
        pages: filteredPages,
        empty: all(empty)(filteredPages),
        search: search.length > 0 || status !== '',
        buySellPartner: hasAccount(partnerData)
      }
    }
  )(state)
