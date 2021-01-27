import { actions, selectors } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import {
  FiatType,
  RemoteDataType,
  SBCardType,
  SBPaymentMethodsType
} from 'core/types'
import { getData } from './selectors'
import { RootState } from 'data/rootReducer'
import Loading from './template.loading'
import React, { PureComponent } from 'react'
import Success from './template.success'

class LinkedCards extends PureComponent<Props> {
  componentDidMount () {
    this.props.simpleBuyActions.fetchSBCards()
    this.props.simpleBuyActions.fetchSBPaymentMethods(
      this.props.fiatCurrency || 'USD'
    )
  }

  handleCreditCardClick = () => {
    this.props.simpleBuyActions.showModal('SettingsGeneral')
    this.props.simpleBuyActions.setFiatCurrency(
      this.props.fiatCurrency || 'USD'
    )
    this.props.simpleBuyActions.setStep({
      step: 'ADD_CARD'
    })
  }

  render () {
    return this.props.data.cata({
      Success: val => (
        <Success
          {...val}
          {...this.props}
          handleCreditCardClick={this.handleCreditCardClick}
        />
      ),
      Loading: () => <Loading />,
      Failure: () => null,
      NotAsked: () => null
    })
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  fiatCurrency: selectors.components.simpleBuy.getFiatCurrency(state),
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type SuccessStateType = {
  cards: Array<SBCardType>
  paymentMethods: SBPaymentMethodsType
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
  fiatCurrency?: FiatType
}
export type Props = ConnectedProps<typeof connector>

export default connector(LinkedCards)
