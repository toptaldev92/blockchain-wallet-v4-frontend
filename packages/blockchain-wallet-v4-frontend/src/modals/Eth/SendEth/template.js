import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedHTMLMessage } from 'react-intl'

import { Modal, ModalHeader, ModalBody } from 'blockchain-info-components'

const SendHeader = styled(ModalHeader)`
  border-bottom: 0px;
  padding-bottom: 8px;
  > div:first-child * {
    color: ${props => props.theme['brand-primary']};
  }
`

const SendEth = props => (
  <Modal size='medium' position={props.position} total={props.total}>
    <SendHeader icon='send' onClose={props.closeAll}>
      <FormattedHTMLMessage
        id='modals.sendeth.cointitle'
        defaultMessage='Send {coinDisplayName}'
        values={{ coinDisplayName: props.coinDisplayName }}
      />
    </SendHeader>
    <ModalBody>{props.children}</ModalBody>
  </Modal>
)

SendEth.propTypes = {
  coinDisplayName: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  closeAll: PropTypes.func.isRequired
}

export default SendEth
