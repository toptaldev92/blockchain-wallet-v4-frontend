import { actions } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { BlueCartridge } from 'components/Cartridge'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'blockchain-info-components'
import React from 'react'
import styled, { css } from 'styled-components'

type LinkDispatchPropsType = {
  modalActions: typeof actions.modals
}
const customCartridge = css`
  display: flex;
  align-items: center;
  font-size: 14px;
`
const CustomBlueCartridge = styled(BlueCartridge)`
  ${customCartridge}
`
const BackupCopy = styled.div`
  display: inline;
`
const BackupLink = styled.span`
  color: ${props => props.theme.blue600};
  text-decoration: underline;
  cursor: pointer;
`

class MnemonicRequiredForCustodySend extends React.PureComponent<
  LinkDispatchPropsType
> {
  handleClick = () => {
    this.props.modalActions.showModal('RECOVERY_PHRASE_MODAL')
  }
  render () {
    return (
      <CustomBlueCartridge>
        <Icon
          name='alert-filled'
          color='blue600'
          size='24px'
          style={{ marginRight: '12px' }}
        />
        <BackupCopy>
          <FormattedMessage
            id='modals.send.firststep.fromcustody2'
            defaultMessage='Please backup your Wallet before before sending crypto to it.'
          />{' '}
          <BackupLink onClick={this.handleClick} data-e2e='withdrawBackupLink'>
            <FormattedMessage
              id='modals.send.firststep.backupnow'
              defaultMessage='Backup now.'
            />
          </BackupLink>
        </BackupCopy>
      </CustomBlueCartridge>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(MnemonicRequiredForCustodySend)
