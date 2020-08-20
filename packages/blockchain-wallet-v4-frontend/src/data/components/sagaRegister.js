import { fork } from 'redux-saga/effects'
import activityList from './activityList/sagaRegister'
import algoTransactions from './algoTransactions/sagaRegister'
import bchTransactions from './bchTransactions/sagaRegister'
import borrow from './borrow/sagaRegister'
import btcTransactions from './btcTransactions/sagaRegister'
import ethTransactions from './ethTransactions/sagaRegister'
import exchange from './exchange/sagaRegister'
import exchangeHistory from './exchangeHistory/sagaRegister'
import fiatTransactions from './fiatTransactions/sagaRegister'
import identityVerification from './identityVerification/sagaRegister'
import importBtcAddress from './importBtcAddress/sagaRegister'
import interest from './interest/sagaRegister'
import lockbox from './lockbox/sagaRegister'
import manageAddresses from './manageAddresses/sagaRegister'
import onfido from './onfido/sagaRegister'
import priceChart from './priceChart/sagaRegister'
import priceTicker from './priceTicker/sagaRegister'
import refresh from './refresh/sagaRegister'
import requestBch from './requestBch/sagaRegister'
import requestBtc from './requestBtc/sagaRegister'
import requestEth from './requestEth/sagaRegister'
import requestXlm from './requestXlm/sagaRegister'
import send from './send/sagaRegister'
import sendBch from './sendBch/sagaRegister'
import sendBtc from './sendBtc/sagaRegister'
import sendEth from './sendEth/sagaRegister'
import sendXlm from './sendXlm/sagaRegister'
import settings from './settings/sagaRegister'
import signMessage from './signMessage/sagaRegister'
import simpleBuy from './simpleBuy/sagaRegister'
import uploadDocuments from './uploadDocuments/sagaRegister'
import veriff from './veriff/sagaRegister'
import withdraw from './withdraw/sagaRegister'
import xlmTransactions from './xlmTransactions/sagaRegister'

export default ({ api, coreSagas, networks }) =>
  function * componentsSaga () {
    yield fork(activityList())
    yield fork(algoTransactions())
    yield fork(borrow({ api, coreSagas, networks }))
    yield fork(bchTransactions())
    yield fork(btcTransactions())
    yield fork(ethTransactions())
    yield fork(xlmTransactions())
    yield fork(exchange({ api, coreSagas, networks }))
    yield fork(exchangeHistory({ api, coreSagas }))
    yield fork(fiatTransactions({ api, coreSagas }))
    yield fork(identityVerification({ api, coreSagas }))
    yield fork(interest({ api, coreSagas, networks }))
    yield fork(lockbox({ api, coreSagas }))
    yield fork(importBtcAddress({ api, coreSagas, networks }))
    yield fork(manageAddresses({ api, networks }))
    yield fork(onfido({ api, coreSagas }))
    yield fork(priceChart({ coreSagas }))
    yield fork(priceTicker({ coreSagas }))
    yield fork(refresh())
    yield fork(requestBtc({ networks }))
    yield fork(requestBch({ networks }))
    yield fork(requestEth({ networks }))
    yield fork(requestXlm())
    yield fork(send({ api, coreSagas, networks }))
    yield fork(sendBch({ api, coreSagas, networks }))
    yield fork(sendBtc({ api, coreSagas, networks }))
    yield fork(sendEth({ api, coreSagas, networks }))
    yield fork(sendXlm({ api, coreSagas }))
    yield fork(settings({ coreSagas }))
    yield fork(signMessage({ coreSagas }))
    yield fork(simpleBuy({ api, coreSagas, networks }))
    yield fork(uploadDocuments({ api }))
    yield fork(withdraw({ api }))
    yield fork(veriff({ api, coreSagas }))
  }
