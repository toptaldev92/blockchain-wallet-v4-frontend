/* eslint-disable */
import { BigNumber } from 'bignumber.js'
import { path, prop } from 'ramda'

import { CoinType, FiatType, RatesType, WalletCurrencyType, WalletFiatType } from 'core/types'

import Currencies, { CurrenciesType } from './currencies'
import { formatCoin, getLang } from './utils'

type KeysOfUnion<T> = T extends any ? keyof T : never
export type UnitType = KeysOfUnion<CurrenciesType[keyof CurrenciesType]['units']>

const getSymbol = (currency): string => {
  const data = Currencies[currency]
  const tradeUnit = prop('trade', data)
  return path(['units', tradeUnit, 'symbol'], data) as string
}

// =====================================================================
// ============================== DECIMALS =============================
// =====================================================================
const convertCoinToCoin = ({
  baseToStandard = true,
  coin,
  isFiat = false,
  value,
}: {
  baseToStandard?: boolean
  coin: WalletCurrencyType | 'FIAT'
  isFiat?: boolean
  value: number | string
}): string => {
  if (isFiat || coin === 'FIAT') {
    return baseToStandard
      ? new BigNumber(value).dividedBy(100).valueOf()
      : new BigNumber(value).multipliedBy(100).valueOf()
  }

  const { coinfig } = window.coins[coin]

  const number = baseToStandard
    ? new BigNumber(value).dividedBy(Math.pow(10, coinfig.precision))
    : new BigNumber(value).times(Math.pow(10, coinfig.precision))

  return number.toString()
}

const convertCoinToFiat = ({
  coin,
  value,
  currency,
  rates,
  isStandard,
}: {
  coin: CoinType
  value?: number | string
  currency: FiatType
  rates: RatesType
  isStandard?: boolean
}): string => {
  if (!value) return new BigNumber(0).toFixed(2)

  const { coinfig } = window.coins[coin]
  const { last } = rates[currency]
  const amt = isStandard
    ? new BigNumber(value)
    : new BigNumber(value).dividedBy(Math.pow(10, coinfig.precision))

  const fiatAmt = amt.times(last).toFixed(2)

  return fiatAmt
}

const convertFiatToCoin = ({
  coin,
  currency,
  rates,
  value,
}: {
  coin: CoinType
  currency: keyof CurrenciesType
  rates: RatesType
  value: number | string
}): string => {
  if (!value) return '0'

  const { coinfig } = window.coins[coin]
  const { last } = rates[currency]

  return new BigNumber(value).dividedBy(last).toFixed(coinfig.precision)
}

// 🔺Triangulate Wallet Fiat -> BTC -> To other Fiat
const convertFiatToFiat = ({
  fromCurrency,
  rates,
  toCurrency,
  value,
}: {
  fromCurrency: WalletFiatType
  rates: RatesType
  toCurrency: WalletFiatType
  value: number | string
}) => {
  const btcAmt = convertFiatToCoin({
    coin: 'BTC',
    value,
    currency: fromCurrency,
    rates,
  })
  const { last } = rates[toCurrency as FiatType]
  return new BigNumber(btcAmt).times(last).toFixed(2)
}

// =====================================================================
// =============================== STRING ==============================
// =====================================================================
const displayCoinToCoin = ({
  coin,
  isFiat,
  value,
}: {
  coin: WalletCurrencyType
  isFiat?: boolean
  value: number | string
}): string => {
  if (isFiat) {
    const options = { style: 'currency', currency: coin }
    return new Intl.NumberFormat(getLang(), options).format(Number(value))
  }

  return formatCoin(convertCoinToCoin({ baseToStandard: true, value, coin }))
}

const displayCoinToFiat = ({
  rates,
  toCurrency,
  value,
}: {
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}): string => {
  const { last } = rates[toCurrency as FiatType]
  const number = new BigNumber(value).times(last).toNumber()
  const options = { style: 'currency', currency: toCurrency }
  return new Intl.NumberFormat(getLang(), options).format(number)
}

const displayFiatToFiat = ({ value }: { value: number | string }) => {
  return new BigNumber(value).toFixed(2)
}

export {
  convertCoinToCoin,
  convertCoinToFiat,
  convertFiatToCoin,
  convertFiatToFiat,
  displayCoinToCoin,
  displayCoinToFiat,
  displayFiatToFiat,
  getSymbol,
}
