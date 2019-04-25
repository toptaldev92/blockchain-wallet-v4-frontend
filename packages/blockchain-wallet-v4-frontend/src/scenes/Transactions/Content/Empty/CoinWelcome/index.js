import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { actions, selectors } from 'data'
import {
  currentUserTier,
  getAvailability,
  getCanBuyBtc,
  getCanAirdrop,
  getDomains
} from './selectors'
import Welcome from './template'
import WelcomeAirdrop from './template.airdrop'
import WelcomePax from './template.pax'

class CoinWelcomeContainer extends React.PureComponent {
  render () {
    const {
      availability,
      coin,
      canAirdrop,
      currentUserTier,
      domains,
      partner,
      supportedCoins,
      ...rest
    } = this.props
    const { modalActions, onboardingActions } = rest
    const currentCoin = supportedCoins[coin]

    return canAirdrop ? (
      <WelcomeAirdrop
        currentCoin={currentCoin}
        domains={domains}
        onboardingActions={onboardingActions}
      />
    ) : currentCoin.coinCode === 'PAX' ? (
      <WelcomePax
        availability={availability}
        currentCoin={currentCoin}
        currentUserTier={currentUserTier}
      />
    ) : (
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

const mapStateToProps = (state, ownProps) => ({
  canAirdrop: getCanAirdrop(state, ownProps),
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
