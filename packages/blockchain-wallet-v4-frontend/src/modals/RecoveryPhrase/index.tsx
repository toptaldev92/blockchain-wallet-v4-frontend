import { actions, selectors } from 'data'
import { bindActionCreators, compose, Dispatch } from 'redux'

import { connect } from 'react-redux'
import { path } from 'ramda'
import { RootState } from 'data/rootReducer'
import Flyout, { duration, FlyoutChild } from 'components/Flyout'
import modalEnhancer from 'providers/ModalEnhancer'
import React, { PureComponent } from 'react'
import RecoveryPhraseIntro from './RecoveryPhraseIntro'
import ShowRecoveryWords from './ShowRecoveryWords'

export type OwnPropsType = {
  close: () => void
  in: boolean
  position: number
  recoveryPhrase: Array<any>
  total: number
  userClickedOutside: boolean
}

export type LinkDispatchPropsType = {
  recoveryPhraseActions: typeof actions.components.recoveryPhrase
  settingsActions: typeof actions.modules.settings
}

export type LinkStatePropsType = {
  step:
    | 'RECOVERY_PHRASE_INTRO'
    | 'FIRST_SET_WORDS'
    | 'SECOND_SET_WORDS'
    | 'CONFIRM_WORDS'
    | 'CONFIRM_WORDS_SUCCESS'
}

export type Props = OwnPropsType & LinkDispatchPropsType & LinkStatePropsType
export type State = { direction: 'left' | 'right'; show: boolean }

class RecoveryPhraseFlyout extends PureComponent<Props, State> {
  state: State = {
    show: false,
    direction: 'left'
  }

  componentDidMount () {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
    this.getWords()
  }

  componentWillUnmount () {
    this.props.recoveryPhraseActions.setStep('RECOVERY_PHRASE_INTRO')
  }

  getWords = () => {
    this.props.settingsActions.showBackupRecovery()
  }

  handleClose = () => {
    this.setState({ show: false })
    setTimeout(() => {
      this.props.close()
    }, duration)
  }

  render () {
    const { userClickedOutside, ...rest } = this.props
    return (
      <Flyout
        {...rest}
        in={this.state.show}
        onClose={this.handleClose}
        userClickedOutside={userClickedOutside}
        data-e2e='recoveryPhraseModal'
      >
        {this.props.step === 'RECOVERY_PHRASE_INTRO' && (
          <FlyoutChild>
            <RecoveryPhraseIntro
              {...this.props}
              handleClose={this.handleClose}
            />
          </FlyoutChild>
        )}
        {this.props.step === 'FIRST_SET_WORDS' && (
          <FlyoutChild>
            <ShowRecoveryWords {...this.props} />
          </FlyoutChild>
        )}
      </Flyout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  isMnemonicVerified: selectors.core.wallet.isMnemonicVerified(state),
  recoveryPhrase: path(['securityCenter', 'recovery_phrase'], state),
  step: selectors.components.recoveryPhrase.getStep(state)
})

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  settingsActions: bindActionCreators(actions.modules.settings, dispatch),
  recoveryPhraseActions: bindActionCreators(
    actions.components.recoveryPhrase,
    dispatch
  )
})

const enhance = compose<any>(
  modalEnhancer('RECOVERY_PHRASE_MODAL', { transition: duration }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(RecoveryPhraseFlyout)
