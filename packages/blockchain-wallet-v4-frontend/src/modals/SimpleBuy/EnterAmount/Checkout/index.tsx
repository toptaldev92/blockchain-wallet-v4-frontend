import { actions, selectors } from 'data'
import { bindActionCreators } from 'redux'
import {
  CoinType,
  FiatType,
  InvitationsType,
  RemoteDataType,
  SBPaymentMethodType,
  SBSuggestedAmountType,
  SupportedCoinsType
} from 'core/types'
import { connect } from 'react-redux'
import {
  OwnProps as EnterAmountOwnProps,
  SuccessStateType as EnterAmountSuccessStateType
} from '../index'
import { getData } from './selectors'
import { RatesType, SBCheckoutFormValuesType, UserDataType } from 'data/types'
import { RootState } from 'data/rootReducer'
import Failure from '../template.failure'
import Loading from './template.loading'
import React, { PureComponent } from 'react'
import Success from './template.success'

class Checkout extends PureComponent<Props> {
  componentDidMount () {
    this.props.simpleBuyActions.initializeCheckout('BUY')
  }

  handleSubmit = () => {
    // if the user is < tier 2 go to kyc but save order info
    // if the user is tier 2 try to submit order, let BE fail
    const { formValues, userData } = this.props.data.getOrElse({
      userData: { tiers: { current: 0, next: 0, selected: 0 } } as UserDataType
    } as SuccessStateType)

    if (userData.tiers.current < 2) {
      // eslint-disable-next-line
      console.log('inside first if')
      this.props.identityVerificationActions.verifyIdentity(
        2,
        false,
        'SBEnterAmountCheckout'
      )
      this.props.simpleBuyActions.createSBOrder(
        undefined,
        this.props.method.type as SBPaymentMethodType['type']
      )
    } else if (formValues && !this.props.method) {
      const fiatCurrency = this.props.fiatCurrency || 'USD'
      this.props.simpleBuyActions.setStep({
        step: 'PAYMENT_METHODS',
        fiatCurrency,
        pair: this.props.pair
      })
    } else if (formValues && this.props.method) {
      switch (this.props.method.type) {
        case 'PAYMENT_CARD':
          this.props.simpleBuyActions.setStep({
            step: 'ADD_CARD'
          })
          break
        case 'USER_CARD':
          // TODO figure out id
          // this.props.simpleBuyActions.createSBOrder(formValues.method.id)
          this.props.simpleBuyActions.createSBOrder()
          break
        case 'BANK_ACCOUNT':
          this.props.simpleBuyActions.createSBOrder()
          break
        case 'FUNDS':
          // eslint-disable-next-line
          console.log('Payment method type not supported.')
      }
    }
  }

  render () {
    return this.props.data.cata({
      Success: val => (
        <Success {...this.props} {...val} onSubmit={this.handleSubmit} />
      ),
      Failure: () => (
        <Failure
          fiatCurrency={this.props.fiatCurrency}
          simpleBuyActions={this.props.simpleBuyActions}
          formActions={this.props.formActions}
          analyticsActions={this.props.analyticsActions}
        />
      ),
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state),
  fiatCurrency: selectors.components.simpleBuy.getFiatCurrency(state)
})

const mapDispatchToProps = dispatch => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  identityVerificationActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  ),
  formActions: bindActionCreators(actions.form, dispatch),
  profileActions: bindActionCreators(actions.modules.profile, dispatch),
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch)
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

type OwnProps = EnterAmountOwnProps & EnterAmountSuccessStateType
export type SuccessStateType = {
  formErrors: { amount?: 'ABOVE_MAX' | 'BELOW_MIN' | boolean }
  formValues?: SBCheckoutFormValuesType
  invitations: InvitationsType
  rates: { [key in CoinType]: RatesType }
  suggestedAmounts: SBSuggestedAmountType
  supportedCoins: SupportedCoinsType
  userData: UserDataType
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
  fiatCurrency: undefined | FiatType
}
export type LinkDispatchPropsType = {
  analyticsActions: typeof actions.analytics
  formActions: typeof actions.form
  identityVerificationActions: typeof actions.components.identityVerification
  profileActions: typeof actions.modules.profile
  simpleBuyActions: typeof actions.components.simpleBuy
}
export type Props = OwnProps & LinkDispatchPropsType & LinkStatePropsType

export default enhance(Checkout)
