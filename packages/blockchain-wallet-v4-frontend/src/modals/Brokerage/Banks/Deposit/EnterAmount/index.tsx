import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { prop } from 'ramda'
import { bindActionCreators, Dispatch } from 'redux'

import { Remote } from 'blockchain-wallet-v4/src'
import { SBPaymentMethodType } from 'blockchain-wallet-v4/src/network/api/simpleBuy/types'
import {
  ExtractSuccess,
  FiatType,
  RemoteDataType
} from 'blockchain-wallet-v4/src/types'
import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'
import { BankDWStepType, BankTransferAccountType } from 'data/types'

import { Loading, LoadingTextEnum } from '../../../../components'
import { getData } from './selectors'
import Failure from './template.failure'
import Success from './template.success'

const EnterAmount = props => {
  useEffect(() => {
    if (props.fiatCurrency && !Remote.Success.is(props.data)) {
      props.simpleBuyActions.fetchSBPaymentMethods(props.fiatCurrency)
      props.simpleBuyActions.fetchSBFiatEligible(props.fiatCurrency)
      props.brokerageActions.fetchBankTransferAccounts()
      props.simpleBuyActions.fetchSDDEligible()
    }
  })

  const onSubmit = () => {
    prop('partner', props.defaultMethod) === 'YAPILY'
      ? props.brokerageActions.setDWStep({
          dwStep: BankDWStepType.AUTHORIZE
        })
      : props.brokerageActions.setDWStep({
          dwStep: BankDWStepType.CONFIRM
        })
  }

  return props.data.cata({
    Success: val => (
      <Success
        {...val}
        {...props}
        onSubmit={onSubmit}
        initialValues={{ currency: props.fiatCurrency }}
      />
    ),
    Failure: () => <Failure {...props} />,
    Loading: () => <Loading text={LoadingTextEnum.LOADING} />,
    NotAsked: () => <Loading text={LoadingTextEnum.LOADING} />
  })
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state),
  defaultMethod: selectors.components.brokerage.getAccount(state),
  fiatCurrency: selectors.core.settings.getCurrency(state).getOrFail()
})

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch),
  brokerageActions: bindActionCreators(actions.components.brokerage, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type OwnProps = {
  handleClose: () => void
  method: SBPaymentMethodType
}
export type SuccessStateType = ExtractSuccess<ReturnType<typeof getData>> & {
  formErrors: { amount?: 'ABOVE_MAX' | 'BELOW_MIN' | false }
}
export type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
  defaultMethod: BankTransferAccountType | undefined
  fiatCurrency: FiatType
}
export type FailurePropsType = {
  fiatCurrency: FiatType
}

export type LinkDispatchPropsType = ReturnType<typeof mapDispatchToProps>
export type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(EnterAmount)
