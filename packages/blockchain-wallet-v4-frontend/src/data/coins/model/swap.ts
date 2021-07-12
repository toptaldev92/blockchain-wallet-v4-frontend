import { CoinType } from 'blockchain-wallet-v4/src/types'
import { CoinAccountSelectorType } from 'data/coins/types'

// TODO: erc20 phase 2, get from BE
// master list of coins supported by Swap
// the order of the determines the order in which coins are shown to the user
export const SUPPORTED_COINS: Array<CoinType | string> = [
  'BTC',
  'ETH',
  'BCH',
  'AAVE',
  'YFI',
  'DOT',
  'XLM',
  'PAX',
  'USDT',
  'WDGLD',
  'ALGO',
  'CLOUT'
]

// used in the coin/account selector in Swap
export const SWAP_ACCOUNTS_SELECTOR: CoinAccountSelectorType = {
  coins: SUPPORTED_COINS,
  nonCustodialAccounts: true,
  tradingAccounts: true
}
