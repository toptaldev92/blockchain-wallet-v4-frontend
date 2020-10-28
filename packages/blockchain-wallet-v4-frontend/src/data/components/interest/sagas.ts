import { call, delay, put, select, take } from 'redux-saga/effects'
import { FormAction, initialize } from 'redux-form'
import { head, last, nth, prop } from 'ramda'
import BigNumber from 'bignumber.js'

import {
  AccountTypes,
  CoinType,
  PaymentValue,
  RatesType,
  RemoteDataType,
  SBBalancesType
} from 'core/types'
import { actions, model, selectors } from 'data'
import { APIType } from 'core/network/api'
import { convertStandardToBase } from '../exchange/services'
import { errorHandler } from 'blockchain-wallet-v4/src/utils'
import { Remote } from 'blockchain-wallet-v4/src'

import * as A from './actions'
import * as AT from './actionTypes'
import * as S from './selectors'
import { DEFAULT_INTEREST_BALANCES } from './model'
import { InterestDepositFormType } from './types'
import {
  INVALID_COIN_TYPE,
  NO_DEFAULT_ACCOUNT
} from 'blockchain-wallet-v4/src/model'
import profileSagas from '../../modules/profile/sagas'
import utils from './sagas.utils'

const { INTEREST_EVENTS } = model.analytics
const DEPOSIT_FORM = 'interestDepositForm'

