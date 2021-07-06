import { CoinType, SBPaymentTypes, WalletFiatType } from 'core/types'
import { BankTransferAccountType, ProductEligibility } from 'data/types'

import {
  BeneficiariesType,
  BeneficiaryType,
  CustodialTransferRequestType,
  NabuCustodialProductType,
  PaymentDepositPendingResponseType,
  WithdrawalFeesProductType,
  WithdrawalLockCheckResponseType,
  WithdrawalLockResponseType,
  WithdrawalMinsAndFeesResponse,
  WithdrawResponseType
} from './types'

export default ({ authorizedGet, authorizedPost, nabuUrl }) => {
  const getBeneficiaries = (): BeneficiariesType =>
    authorizedGet({
      endPoint: '/payments/beneficiaries',
      url: nabuUrl
    })

  const getWithdrawalLocks = (): WithdrawalLockResponseType =>
    authorizedGet({
      endPoint: '/payments/withdrawals/locks',
      url: nabuUrl
    })

  const notifyNonCustodialToCustodialTransfer = (
    currency: CoinType,
    depositAddress: string,
    txHash: string,
    amount: string,
    product: NabuCustodialProductType
  ): PaymentDepositPendingResponseType =>
    authorizedPost({
      contentType: 'application/json',
      data: {
        amount,
        currency,
        depositAddress,
        product,
        txHash
      },
      endPoint: '/payments/deposits/pending',
      url: nabuUrl
    })

  const withdrawFunds = (
    beneficiary: BeneficiaryType | BankTransferAccountType,
    currency: WalletFiatType,
    baseAmount: string
  ): WithdrawResponseType =>
    authorizedPost({
      contentType: 'application/json',
      data: {
        amount: baseAmount,
        beneficiary: beneficiary.id,
        currency
      },
      endPoint: '/payments/withdrawals',
      headers: {
        'blockchain-origin': 'simplebuy'
      },
      url: nabuUrl
    })

  const getWithdrawalFees = (
    product: WithdrawalFeesProductType,
    paymentMethod?: SBPaymentTypes | 'DEFAULT' | 'ALL'
  ): WithdrawalMinsAndFeesResponse =>
    authorizedGet({
      data: {
        paymentMethod,
        product
      },
      endPoint: `/payments/withdrawals/fees`,
      url: nabuUrl
    })

  const checkWithdrawalLocks = (
    paymentMethod: SBPaymentTypes,
    currency: WalletFiatType
  ): WithdrawalLockCheckResponseType =>
    authorizedPost({
      contentType: 'application/json',
      data: {
        currency,
        paymentMethod
      },
      endPoint: '/payments/withdrawals/locks/check',
      url: nabuUrl
    })

  const initiateCustodialTransfer = (request: CustodialTransferRequestType) =>
    authorizedPost({
      contentType: 'application/json',
      data: request,
      endPoint: '/custodial/transfer',
      url: nabuUrl
    })

  const getProductsEligibility = (): ProductEligibility[] =>
    authorizedGet({
      endPoint: '/eligible/products',
      url: nabuUrl
    })

  return {
    checkWithdrawalLocks,
    getBeneficiaries,
    getProductsEligibility,
    getWithdrawalFees,
    getWithdrawalLocks,
    initiateCustodialTransfer,
    notifyNonCustodialToCustodialTransfer,
    withdrawFunds
  }
}
