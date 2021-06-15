import {
  CoinType,
  InterestBalanceType,
  SBBalanceType,
  SupportedCoinType
} from 'blockchain-wallet-v4/src/types'
import { convertStandardToBase } from 'data/components/exchange/services'
import { SwapAccountType, SwapBaseCounterTypes } from 'data/components/types'

export const generateTradingAccount = (
  coin: CoinType,
  config: SupportedCoinType,
  sbBalance?: SBBalanceType
): SwapAccountType[] => {
  const { coinfig } = window.coins[coin]
  return [
    {
      balance: sbBalance?.available || '0',
      baseCoin: coinfig.type.erc20Address ? 'ETH' : (coin as SwapAccountType['baseCoin']),
      coin,
      config,
      label: 'Trading Account',
      type: SwapBaseCounterTypes.CUSTODIAL
    }
  ]
}

export const generateInterestAccount = (
  coin: CoinType,
  config: SupportedCoinType,
  interestBalance?: InterestBalanceType
): SwapAccountType[] => {
  const { coinfig } = window.coins[coin]
  return [
    {
      balance: interestBalance?.balance || '0',
      baseCoin: coinfig.type.erc20Address ? 'ETH' : (coin as SwapAccountType['baseCoin']),
      coin,
      config,
      label: `${coin} Interest Account`,
      // @ts-ignore
      type: 'INTEREST'
    }
  ]
}

export const generateProvisionalPaymentAmount = (
  coin: CoinType,
  amount: number
): string | number => {
  if (coin === 'BTC' || coin === 'BCH') {
    return parseInt(convertStandardToBase(coin, amount), 10)
  }

  return convertStandardToBase(coin, amount)
}
