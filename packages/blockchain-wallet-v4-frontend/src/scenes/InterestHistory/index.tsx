import { actions } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import React, { Component } from 'react'
import styled from 'styled-components'

import { getData } from './selectors'

import { SceneWrapper } from 'components/Layout'

// import CoinFilter from './CoinFilter'
import InterestHeader from '../Interest/template.header'
import InterestMenu from '../Interest/template.menu'
import LazyLoadContainer from 'components/LazyLoadContainer'
import Loading from './template.loading'
import TransactionList from './template.success'

const LazyLoadWrapper = styled(LazyLoadContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`

const MenuRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`

class InterestHistoryContainer extends Component<Props> {
  componentDidMount () {
    this.props.interestActions.fetchInterestTransactions(true)
  }

  componentWillUnmount () {
    // clear transactions related data on exit
    this.props.interestActions.fetchInterestTransactionsSuccess([], true)
    this.props.interestActions.setTransactionsNextPage(null)
  }

  onFetchMoreTransactions = () => {
    this.props.interestActions.fetchInterestTransactions(false)
  }

  render () {
    return (
      <SceneWrapper>
        <InterestHeader />
        <MenuRow>
          <InterestMenu />
          {/* <CoinFilter /> */}
        </MenuRow>
        {this.props.data.cata({
          Success: val => (
            <LazyLoadWrapper onLazyLoad={this.onFetchMoreTransactions}>
              <TransactionList {...val} {...this.props} />
            </LazyLoadWrapper>
          ),
          Failure: () => null,
          Loading: () => <Loading />,
          NotAsked: () => <Loading />
        })}
      </SceneWrapper>
    )
  }
}

const mapStateToProps = state => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  interestActions: bindActionCreators(actions.components.interest, dispatch)
})
const connector = connect(mapStateToProps, mapDispatchToProps)

export type SuccessStateType = ReturnType<typeof getData>['data']

export type Props = ConnectedProps<typeof connector>

export default connector(InterestHistoryContainer)
