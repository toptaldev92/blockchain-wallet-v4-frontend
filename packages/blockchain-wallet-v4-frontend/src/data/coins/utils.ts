import {
  CoinType,
  InterestBalanceType,
  SBBalanceType,
  SupportedCoinType,
} from 'blockchain-wallet-v4/src/types'
import { convertStandardToBase } from 'data/components/exchange/services'
import { SwapAccountType } from 'data/components/types'

export const generateTradingAccount = (
  coin: CoinType,
  config: SupportedCoinType,
  sbBalance?: SBBalanceType
): SwapAccountType[] => {
  return [
    {
      balance: sbBalance?.available || '0',
      baseCoin: config.contractAddress ? 'ETH' : (coin as SwapAccountType['baseCoin']),
      coin,
      config,
      label: 'Trading Account',
      type: 'CUSTODIAL',
    },
  ]
}

export const generateInterestAccount = (
  coin: CoinType,
  config: SupportedCoinType,
  interestBalance?: InterestBalanceType
): SwapAccountType[] => {
  // hack to support PAX rebrand 🤬
  const ticker = coin === 'PAX' ? 'USD-D' : coin
  return [
    {
      balance: interestBalance?.balance || '0',
      baseCoin: config.contractAddress ? 'ETH' : (coin as SwapAccountType['baseCoin']),
      coin,
      config,
      label: `${ticker} Interest Account`,
      type: 'INTEREST',
    },
  ]
}

export const generateProvisionalPaymentAmount = (
  coin: CoinType,
  amount: number
): string | number => {
  if (coin === 'BTC' || coin === 'BCH') {
    return parseInt(convertStandardToBase(coin, amount))
  }

  return convertStandardToBase(coin, amount)
}
