import * as Currency from './currency'
import * as Pairs from './pairs'
import { assoc, assocPath, path, prop } from 'ramda'
import { BigNumber } from 'bignumber.js'
import {
  CoinType,
  RatesType,
  WalletCurrencyType,
  WalletFiatType
} from 'core/types'
import Currencies, { CurrenciesType } from './currencies'

type KeysOfUnion<T> = T extends any ? keyof T : never
export type UnitType = KeysOfUnion<
  CurrenciesType[keyof CurrenciesType]['units']
>

const { BCH, BTC, ETH, PAX, XLM, USDT, ALGO } = Currencies

const DefaultConversion = {
  value: '0',
  unit: {
    rate: '0',
    symbol: 'N/A',
    decimal_digits: 0,
    currency: 'N/A'
  }
}

const DefaultDisplay = 'N/A'

// =====================================================================
// ============================ CALCULATION ============================
// =====================================================================
const transformFiatToBtc = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: UnitType
  value: number | string
}) => {
  const pairs = Pairs.create(BTC.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], BTC)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, BTC))
    .chain(Currency.toUnit(targetUnit))
}

const transformBtcToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(BTC.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const targetCurrencyUnit = path(['units', targetCurrencyCode], targetCurrency)
  const sourceUnit = path(['units', fromUnit], BTC)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, targetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformBtcToBtc = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], BTC)
  const targetUnit = path(['units', toUnit], BTC)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

const transformFiatToEther = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  const pairs = Pairs.create(ETH.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], ETH)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, ETH))
    .chain(Currency.toUnit(targetUnit))
}

const transformFiatToPax = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  const pairs = Pairs.create(PAX.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], PAX)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, PAX))
    .chain(Currency.toUnit(targetUnit))
}

const transformFiatToUsdt = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  const pairs = Pairs.create(USDT.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], USDT)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, USDT))
    .chain(Currency.toUnit(targetUnit))
}

const transformEtherToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(ETH.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const targetCurrencyUnit = path(['units', targetCurrencyCode], targetCurrency)
  const sourceUnit = path(['units', fromUnit], ETH)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, targetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformPaxToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(PAX.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const targetCurrencyUnit = path(['units', targetCurrencyCode], targetCurrency)
  const sourceUnit = path(['units', fromUnit], PAX)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, targetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformUsdtToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(USDT.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const targetCurrencyUnit = path(['units', targetCurrencyCode], targetCurrency)
  const sourceUnit = path(['units', fromUnit], USDT)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, targetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformEtherToEther = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], ETH)
  const targetUnit = path(['units', toUnit], ETH)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

const transformPaxToPax = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], PAX)
  const targetUnit = path(['units', toUnit], PAX)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

const transformUsdtToUsdt = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], USDT)
  const targetUnit = path(['units', toUnit], USDT)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

const transformFiatToBch = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  const pairs = Pairs.create(BCH.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], BCH)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, BCH))
    .chain(Currency.toUnit(targetUnit))
}

const transformBchToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(BCH.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const targetCurrencyUnit = path(['units', targetCurrencyCode], targetCurrency)
  const sourceUnit = path(['units', fromUnit], BCH)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, targetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformBchToBch = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], BCH)
  const targetUnit = path(['units', toUnit], BCH)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

const transformFiatToXlm = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  const pairs = Pairs.create(XLM.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], XLM)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, XLM))
    .chain(Currency.toUnit(targetUnit))
}

const transformXlmToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates,
  digits = 2
}: {
  digits?: number
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(XLM.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const updatedTargetCurrency = assocPath(
    ['units', targetCurrencyCode, 'decimal_digits'],
    digits,
    prop(toCurrency, Currencies)
  )
  const targetCurrencyUnit = path(
    ['units', targetCurrencyCode],
    updatedTargetCurrency
  )
  const sourceUnit = path(['units', fromUnit], XLM)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, updatedTargetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformXlmToXlm = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], XLM)
  const targetUnit = path(['units', toUnit], XLM)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

const transformFiatToAlgo = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  const pairs = Pairs.create(ALGO.code, rates)
  const sourceCurrency = prop(fromCurrency, Currencies)
  const sourceCurrencyCode = prop('code', sourceCurrency)
  const sourceCurrencyUnit = path(['units', sourceCurrencyCode], sourceCurrency)
  const targetUnit = path(['units', toUnit], ALGO)
  return Currency.fromUnit({ value: value, unit: sourceCurrencyUnit })
    .chain(Currency.convert(pairs, ALGO))
    .chain(Currency.toUnit(targetUnit))
}

const transformAlgoToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates,
  digits = 2
}: {
  digits?: number
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  const pairs = Pairs.create(ALGO.code, rates)
  const targetCurrency = prop(toCurrency, Currencies)
  const targetCurrencyCode = prop('code', targetCurrency)
  const updatedTargetCurrency = assocPath(
    ['units', targetCurrencyCode, 'decimal_digits'],
    digits,
    prop(toCurrency, Currencies)
  )
  const targetCurrencyUnit = path(
    ['units', targetCurrencyCode],
    updatedTargetCurrency
  )
  const sourceUnit = path(['units', fromUnit], ALGO)
  return Currency.fromUnit({ value, unit: sourceUnit })
    .chain(Currency.convert(pairs, updatedTargetCurrency))
    .chain(Currency.toUnit(targetCurrencyUnit))
}

const transformAlgoToAlgo = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  const sourceUnit = path(['units', fromUnit], ALGO)
  const targetUnit = path(['units', toUnit], ALGO)
  return Currency.fromUnit({ value, unit: sourceUnit }).chain(
    Currency.toUnit(targetUnit)
  )
}

// =====================================================================
// ============================== DECIMALS =============================
// =====================================================================
const convertFiatToBtc = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToBtc({
    value,
    fromCurrency,
    toUnit,
    rates
  }).getOrElse(DefaultConversion)
}

const convertBtcToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformBtcToFiat({
    value,
    fromUnit,
    toCurrency,
    rates
  }).getOrElse(DefaultConversion)
}

const convertBtcToBtc = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformBtcToBtc({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertFiatToEther = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToEther({ value, fromCurrency, toUnit, rates }).getOrElse(
    DefaultConversion
  )
}

const convertFiatToPax = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToPax({ value, fromCurrency, toUnit, rates }).getOrElse(
    DefaultConversion
  )
}
const convertFiatToUsdt = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToUsdt({ value, fromCurrency, toUnit, rates }).getOrElse(
    DefaultConversion
  )
}

const convertEthToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformEtherToFiat({ value, fromUnit, toCurrency, rates }).getOrElse(
    DefaultConversion
  )
}

const convertPaxToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformPaxToFiat({ value, fromUnit, toCurrency, rates }).getOrElse(
    DefaultConversion
  )
}

const convertUsdtToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformUsdtToFiat({ value, fromUnit, toCurrency, rates }).getOrElse(
    DefaultConversion
  )
}

