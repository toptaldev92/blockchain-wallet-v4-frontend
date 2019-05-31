import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { actions, selectors } from 'data'
import {
  currentUserTier,
  getAvailability,
  getCanBuyBtc,
  getDomains
} from './selectors'
import Welcome from './template'
import WelcomePax from './template.pax'
import WelcomeXlm from './template.xlm'

class CoinWelcomeContainer extends React.PureComponent {
  render () {
    const {
      availability,
      coin,
      currentUserTier,
      domains,
      partner,
      supportedCoins,
      ...rest
    } = this.props
    const { modalActions } = rest
    const currentCoin = supportedCoins[coin]

    switch (currentCoin.coinCode) {
      case 'PAX': {
        return (
          <WelcomePax
            availability={availability}
            currentCoin={currentCoin}
            currentUserTier={currentUserTier}
          />
        )
      }
      case 'XLM': {
        return (
          <WelcomeXlm availability={availability} currentCoin={currentCoin} />
        )
      }
      default: {
        return (
          <Welcome
            availability={availability}
            currentCoin={currentCoin}
            partner={partner}
            handleRequest={() =>
              modalActions.showModal('@MODAL.REQUEST.' + currentCoin.coinCode)
            }
          />
        )
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  partner: getCanBuyBtc(state, ownProps),
  domains: getDomains(state),
  availability: getAvailability(state, ownProps),
  currentUserTier: currentUserTier(state),
  supportedCoins: selectors.core.walletOptions
    .getSupportedCoins(state)
    .getOrFail()
})

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch),
  onboardingActions: bindActionCreators(actions.components.onboarding, dispatch)
})

CoinWelcomeContainer.propTypes = {
  coin: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinWelcomeContainer)
