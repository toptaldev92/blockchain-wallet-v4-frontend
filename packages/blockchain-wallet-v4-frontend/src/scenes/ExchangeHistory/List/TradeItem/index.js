import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions, model } from 'data'
import { formatTrade } from './selectors'
import TradeItem from './template'

const { RESULTS_MODAL } = model.components.exchangeHistory

class PagesContainer extends React.PureComponent {
  showDetails = () => {
    const { modalActions, deposit, isShapeShiftTrade } = this.props
    isShapeShiftTrade
      ? modalActions.showModal('ShapeshiftTradeDetails', {
          depositAddress: deposit
        })
      : modalActions.showModal(RESULTS_MODAL, this.props)
  }

  render () {
    const {
      coinModels,
      status,
      date,
      sourceCoin,
      targetCoin,
      deposit,
      depositAmount,
      withdrawalAmount
    } = this.props

    return (
      <TradeItem
        coinModels={coinModels}
        status={status}
        date={date}
        sourceCoin={sourceCoin}
        targetCoin={targetCoin}
        deposit={deposit}
        depositAmount={depositAmount}
        withdrawalAmount={withdrawalAmount}
        handleClick={this.showDetails}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => formatTrade(ownProps.trade)

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesContainer)
