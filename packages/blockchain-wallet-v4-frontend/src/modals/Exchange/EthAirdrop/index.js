import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { actions, model } from 'data'
import modalEnhancer from 'providers/ModalEnhancer'
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalHeader,
  Text
} from 'blockchain-info-components'

const { ETH_AIRDROP_MODAL, RESULTS_MODAL } = model.components.exchangeHistory

const AirdropModalHeader = styled(ModalHeader)`
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
const BannerImage = styled(Image)`
  height: 25%;
`

const ViewTradeButton = styled(Button)`
  height: 56px;
  margin-top: 44px;
  font-size: 18px;
`

class EthAirdrop extends React.PureComponent {
  onViewTradeStatus = () => {
    this.props.modalActions.closeModal()
    this.props.showExchangeResultsModal(this.props.tradeData)
  }

  render () {
    const { close, position, total } = this.props
    return (
      <Modal size='small' position={position} total={total}>
        <AirdropModalHeader onClose={close} />
        <ModalBody>
          <Container>
            <BannerImage
              name='coin-dollar'
              srcset={{
                'coin-dollar2': '2x',
                'coin-dollar3': '3x'
              }}
            />
            <Text size='20px' weight={300}>
              <FormattedMessage
                id='modals.exchange.ethairdrop.success'
                defaultMessage='Success!'
              />
            </Text>
            <Text size='16px' weight={300}>
              <FormattedMessage
                id='modals.exchange.ethairdrop.firstorder'
                defaultMessage='Your first USD Pax order has been placed!'
              />
            </Text>
            <Text size='12px' weight={300}>
              <FormattedMessage
                id='modals.exchange.ethairdrop.explain'
                defaultMessage='Even better, since you need ETH to make USD Pax trades, we will airdrop enough ETH into your Wallet to cover your first 3 transactions 🙌🏻'
              />
            </Text>
            <ViewTradeButton
              nature='primary'
              fullwidth
              onClick={this.onViewTradeStatus}
            >
              <FormattedMessage
                id='modals.exchange.ethairdrop.viewtrade'
                defaultMessage='View Trade Status'
              />
            </ViewTradeButton>
          </Container>
        </ModalBody>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showExchangeResultsModal: () =>
    dispatch(actions.modals.showModal(RESULTS_MODAL))
})

const enhance = compose(
  modalEnhancer(ETH_AIRDROP_MODAL),
  connect(
    null,
    mapDispatchToProps
  )
)

export default enhance(EthAirdrop)