export default ({
  api,
  coreSagas,
  networks
}: {
  api: APIType
  coreSagas: any
  networks: any
}) => {
  const { isTier2 } = profileSagas({ api, coreSagas, networks })
  const {
    buildAndPublishPayment,
    createLimits,
    createPayment,
    paymentGetOrElse
  } = utils({
    coreSagas,
    networks
  })

  const getAccountIndexOrAccount = (coin: CoinType, account: AccountTypes) => {
    switch (coin) {
      case 'ETH':
      case 'PAX':
      case 'USDT':
      case 'XLM':
        return account.address
      default:
        return account.index
    }
  }

  const fetchInterestBalance = function * () {
    try {
      yield put(A.fetchInterestBalanceLoading())
      if (!(yield call(isTier2)))
        return yield put(
          A.fetchInterestBalanceSuccess(DEFAULT_INTEREST_BALANCES)
        )
      const response: ReturnType<typeof api.getInterestAccountBalance> = yield call(
        api.getInterestAccountBalance
      )
      yield put(A.fetchInterestBalanceSuccess(response))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestBalanceFailure(error))
    }
  }

  const fetchInterestEligible = function * () {
    try {
      yield put(A.fetchInterestEligibleLoading())
      const response: ReturnType<typeof api.getInterestEligible> = yield call(
        api.getInterestEligible
      )
      yield put(A.fetchInterestEligibleSuccess(response))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestEligibleFailure(error))
    }
  }

  const fetchInterestInstruments = function * () {
    try {
      yield put(A.fetchInterestInstrumentsLoading())
      const response: ReturnType<typeof api.getInterestInstruments> = yield call(
        api.getInterestInstruments
      )
      yield put(A.fetchInterestInstrumentsSuccess(response))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestInstrumentsFailure(error))
    }
  }

  const fetchInterestLimits = function * ({
    coin,
    currency
  }: ReturnType<typeof A.fetchInterestLimits>) {
    try {
      yield put(A.fetchInterestLimitsLoading())
      const response: ReturnType<typeof api.getInterestLimits> = yield call(
        api.getInterestLimits,
        coin,
        currency
      )
      yield put(A.fetchInterestLimitsSuccess(response.limits))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestLimitsFailure(error))
    }
  }

  const fetchInterestAccount = function * (coin) {
    try {
      yield put(A.fetchInterestAccountLoading())
      const paymentAccount = yield call(api.getInterestAccount, coin)
      yield put(A.fetchInterestAccountSuccess(paymentAccount))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestAccountFailure(error))
    }
  }

  const fetchInterestRate = function * () {
    try {
      yield put(A.fetchInterestRateLoading())
      const response: ReturnType<typeof api.getInterestSavingsRate> = yield call(
        api.getInterestSavingsRate
      )
      yield put(A.fetchInterestRateSuccess(response))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestRateFailure(error))
    }
  }

  const fetchInterestTransactions = function * ({
    payload
  }: ReturnType<typeof A.fetchInterestTransactions>) {
    const { reset, coin } = payload

    try {
      const nextPage = !reset
        ? yield select(S.getTransactionsNextPage)
        : undefined
      // check if invoked from continuous scroll
      if (!reset) {
        const txList = yield select(S.getInterestTransactions)
        // return if next page is already being fetched or there is no next page
        if (Remote.Loading.is(last(txList)) || !nextPage) return
      }
      yield put(A.fetchInterestTransactionsLoading(reset))
      const response = yield call(api.getInterestTransactions, coin, nextPage)
      yield put(A.fetchInterestTransactionsSuccess(response.items, reset))
      yield put(A.setTransactionsNextPage(response.next))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.fetchInterestTransactionsFailure(error))
    }
  }

  const formChanged = function * (action: FormAction) {
    const form = action.meta.form
    if (form !== DEPOSIT_FORM) return

    const formValues: InterestDepositFormType = yield select(
      selectors.form.getFormValues(DEPOSIT_FORM)
    )
    const coin = S.getCoinType(yield select())
    const ratesR = S.getRates(yield select())
    const userCurrency = (yield select(
      selectors.core.settings.getCurrency
    )).getOrFail('Failed to get user currency')
    const rates = ratesR.getOrElse({} as RatesType)
    const rate = rates[userCurrency].last
    const isDisplayed = S.getCoinDisplay(yield select())

    switch (action.meta.field) {
      case 'depositAmount':
        const value = isDisplayed
          ? new BigNumber(action.payload).toNumber()
          : new BigNumber(action.payload).dividedBy(rate).toNumber()
        const paymentR = S.getPayment(yield select())
        if (paymentR) {
          let payment = paymentGetOrElse(coin, paymentR)
          switch (payment.coin) {
            case 'BCH':
            case 'BTC':
              payment = yield payment.amount(
                parseInt(convertStandardToBase(coin, value))
              )
              break
            case 'ETH':
            case 'PAX':
            case 'USDT':
            case 'XLM':
              payment = yield payment.amount(convertStandardToBase(coin, value))
              break
            default:
              throw new Error(INVALID_COIN_TYPE)
          }

          yield put(A.setPaymentSuccess(payment.value()))
        } else {
          break
        }

        break
      case 'interestDepositAccount':
        let custodialBalances: SBBalancesType | undefined
        let depositPayment: PaymentValue
        const isCustodialDeposit =
          prop('type', formValues.interestDepositAccount) === 'CUSTODIAL'

        yield put(A.setPaymentLoading())
        yield put(actions.form.change(DEPOSIT_FORM, 'depositAmount', undefined))
        yield put(actions.form.focus(DEPOSIT_FORM, 'depositAmount'))

        if (isCustodialDeposit) {
          custodialBalances = (yield select(
            selectors.components.simpleBuy.getSBBalances
          )).getOrFail('Failed to get balance')
        }

        depositPayment = yield call(createPayment, {
          ...formValues.interestDepositAccount,
          address: getAccountIndexOrAccount(
            coin,
            formValues.interestDepositAccount
          )
        })

        yield call(createLimits, depositPayment, custodialBalances)
        yield put(A.setPaymentSuccess(depositPayment))
    }
  }

  const initializeDepositForm = function * ({
    payload
  }: ReturnType<typeof A.initializeDepositForm>) {
    const { coin, currency } = payload
    let defaultAccountR
    yield put(A.setPaymentLoading())
    yield put(A.fetchInterestLimits(coin, currency))
    yield take([
      AT.FETCH_INTEREST_LIMITS_SUCCESS,
      AT.FETCH_INTEREST_LIMITS_FAILURE
    ])

    switch (coin) {
      case 'BCH':
        const bchAccountsR = yield select(
          selectors.core.common.bch.getAccountsBalances
        )
        const bchDefaultIndex = (yield select(
          selectors.core.kvStore.bch.getDefaultAccountIndex
        )).getOrElse(0)
        defaultAccountR = bchAccountsR.map(nth(bchDefaultIndex))
        break
      case 'BTC':
        const btcAccountsR = yield select(
          selectors.core.common.btc.getAccountsBalances
        )
        const btcDefaultIndex = yield select(
          selectors.core.wallet.getDefaultAccountIndex
        )
        defaultAccountR = btcAccountsR.map(nth(btcDefaultIndex))
        break
      case 'ETH':
        const ethAccountR = yield select(
          selectors.core.common.eth.getAccountBalances
        )
        defaultAccountR = ethAccountR.map(head)
        break
      case 'PAX':
      case 'USDT':
        const erc20AccountR = yield select(
          selectors.core.common.eth.getErc20AccountBalances,
          coin
        )
        defaultAccountR = erc20AccountR.map(head)
        break
      case 'XLM':
        defaultAccountR = (yield select(
          selectors.core.common.xlm.getAccountBalances
        )).map(head)
        break
      default:
        throw new Error('Invalid Coin Type')
    }
    const defaultAccount = defaultAccountR.getOrFail(NO_DEFAULT_ACCOUNT)
    const payment: PaymentValue = yield call(createPayment, {
      ...defaultAccount,
      address: getAccountIndexOrAccount(coin, defaultAccount)
    })

    yield call(createLimits, payment)
    yield put(A.setPaymentSuccess(payment))
    yield put(
      initialize(DEPOSIT_FORM, {
        interestDepositAccount: defaultAccountR.getOrElse(),
        coin,
        currency
      })
    )
  }

  const initializeWithdrawalForm = function * ({
    // eslint-disable-next-line
    payload
  }: ReturnType<typeof A.initializeWithdrawalForm>) {
    try {
      const response: ReturnType<typeof api.getWithdrawalMinsAndFees> = yield call(
        api.getWithdrawalMinsAndFees
      )
      yield put(A.setWithdrawalMinimimumsLoading())
      yield put(A.setWithdrawalMinimimumsSuccess(response))
    } catch (e) {
      const error = errorHandler(e)
      yield put(A.setWithdrawalMinimimumsFailure(error))
    }
    try {
      yield put(initialize('interestWithdrawalForm', {}))
    } catch (e) {
      // TODO?
    }
  }

  const routeToTxHash = function * ({
    payload
  }: ReturnType<typeof A.routeToTxHash>) {
    const { coin, txHash } = payload
    coin === 'PAX'
      ? yield put(actions.router.push(`/usd-d/transactions`))
      : yield put(actions.router.push(`/${coin}/transactions`))
    yield delay(1000)
    yield put(actions.form.change('walletTxSearch', 'search', txHash))
  }

  const sendDeposit = function * () {
    try {
      yield put(actions.form.startSubmit(DEPOSIT_FORM))
      const formValues: InterestDepositFormType = yield select(
        selectors.form.getFormValues(DEPOSIT_FORM)
      )
      const isCustodialDeposit =
        prop('type', formValues.interestDepositAccount) === 'CUSTODIAL'
      const coin = S.getCoinType(yield select())
      const paymentR = S.getPayment(yield select())
      const payment = paymentGetOrElse(
        coin,
        paymentR as RemoteDataType<string, any>
      )
      if (isCustodialDeposit) {
        const { amount } = payment.value()
        const amountString = amount && amount[0].toString()
        // custodial deposit
        yield call(api.initiateCustodialTransfer, {
          amount: amountString as string,
          currency: coin,
          destination: 'SAVINGS',
          origin: 'SIMPLEBUY'
        })
      } else {
        // non-custodial deposit
        yield call(fetchInterestAccount, coin)
        const depositAddress = yield select(S.getDepositAddress)

        // build and publish payment to network
        const depositTx = yield call(
          buildAndPublishPayment,
          coin,
          payment,
          depositAddress
        )
        // notify backend of incoming non-custodial deposit
        yield put(
          actions.components.send.notifyNonCustodialToCustodialTransfer(
            depositTx,
            'SAVINGS'
          )
        )
      }

      // notify UI of success
      yield put(actions.form.stopSubmit(DEPOSIT_FORM))
      yield put(A.setInterestStep('ACCOUNT_SUMMARY', { depositSuccess: true }))
      yield put(
        actions.analytics.logEvent(INTEREST_EVENTS.DEPOSIT.SEND_SUCCESS)
      )
      yield delay(3000)
      yield put(A.fetchInterestBalance())
      yield put(actions.router.push('/interest/history'))
    } catch (e) {
      const error = errorHandler(e)
      yield put(actions.form.stopSubmit(DEPOSIT_FORM, { _error: error }))
      yield put(
        A.setInterestStep('ACCOUNT_SUMMARY', { depositSuccess: false, error })
      )
      yield put(
        actions.analytics.logEvent(INTEREST_EVENTS.DEPOSIT.SEND_FAILURE)
      )
    }
  }

  const requestWithdrawal = function * ({
    payload
  }: ReturnType<typeof A.requestWithdrawal>) {
    const { coin, withdrawalAmount } = payload
    const FORM = 'interestWithdrawalForm'
    try {
      yield put(actions.form.startSubmit(FORM))
      const withdrawalAmountBase = convertStandardToBase(coin, withdrawalAmount)
      let receiveAddress
      switch (coin) {
        case 'BCH':
          receiveAddress = selectors.core.common.bch
            .getNextAvailableReceiveAddress(
              networks.bch,
              (yield select(
                selectors.core.kvStore.bch.getDefaultAccountIndex
              )).getOrFail(),
              yield select()
            )
            .getOrFail('Failed to get BCH receive address')
          break
        case 'BTC':
          receiveAddress = selectors.core.common.btc
            .getNextAvailableReceiveAddress(
              networks.btc,
              yield select(selectors.core.wallet.getDefaultAccountIndex),
              yield select()
            )
            .getOrFail('Failed to get BTC receive address')
          break
        case 'ETH':
        case 'PAX':
        case 'USDT':
          receiveAddress = selectors.core.data.eth
            .getDefaultAddress(yield select())
            .getOrFail(`Failed to get ${coin} receive address`)
          break
        case 'XLM':
          receiveAddress = selectors.core.kvStore.xlm
            .getDefaultAccountId(yield select())
            .getOrFail(`Failed to get XLM receive address`)
          break
        default:
          throw new Error('Invalid Coin Type')
      }
      // initiate withdrawal request
      yield call(
        api.initiateInterestWithdrawal,
        withdrawalAmountBase,
        coin,
        receiveAddress
      )
      // notify success
      yield put(actions.form.stopSubmit(FORM))
      yield put(A.setInterestStep('ACCOUNT_SUMMARY', { withdrawSuccess: true }))
      yield put(A.fetchInterestBalance())
      yield put(actions.router.push('/interest/history'))
      yield put(
        actions.analytics.logEvent(INTEREST_EVENTS.WITHDRAWAL.REQUEST_SUCCESS)
      )
    } catch (e) {
      const error = errorHandler(e)
      yield put(actions.form.stopSubmit(FORM, { _error: error }))
      yield put(
        A.setInterestStep('ACCOUNT_SUMMARY', { withdrawSuccess: false, error })
      )
      yield put(
        actions.analytics.logEvent(INTEREST_EVENTS.WITHDRAWAL.REQUEST_FAILURE)
      )
    }
  }

  const showInterestModal = function * ({
    payload
  }: ReturnType<typeof A.showInterestModal>) {
    const { step, coin } = payload
    yield put(A.setInterestStep(step))
    yield put(
      actions.modals.showModal('INTEREST_MODAL', {
        origin: 'InterestPage',
        coin
      })
    )
  }

  return {
    fetchInterestBalance,
    fetchInterestEligible,
    fetchInterestInstruments,
    fetchInterestLimits,
    fetchInterestAccount,
    fetchInterestRate,
    fetchInterestTransactions,
    formChanged,
    initializeDepositForm,
    initializeWithdrawalForm,
    requestWithdrawal,
    routeToTxHash,
    sendDeposit,
    showInterestModal
  }
}
