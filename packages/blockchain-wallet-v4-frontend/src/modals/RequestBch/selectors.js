import { formValueSelector } from 'redux-form'
import { lift, head, map } from 'ramda'
import settings from 'config'
import { selectors } from 'data'
import { Remote, utils } from 'blockchain-wallet-v4/src'

const { isCashAddr, toCashAddr } = utils.bch

// extractAddress :: (Int -> Remote(String)) -> Int -> Remote(String)
const extractAddress = (softwareWalletSelector, lockboxSelector, value) => {
  return value
    ? value.address
      ? Remote.of(value.address)
      : value.index !== undefined
        ? softwareWalletSelector(value.index)
        : lockboxSelector(value.xpub)
    : Remote.Loading
}

export const getData = state => {
  const getReceiveSoftware = index =>
    selectors.core.common.bch.getNextAvailableReceiveAddress(
      settings.NETWORK_BCH,
      index,
      state
    )
  const getReceiveLockbox = index =>
    selectors.core.common.bch.getNextAvailableReceiveAddressLockbox(
      settings.NETWORK_BCH,
      index,
      state
    )
  const coin = formValueSelector('requestBch')(state, 'coin')
  const to = formValueSelector('requestBch')(state, 'to')

  const initialValuesR = getInitialValues(state)
  const receiveAddressR = extractAddress(
    getReceiveSoftware,
    getReceiveLockbox,
    to
  ).map(
    address =>
      address && isCashAddr(address) ? address : toCashAddr(address, true)
  )

  const transform = (receiveAddress, initialValues) => ({
    coin,
    receiveAddress,
    initialValues
  })
  return lift(transform)(receiveAddressR, initialValuesR)
}

export const getInitialValues = state => {
  const toDropdown = map(x => ({ text: x.label, value: x }))
  const balancesR = selectors.core.common.bch
    .getAccountsBalances(state)
    .map(toDropdown)
  const defaultIndexR = selectors.core.kvStore.bch.getDefaultAccountIndex(state)
  const transform = (defaultIndex, balances) => {
    const defaultElement = head(
      balances.filter(x => x.value.index === defaultIndex)
    )
    return { to: defaultElement.value, coin: 'BCH' }
  }
  return lift(transform)(defaultIndexR)(balancesR)
}
