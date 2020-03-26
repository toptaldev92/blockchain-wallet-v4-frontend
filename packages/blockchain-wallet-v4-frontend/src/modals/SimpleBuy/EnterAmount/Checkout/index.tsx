import { actions, selectors } from 'data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  FiatType,
  RemoteDataType,
  SBPairType,
  SBSuggestedAmountType,
  SupportedCoinsType
} from 'core/types'
import { getData } from './selectors'
import { RootState } from 'data/rootReducer'
import { SBCheckoutFormValuesType, UserDataType } from 'data/types'
import Failure from '../template.failure'
import Loading from './template.loading'
import React, { PureComponent } from 'react'
import Success from './template.success'

type OwnProps = {
  handleClose: () => void
  pairs: Array<SBPairType>
}
export type SuccessStateType = {
  formErrors: { amount?: 'ABOVE_MAX' | 'BELOW_MIN' | boolean }
  formValues?: SBCheckoutFormValuesType
  suggestedAmounts: SBSuggestedAmountType
  supportedCoins: SupportedCoinsType
  userData: UserDataType
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
  fiatCurrency: undefined | FiatType
}
export type LinkDispatchPropsType = {
  identityVerificationActions: typeof actions.components.identityVerification
  profileActions: typeof actions.modules.profile
  simpleBuyActions: typeof actions.components.simpleBuy
}
export type Props = OwnProps & LinkDispatchPropsType & LinkStatePropsType
class Checkout extends PureComponent<Props> {
  componentDidMount () {
    this.props.simpleBuyActions.initializeCheckout(this.props.pairs, 'BUY')
  }

  handleSubmit = () => {
    // if the user is < tier 2 go to kyc but save order info
    // if the user is tier 2 try to submit order, let BE fail
    const { userData } = this.props.data.getOrElse({
      userData: { tiers: { current: 0 } }
    })

    if (userData.tiers.current < 2) {
      this.props.identityVerificationActions.verifyIdentity(2)
    } else {
      this.props.simpleBuyActions.createSBOrder()
    }
  }

  render () {
    return this.props.data.cata({
      Success: val => (
        <Success {...this.props} {...val} onSubmit={this.handleSubmit} />
      ),
      Failure: e => (
        <Failure
          simpleBuyActions={this.props.simpleBuyActions}
          formActions={() => {}}
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
  identityVerificationActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  ),
  profileActions: bindActionCreators(actions.modules.profile, dispatch),
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch)
})

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default enhance(Checkout)
