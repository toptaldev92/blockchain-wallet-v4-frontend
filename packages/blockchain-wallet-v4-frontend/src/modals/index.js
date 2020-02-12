import React from 'react'

import {
  AddBtcWallet,
  ImportBtcAddress,
  RequestBtc,
  SendBtc,
  ShowBtcPrivateKey,
  VerifyMessage
} from './Btc'
import {
  AirdropClaim,
  AirdropSuccess,
  CoinifyUpgrade,
  LinkFromExchangeAccount,
  LinkToExchangeAccount,
  SwapGetStarted,
  UpgradeForAirdrop,
  WalletTour
} from './Onboarding'
import {
  AirdropError,
  EthAirdrop,
  ExchangeConfirm,
  ExchangeResults,
  IdentityVerification,
  KycDocResubmit,
  ShapeshiftTradeDetails,
  SwapUpgrade,
  UserExists
} from './Exchange'
import {
  AutoDisconnection,
  ConfirmDisable2FA,
  SecondPassword,
  TwoStepGoogleAuthenticator,
  TwoStepSetup,
  TwoStepYubico
} from './Settings'
import { BitpayInformational, BitpayInvoiceExpired } from './BitPay'
import {
  CoinifyBuyViaCard,
  CoinifyDeleteBank,
  CoinifyTradeDetails
} from './Coinify'
import { Confirm, PromptInput, Support } from './Generic'
import {
  DeleteAddressLabel,
  ShowUsedAddresses,
  UpgradeAddressLabels
} from './Addresses'
import { EditTxDescription, TransactionReport } from './Transactions'
import {
  LockboxAppManager,
  LockboxConnectionPrompt,
  LockboxFirmware,
  LockboxSetup,
  LockboxShowXPubs
} from './Lockbox'
import { MobileNumberChange, MobileNumberVerify } from './Mobile'
import { PairingCode, ShowXPub, UpgradeWallet } from './Wallet'
import {
  PaxWelcome,
  RequestEth,
  SendEth,
  ShowEthPrivateKey,
  TransferEth
} from './Eth'
import { RequestBch, SendBch } from './Bch'
import {
  RequestXlm,
  SendXlm,
  ShowXlmPrivateKey,
  SunRiverWelcome,
  XlmCreateAccountLearn,
  XlmReserveLearn
} from './Xlm'
import { SfoxExchangeData, SfoxTradeDetails } from './Sfox'
import Onfido from './Onfido'
import QRCode from './QRCode'
import SignMessage from './SignMessage'

const Modals = () => (
  <div>
    <AddBtcWallet />
    <AirdropClaim />
    <AirdropSuccess />
    <BitpayInvoiceExpired />
    <BitpayInformational />
    <AutoDisconnection />
    <CoinifyBuyViaCard />
    <CoinifyDeleteBank />
    <CoinifyTradeDetails />
    <CoinifyUpgrade />
    <Confirm />
    <ConfirmDisable2FA />
    <DeleteAddressLabel />
    <EditTxDescription />
    <EthAirdrop />
    <ExchangeConfirm />
    <ExchangeResults />
    <KycDocResubmit />
    <IdentityVerification />
    <ImportBtcAddress />
    <LockboxAppManager disableOutsideClose />
    <LockboxConnectionPrompt disableOutsideClose />
    <LockboxFirmware disableOutsideClose />
    <LockboxSetup disableOutsideClose />
    <LockboxShowXPubs />
    <LinkFromExchangeAccount disableOutsideClose />
    <LinkToExchangeAccount disableOutsideClose />
    <MobileNumberChange />
    <MobileNumberVerify />
    <Onfido />
    <PairingCode />
    <PaxWelcome />
    <PromptInput />
    <QRCode />
    <RequestBch />
    <RequestBtc />
    <RequestEth />
    <RequestXlm />
    <SecondPassword />
    <SendBch />
    <SendBtc />
    <SendEth />
    <SendXlm />
    <ShapeshiftTradeDetails />
    <ShowBtcPrivateKey />
    <ShowEthPrivateKey />
    <ShowXlmPrivateKey />
    <ShowUsedAddresses />
    <SignMessage />
    <ShowXPub />
    <SfoxExchangeData />
    <SfoxTradeDetails />
    <AirdropError />
    <Support />
    <SwapGetStarted />
    <SwapUpgrade />
    <TransactionReport />
    <TransferEth />
    <TwoStepGoogleAuthenticator />
    <TwoStepSetup />
    <TwoStepYubico />
    <UpgradeAddressLabels />
    <UpgradeForAirdrop />
    <UpgradeWallet />
    <UserExists />
    <WalletTour />
    <XlmCreateAccountLearn />
    <XlmReserveLearn />
    <SunRiverWelcome disableOutsideClose />
    <VerifyMessage />
  </div>
)

export default Modals
