import React from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { actions, model } from 'data'
import modalEnhancer from 'providers/ModalEnhancer'
import {
  Button,
  Image,
  Modal,
  ModalHeader,
  Text
} from 'blockchain-info-components'

const { CAMPAIGNS } = model.components.identityVerification

const UpgradeForAirdropModalHeader = styled(ModalHeader)`
  position: absolute;
  border: 0;
  > span {
    color: ${props => props.theme['gray-1']};
  }
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
`
const Copy = styled(Text)`
  margin-top: 16px;
`
const Footer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 0 24px 32px 24px;
  box-sizing: border-box;
`
const FooterButton = styled(Button)`
  height: auto;
  font-weight: 400;
  padding: 15px 0;
`
const LaterButton = styled(FooterButton)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  top: calc(100% + 9px);
  width: calc(100% - 48px);
  &:hover {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }
`

class UpgradeForAirdrop extends React.PureComponent {
  componentDidMount () {
    this.props.preferencesActions.hideUpgradeForAirdropModal()
  }

  render () {
    const { campaign, position, total, close, actions } = this.props
    return (
      <Modal size='small' position={position} total={total}>
        <UpgradeForAirdropModalHeader onClose={close} />
        <Image
          width='100%'
          name='get-free-crypto'
          srcset={{
            'get-free-crypto2': '2x',
            'get-free-crypto3': '3x'
          }}
        />
        <Body>
          <Text size='24px' weight={400}>
            <FormattedMessage
              id='modals.upgradeforairdrop.getfreecrypto'
              defaultMessage='Get Free Crypto'
            />
          </Text>
          <Copy weight={400}>
            <FormattedMessage
              id='modals.upgradeforairdrop.completeprofileforairdropfree'
              defaultMessage='Upgrade your profile from Silver to Gold, raise your trading limits and get free {coinName} ({coinCode}).'
              values={{
                coinName: prop('coinName', CAMPAIGNS[campaign]),
                coinCode: prop('coinCode', CAMPAIGNS[campaign])
              }}
            />
          </Copy>
        </Body>
        <Footer>
          <FooterButton
            nature='primary'
            size='18px'
            fullwidth
            onClick={() => actions.upgradeForAirdropSubmitClicked(campaign)}
          >
            <FormattedMessage
              defaultMessage='Upgrade Now'
              id='modals.upgradeforairdrop.upgradenow'
            />
          </FooterButton>
          <LaterButton
            nature='primary'
            size='18px'
            fullwidth
            onClick={close}
            data-e2e='remindMeLaterButton'
          >
            <FormattedMessage
              defaultMessage='Remind Me Later'
              id='modals.upgradeforairdrop.later'
            />
          </LaterButton>
        </Footer>
      </Modal>
    )
  }
}

UpgradeForAirdrop.defaultProps = {
  campaign: 'sunriver'
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.onboarding, dispatch),
  preferencesActions: bindActionCreators(actions.preferences, dispatch)
})

const enhance = compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  modalEnhancer('UpgradeForAirdrop')
)

export default enhance(UpgradeForAirdrop)
