import {
  curry,
  keys,
  filter,
  lensProp,
  mapObjIndexed,
  path,
  prop,
  toUpper,
  set
} from 'ramda'
import { getInvitations } from '../settings/selectors'
import { walletOptionsPath } from '../paths'
import { createDeepEqualSelector } from '../../utils'

// general
export const getOptions = path([walletOptionsPath])
export const getDomains = state => getOptions(state).map(prop('domains'))
export const getWebOptions = state =>
  getOptions(state).map(path(['platforms', 'web']))
export const getWalletHelperUrl = state =>
  getDomains(state).map(prop('walletHelper'))
export const getAppEnv = state =>
  getWebOptions(state).map(path(['application', 'environment']))
export const getAnalyticsSiteId = state =>
  getWebOptions(state).map(path(['application', 'analyticsSiteId']))
export const getAnnouncements = state =>
  getWebOptions(state).map(path(['application', 'announcements']))
export const getMigrationRedirects = state =>
  getWebOptions(state).map(
    path(['application', 'enableDomainMigrationRedirects'])
  )

// coins
export const getSupportedCoins = createDeepEqualSelector(
  [getInvitations, getWebOptions],
  (invitationsR, webOptionsR) => {
    const addInvited = (obj, coin) => {
      const invited = invitationsR.map(prop(coin)).getOrElse(false)
      return set(lensProp('invited'), invited, obj)
    }

    return webOptionsR.map(prop('coins')).map(mapObjIndexed(addInvited))
  }
)
export const getBtcNetwork = state =>
  getSupportedCoins(state).map(path(['BTC', 'config', 'network']))
export const getBchFees = state =>
  getSupportedCoins(state).map(path(['BCH', 'config', 'fees']))
export const getEthTxFuse = state =>
  getSupportedCoins(state).map(path(['ETH', 'lastTxFuse']))
export const getXlmSendTimeOutSeconds = state =>
  getSupportedCoins(state).map(path(['XLM', 'config', 'sendTimeOutSeconds']))
export const getXlmExchangeAddresses = state =>
  getSupportedCoins(state).map(path(['XLM', 'exchangeAddresses']))
export const getCoinAvailability = curry((state, coin) =>
  getSupportedCoins(state).map(path([toUpper(coin), 'availability']))
)
export const getErc20CoinList = state =>
  getSupportedCoins(state).map(x => keys(filter(c => c.contractAddress, x)))
export const getCoinModel = (state, coin) =>
  getSupportedCoins(state).map(x => prop(toUpper(coin), x))
export const getCoinIcons = (state, coin) =>
  getCoinModel(state, coin).map(path(['icons']))

// partners
export const getSFOXCountries = state =>
  getWebOptions(state).map(path(['sfox', 'countries']))
export const getSFOXStates = state =>
  getWebOptions(state).map(path(['sfox', 'states']))
export const getCoinifyCountries = state =>
  getWebOptions(state).map(path(['coinify', 'countries']))
export const getISignThisDomain = state =>
  getWebOptions(state).map(path(['coinify', 'config', 'iSignThisDomain']))
export const getCoinifyPaymentDomain = state =>
  getWebOptions(state).map(path(['coinify', 'config', 'coinifyPaymentDomain']))
export const getVeriffDomain = state => getDomains(state).map(prop('veriff'))
export const getPlaidKey = state =>
  getWebOptions(state).map(path(['sfox', 'config', 'plaid']))
export const getPlaidEnv = state =>
  getWebOptions(state).map(path(['sfox', 'config', 'plaidEnv']))
