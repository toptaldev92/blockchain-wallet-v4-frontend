import { combineReducers } from 'redux'
import { identityVerificationReducer } from './identityVerification/reducers'
import coinify from './coinify/reducers'
import exchange from './exchange/reducers'
import exchangeHistory from './exchangeHistory/reducers'
import layoutWallet from './layoutWallet/reducers'
import lockbox from './lockbox/reducers'
import manageAddresses from './manageAddresses/reducers'
import onboarding from './onboarding/reducers'
import onfido from './onfido/reducers'
import priceChart from './priceChart/reducers'
import send from './send/reducers'
import sendBch from './sendBch/reducers'
import sendBtc from './sendBtc/reducers'
import sendEth from './sendEth/reducers'
import sendXlm from './sendXlm/reducers'
import signMessage from './signMessage/reducers'
import uploadDocuments from './uploadDocuments/reducers'
import veriff from './veriff/reducers'

const componentReducer = combineReducers({
  identityVerification: identityVerificationReducer,
  coinify,
  exchange,
  exchangeHistory,
  layoutWallet,
  lockbox,
  manageAddresses,
  onboarding,
  onfido,
  priceChart,
  send,
  sendBch,
  sendBtc,
  sendEth,
  sendXlm,
  signMessage,
  uploadDocuments,
  veriff
})

export default componentReducer
