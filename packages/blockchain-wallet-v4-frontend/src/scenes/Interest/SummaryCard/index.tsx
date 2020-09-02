import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'

import { actions } from 'data'
import { CoinType, InterestRateType, RemoteDataType } from 'core/types'
import { SkeletonRectangle } from 'blockchain-info-components'

import { getData } from './selectors'
import {
  StateType as ParentStateType,
  SuccessStateType as ParentSuccessStateType
} from '..'

import SummaryCard from './template.success'

class SummaryCardContainer extends PureComponent<Props> {
  render () {
    return this.props.data.cata({
      Success: val => <SummaryCard {...this.props} {...val} />,
      Failure: () => null,
      Loading: () => <SkeletonRectangle width='330px' height='275px' />,
      NotAsked: () => <SkeletonRectangle width='330px' height='275px' />
    })
  }
}

const mapStateToProps = (state): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  interestActions: bindActionCreators(actions.components.interest, dispatch),
  profileActions: bindActionCreators(actions.modules.profile, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type OwnPropsType = {
  coin: CoinType
  interestRate: InterestRateType
  isGoldTier: boolean
}

export type SuccessStateType = ReturnType<typeof getData>['data']

export type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}

export type Props = OwnPropsType &
  ParentSuccessStateType &
  ParentStateType &
  ConnectedProps<typeof connector>

export default connector(SummaryCardContainer)
