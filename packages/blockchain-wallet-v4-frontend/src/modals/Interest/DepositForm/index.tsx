import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'

import { actions } from 'data'
import {
  CoinType,
  FiatType,
  InterestLimitsType,
  InterestRateType,
  PaymentValue,
  RatesType,
  RemoteDataType,
  SupportedWalletCurrenciesType
} from 'core/types'
import { InterestMinMaxType } from 'data/types'
import DataError from 'components/DataError'

import { getData } from './selectors'
import Loading from './template.loading'
import Success from './template.success'

class DepositForm extends PureComponent<Props> {
  componentDidMount () {
    this.handleInitializeDepositForm()
  }

  handleDisplayToggle = isCoin => {
    const { data, formActions, interestActions } = this.props
    const { displayCoin } = data.getOrElse({
      displayCoin: false
    } as SuccessStateType)

    if (isCoin === displayCoin) return

    formActions.clearFields(
      'interestDepositForm',
      false,
      false,
      'depositAmount'
    )

    interestActions.setCoinDisplay(isCoin)
  }

  handleRefresh = () => {
    this.handleInitializeDepositForm()
  }

  handleInitializeDepositForm = () => {
    const { coin, data, interestActions } = this.props
    const { walletCurrency } = data.getOrElse({
      walletCurrency: 'GBP' as FiatType
    } as SuccessStateType)
    interestActions.initializeDepositForm(coin, walletCurrency)
  }

  handleSubmit = () => {
    const { coin, interestActions } = this.props
    interestActions.submitDepositForm(coin)
  }

  render () {
    const { data } = this.props
    return data.cata({
      Success: val => (
        <Success
          {...val}
          {...this.props}
          onSubmit={this.handleSubmit}
          handleDisplayToggle={this.handleDisplayToggle}
        />
      ),
      Failure: () => <DataError onClick={this.handleRefresh} />,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = (state): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  interestActions: bindActionCreators(actions.components.interest, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type LinkDispatchPropsType = {
  analyticsActions: typeof actions.analytics
  formActions: typeof actions.form
  interestActions: typeof actions.components.interest
}
export type SuccessStateType = {
  depositLimits: InterestMinMaxType
  displayCoin: boolean
  formErrors: { depositAmount?: 'ABOVE_MAX' | 'BELOW_MIN' | boolean }
  interestLimits: InterestLimitsType
  interestRate: InterestRateType
  payment: PaymentValue
  rates: RatesType
  supportedCoins: SupportedWalletCurrenciesType
  walletCurrency: FiatType
}
type LinkStatePropsType = {
  data: RemoteDataType<string | Error, SuccessStateType>
}

export type OwnProps = {
  coin: CoinType
}
type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(DepositForm)
