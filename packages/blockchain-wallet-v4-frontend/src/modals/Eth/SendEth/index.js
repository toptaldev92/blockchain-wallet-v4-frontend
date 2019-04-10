import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { propOr } from 'ramda'

import modalEnhancer from 'providers/ModalEnhancer'
import { actions, model, selectors } from 'data'
import SendEth from './template'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

class SendEthContainer extends React.PureComponent {
  componentDidMount () {
    this.props.actions.initialized(propOr('ETH', 'coin', this.props))
  }

  componentDidUpdate (prevProps) {
    if (prevProps.coin !== this.props.coin) {
      this.props.actions.initialized(propOr('ETH', 'coin', this.props))
    }
  }

  componentWillUnmount () {
    this.props.actions.destroyed()
  }

  render () {
    const { step, position, total, closeAll, supportedCoins } = this.props
    const coin = supportedCoins[propOr('ETH', 'coin', this.props)]
    return (
      <SendEth
        position={position}
        total={total}
        closeAll={closeAll}
        coinDisplayName={coin.displayName}
      >
        {step === 1 && <FirstStep coin={coin.coinCode} />}
        {step === 2 && (
          <SecondStep coin={coin.coinCode} coinDisplayName={coin.displayName} />
        )}
      </SendEth>
    )
  }
}

SendEthContainer.propTypes = {
  coin: PropTypes.string,
  step: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  closeAll: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  step: selectors.components.sendEth.getStep(state),
  supportedCoins: selectors.core.walletOptions
    .getSupportedCoins(state)
    .getOrFail()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.sendEth, dispatch)
})

const enhance = compose(
  modalEnhancer(model.components.sendEth.MODAL),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(SendEthContainer)