const convertEtherToEther = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformEtherToEther({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertPaxToPax = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformPaxToPax({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertUsdtToUsdt = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformUsdtToUsdt({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertFiatToBch = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToBch({ value, fromCurrency, toUnit, rates }).getOrElse(
    DefaultConversion
  )
}

const convertBchToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformBchToFiat({ value, fromUnit, toCurrency, rates }).getOrElse(
    DefaultConversion
  )
}

const convertBchToBch = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformBchToBch({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertFiatToXlm = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToXlm({ value, fromCurrency, toUnit, rates }).getOrElse(
    DefaultConversion
  )
}

const convertXlmToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformXlmToFiat({ value, fromUnit, toCurrency, rates }).getOrElse(
    DefaultConversion
  )
}

const convertXlmToXlm = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformXlmToXlm({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertFiatToAlgo = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToAlgo({ value, fromCurrency, toUnit, rates }).getOrElse(
    DefaultConversion
  )
}

const convertAlgoToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformAlgoToFiat({ value, fromUnit, toCurrency, rates }).getOrElse(
    DefaultConversion
  )
}

const convertAlgoToAlgo = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformAlgoToAlgo({ value, fromUnit, toUnit }).getOrElse(
    DefaultConversion
  )
}

const convertCoinUnitToFiat = ({
  coin,
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  coin: CoinType
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  switch (coin) {
    case 'BTC':
      return transformBtcToFiat({
        value,
        fromUnit,
        toCurrency,
        rates
      }).getOrElse(DefaultConversion)
    case 'ETH':
      return transformEtherToFiat({
        value,
        fromUnit,
        toCurrency,
        rates
      }).getOrElse(DefaultConversion)
    case 'PAX':
      return transformPaxToFiat({
        value,
        fromUnit,
        toCurrency,
        rates
      }).getOrElse(DefaultConversion)
    case 'USDT':
      return transformUsdtToFiat({
        value,
        fromUnit,
        toCurrency,
        rates
      }).getOrElse(DefaultConversion)
    case 'BCH':
      return transformBchToFiat({
        value,
        fromUnit,
        toCurrency,
        rates
      }).getOrElse(DefaultConversion)
    case 'XLM':
      return transformXlmToFiat({
        value,
        fromUnit,
        toCurrency,
        rates
      }).getOrElse(DefaultConversion)
    default:
      return 'Unsupported Coin Code'
  }
}

const convertCoinToCoin = ({
  value,
  coin,
  baseToStandard
}: {
  baseToStandard: boolean
  coin: WalletCurrencyType | 'FIAT' | 'USD-D'
  value: number | string
}) => {
  switch (coin) {
    case 'BTC':
      return baseToStandard
        ? convertBtcToBtc({ value, fromUnit: 'SAT', toUnit: 'BTC' })
        : convertBtcToBtc({ value, fromUnit: 'BTC', toUnit: 'SAT' })
    case 'ETH':
      return baseToStandard
        ? convertEtherToEther({ value, fromUnit: 'WEI', toUnit: 'ETH' })
        : convertEtherToEther({ value, fromUnit: 'ETH', toUnit: 'WEI' })
    case 'USD-D':
    case 'PAX':
      return baseToStandard
        ? convertPaxToPax({ value, fromUnit: 'WEI', toUnit: 'PAX' })
        : convertPaxToPax({ value, fromUnit: 'PAX', toUnit: 'WEI' })
    case 'USDT':
      return baseToStandard
        ? convertUsdtToUsdt({ value, fromUnit: 'WEI', toUnit: 'USDT' })
        : convertUsdtToUsdt({ value, fromUnit: 'USDT', toUnit: 'WEI' })
    case 'BCH':
      return baseToStandard
        ? convertBchToBch({ value, fromUnit: 'SAT', toUnit: 'BCH' })
        : convertBchToBch({ value, fromUnit: 'BCH', toUnit: 'SAT' })
    case 'XLM':
      return baseToStandard
        ? convertXlmToXlm({ value, fromUnit: 'STROOP', toUnit: 'XLM' })
        : convertXlmToXlm({ value, fromUnit: 'XLM', toUnit: 'STROOP' })
    case 'ALGO':
      return baseToStandard
        ? convertAlgoToAlgo({ value, fromUnit: 'mALGO', toUnit: 'ALGO' })
        : convertAlgoToAlgo({ value, fromUnit: 'ALGO', toUnit: 'mALGO' })
    case 'EUR':
    case 'GBP':
    case 'USD':
    case 'FIAT':
      return baseToStandard
        ? { value: new BigNumber(value).dividedBy(100).valueOf() }
        : { value: new BigNumber(value).multipliedBy(100).valueOf() }
  }
}

// =====================================================================
// =============================== STRING ==============================
// =====================================================================
const displayFiatToBtc = ({
  value,
  fromCurrency,
  toUnit,
  rates
}: {
  fromCurrency: keyof CurrenciesType
  rates: RatesType
  toUnit: any
  value: number | string
}) => {
  return transformFiatToBtc({ value, fromCurrency, toUnit, rates })
    .map(Currency.coinToString)
    .getOrElse(DefaultDisplay)
}

const displayBtcToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformBtcToFiat({ value, fromUnit, toCurrency, rates })
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayBtcToBtc = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformBtcToBtc({ value, fromUnit, toUnit })
    .map(Currency.coinToString)
    .getOrElse(DefaultDisplay)
}

const displayEtherToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformEtherToFiat({ value, fromUnit, toCurrency, rates })
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayPaxToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformPaxToFiat({ value, fromUnit, toCurrency, rates })
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayUsdtToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformUsdtToFiat({ value, fromUnit, toCurrency, rates })
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayEtherToEther = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformEtherToEther({ value, fromUnit, toUnit })
    .map(Currency.coinToString)
    .getOrElse(DefaultDisplay)
}

const displayPaxToPax = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformPaxToPax({ value, fromUnit, toUnit })
    .map(x => Currency.coinToString({ ...x, minDigits: 2, maxDigits: 2 }))
    .getOrElse(DefaultDisplay)
}

const displayUsdtToUsdt = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformUsdtToUsdt({ value, fromUnit, toUnit })
    .map(x => Currency.coinToString({ ...x, minDigits: 2, maxDigits: 2 }))
    .getOrElse(DefaultDisplay)
}

const displayBchToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  return transformBchToFiat({ value, fromUnit, toCurrency, rates })
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayBchToBch = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformBchToBch({ value, fromUnit, toUnit })
    .map(Currency.coinToString)
    .getOrElse(DefaultDisplay)
}

const displayXlmToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates,
  digits = 2
}) => {
  return transformXlmToFiat({ value, fromUnit, toCurrency, rates, digits })
    .map(assoc('digits', digits))
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayXlmToXlm = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformXlmToXlm({ value, fromUnit, toUnit })
    .map(Currency.coinToString)
    .getOrElse(DefaultDisplay)
}

const displayAlgoToFiat = ({
  value,
  fromUnit,
  toCurrency,
  rates,
  digits = 2
}) => {
  return transformAlgoToFiat({ value, fromUnit, toCurrency, rates, digits })
    .map(assoc('digits', digits))
    .map(Currency.unsafe_deprecated_fiatToString)
    .getOrElse(DefaultDisplay)
}

const displayAlgoToAlgo = ({
  value,
  fromUnit,
  toUnit
}: {
  fromUnit: UnitType
  toUnit: UnitType
  value: number | string
}) => {
  return transformAlgoToAlgo({ value, fromUnit, toUnit })
    .map(Currency.coinToString)
    .getOrElse(DefaultDisplay)
}

const displayCoinToFiat = ({
  fromCoin,
  value,
  fromUnit,
  toCurrency,
  rates
}: {
  fromCoin: CoinType
  fromUnit: UnitType
  rates: RatesType
  toCurrency: keyof CurrenciesType
  value: number | string
}) => {
  switch (fromCoin) {
    case 'BTC':
      return displayBtcToFiat({ value, fromUnit, toCurrency, rates })
    case 'ETH':
      return displayEtherToFiat({ value, fromUnit, toCurrency, rates })
    case 'PAX':
      return displayPaxToFiat({ value, fromUnit, toCurrency, rates })
    case 'USDT':
      return displayUsdtToFiat({ value, fromUnit, toCurrency, rates })
    case 'BCH':
      return displayBchToFiat({ value, fromUnit, toCurrency, rates })
    case 'XLM':
      return displayXlmToFiat({ value, fromUnit, toCurrency, rates })
    case 'ALGO':
      return displayAlgoToFiat({ value, fromUnit, toCurrency, rates })
    default:
      return 'Unsupported Coin Code'
  }
}

const displayFiatToFiat = ({ value }: { value: number | string }) => {
  return new BigNumber(value).toFixed(2)
}

const getSymbol = currency => {
  const data = Currencies[currency]
  const tradeUnit = prop('trade', data)
  return path(['units', tradeUnit, 'symbol'], data)
}

