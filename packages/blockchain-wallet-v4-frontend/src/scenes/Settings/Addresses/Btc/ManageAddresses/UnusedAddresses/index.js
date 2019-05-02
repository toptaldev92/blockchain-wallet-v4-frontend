import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { length } from 'ramda'
import PropTypes from 'prop-types'
import { formValueSelector } from 'redux-form'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import * as C from 'services/AlertService'
import { actions, model, selectors } from 'data'
import { Types } from 'blockchain-wallet-v4'
import UnusedAddresses from './template'
import {
  Banner,
  ComponentDropdown,
  FlatLoader,
  Link,
  IconButton,
  Text
} from 'blockchain-info-components'

const { ADDRESS_EVENTS, WALLET_EVENTS } = model.analytics
const { ADD_NEXT_ADDR, DELETE_LABEL, EDIT_LABEL } = ADDRESS_EVENTS
const { ARCHIVE, CHANGE_DEFAULT, EDIT_NAME, SHOW_XPUB } = WALLET_EVENTS
const WalletLabelCell = styled.div`
  display: flex;
  align-items: center;
`
const ClickableText = styled(Text)`
  cursor: pointer;
`
class UnusedAddressesContainer extends React.PureComponent {
  componentDidMount () {
    this.props.componentActions.fetchUnusedAddresses(this.props.walletIndex)
  }

  render () {
    const {
      account,
      alertActions,
      analyticsActions,
      componentActions,
      coreActions,
      currentReceiveIndex,
      isDefault,
      modalsActions,
      routerActions,
      search,
      unusedAddresses,
      walletActions,
      walletIndex
    } = this.props
    const onEditLabel = i => {
      componentActions.editAddressLabel(account.index, walletIndex, i)
      analyticsActions.logEvent(EDIT_LABEL)
    }
    const onDeleteLabel = i => {
      modalsActions.showModal('DeleteAddressLabel', {
        accountIdx: account.index,
        walletIdx: walletIndex,
        addressIdx: i
      })
      analyticsActions.logEvent(DELETE_LABEL)
    }
    const onEditBtcAccountLabel = () => {
      walletActions.editBtcAccountLabel(account.index, account.label)
      analyticsActions.logEvent(EDIT_NAME)
    }

    const onShowXPub = () => {
      modalsActions.showModal('ShowXPub', { xpub: account.xpub })
      analyticsActions.logEvent(SHOW_XPUB)
    }

    const onMakeDefault = () => {
      coreActions.setDefaultAccountIdx(account.index)
      analyticsActions.logEvent(CHANGE_DEFAULT)
    }
    const onGenerateNextAddress = () => {
      if (length(unusedAddresses.getOrElse([])) >= 15) {
        alertActions.displayError(C.ADDRESS_LABEL_MAXIMUM_ERROR)
      } else {
        componentActions.generateNextReceiveAddress(walletIndex)
      }
      analyticsActions.logEvent(ADD_NEXT_ADDR)
    }
    const onSetArchived = () => {
      coreActions.setAccountArchived(account.index, true)
      routerActions.push('/settings/addresses/btc')
      analyticsActions.logEvent(ARCHIVE)
    }
    const props = {
      account,
      unusedAddresses,
      currentReceiveIndex,
      isDefault,
      onGenerateNextAddress,
      onEditLabel,
      search,
      onDeleteLabel,
      onEditBtcAccountLabel,
      onShowXPub,
      onMakeDefault,
      onSetArchived
    }

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <WalletLabelCell>
            <Text
              weight={500}
              style={{ marginRight: 10 }}
              data-e2e='btcWalletName'
            >
              {account.label}
            </Text>
            {isDefault && (
              <Banner label data-e2e='btcDefaultWallet'>
                <FormattedMessage
                  id='scenes.settings.addresses.btc.manageaddresses.unusedaddresses.isdefault'
                  defaultMessage='Default'
                />
              </Banner>
            )}
          </WalletLabelCell>
          <ComponentDropdown
            down
            forceSelected
            color={'gray-5'}
            selectedComponent={
              <Link
                weight={500}
                size='13px'
                data-e2e='btcWalletMoreOptionsDropdown'
              >
                <FormattedMessage
                  id='scenes.settings.addresses.btc.manageaddresses.unusedaddresses.moreoptions'
                  defaultMessage='More Options'
                />
              </Link>
            }
            components={[
              <ClickableText
                size='small'
                onClick={onEditBtcAccountLabel}
                data-e2e='btcEditWalletNameLink'
              >
                <FormattedMessage
                  id='scenes.settings.manage_addresses.edit_name'
                  defaultMessage='Edit Name'
                />
              </ClickableText>,
              !isDefault && (
                <ClickableText
                  size='small'
                  onClick={onMakeDefault}
                  data-e2e='btcMakeWalletDefaultLink'
                >
                  <FormattedMessage
                    id='scenes.settings.manage_addresses.make_default'
                    defaultMessage='Make Default'
                  />
                </ClickableText>
              ),
              !isDefault && (
                <ClickableText
                  size='small'
                  onClick={onSetArchived}
                  data-e2e='btcArchiveWalletLink'
                >
                  <FormattedMessage
                    id='scenes.settings.manage_addresses.archive'
                    defaultMessage='Archive'
                  />
                </ClickableText>
              ),
              <ClickableText
                size='small'
                onClick={onShowXPub}
                data-e2e='btcShowWalletXpubLink'
              >
                <FormattedMessage
                  id='scenes.settings.manage_addresses.show_xpub'
                  defaultMessage='Show xPub'
                />
              </ClickableText>
            ].filter(x => x)}
          />
        </div>
        <Text weight={500} size='14px' style={{ marginTop: 25 }}>
          <FormattedMessage
            id='scenes.settings.addresses.btc.manageaddresses.unusedaddresses.title'
            defaultMessage='Unused Addresses'
          />
        </Text>
        <Text
          weight={400}
          size='small'
          style={{ marginTop: 10, marginBottom: 15 }}
        >
          <FormattedMessage
            id='scenes.settings.addresses.btc.manageaddresses.unusedaddresses.message'
            defaultMessage='Your Blockchain Wallet contains an unlimited collection of bitcoin addresses that you can use to receive funds from anybody, globally. Your wallet will automatically manage your bitcoin addresses for you. The addresses below are the subset of addresses that are labeled.'
          />
        </Text>
        {!unusedAddresses
          ? null
          : unusedAddresses.cata({
              Success: unusedAddresses => (
                <UnusedAddresses {...props} unusedAddresses={unusedAddresses} />
              ),
              Failure: () => <div />,
              Loading: () => (
                <FlatLoader
                  style={{ margin: '25px auto' }}
                  width='100px'
                  height='12px'
                />
              ),
              NotAsked: () => <div />
            })}
        <IconButton
          style={{ marginTop: 15 }}
          name='plus'
          onClick={() => onGenerateNextAddress()}
          data-e2e='btcAddNextAddressButton'
        >
          <FormattedMessage
            id='scenes.settings.addresses.btc.manageaddresses.unusedaddresses.addnext'
            defaultMessage='Add Next Address'
          />
        </IconButton>
      </React.Fragment>
    )
  }
}

