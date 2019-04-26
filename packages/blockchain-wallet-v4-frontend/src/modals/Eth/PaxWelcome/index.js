import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { actions } from 'data'
import modalEnhancer from 'providers/ModalEnhancer'

import {
  Button,
  Image,
  Modal,
  ModalHeader,
  ModalBody,
  Text
} from 'blockchain-info-components'

const WelcomeModalHeader = styled(ModalHeader)`
  position: absolute;
  border: none;
  > span {
    &:hover {
      cursor: pointer;
    }
  }
  z-index: 99;
`
const Container = styled.div`
  text-align: center;
  > div:nth-child(2) {
    margin: -8px 0 8px;
  }
`
const GetButton = styled(Button)`
  height: 56px;
  margin-top: 44px;
  font-size: 18px;
`
const BannerImage = styled(Image)`
  height: 25%;
`

class PaxWelcomeContainer extends React.PureComponent {
  onGetPax = () => {
    this.props.modalActions.closeModal()
    this.props.routerActions.push('/pax/transactions')
  }

  render () {
    const { close, position, total } = this.props
    return (
      <Modal size='small' position={position} total={total}>
        <WelcomeModalHeader onClose={close} />
        <ModalBody>
          <Container>
            <BannerImage
              name='coin-dollar'
              srcset={{
                'coin-dollar2': '2x',
                'coin-dollar3': '3x'
              }}
            />
            <Text size='20px' weight={400}>
              <FormattedMessage
                id='modals.paxwelcome.intro'
                defaultMessage='Introducing USD Pax, a safe and stable digital dollar in your wallet'
              />
            </Text>
            <GetButton nature='primary' fullwidth onClick={this.onGetPax}>
              <FormattedMessage
                id='modals.paxwelcome.learnmore'
                defaultMessage='Learn More'
              />
            </GetButton>
          </Container>
        </ModalBody>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch),
  routerActions: bindActionCreators(actions.router, dispatch)
})

const enhance = compose(
  modalEnhancer('PaxWelcome'),
  connect(
    null,
    mapDispatchToProps
  )
)

export default enhance(PaxWelcomeContainer)