const convertFiatToCoin = (
  value: number | string,
  unit: UnitType,
  currency: keyof CurrenciesType,
  rates: RatesType
) => {
  switch (true) {
    case unit === 'BTC':
      return convertFiatToBtc({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    case unit === 'ETH':
      return convertFiatToEther({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    case unit === 'PAX':
      return convertFiatToPax({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    case unit === 'USDT':
      return convertFiatToUsdt({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    case unit === 'BCH':
      return convertFiatToBch({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    case unit === 'XLM':
      return convertFiatToXlm({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    case unit === 'ALGO':
      return convertFiatToAlgo({
        value,
        fromCurrency: currency,
        toUnit: unit,
        rates: rates
      }).value
    default:
      return 'Unsupported Coin Code'
  }
}

const convertCoinToFiat = (
  value: number | string,
  unit: UnitType,
  currency: keyof CurrenciesType,
  rates: RatesType
) => {
  switch (true) {
    case unit === 'BTC':
      return convertBtcToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    case unit === 'ETH':
      return convertEthToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    case unit === 'PAX':
      return convertPaxToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    case unit === 'USDT':
      return convertUsdtToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    case unit === 'BCH':
      return convertBchToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    case unit === 'XLM':
      return convertXlmToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    case unit === 'ALGO':
      return convertAlgoToFiat({
        value,
        toCurrency: currency,
        fromUnit: unit,
        rates: rates
      }).value
    default:
      return 'Unsupported Coin Code'
  }
}

// 🔺Triangulate Wallet Fiat -> BTC -> To other Fiat
const convertFiatToFiat = ({
  value,
  fromCurrency,
  toCurrency,
  rates
}: {
  fromCurrency: WalletFiatType
  rates: RatesType
  toCurrency: WalletFiatType
  value: number | string
}) => {
  const btcAmt = convertFiatToBtc({ value, fromCurrency, toUnit: 'BTC', rates })
  const fiatAmt = convertBtcToFiat({
    value: btcAmt.value,
    fromUnit: 'BTC',
    toCurrency,
    rates
  })

  return fiatAmt
}

const displayCoinToCoin = (
  value: number | string,
  toUnit: WalletCurrencyType
) => {
  switch (toUnit) {
    case 'BCH':
      return displayBchToBch({
        fromUnit: 'SAT',
        toUnit,
        value
      })
    case 'BTC':
      return displayBtcToBtc({
        fromUnit: 'SAT',
        toUnit,
        value
      })
    case 'PAX':
      const paxAmount = convertPaxToPax({ value, fromUnit: 'WEI', toUnit })
      return displayPaxToPax({
        value: Number(paxAmount.value).toFixed(8),
        fromUnit: 'PAX',
        toUnit
      })
    case 'USDT':
      const usdtAmount = convertUsdtToUsdt({ value, fromUnit: 'WEI', toUnit })
      return displayUsdtToUsdt({
        value: Number(usdtAmount.value).toFixed(8),
        fromUnit: 'USDT',
        toUnit
      })
    case 'ETH':
      const ethAmount = convertEtherToEther({ value, fromUnit: 'WEI', toUnit })
      return displayEtherToEther({
        value: Number(ethAmount.value).toFixed(8),
        fromUnit: 'ETH',
        toUnit
      })
    case 'XLM':
      return displayXlmToXlm({
        fromUnit: 'STROOP',
        toUnit,
        value
      })
    case 'ALGO':
      return displayAlgoToAlgo({
        fromUnit: 'mALGO',
        toUnit,
        value
      })
    case 'EUR':
    case 'GBP':
    case 'USD':
      return Currency.fiatToString({ value, unit: toUnit })
    default:
      return 'Coin not supported'
  }
}

export const convertCoinToCoinFromTransaction = (coin, tx) => {
  switch (coin) {
    case 'PAX':
      return convertPaxToPax({
        value: tx.amount,
        fromUnit: 'WEI',
        toUnit: 'PAX'
      }).value
    case 'USDT':
      return convertUsdtToUsdt({
        value: tx.amount,
        fromUnit: 'WEI',
        toUnit: 'USDT'
      }).value
    default:
      return convertEtherToEther({
        value: tx.amount,
        fromUnit: 'WEI',
        toUnit: 'ETH'
      }).value
  }
}
// TODO: clean up public vs private exports, should just export the following
// convertFiatToCoin
// convertCoinToFiat
// convertFiatToCoin
// convertCoinToCoin
// displayFiatToCoin
// displayCoinToFiat
export {
  DefaultConversion,
  DefaultDisplay,
  convertFiatToFiat,
  convertFiatToCoin,
  convertCoinToFiat,
  convertAlgoToFiat,
  convertAlgoToAlgo,
  convertBtcToFiat,
  convertBtcToBtc,
  convertBchToFiat,
  convertBchToBch,
  convertEthToFiat,
  convertEtherToEther,
  convertFiatToBtc,
  convertFiatToEther,
  convertFiatToBch,
  convertFiatToXlm,
  convertPaxToFiat,
  convertUsdtToFiat,
  convertPaxToPax,
  convertUsdtToUsdt,
  convertXlmToFiat,
  convertXlmToXlm,
  convertCoinToCoin,
  displayAlgoToFiat,
  displayAlgoToAlgo,
  displayBtcToFiat,
  displayBtcToBtc,
  displayBchToFiat,
  displayBchToBch,
  displayEtherToFiat,
  displayEtherToEther,
  displayFiatToBtc,
  displayPaxToPax,
  displayUsdtToUsdt,
  displayXlmToFiat,
  displayXlmToXlm,
  displayCoinToCoin,
  displayCoinToFiat,
  displayFiatToFiat,
  getSymbol,
  convertCoinUnitToFiat
}