UnusedAddressesContainer.propTypes = {
  walletIndex: PropTypes.number
}

const mapStateToProps = (state, ownProps) => {
  const account = Types.Wallet.selectHDAccounts(state.walletPath.wallet).get(
    ownProps.walletIndex
  )
  const isDefault =
    parseInt(ownProps.walletIndex) ===
    Types.HDWallet.selectDefaultAccountIdx(
      Types.Wallet.selectHdWallets(state.walletPath.wallet).get(0)
    )
  const unusedAddresses = selectors.components.manageAddresses.getWalletUnusedAddresses(
    state,
    ownProps.walletIndex
  )
  const currentReceiveIndex = selectors.core.data.btc.getReceiveIndex(
    account.xpub,
    state
  )
  const search = formValueSelector('manageAddresses')(state, 'search')

  return { account, isDefault, currentReceiveIndex, unusedAddresses, search }
}

const mapDispatchToProps = dispatch => ({
  alertActions: bindActionCreators(actions.alerts, dispatch),
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  componentActions: bindActionCreators(
    actions.components.manageAddresses,
    dispatch
  ),
  coreActions: bindActionCreators(actions.core.wallet, dispatch),
  modalsActions: bindActionCreators(actions.modals, dispatch),
  routerActions: bindActionCreators(actions.router, dispatch),
  walletActions: bindActionCreators(actions.wallet, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnusedAddressesContainer)
